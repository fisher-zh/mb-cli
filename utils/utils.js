const fs = require('fs')

// 同步检查文件
function fsExistsSync(path) {
  try{
    fs.accessSync(path,fs.F_OK);
  }catch(e){
    return false
  }
  return true
}

// 同步清空文件夹
function cleanFolder(path) {
  const dirList = fs.readdirSync(path)
  dirList.forEach(function (fileName) {
    const curPath = path + '/' + fileName
    if(fs.statSync(curPath).isDirectory()) {
      // recurse  
      cleanFolder(curPath);  
    } else {
      // delete file  
      fs.unlinkSync(curPath)
    }
  })
}

module.exports = {
  fsExistsSync,
  cleanFolder
}
