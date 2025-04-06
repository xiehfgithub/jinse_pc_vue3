/*
 * @Author: Flandy
 * @Date: 2025-04-05 19:56:42
 * @Description: 命令生成模版文件
 */
const { execSync } = require("child_process");
const nodeVersion = process.version;
const npmVersion = execSync("npm -v").toString().trim();
console.log(`🟢 Node 版本: ${nodeVersion}`);
console.log(`📦 NPM 版本: ${npmVersion}`);



const fs = require("fs");
const path = require("path");
const util = require("util");
const inquirer = require("inquirer");

const copyFile = util.promisify(fs.copyFile);
const mkdir = util.promisify(fs.mkdir);
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const renameFile = util.promisify(fs.rename);

// const args = process.argv.slice(2);
// console.log('命令行参数:', args);

let fileName = "abc";
const parentFolder = "./"; // 父级主文件夹, 新建目录存放地址 自行修改

async function createTemplateFolder(sourceDir, destDir, keywords) {
  await mkdir(destDir);
  const files = await readdir(path.join(sourceDir, ""));
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    console.log("生成模板", destPath);
    await copyFile(sourcePath, destPath);
    let content = await readFile(destPath, "utf8");
    for (const [keyword, replacement] of Object.entries(keywords)) {
      content = content.replace(new RegExp(keyword, "g"), replacement);
    }
    await writeFile(destPath, content, "utf8");

    const oldPath = destPath;
    const newPath = oldPath.replace(new RegExp("TemplateComponent", "g"), fileName);
    console.log("替换模板", newPath);
    await renameFile(oldPath, newPath);
  }
}

// 读取输入新建组件名称并新建
const question = [
  {
    name: "name",
    type: "input",
    message: "请输入新建组件名称「首字母大写」",
    validate(val) {
      if (val === "") {
        return "Name is required!";
      } else {
        return true;
      }
    },
  },
];
const prompt = inquirer.createPromptModule();
prompt(question).then(answers => {
  fileName = answers.name;
  console.log(fileName);
  // 使用示例
  const sourceDir = "./src/components/TemplateComponent";
  const destDir = path.join("./src/components/", parentFolder, fileName);
  const keywords = {
    "TemplateComponent": fileName,
  };

  createTemplateFolder(sourceDir, destDir, keywords).then(() => {
    console.log(`Template folder created and keywords[" ${fileName}} "] replaced.`);
    console.log(`新组件文件夹${fileName}创建完成: `, destDir);
  }).catch(error => {
    console.error("Error creating template folder:", error);
  });

});
