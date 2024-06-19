import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
// import LanguageSelector from "../components/LanguageSelector";
// import { CODE_SNIPPETS } from "../components/Constants";
import { IoCloseOutline } from "react-icons/io5";
import OutputWS from "./OutputWS";

function EditorComponent({ receivedData, onSendData, workspaceId, token, treeData }) {
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    const editorRef = useRef();
    const [value, setValue] = useState("");
    // const [selectedFile, setSelectedFile] = useState([]);

    // const handleFileSelect = (file) => {
    //     setSelectedFile(file);
    // };

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    //   const onSelect = (language) => {
    //     setLanguage(language);
    //     setValue(CODE_SNIPPETS[language]);
    //   };
    const [language, setLanguage] = useState("");
    const [fileContent, setFileContent] = useState([]);
    const [openedFiles, setOpenedFiles] = useState([]);

    useEffect(() => {
        if (receivedData.length != 0) {
            if (receivedData.file.data != undefined) {
                if (!openedFiles.find(fileData => fileData.file.id === receivedData.file.id)) {
                    let newFileContent = {
                        id: receivedData.file.id,
                        // modifiedContent: receivedData.modifiedData,
                        content: receivedData.file.data.content
                    }
                    setFileContent(newFileContent);
                    setLanguage(receivedData.file.data.fileType);
                    let prevObj = [...openedFiles];
                    prevObj.map(item => {
                        item.isSelected = false;
                    })
                    receivedData.isSelected = true;
                    setOpenedFiles([...prevObj, receivedData]);
                } else {
                    let el = openedFiles.find(fileData => fileData.file.id === receivedData.file.id);
                    openedFiles.map(item => {
                        item.isSelected = false;
                    })
                    el.isSelected = true;
                    let newFileContent = {
                        id: receivedData.file.id,
                        // modifiedContent: el.modifiedData,
                        content: el.file.data.content
                    }
                    setFileContent(newFileContent);
                    setLanguage(el.file.data.fileType);
                }
            }
            onSendData([]);
        }
    }, [receivedData]);

    const onDelOpen = (id, index) => {
        setOpenedFiles(prev => prev.filter(el => el.file.id !== id));
        if (openedFiles[index + 1] != undefined) {
            let el = openedFiles[index + 1];
            openedFiles.map(item => {
                item.isSelected = false;
            })
            el.isSelected = true;
            let newFileContent = {
                id: el.file.id,
                // modifiedContent: el.modifiedData,
                content: el.file.data.content
            }
            setFileContent(newFileContent);
            setLanguage(el.file.data.fileType);
        } else if (openedFiles[index - 1] != undefined) {
            let el = openedFiles[index - 1];
            openedFiles.map(item => {
                item.isSelected = false;
            })
            el.isSelected = true;
            let newFileContent = {
                id: el.file.id,
                // modifiedContent: el.modifiedData,
                content: el.file.data.content
            }
            setFileContent(newFileContent);
            setLanguage(el.file.data.fileType);
        } else {
            let newFileContent = {
                id: null,
                // modifiedContent: el.modifiedData,
                content: null
            }
            setFileContent(newFileContent);
            console.log(fileContent);
        }
    };

    const getDataToEditor = (id) => {
        const el = openedFiles.find(fileData => fileData.file.id === id);
        openedFiles.map(item => {
            item.isSelected = false;
        })
        el.isSelected = true;
        let newFileContent = {
            id: el.file.id,
            // modifiedContent: el.modifiedData,
            content: el.file.data.content
        }
        setFileContent(newFileContent);
        setLanguage(el.file.data.fileType);
    };

    const handleContentChange = (value) => {
        if (fileContent.id != null) {
            const el = openedFiles.find(fileData => fileData.file.id === fileContent.id);
            // el.modified = true;
            // console.log(el.file.id);
            
            let fileContentToUpdate = treeData.find(data => data.id === el.file.id);

            console.log(fileContentToUpdate.text);

            let file = ''
            if (fileContentToUpdate.parent > 0) {
                file = `/${findPath(treeData, fileContentToUpdate.parent)}/${fileContentToUpdate.text}`;
            } else {
                file = `/${fileContentToUpdate.text}`;
            }

            let content = value;
            console.log(file);
            console.log(content);
            handleUpdateFileName(file, content);

            el.file.data.content = value;
        }
    }

    const handleUpdateFileName = async (fileName, content) => {
        // e.preventDefault();
        console.log(workspaceId);
        console.log(fileName);
        console.log(content);
        try {
            const responseUpdateFileData = await fetch(`${serverUrl}/api/workspaces/file`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    workspaceId,
                    fileName,
                    content,
                }),
            });

            const dataUpdateFileData = await responseUpdateFileData.json();

            console.log(dataUpdateFileData);
        } catch (error) {
            console.log(error.message);
        }
    };

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

    // console.log(fileContent);

    // const handleKeyDown = (event) => {
    //     if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    //         event.preventDefault();
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener('keydown', handleKeyDown);
    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, []);

    return (
        <div className="editor_part">
            <div className="d-flex justify-content-between h-100">
                <div className="d-flex flex-column editorWS_con h-100">
                    {/* <LanguageSelector language={language} onSelect={onSelect} /> */}
                    <div className="filesWS">
                        {openedFiles ? (
                            openedFiles.map((fileData, index) =>
                                fileData.isSelected ? (
                                    fileData.modified ? (
                                        <div key={index} className="editorWS_upperFiles d-flex WStab_active"><button onClick={() => getDataToEditor(fileData.file.id)} className="editorWSFileSel"><span className="circleWS"></span>{fileData.file.text}</button><button className="closeFileUp" onClick={() => onDelOpen(fileData.file.id, index)}><IoCloseOutline /></button></div>
                                    ) : (
                                        <div key={index} className="editorWS_upperFiles d-flex WStab_active"><button onClick={() => getDataToEditor(fileData.file.id)} className="editorWSFileSel">{fileData.file.text}</button><button className="closeFileUp" onClick={() => onDelOpen(fileData.file.id, index)}><IoCloseOutline /></button></div>
                                    )
                                ) : (
                                    fileData.modified ? (
                                        <div key={index} className="editorWS_upperFiles d-flex"><button onClick={() => getDataToEditor(fileData.file.id)} className="editorWSFileSel"><span className="circleWS"></span>{fileData.file.text}</button><button className="closeFileUp" onClick={() => onDelOpen(fileData.file.id, index)}><IoCloseOutline /></button></div>
                                    ) : (
                                        <div key={index} className="editorWS_upperFiles d-flex"><button onClick={() => getDataToEditor(fileData.file.id)} className="editorWSFileSel">{fileData.file.text}</button><button className="closeFileUp" onClick={() => onDelOpen(fileData.file.id, index)}><IoCloseOutline /></button></div>
                                    ))
                                // <span className="circleWS"></span>
                            )
                        ) : (
                            <li></li>
                        )}
                        {/* <button className="editWSfile">Index.js</button>
                        <button className="editWSfile">Home.js</button> */}
                    </div>
                    <div className="h-100">
                        <Editor
                            options={{
                                minimap: {
                                    enabled: false,
                                },
                            }}
                            // height="80.8vh"
                            theme="vs-light"
                            language={language}
                            defaultValue={''}
                            onMount={onMount}
                            value={fileContent.content}
                            onChange={handleContentChange}
                            className="editorWS"
                        />
                    </div>
                </div>
                <OutputWS editorRef={editorRef} language={language} workspaceId={workspaceId} token={token} />
            </div>
        </div>
    )
}

export default EditorComponent
