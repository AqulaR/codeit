import { useEffect, useState } from "react";
import { executeCode } from "./api";
import '../assets/css/lcompiler.css'
import { MdOpenInNew } from "react-icons/md";
import { VscDebugStart, VscDebugStop } from "react-icons/vsc";
import { IoReloadOutline } from "react-icons/io5";

const OutputWS = ({ editorRef, language, workspaceId, token }) => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const [output, setOutput] = useState(['Здесь хранятся ответы от сервера']);
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [serverPort, setServerPort] = useState('');

    const runCode = async (e) => {
        e.preventDefault();

        try {
            if (url == '') {
                const responseStartServer = await fetch(`${serverUrl}/api/workspaces/start-server`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ workspaceId }),
                });

                const dataStart = await responseStartServer.json();

                // console.log(dataStart.url);

                setUrl(`${serverUrl}:${dataStart.port}/`);
                // document.getElementById('preview-frame').src = `${dataStart.url}`;
                document.getElementById('preview-frame').contentWindow.location = `${serverUrl}:${dataStart.port}/`;
                setOutput(prev => [...prev, `Сервер запущен на ${dataStart.url}`]);
            } else {
                const responseStopServer = await fetch(`${serverUrlConf}/api/workspaces/stop-server`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                const dataStop = await responseStopServer.json();

                setUrl('');
                document.getElementById('preview-frame').src = '';
                setOutput(prev => [...prev, `Сервер остановлен`]);
            }
        } catch (error) {
            console.log(error);
        }


        // const sourceCode = editorRef.current.getValue();
        // // console.log(sourceCode);
        // if (!sourceCode) return;
        // try {
        //     setIsLoading(true);

        //     if (language == "html") {
        //         const iframeDocument = document.getElementById('preview-frame').contentDocument;
        //         iframeDocument.open();
        //         iframeDocument.write(sourceCode);
        //         iframeDocument.close();
        //     } else {
        //         const { run: result } = await executeCode(language, sourceCode);
        //         setOutput(result.output.split("\n"));
        //         result.stderr ? setIsError(true) : setIsError(false);
        //     }
        // } catch (error) {
        //     console.log(error);
        // } finally {
        //     setIsLoading(false);
        // }

    };

    const openTab = async (e) => {
        e.preventDefault();
        if (url != '') {
            window.open(url, '_blank');
        }
    };

    const reload = async (e) => {
        if (url != '') {
            document.getElementById('preview-frame').contentWindow.location = `${url}`;
        }
        setOutput(prev => [...prev, `Обновление страницы`]);
    };

    return (
        <div className="output_con d-flex flex-column h-100">
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start WSoptns_con">
                    <button onClick={runCode} className="editorWS_preview_btn editorWS_preview_btn_scale">
                        {url ? (
                            <VscDebugStop color="red" />
                        ) : (
                            <VscDebugStart color="green" />
                        )}
                    </button>
                    <button onClick={reload} className="editorWS_preview_btn">
                        <IoReloadOutline />
                    </button>
                    <button onClick={openTab} className="editorWS_preview_btn editorWS_preview_btn_scale"><MdOpenInNew /></button>
                </div>
                {/* <div className="d-flex justify-content-start WSoptns_con">
                    <button onClick={openTab} className=""><MdOpenInNew /></button>
                </div> */}
            </div>
            <div className="d-flex flex-column h-100">
                {/* <div className="output_iframe_WS_outer"> */}
                <iframe id='preview-frame' className="output_iframe_WS" src=""></iframe>
                {/* </div> */}
                <div className="output_console_WS">
                    {output
                        ? output.map((line, i) => <p key={i}>{line}</p>)
                        : 'Здесь хранятся ответы от сервера'
                    }
                </div>
            </div>
        </div>
    );
};
export default OutputWS;
