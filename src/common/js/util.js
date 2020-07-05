

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//格式化时间
const formatTime = date => {
  if (date===null){
    return date;
  }
  if (typeof date === "number") {
    date = new Date(date);
  }
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}
//格式化日期
const formatDate=(date,joinicon='-')=>{
  if (date == null) {
    return date;
  }
  if (typeof date == "number") {
    date = new Date(date);
  }
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join(joinicon);
}


module.exports = {
  formatTime,
  formatDate,
  formatNumber
}
