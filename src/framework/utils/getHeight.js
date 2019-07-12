//获取窗口可视化高度
export function getClientHeight() {
  let clientHeight = 0;
  if(document.body.clientHeight && document.documentElement.clientHeight) {
     clientHeight = document.body.clientHeight < document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight;
  } else {
    clientHeight = document.body.clientHeight > document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight;
  }
  return clientHeight;
};

//获取滚动条高度
export function getScrollTop() {
  let scrollTop = 0;
  if(document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if(document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
};

//获取文档内容实际高度
export function getScrollHeight() {
  return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
};
