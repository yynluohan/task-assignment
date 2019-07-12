
function trimArray(params) {
  return params.map(param => {
    return trimObject(param);
  })
}

function trimObject(params) {
  if (typeof(params) !== 'object') {
    return params;
  }
  Object.keys(params).map(param => {
    const value = params[param];
    if (value && typeof(value) === 'string') {
      const res = value.replace(/(^\s*)|(\s*$)/g, "");
      params[param] = res;
      if (res === "") {
        delete params[param];
      }
    }
    if (value && value instanceof Array) {
      params[param] = trimArray(value);
    }
  });
  return params;
}

/**
 * 对传入的参数进行去掉空格的操作。入参可以是对象或数组
 */
export function trim(params) {
  return Array.isArray(params) ? trimArray(params) : trimObject(params);
}
