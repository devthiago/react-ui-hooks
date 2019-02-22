const fs = require('fs');
const {
  boilerplateFile,
  createHookRefs,
  getHookInfo,
  isValidFile,
  replaceBoilerplateVariables
} = require('./helpers.js');

const generateTest = file => {
  if (fs.existsSync(file.test)) {
    console.error('\x1b[33m%s\x1b[0m', `⚠️  ${file.test} already exists`);
    return null;
  } else {
    console.log('\x1b[35m%s\x1b[0m', `✏️  Creating JavaScript test file for ${file.name} hook...`);
    const boilerplate = fs.readFileSync(boilerplateFile('useHook.test.js'), 'utf8');
    const content = replaceBoilerplateVariables(boilerplate, getHookInfo(file));
    fs.writeFileSync(file.test, content);
    console.log('\x1b[32m%s\x1b[0m', `✅ DONE! ${file.test}`);
    return content;
  }
};

const exec = (filename = null) => {
  if (filename) {
    const file = createHookRefs(filename);
    if (isValidFile(filename) && fs.existsSync(file.js)) {
      generateTest(file);
    } else {
      console.error('\x1b[31m%s\x1b[0m', `🚫 ${filename} doesn't exist in ${hookDir}`);
    }
  } else {
    console.log('\x1b[33m%s\x1b[0m', `⚠️  You have to say the desired hook name.`);
  }
};

module.exports = exec;
