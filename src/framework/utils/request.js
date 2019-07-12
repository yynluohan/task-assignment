import { get as getEndpoint } from './endpoint';
import qs from 'qs';
import 'whatwg-fetch';
import 'es6-promise';

function checkServerError(response) {
  // 400 错误依旧格式化成为 json
  if (response.status >= 200 && response.status <= 500 && response.status !== 401) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function parseJSON(response) {
  if (response.headers.get('Content-Type').indexOf('application/json') > -1) {
    return response.json().then(data => ({
      responseJSON: data,
      url: response.url,
      response,
    }));;
  }
  return response.blob();
  // const file = new Blob(
  //   [response.body],
  //   { type: 'application/pdf' });
  // const fileURL = URL.createObjectURL(file);
  // return fileURL;
}

function checkStatus({ responseJSON = {}, response, url }) {
  if (responseJSON.code !== undefined || responseJSON.status_code !== undefined) {
    return responseJSON;
  }
  const error = new Error(responseJSON.code);
  error.message = responseJSON.message;
  error.code = responseJSON.code || responseJSON.status_code;
  error.url = url;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const opts = { ...options, 'mode': 'cors' };
  // 默认 发送 json 格式。
  opts.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + localStorage.getItem('token'),
    ...opts.headers
  };
  if (opts.headers['Content-Type'] === false) {
    // 在上传文件的时候需要删掉，由浏览器自己设置，避免 boundary 的问题
    delete opts.headers['Content-Type'];
  }

  //console.log(opts);
  const finalUrl = getEndpoint() + url;

  // const finalUrl = url;
  return fetch(finalUrl, opts)
    .then(checkServerError)
    .then(parseJSON)
    .then(checkStatus)
    .catch(err => {
      const { response } = err;
      if (response && response.status === 401) {
        window.location.href = window.MC.HASH  + '/login'
      }
    })
}
