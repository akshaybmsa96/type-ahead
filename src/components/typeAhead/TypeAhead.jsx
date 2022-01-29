import { useEffect, useState } from "react";
import "./style.css";
import searchIcon from "../../assets/icons/search_icon.png";
import TypeAheadSuggestion from "../suggestion/Suggestion";

const TypeAhead = ({ dataList, placeholder, onTextChange, debounceTime }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      if (typeof onTextChange === "function") {
        onTextChange(searchKeyword);
      }
    }, debounceTime);

    return () => {
      clearTimeout(t);
    };
  }, [searchKeyword, onTextChange, debounceTime]);

  const renderSuggestion = () => {
    return (
      <div className="suggestion-container">
        {dataList.map((item, index) => {
          return <TypeAheadSuggestion key={index} title={item} />;
        })}
      </div>
    );
  };

  const onInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  return (
    <div className="type-ahead-wrapper">
      <div className="input-container">
        <div className="type-ahead-search-icon-conntainer">
          <img
            src={searchIcon}
            alt="search-icon"
            className="type-ahead-search-icon"
          />
        </div>
        <input
          className="type-ahead-input"
          type={"text"}
          placeholder={placeholder}
          onChange={onInputChange}
          value={searchKeyword}
        />
      </div>
      {renderSuggestion()}
    </div>
  );
};

export default TypeAhead;

TypeAhead.defaultProps = {
  dataList: [],
  placeholder: "Search...",
  onTextChange: () => {},
  debounceTime: 500,
};
