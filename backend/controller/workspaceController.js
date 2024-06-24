const Workspace = require('../models/Workspace');
const fs = require('fs');
const fsExtra = require('fs-extra');
const simpleGit = require('simple-git');
const path = require('path');
const git = simpleGit();
const { exec } = require('child_process');
const { url } = require('inspector');
const { error } = require('console');

// Получить рабочее пространство пользователя
exports.getWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findOne({ _id: req.params.id, user: req.user.id });
    if (!workspace) {
      return res.status(404).json({
        success: false,
        error: 'Рабочее пространство не найдено',
      });
    }
    res.status(200).json({
      success: true,
      data: workspace,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      // error: 'Workspace not found',
    });
  }
};

// Получить все рабочие пространства пользователя
exports.getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({ user: req.user.id });
    res.status(200).json({
      success: true,
      data: workspaces,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Создать новое рабочее пространство
exports.createWorkspace = async (req, res) => {
  const { url, name } = req.body;
  try {
    const timestamp = Date.now();
    const workspacePath = path.join(__dirname, '..', 'users_data', req.user.id, `${timestamp}`, name);
    fs.mkdirSync(workspacePath, { recursive: true });

    const workspace = await Workspace.create({
      user: req.user.id,
      url,
      name,
      path: workspacePath,
    });
    res.status(201).json({
      success: true,
      data: workspace,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createWorkspaceGit = async (req, res) => {
  const { repoUrl } = req.body;

  try {
    const reponame = path.basename(repoUrl, '.git');
    const timestamp = Date.now();
    const workspacePath = path.join(__dirname, '..', 'users_data', req.user.id, `${timestamp}`, reponame);

    await git.clone(repoUrl, workspacePath);

    // fs.mkdirSync(workspacePath, { recursive: true });

    const workspace = await Workspace.create({
      user: req.user.id,
      url: repoUrl,
      name: reponame,
      path: workspacePath,
    });
    res.status(201).json({
      success: true,
      data: workspace,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Обновить рабочее пространство
exports.updateWorkspace = async (req, res) => {
  const { NewName } = req.body;
  try {
    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        error: 'Рабочее пространство не найдено',
      });
    }

    if (workspace.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Нет прав для изменения этого рабочего пространства',
      });
    }

    // wUrl = workspace.url;
    // workspace.code = req.body.code || workspace.code;
    // workspace.language = req.body.language || workspace.language;


    // const oldWorkspacePath = workspace.path;
    // const newWorkspacePath = path.join(path.dirname(oldWorkspacePath), NewName);

    // if (fs.existsSync(newWorkspacePath)) {
    //   return res.status(400).json({ error: 'File with this name already exists' });
    // }

    // if (wUrl.indexOf('.git') == -1) {
    //   // console.log(oldWorkspacePath, newWorkspacePath);
    //   // await git.mv(oldWorkspacePath, newWorkspacePath);
    //   await fs.promises.rename(oldWorkspacePath, newWorkspacePath);
    //   workspace.path = newWorkspacePath;
    // }

    workspace.name = NewName;

    const updatedWorkspace = await workspace.save();

    res.status(200).json({
      success: true,
      data: updatedWorkspace,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Удалить рабочее пространство
exports.deleteWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        error: 'Рабочее пространство не найдено',
      });
    }

    if (workspace.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Нет прав для удаления этого рабочего пространства',
      });
    }

    await workspace.deleteOne();
    const tmpPath = workspace.path;
    const index = tmpPath.lastIndexOf('\\');
    // console.log(index);
    const workspacePath = tmpPath.slice(0, index + 1)

    // console.log(workspacePath);
    fs.rmSync(workspacePath, { recursive: true });

    res.status(200).json({
      success: true,
      message: 'Рабочее пространство удалено',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// files

exports.createFile = async (req, res) => {
  const { workspaceId, fileName, content } = req.body;
  const userId = req.user.id;

  try {
    const workspace = await Workspace.findOne({ _id: workspaceId, user: userId });
    if (!workspace) {
      return res.status(404).json({ error: 'Рабочее пространство не найдено' });
    }

    const filePath = path.join(workspace.path, fileName);
    if (fs.existsSync(filePath)) {
      return res.status(400).json({ error: 'Файл с таким именем уже существует' });
    }

    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    await fs.promises.writeFile(filePath, content);
    // fs.writeFileSync(filePath, content);

    res.status(201).json({ message: `Файл создан успешно, ${filePath}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFile = async (req, res) => {
  const { workspaceId, fileName, content } = req.body;
  const userId = req.user.id;

  try {
    const workspace = await Workspace.findOne({ _id: workspaceId, user: userId });
    if (!workspace) {
      return res.status(404).json({ error: 'Рабочее пространство не найдено' });
    }

    const filePath = path.join(workspace.path, fileName);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Файл не найден' });
    }

    fs.writeFileSync(filePath, content);

    res.status(200).json({ message: 'Файл обновлен успешно' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFile = async (req, res) => {
  const { workspaceId, fileName } = req.body;
  const userId = req.user.id;

  try {
    const workspace = await Workspace.findOne({ _id: workspaceId, user: userId });
    if (!workspace) {
      return res.status(404).json({ error: 'Рабочее пространство не найдено' });
    }

    const filePath = path.join(workspace.path, fileName);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Файл не найден' });
    }

    fs.unlinkSync(filePath);

    res.status(200).json({ message: 'Файл удалён' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.renameFile = async (req, res) => {
  const { workspaceId, oldFileName, newFileName } = req.body;
  const userId = req.user.id;

  try {
    const workspace = await Workspace.findOne({ _id: workspaceId, user: userId });
    if (!workspace) {
      return res.status(404).json({ error: 'Рабочее пространство не найдено' });
    }

    const oldFilePath = path.join(workspace.path, oldFileName);
    if (!fs.existsSync(oldFilePath)) {
      return res.status(404).json({ error: 'Файл не найден' });
    }

    const newFilePath = path.join(workspace.path, newFileName);
    if (fs.existsSync(newFilePath)) {
      return res.status(400).json({ error: 'Файл с таким именем уже существует' });
    }

    fs.renameSync(oldFilePath, newFilePath);

    res.status(200).json({ message: 'Файл переименован' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// folders

exports.createFolder = async (req, res) => {
  const { workspaceId, newFolder } = req.body;
  const userId = req.user.id;

  try {
    const workspace = await Workspace.findOne({ _id: workspaceId, user: userId });
    if (!workspace) {
      return res.status(404).json({ error: 'Рабочее пространство не найдено' });
    }

    const folderPath = path.join(workspace.path, newFolder);
    // console.log(folderPath);
    if (fs.existsSync(folderPath)) {
      return res.status(400).json({ error: 'Папка с таким именем уже существует' });
    }

    await fs.promises.mkdir(folderPath, { recursive: true });

    // await fs.promises.writeFile(folderPath);
    // fs.writeFileSync(filePath, content);

    res.status(201).json({ message: `Папка создана, ${folderPath}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFolder = async (req, res) => {
  const { workspaceId, folderName } = req.body;
  const userId = req.user.id;

  try {
    const workspace = await Workspace.findOne({ _id: workspaceId, user: userId });
    if (!workspace) {
      return res.status(404).json({ error: 'Рабочее пространство не найдено' });
    }

    const folderPath = path.join(workspace.path, folderName);
    if (!fs.existsSync(folderPath)) {
      return res.status(404).json({ error: 'Папка не найдена' });
    }

    await fs.promises.rm(folderPath, { recursive: true, force: true });

    res.status(200).json({ message: 'Папка удалена' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.renameFolder = async (req, res) => {
  const { workspaceId, oldFolder, newFolder } = req.body;
  const userId = req.user.id;

  try {
    const workspace = await Workspace.findOne({ _id: workspaceId, user: userId });
    if (!workspace) {
      return res.status(404).json({ error: 'Рабочее пространство не найдено' });
    }

    const oldFolderPath = path.join(workspace.path, oldFolder);
    if (!fs.existsSync(oldFolderPath)) {
      return res.status(404).json({ error: 'Папка не найдена' });
    }

    const newFolderPath = path.join(workspace.path, newFolder);
    if (fs.existsSync(newFolderPath)) {
      return res.status(400).json({ error: 'Папка с таким именем уже существует' });
    }

    fs.renameSync(oldFolderPath, newFolderPath);

    res.status(200).json({ message: 'Папка переименована' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTree = async (req, res) => {
  const { workspaceId } = req.body;
  const userId = req.user.id;
  let itemId = 1;

  const getFileTree = (dir, parentId = 0) => {
    let structure = [];
    let folderId = parentId;

    const items = fs.readdirSync(dir, { withFileTypes: true });

    items.forEach((item) => {
      const itemPath = path.join(dir, item.name);

      let newItemId = itemId++;

      if (item.isDirectory()) {
        folderId = newItemId;
        const folder = {
          id: newItemId,
          parent: parentId,
          droppable: true,
          text: item.name
        };
        structure.push(folder);
        structure = structure.concat(getFileTree(itemPath, folderId));
      } else if (item.isFile()) {
        const stats = fs.statSync(itemPath);
        const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(1) + 'MB';
        const fileExtension = path.extname(item.name).slice(1);
        const fileContent = fs.readFileSync(itemPath, 'utf8');
        const fileType = {
          'csv': 'csv',
          'txt': 'text',
          'jpg': 'image',
          'jpeg': 'image',
          'png': 'image',
          'svg': 'image',
          'html': 'html',
          'js': 'javascript',
          'css': 'css',
          'json': 'json',
          'jsx': 'jsx',
          'md': 'md',
        }[fileExtension] || 'unknown';

        // folderId += 1;
        const file = {
          id: newItemId,
          parent: parentId,
          text: item.name,
          data: {
            fileType: fileType,
            fileSize: fileSizeMB,
            content: fileContent
          }
        };
        structure.push(file);
      }
    });

    return structure;
  };

  try {
    const workspace = await Workspace.findOne({ _id: workspaceId, user: userId });
    if (!workspace) {
      return res.status(404).json({ error: 'Рабочее пространство не найдено' });
    }

    const workspaceDir = workspace.path;
    const fileTree = getFileTree(workspace.path);

    res.status(200).json({
      message: 'Загружен успешно',
      tree: fileTree
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// move

exports.move = async (req, res) => {
  const { workspaceId, oldloc, newloc } = req.body;
  const userId = req.user.id;

  try {
    const workspace = await Workspace.findOne({ _id: workspaceId, user: userId });
    if (!workspace) {
      return res.status(404).json({ error: 'Рабочее пространство не найдено' });
    }

    const oldlocPath = path.join(workspace.path, oldloc);
    const newlocPath = path.join(workspace.path, newloc);

    await fsExtra.move(oldlocPath, newlocPath, { overwrite: true });

    res.status(200).json({ message: 'Нода перемещена', oldlocPath, newlocPath});
  } catch (error) {
    res.status(404).json({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};


// servers


const servers = {};
let Ports = [6001, 6002, 6003];

exports.startServer = async (req, res) => {
  const { workspaceId } = req.body;
  const userId = req.user.id;
  const port = Ports[0];

  try {
    const workspace = await Workspace.findOne({ _id: workspaceId, user: userId });
    if (!workspace) {
      return res.status(404).json({ error: 'Рабочее пространство не найдено' });
    }

    if (!userId || !port) {
      return res.status(400).send('UserId или Port не заданы');
    }

    const workspaceDir = workspace.path;

    // if (port >= 4100) {
    //   return res.status(500).json({ message: `Все порты заняты` });
    // }

    const command = `node userServer.js ${workspaceDir} ${port}`;

    const serverProcess = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).send('Error starting user server');
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }

      console.log(`stdout: ${stdout}`);
    });

    servers[userId] = serverProcess;
    Ports.splice(0, 1);
    let newPort = (Ports.at(-1)) + 1;

    Ports.push(newPort);

    res.status(201).json({
      port: port,
      message: `Сервер создан для ${userId} на порту: ${port}` 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.stopServer = async (req, res) => {
  const userId = req.user.id;
  // const port = req.body.port;


  // res.send(`User server stopped for ${userId}`);

  try {
    if (!userId) {
      return res.status(400).send('UserId или Port не заданы');
    }

    const serverProcess = servers[userId];

    if (!serverProcess) {
      return res.status(404).send('Серверов по данному id не найдено');
    }

    // Ports.push(port);
    // Ports.sort((a, b) => a - b);

    serverProcess.kill();
    delete servers[userId];

    res.status(201).json({ message: `Сервер остановлен для, ${userId}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};