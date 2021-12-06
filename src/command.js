const vscode = require('vscode');
const { googleApi }  = require('./api/google')
const { baiduApi } = require('./api/baidu')
const { aliApi } = require('./api/ali')
const { getSelectText,isChinese } = require('./utils/utils')
const maxName = 10;
// 创建bar
var bar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
bar.show();

function show (resultArr) {
    let [name,value,more] = resultArr
    name = name.replaceAll('\n','')
    value = value.replaceAll('\n','')
    let nameSlice = name.length >= maxName ? name.slice(0,maxName) + '...' : name
    let valueSlice = value.length >= maxName ? value.slice(0,maxName) + '...' : value
    let isAutoCopy = vscode.workspace.getConfiguration().get('exclusive-translation.isAutoCopy')
    isAutoCopy === '是' && vscode.env.clipboard.writeText(value)
    value = isAutoCopy === '是' ? value + ' (已复制)' : value
    // 等于0 和 等于1 的时候是 没有 还有 本身 的情况
    if(more.length === 0 || more.length === 1) {
        vscode.window.showInformationMessage(`${nameSlice} : ${value}`)
    } else {
        vscode.window.showInformationMessage(`${nameSlice} : ${value}`, '查看更多').then(result => {
            if (result === '查看更多') {
                vscode.window.showQuickPick(more,{
                        ignoreFocusOut: true,
                        matchOnDescription: true,
                        matchOnDetail: true,
                        placeHolder: '其他翻译-点击复制'
                    }).then(function (msg) {
                        vscode.env.clipboard.writeText(msg)
                })
            }
        });
    }
    bar.text = nameSlice + ' : ' + valueSlice
    bar.tooltip = name + ' : ' + value
}

let keyTranslate = vscode.commands.registerCommand('exclusive-translation.key',async function () {
    
    let source = vscode.workspace.getConfiguration().get('exclusive-translation.source');
    let englishLanguage = vscode.workspace.getConfiguration().get('exclusive-translation.englishLanguage');
    let exceptEnglishLanguage = vscode.workspace.getConfiguration().get('exclusive-translation.exceptEnglishLanguage');

    let keyWord = getSelectText();
    if(!keyWord) return
    if(keyWord.length >= 200) {
        vscode.window.showWarningMessage('为确保翻译准确请不要超过200字符') 
        return
    }
  
    if(isChinese(keyWord)) {
        englishLanguage = exceptEnglishLanguage
    }
    bar.text = `$(rocket) 请稍后...`
    if(source === 'google') {
      googleApi(keyWord, englishLanguage).then((res)=>{
        show(res)
      })
    } else if(source === 'baidu'){
        baiduApi(keyWord, englishLanguage).then((res)=>{
            show(res)
        }).catch(()=>{
            bar.text = '百度翻译失败请重试'
        })
    }else if(source === 'ali') {
        aliApi(keyWord, englishLanguage).then((res)=>{
            show(res)
        }).catch(()=>{
            vscode.window.showErrorMessage('accessKeyId/accessKeySecret错误')
            bar.text = 'accessKeyId/accessKeySecret错误'
        })
    }
});


module.exports = {
    keyTranslate
}