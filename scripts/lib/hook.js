const fs = require('fs');
const generateDoc = require('./docs.js');
const generateTest = require('./test.js');
const {
  boilerplateFile,
  createHookRefs,
  getHookInfo,
  isValidFile,
  replaceBoilerplateVariables
} = require('./helpers.js');

const generateHook = file => {
  if (fs.existsSync(file.js)) {
    console.error('\x1b[33m%s\x1b[0m', `⚠️  ${file.name}.js already exists`);
    return null;
  } else {
    console.log('\x1b[35m%s\x1b[0m', `✏️  Creating JavaScript file for ${file.name} hook...`);
    const boilerplate = fs.readFileSync(boilerplateFile('useHook.js'), 'utf8');
    const content = replaceBoilerplateVariables(boilerplate, getHookInfo(file));
    fs.writeFileSync(file.js, content);
    console.log('\x1b[32m%s\x1b[0m', `✅ DONE! ${file.js}`);
    return content;
  }
};

const exec = (filename = null) => {
  if (filename) {
    const jsFile = `${filename}.js`;
    if (isValidFile(jsFile)) {
      const file = createHookRefs(jsFile);
      if (generateHook(file)) {
        generateTest(jsFile);
        generateDoc(jsFile);
      }
    } else {
      console.error('\x1b[31m%s\x1b[0m', `🚫 ${filename} isn't a valid hook name`);
    }
  } else {
    console.log('\x1b[33m%s\x1b[0m', `⚠️  You have to say the desired hook name.`);
  }
};

module.exports = exec;
