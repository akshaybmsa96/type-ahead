import React, { useEffect, useState } from "react";
import "./style.css";
import searchIcon from "../../assets/icons/search_icon.png";
import TypeAheadSuggestion from "../suggestion/Suggestion";
import closeIcon from "../../assets/icons/close_icon.png";

const TypeAhead = ({
  dataList,
  placeholder,
  onTextChange,
  debounceTime,
  minLength,
  onOptionSelect,
}) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (
        typeof onTextChange === "function" &&
        searchKeyword.length >= minLength
      ) {
        onTextChange(searchKeyword);
      }
    }, debounceTime);

    return () => {
      clearTimeout(t);
    };
  }, [searchKeyword, onTextChange, debounceTime, minLength]);

  useEffect(() => {
    setShowSuggestions(true);
  }, [dataList]);

  const onOptionClickHandler = (index) => {
    if (
      typeof onOptionSelect === "function" &&
      searchKeyword.length >= minLength
    ) {
      onOptionSelect(dataList[index]);
    }
    setShowSuggestions(false);
  };

  const onCloseClickHandler = (e) => {
    e.stopPropagation();
    setShowSuggestions(false);
  };

  const renderSuggestion = () => {
    if (!showSuggestions) {
      return null;
    }
    return (
      <React.Fragment>
        <div className="suggestion-container">
          {dataList.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  onOptionClickHandler(index);
                }}
              >
                <TypeAheadSuggestion title={item} />
              </div>
            );
          })}
        </div>
        <div
          className="overlay"
          onClick={() => {
            setShowSuggestions(false);
          }}
        />
      </React.Fragment>
    );
  };

  const onInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  return (
    <div className="type-ahead-wrapper">
      <div className="input-container">
        <div className="type-ahead-search-icon-container">
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
          onClick={() => {
            setShowSuggestions(true);
          }}
          value={searchKeyword}
        />
        <div
          onClick={onCloseClickHandler}
          className="type-ahead-close-icon-container"
        >
          <img
            src={closeIcon}
            alt="close-icon"
            className="type-ahead-close-icon"
          />
        </div>
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
  minLength: 0,
  onOptionSelect: (e) => {
    console.log(e);
  },
};
