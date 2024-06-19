import { useEffect, useState } from "react";
import { executeCode } from "./api";
import '../assets/css/lcompiler.css'
import { MdOpenInNew } from "react-icons/md";
import { VscDebugStart, VscDebugStop } from "react-icons/vsc";
import { IoReloadOutline } from "react-icons/io5";

const Output = ({ editorRef, language }) => {
    const [output, setOutput] = useState(['Вывод всего кроме html']);
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [serverUrl, setServerUrl] = useState('');

    const runCode = async (e) => {
        e.preventDefault();

        const sourceCode = editorRef.current.getValue();
        // console.log(sourceCode);
        if (!sourceCode) return;
        try {
            setIsLoading(true);
            if (language == "html") {
                const iframeDocument = document.getElementById('preview-frame').contentDocument;
                iframeDocument.open();
                iframeDocument.write(sourceCode);
                iframeDocument.close();
            } else {
                const { run: result } = await executeCode(language, sourceCode);
                setOutput(result.output.split("\n"));
                result.stderr ? setIsError(true) : setIsError(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="output_con d-flex flex-column ps-2 gap-4">
            <div className="d-flex justify-content-between">
                <button onClick={runCode} className="run_code">
                    Запустить
                </button>
                <div className="">
                    <h2>Вывод</h2>
                </div>
            </div>
            <div className="d-flex flex-column gap-2">
                <iframe id='preview-frame' className="output_iframe" src="" content=""></iframe>
                <div className="output_console">
                    {output
                        ? output.map((line, i) => <p key={i}>{line}</p>)
                        : 'Вывод всего кроме html'
                    }
                </div>
            </div>
        </div>
    );
};
export default Output;
