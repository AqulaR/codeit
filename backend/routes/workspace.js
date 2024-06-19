const express = require('express');
const { getWorkspace,
  getWorkspaces,
  createWorkspace,
  createWorkspaceGit,
  updateWorkspace,
  deleteWorkspace,
  createFile,
  updateFile,
  deleteFile,
  renameFile,
  createFolder,
  deleteFolder,
  renameFolder,
  getTree,
  startServer,
  stopServer,
  move,
} = require('../controller/workspaceController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .get(protect, getWorkspaces)
  .post(protect, createWorkspace);

router.route('/import/')
  .post(protect, createWorkspaceGit);

router.route('/file/')
  .post(protect, createFile)
  .put(protect, updateFile)
  .delete(protect, deleteFile);

router.route('/file/rename/')
  .put(protect, renameFile);

router.route('/node/move/')
  .post(protect, move);

router.route('/folder/')
  .post(protect, createFolder)
  .put(protect, renameFolder)
  .delete(protect, deleteFolder);

router.route('/fileTree/')
  .post(protect, getTree);

router.route('/start-server/')
  .post(protect, startServer);

router.route('/stop-server/')
  .post(protect, stopServer);

router.route('/:id')
  .get(protect, getWorkspace)
  .put(protect, updateWorkspace)
  .delete(protect, deleteWorkspace);

module.exports = router;