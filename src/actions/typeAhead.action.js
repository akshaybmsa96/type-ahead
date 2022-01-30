import { endPoints } from "../http/endpoints";
import { getRequest } from "../http/http";
import { setList } from "../store/reducer";

export const getSearchResults = (searchQuery, dispatch) => {
  const queryParam = { q: searchQuery, type: "file" };
  getRequest(endPoints.getDetails, queryParam)
    .then((res) => {
      dispatch(setList(dataTransformer(res)));
    })
    .catch((err) => {
      console.log("err", err);
    });
};

const dataTransformer = ({ data }) => {
  return data.items.map((item) => {
    return item.name;
  });
};
