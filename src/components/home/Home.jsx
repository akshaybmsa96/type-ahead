import TypeAhead from "../typeAhead/TypeAhead";
import { connect } from "react-redux";
import { getSearchResults } from "../../actions/typeAhead.action";
import { useCallback, useEffect, useState } from "react";
import Cache from "../../cache/cache";

const Home = ({ dataList, fetchList }) => {
  const [searchKeyword, setKeyword] = useState("");
  const [dataListState, setDataListState] = useState([]);
  const [searchCache] = useState(new Cache(20));
  const onTextChangeCallBack = (keyword) => {
    setKeyword(keyword);
  };

  useEffect(() => {
    if (searchKeyword) {
      searchCache.setCacheVal(searchKeyword, dataList);
    }
    setDataListState(dataList);
  }, [dataList, searchCache]);

  const fetchData = useCallback(() => {
    if (searchKeyword) {
      const cacheForKeyword = searchCache.getCacheVal(searchKeyword);
      if (cacheForKeyword) {
        setDataListState(cacheForKeyword);
      } else {
        fetchList(searchKeyword);
      }
    } else {
      setDataListState([]);
    }
  }, [searchKeyword, fetchList, searchCache]);

  useEffect(() => {
    fetchData();
  }, [fetchData, searchKeyword]);

  return (
    <TypeAhead
      dataList={dataListState}
      debounceTime={500}
      onTextChange={onTextChangeCallBack}
      placeholder={"Search..."}
    />
  );
};

const mapStateToProp = ({ dataListStore }) => {
  return {
    dataList: dataListStore.list,
  };
};

const mapActionToProp = (dispatch) => {
  return {
    fetchList: (param) => {
      getSearchResults(param, dispatch);
    },
  };
};

export default connect(mapStateToProp, mapActionToProp)(Home);
