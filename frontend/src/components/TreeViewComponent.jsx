import React, { useEffect, useState } from "react";
import { DiCss3, DiHtml5, DiJavascript, DiJsBadge, DiNpm } from "react-icons/di";
import { FaFolderPlus, FaImages, FaList, FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";
import { AiOutlineFileAdd, AiOutlineFolderAdd } from "react-icons/ai";
import { TbJson } from "react-icons/tb";
import "../assets/css/workspace.css";
import { useLocation } from "react-router-dom";
import { DndProvider } from 'react-dnd';

import {
    Tree,
    getBackendOptions,
    MultiBackend,
    getDescendants
} from "@minoru/react-dnd-treeview";
import { theme } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { CustomNode } from "./CustomNode";
// import { CustomDragPreview } from "./CustomDragPreview";
import { AddDialog } from "./AddDialog";
import { AddDialogF } from "./AddDialogF";

function TreeViewComponent({ onSendData, onSendTreeData }) {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const workspaceId = searchParams.get('id');
    const token = localStorage.getItem('authToken');

    const [treeData, setTreeData] = useState([]);

    useEffect(() => {
        console.log('Workspace ID:', workspaceId);
        if (!workspaceId) {
            console.log("Id отсутствует");
        }
        const fetchData = async () => {
            try {
                const responseFileTree = await fetch(`${serverUrl}/api/workspaces/fileTree/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ workspaceId }),
                });
                const FileTree = await responseFileTree.json();
                setTreeData(FileTree.tree);
                onSendTreeData(FileTree.tree);
            } catch (error) {
                console.log('Ошибка в обращении: ', error);
            }
        }

        fetchData();
    }, []);

    const handleUpdateFetch = async () => {
        const fetchData = async () => {
            try {
                const responseFileTree = await fetch(`${serverUrl}/api/workspaces/fileTree/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ workspaceId }),
                });
                const FileTree = await responseFileTree.json();
                console.log("Обновлён: ", FileTree.message);
                setTreeData(FileTree.tree);
                onSendTreeData(FileTree.tree);
            } catch (error) {
                console.log('Ошибка в обращении: ', error);
            }
        }
        fetchData();
    }

    const handleDrop = (newTree, { dragSourceId, dropTargetId }) => {
        console.log('Source ID:', dragSourceId);
        console.log('Target ID:', dropTargetId);

        let sourceNode = treeData.find(data => data.id === dragSourceId);
        let targetNode = treeData.find(data => data.id === dropTargetId);

        console.log(sourceNode, targetNode);

        let pathSourceNode = ''
        if (sourceNode != undefined) {
            if (sourceNode.parent > 0) {
                pathSourceNode = `/${findPath(treeData, sourceNode.parent)}/${sourceNode.text}`;
            } else {
                pathSourceNode = `/${sourceNode.text}`;
            }
        } else {
            pathSourceNode = `./`;
        }

        let pathTargetNode = ''
        if (targetNode != undefined) {
            if (targetNode.parent > 0) {
                pathTargetNode = `/${findPath(treeData, targetNode.parent)}/${targetNode.text}/${sourceNode.text}`;
            } else {
                pathTargetNode = `/${targetNode.text}/${sourceNode.text}`;
            }
        } else {
            pathTargetNode = `./${sourceNode.text}`;
        }

        console.log(pathSourceNode, " to ", pathTargetNode);

        // if (nodeToUpdate.droppable != undefined) {
        //     // handleUpdateFolderName(oldPath, newPath);
        //     // console.log(nodeToUpdate.droppable, oldPath, newPath);
        // } else {
        //     // handleUpdateFileName(oldPath, newPath);
        //     // console.log(nodeToUpdate.droppable, oldPath, newPath);
        // }
        // console.log();
        setTreeData(newTree);
        handleMove(pathSourceNode, pathTargetNode);
    };

    const handleMove = async (oldloc, newloc) => {
        // e.preventDefault();
        console.log(workspaceId);
        console.log(oldloc);
        console.log(newloc);
        try {
            const responseMove = await fetch(`${serverUrl}/api/workspaces/node/move/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    workspaceId,
                    oldloc,
                    newloc,
                }),
            });

            const dataMove = await responseMove.json();

            console.log(dataMove);
        } catch (error) {
            console.log(error.message);
        }
    };

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);


    if (!workspaceId || !token) {
        console.log("Вход запрещён");
        return null;
    }

    const getLastId = (treeData) => {
        const reversedArray = [...treeData].sort((a, b) => {
            if (a.id < b.id) {
                return 1;
            } else if (a.id > b.id) {
                return -1;
            }
            return 0;
        });

        if (reversedArray.length > 0) {
            return reversedArray[0].id;
        }

        return 0;
    };

    const handleDelete = (id) => {
        let nodeToDel = treeData.find(data => data.id === id);

        console.log(nodeToDel.droppable);

        let path = ''
        if (nodeToDel.parent > 0) {
            path = `/${findPath(treeData, nodeToDel.parent)}/${nodeToDel.text}`;
        } else {
            path = `/${nodeToDel.text}`;
        }

        console.log(path);

        if (nodeToDel.droppable != undefined) {
            handleDeleteFolder(path);
            console.log(nodeToDel.droppable);
        } else {
            handleDeleteFile(path);
        }

        const deleteIds = [
            id,
            ...getDescendants(treeData, id).map((node) => node.id)
        ];

        const newTree = treeData.filter((node) => !deleteIds.includes(node.id));

        setTreeData(newTree);
        // handleDeleteNode(path)
    };

    const handleDeleteFile = async (fileName) => {
        // e.preventDefault();
        console.log(workspaceId);
        console.log(fileName);
        try {
            const responseDelFile = await fetch(`${serverUrl}/api/workspaces/file/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    workspaceId,
                    fileName,
                }),
            });

            const dataDelFile = await responseDelFile.json();

            console.log(dataDelFile);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeleteFolder = async (folderName) => {
        console.log(workspaceId);
        console.log(folderName);
        try {
            const responseDelFolder = await fetch(`${serverUrl}/api/workspaces/folder/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    workspaceId,
                    folderName,
                }),
            });

            const dataDelFolder = await responseDelFolder.json();

            console.log(dataDelFolder);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleCopy = (id) => {
        const lastId = getLastId(treeData);
        const targetNode = treeData.find((n) => n.id === id);
        const descendants = getDescendants(treeData, id);
        const newText = generateUniqueText(targetNode.text, treeData);

        const partialTree = descendants.map((node) => ({
            ...node,
            id: node.id + lastId,
            parent: node.parent + lastId,
            text: generateUniqueText(node.text, treeData)
        }));

        setTreeData([
            ...treeData,
            {
                ...targetNode,
                id: targetNode.id + lastId,
                text: newText
            },
            ...partialTree
        ]);
    };

    const generateUniqueText = (text, treeData) => {
        let newText = text;
        let counter = 1;

        while (treeData.some((node) => node.text === newText)) {
            newText = `${text} (${counter})`;
            counter++;
        }

        return newText;
    };

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleSubmit = (newNode) => {
        const lastId = getLastId(treeData) + 1;

        setTreeData([
            ...treeData,
            {
                ...newNode,
                id: lastId
            }
        ]);

        let path = ''
        if (newNode.parent > 0) {
            path = `/${findPath(treeData, newNode.parent)}/${newNode.text}`;
        } else {
            path = `/${newNode.text}`;
        }

        console.log(path);
        handlePostNewFolder(path);
        setOpen(false);
    };

    const handlePostNewFolder = async (newFolder) => {
        // e.preventDefault();
        console.log(workspaceId);
        console.log(newFolder);

        try {
            const responseAddNewFolder = await fetch(`${serverUrl}/api/workspaces/folder/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    workspaceId,
                    newFolder,
                }),
            });

            const dataAddNewFolder = await responseAddNewFolder.json();

            console.log(dataAddNewFolder);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleCloseDialog2 = () => {
        setOpen2(false);
    };

    const handleSubmit2 = (newNode) => {
        const lastId = getLastId(treeData) + 1;

        setTreeData([
            ...treeData,
            {
                ...newNode,
                id: lastId
            }
        ]);

        setOpen2(false);

        let path = ''
        if (newNode.parent > 0) {
            path = `/${findPath(treeData, newNode.parent)}/${newNode.text}`;
        } else {
            path = `/${newNode.text}`;
        }

        console.log(path);
        handlePostNewFile(path)
    };

    const handlePostNewFile = async (fileName) => {
        // e.preventDefault();
        console.log(workspaceId);
        console.log(fileName);
        try {
            const responseAddNewFile = await fetch(`${serverUrl}/api/workspaces/file/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    workspaceId,
                    fileName,
                    content: ""
                }),
            });

            const dataAddNewFile = await responseAddNewFile.json();

            console.log(dataAddNewFile);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleTextChange = (id, value) => {
        let nodeToUpdate = treeData.find(data => data.id === id);

        console.log(nodeToUpdate.text);

        let path = ''
        if (nodeToUpdate.parent > 0) {
            path = findPath(treeData, nodeToUpdate.parent);
        } else {
            path = '';
        }

        let oldPath = `/${path}/${nodeToUpdate.text}`
        let newPath = `/${path}/${value}`;

        console.log(path);

        if (nodeToUpdate.droppable != undefined) {
            handleUpdateFolderName(oldPath, newPath);
            // console.log(nodeToUpdate.droppable, oldPath, newPath);
        } else {
            handleUpdateFileName(oldPath, newPath);
            // console.log(nodeToUpdate.droppable, oldPath, newPath);
        }

        const newTree = treeData.map((node) => {
            if (node.id === id) {
                return {
                    ...node,
                    text: value,
                };
            }

            return node;
        });

        setTreeData(newTree);
    };

    const handleUpdateFileName = async (oldFileName, newFileName) => {
        // e.preventDefault();
        console.log(workspaceId);
        console.log(oldFileName);
        console.log(newFileName);
        try {
            const responseAddNewFile = await fetch(`${serverUrl}/api/workspaces/file/rename/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    workspaceId,
                    oldFileName,
                    newFileName,
                }),
            });

            const dataAddNewFile = await responseAddNewFile.json();

            console.log(dataAddNewFile);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleUpdateFolderName = async (oldFolder, newFolder) => {
        // e.preventDefault();
        console.log(workspaceId);
        console.log(oldFolder);
        console.log(newFolder);
        try {
            const responseAddNewFile = await fetch(`${serverUrl}/api/workspaces/folder/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    workspaceId,
                    oldFolder,
                    newFolder
                }),
            });

            const dataAddNewFile = await responseAddNewFile.json();

            console.log(dataAddNewFile);
        } catch (error) {
            console.log(error.message);
        }
    };

    const [selectedFile, setSelectedFile] = useState([]);

    const handleFileSelect = (file) => {
        setSelectedFile(file);
        let data_w_status = {
            "isSelected": false,
            "modified": false,
            "modifiedData": '',
            "file": file
        }
        console.log(data_w_status);
        onSendData(data_w_status);
    };

    console.log(treeData);

    const findPath = (structure, id) => {
        const nodeMap = new Map();
        const idMap = new Map();

        // Create maps for quick look-up
        structure.forEach(item => {
            nodeMap.set(item.id, item);
            if (!idMap.has(item.parent)) {
                idMap.set(item.parent, []);
            }
            idMap.get(item.parent).push(item.id);
        });

        function getPath(currentId) {
            let path = [];
            while (currentId !== 0) {
                const currentNode = nodeMap.get(currentId);
                if (currentNode) {
                    path.unshift(currentNode.text);
                    currentId = currentNode.parent;
                } else {
                    break;
                }
            }
            return path.join('/');
        }

        return getPath(id);
    }

    return (
        <div className="tree_outer h-100">
            <div className="tree_upper d-flex justify-content-between align-items-center" >
                <span>Проводник</span>
                <div className="tree_upper_btns_con d-flex">
                    <button onClick={() => setOpen(true)} className="tree_btns" >
                        <AiOutlineFolderAdd className="tree_upper_btns_size" />
                    </button>
                    {open && (
                        <AddDialog
                            tree={treeData}
                            onClose={handleCloseDialog}
                            onSubmit={handleSubmit}
                        />
                    )}
                    <button onClick={() => setOpen2(true)} className="tree_btns" >
                        <AiOutlineFileAdd />
                    </button>
                    {open2 && (
                        <AddDialogF
                            tree={treeData}
                            onClose={handleCloseDialog2}
                            onSubmit={handleSubmit2}
                        />
                    )}
                    <button onClick={() => handleUpdateFetch()} className="tree_btns" >
                        <IoReloadOutline />
                    </button>
                </div>
            </div>
            <div className="tree_con">
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                        <div>
                            <Tree
                                tree={treeData}
                                rootId={0}
                                render={(node, options) => (
                                    <CustomNode
                                        node={node}
                                        {...options}
                                        onDelete={handleDelete}
                                        // onCopy={handleCopy}
                                        onTextChange={handleTextChange}
                                        onFileSelect={handleFileSelect}
                                        selectedFile={selectedFile.path}
                                    />
                                )}
                                dragPreviewRender={(monitorProps) => (
                                    // <CustomDragPreview monitorProps={monitorProps} />
                                    <div>{monitorProps.item.text}</div>
                                )}
                                onDrop={handleDrop}
                            />
                        </div>
                    </DndProvider>
                </ThemeProvider>
            </div>
        </div>
        // <h1>sda</h1>
    );
}

export default TreeViewComponent;