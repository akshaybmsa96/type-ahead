import { ObjectToQueryString } from "../utils";

class HttpReq {
  parseResponse(response) {
    if (response.ok) {
      return response.text().then((res) => {
        return res ? JSON.parse(res) : {};
      });
    }
    return response.text().then((res) => {
      return Promise.reject(res);
    });
  }
  async makeNetworkCall(url, config, queryParams) {
    const reqUrl = `${url}${ObjectToQueryString(queryParams)}`;

    return new Promise((resolve) => {
      fetch(reqUrl, config)
        .then((res) => {
          resolve(this.parseResponse(res));
        })
        .catch((err) => {
          resolve(err);
        });
    });
  }
}

const http = new HttpReq();

export const getRequest = (url, queryParams) => {
  return http.makeNetworkCall(url, { method: "GET" }, queryParams);
};
