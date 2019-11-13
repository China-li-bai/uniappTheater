const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

module.exports = {
  formatTime: formatTime
};
class util {
  //转换json格式
  conJson(jsonString) {
    return JSON.parse(JSON.stringify(jsonString));
  } //验证手机号码/电话号码/邮箱

  isTel(a) {
    return /^(\d3,4|\d{3,4}-)?\d{7,8}$/.test(a);
  }

  isMobile(a) {
    return /^[1][0-9]{10}$/.test(a);
  }

  isEmail(a) {
    return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
      a
    );
  }
}

module.exports = {
  utils: util
};
