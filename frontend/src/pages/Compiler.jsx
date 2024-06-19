import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "../components/LanguageSelector";
import { CODE_SNIPPETS } from "../components/Constants";
import Output from "../components/Output";

function Compiler() {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
      <div>
        <div className="d-flex justify-content-between px-4 pt-3">
          <div className="w-48 d-flex flex-column gap-4">
            <LanguageSelector language={language} onSelect={onSelect} />
            <div>
              <Editor
                options={{
                  minimap: {
                    enabled: false,
                  },
                }}
                height="80.8vh"
                theme="vs-light"
                language={language}
                defaultValue={CODE_SNIPPETS[language]}
                onMount={onMount}
                value={value}
                onChange={(value) => setValue(value)}
                className="leditor"
              />
            </div>
          </div>
          <Output editorRef={editorRef} language={language}/>
        </div>
      </div>
  )
}

export default Compiler
