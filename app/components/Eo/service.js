let isFlag = false;
import { IEO_API } from "api/apiConfig";
// import { reject } from "../../../node_modules/@types/async";

export const fetchJson = options => {
  const { url, type, data, ...others } = options;

  isFlag = true;

  let opts = {
    ...others,
    method: type || "get",
    // credentials: "include",
    headers: options.headers || {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  if (["POST", "PUT"].indexOf(opts.method.toUpperCase()) >= 0) {
    // let params = Object.keys(data).map(function (key) {
    //     return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    // }).join("&");
    opts.body = JSON.stringify(data);
  }
  var newUrl = IEO_API + url;
  if (opts.method.toUpperCase() == "GET" && data) {
    newUrl += "?";
    let params = Object.keys(data)
      .map(function(key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
      })
      .join("&");
    newUrl += params;
  }
  fetch(newUrl, opts)
    .then(resData => toJson(resData, opts))
    .catch(error => errorHandler(error, opts))
    .then(resData => resHandler(resData, opts))
    .catch(error => errorHandler(error, opts));
};

function toJson(resp, options) {
  if(resp.status == 500){}
  return resp.json();
}
function resHandler(resData, options) {
  // console.log(resData);
  
  options.success(resData);
}
function errorHandler(error, options, status) {
  isFlag = false;
  if (options.error) {
    
    options.error(error);
  } else {
    console.error(error);
  }
  return false;
}

export function fetchJsonList(offset, cb) {
  fetchJson({
    url: `/cybex/projects?limit=4&offset=${offset}`,
    type: "GET",
    success: data => {
      cb(data);
    }
  });
}

export function fetchBanner(cb) {
  fetchJson({
    url: "/cybex/projects/banner",
    type: "GET",
    success: data => {
      cb(data);
    }
  });
}

export function fetchDetails(data, cb) {
  fetchJson({
    url: "/cybex/project/detail",
    type: "GET",
    success: res => {
      cb(res);
    },
    data: data
  });
}
export function fetchKYC(data, cb) {
  fetchJson({
    url: "/cybex/user/check_status",
    type: "GET",
    success: res => {
      cb(res);
    },
    data: data
  });
}

export function fetchCreatUser(data, cb) {
  fetchJson({
    url: "/cybex/user/create",
    type: "POST",
    success: res => {
      cb(res);
    },
    data: data
  });
}

export function fetchUserProjectStatus(data, cb) {
  fetchJson({
    url: "/cybex/user/status",
    type: "GET",
    success: res => {
      cb(res);
    },
    data: data
  });
}