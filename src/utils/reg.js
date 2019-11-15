module.exports = {
  regChina:(val)=>{
    let newVal = val.replace(/[^\u4E00-\u9FA5]/g, '')
    return newVal
  }
}