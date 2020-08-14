const fs = require('fs-extra')

const FILE_PATH_PART = "/data/content/shared/upload/managed_cache/MYSQL/orm_b_user_auth_action.~"

let count = 25741
let notExitFile = 0;
let notExitFileGlobal = 0;
let removedFiles = 0;

var startRm = function () {
  const rmFilePath = FILE_PATH_PART + count

  if (fs.existsSync(rmFilePath)) {
    fs.remove(rmFilePath, function (err) {
      if (err) return console.error(err)
      ++removedFiles
      console.clear()
      console.log('count', count)
      console.log('removed files', removedFiles)
      console.log('not exit global', notExitFileGlobal)
      notExitFile = 0
      ++count
      setTimeout(function() {
        startRm()
      }, 10)
    })
  } else {
    ++count
    ++notExitFile
    ++notExitFileGlobal
    if (notExitFile > 100) {
      process.exit(0);
    } else {
      console.clear()
      console.log('count', count)
      console.log('removed files', removedFiles)
      console.log('not exit global', notExitFileGlobal)
      console.log('not exit cuurent', notExitFile)
      setTimeout(function() {
        startRm()
      }, 10)
    }
  }
}

startRm()