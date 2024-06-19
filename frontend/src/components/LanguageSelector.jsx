import '../assets/css/lcompiler.css'
import { LANGUAGE_VERSIONS } from "./Constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "blue.400";

const LanguageSelector = ({ language, onSelect }) => {
    return (
        <div className="d-flex justify-content-between">
            <h2>Язык:</h2>
            <div>
                <select className="language_select">
                    {languages.map(([lang, version]) => (
                        // <option value=""></option>

                        <option key={lang} onClick={() => onSelect(lang)}>
                            {lang}
                            &nbsp;
                            {/* <p as="span" color="gray.600" fontSize="sm">
                  ({version})
                </p> */}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
export default LanguageSelector;
