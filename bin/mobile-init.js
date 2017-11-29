#!/usr/bin/env node

const program = require('commander')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const fs = require('fs')
const ora = require('ora')

const fsExistsSync = require('../utils/utils').fsExistsSync
const cleanFolder = require('../utils/utils').cleanFolder

program
  .usage('<project-name>')
  .parse(process.argv)

// help
program.on('--help', () => {
  console.log('  Examples:')
  console.log()
  console.log('    # create a new project with an official template')
  console.log('    $ mobile init my-project')
  console.log()
})
// help end

// start work stream
if (program.args.length < 1) {
  program.help()
}

const projectPath = './' + program.args[0]
if (!fsExistsSync(projectPath)) {
  fs.mkdirSync(projectPath)
  init(projectPath)
} else {
  inquirer.prompt([{
    type: 'confirm',
    message: 'The target is exist, it will be empty, continue?',
    name: 'ok'
  }]).then(answers => {
    if (answers.ok) {
      cleanFolder(projectPath)
      init(projectPath)
    } else {
      program.help()
    }
  }).catch(res => {
    console.log(res)
    program.help()
  })
}


// init project
function init (path) {
  const spinner = ora('downloading template')
  spinner.start()
  download('fisher-zh/mb-template-pc', path, function(err) {
    spinner.stop()
    if (err) {
      console.log(err)
      return
    }
    console.log('download complate, You can:')
    console.log('cd ' + path)
    console.log('$npm install')
    console.log('')
    console.log('$npm run dev')
  })
}
