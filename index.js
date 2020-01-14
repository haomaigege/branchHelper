#!/usr/bin/env node
const execSync = require('child_process').execSync;
const program = require('commander'); // 命令参数处理
program.parse(process.argv);
let branchName = process.argv[2];
if (!branchName) {
    console.log('请输入版本号')
} else if (!(/\d+(-)\d+(-)\d{4,}/).test(branchName)){
    console.log('请输入正确版本号')
} else {
    let str = '';
    try {
        str = execSync('git branch -a', {encoding: 'utf8'});
        if(str.includes('_' + branchName + '_')) {
            console.log('已存在同名分支，请删除相应分支或重新定义版本号')
        } else {
            execSync('git checkout origin/master', {encoding: 'utf8'});
            execSync('git checkout -b DEV_' + branchName + '_BR', {encoding: 'utf8'});
            execSync('git push --set-upstream origin DEV_' + branchName + '_BR', {encoding: 'utf8'});
            execSync('git checkout -b TEST_' + branchName + '_BR', {encoding: 'utf8'});
            execSync('git push --set-upstream origin TEST_' + branchName + '_BR', {encoding: 'utf8'});
            execSync('git checkout -b PRE_' + branchName + '_BR', {encoding: 'utf8'});
            execSync('git push --set-upstream origin PRE_' + branchName + '_BR', {encoding: 'utf8'});
        }
    } catch (err) {
        console.log('execute error：');
        console.log(err.toString());
    }
}

