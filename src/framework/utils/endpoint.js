let endpoint = '';

/**
 * //@depreacted, use getEndpoint instead
 */
 export function get() {
   if (endpoint !== '') {
     return endpoint;
   }
   return window.MC && window.MC.HOST !== '' ? window.MC.HOST : '';
 }

//@depreacted, use setEndpoint instead
 export function set(val) {
   endpoint = val;
 }

 /**
  * 返回系统定义的API端点.
  */
  export function getEndpoint() {
    if (endpoint !== '') {
      return endpoint;
    }
    return window.MC && window.MC.HOST !== '' ? window.MC.HOST : '';
  }

 export function setEndpoint(val) {
   endpoint = val;
 }
