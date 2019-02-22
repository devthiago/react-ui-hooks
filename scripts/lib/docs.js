const fs = require('fs');
const documentation = require('documentation');
const {
  hookDir,
  docContentBreakPoint,
  boilerplateFile,
  createHookRefs,
  getHookInfo,
  isValidFile,
  replaceBoilerplateVariables
} = require('./helpers.js');

const editMarkdownFile = (file, content = '') => {
  let output = '';
  if (!fs.existsSync(file.md)) {
    console.log('\x1b[35m%s\x1b[0m', `✏️  Creating doc file for ${file.name} hook...`);
    const boilerplate = fs.readFileSync(boilerplateFile('useHook.md'), 'utf8');
    output = replaceBoilerplateVariables(boilerplate, getHookInfo(file));
  } else {
    console.log('\x1b[35m%s\x1b[0m', `✏️  Editing ${file.name} hook doc file...`);
    const current = fs.readFileSync(file.md, 'utf8');
    output = current.split(docContentBreakPoint)[0];
  }
  const newContent = `${output}${content}`;
  fs.writeFileSync(file.md, newContent);
  console.log('\x1b[32m%s\x1b[0m', `✅ DONE! ${file.md}`);
  return newContent;
};

const generateDoc = file => documentation.build([file.js], { shallow: false })
  .then(documentation.formats.md)
  .then(output => editMarkdownFile(file, output));

const exec = (filename = null) => {
  if (filename) {
    const file = createHookRefs(filename);
    if (isValidFile(filename) && fs.existsSync(file.js)) {
      generateDoc(file);
    } else {
      console.error('\x1b[31m%s\x1b[0m', `🚫 ${filename} doesn't exist in ${hookDir}`);
    }
  } else {
    console.log('\x1b[33m%s\x1b[0m', `🔍 Looking for React hooks in ${hookDir}...`);
    fs.readdir(hookDir, (err, files) => {
      const hooks = files.reduce((acc, cur) => {
        if (isValidFile(cur)) {
          acc.push(createHookRefs(cur));
        }
        return acc;
      }, []);

      if (hooks.length > 0) {
        hooks.forEach(generateDoc);
      }
    });
  }
};

module.exports = exec;
