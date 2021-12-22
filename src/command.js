const vscode = require('vscode');
const { googleApi }  = require('./api/google')
const { baiduApi } = require('./api/baidu')
const { aliApi } = require('./api/ali')
const { wangyiApi } = require("./api/wangyi")
const { getSelectText, isChinese, isUpperCase, sortFieldMatch } = require('./utils/utils')
const maxName = 10;
// 创建bar
var bar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
bar.show();
let source,englishLanguage,exceptEnglishLanguage,hump,keyWord

function show (resultArr,type) {
    let oldvalue
    let [name,value,more] = resultArr
    name = name.replaceAll('\n','')
    oldvalue = value = value.replaceAll('\n','')
    let nameSlice = name.length >= maxName ? name.slice(0,maxName) + '...' : name
    let valueSlice = value.length >= maxName ? value.slice(0,maxName) + '...' : value
    let isAutoCopy = vscode.workspace.getConfiguration().get('exclusive-translation.isAutoCopy')
    isAutoCopy && vscode.env.clipboard.writeText(value)
    value = isAutoCopy ? value + ' (已复制)' : value
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
    if(type === 'replace') {
        let editor = vscode.window.activeTextEditor;
        editor.selections.forEach((item) => {
            editor.edit(editBuilder => {
                editBuilder.replace(item, oldvalue);
            })
        })
    }
}

async function main(type) {
    source = vscode.workspace.getConfiguration().get('exclusive-translation.translationEngine');
    englishLanguage = vscode.workspace.getConfiguration().get('exclusive-translation.englishLanguage');
    exceptEnglishLanguage = vscode.workspace.getConfiguration().get('exclusive-translation.exceptEnglishLanguage');
    hump = vscode.workspace.getConfiguration().get('exclusive-translation.isHump')
    keyWord = getSelectText();
    if(!keyWord) return
    if(keyWord.length >= 200) {
        vscode.window.showWarningMessage('为确保翻译准确请不要超过200字符') 
        return
    }
    if(hump) {
        if(!isUpperCase(keyWord)) {
            keyWord = sortFieldMatch(keyWord)
        }
    }
    if(englishLanguage === '') {
        englishLanguage = 'zh'
        vscode.window.showWarningMessage('未配置English Language 默认置为zh');
        let Configure = vscode.workspace.getConfiguration('exclusive-translation');
        Configure.update('englishLanguage','zh',true);
    }
    if(exceptEnglishLanguage === '') {
        exceptEnglishLanguage = 'en'
        vscode.window.showWarningMessage('未配置Except English Language 默认置为en');
        let Configure = vscode.workspace.getConfiguration('exclusive-translation');
        Configure.update('exceptEnglishLanguage','en',true);
    }

    if(isChinese(keyWord)) {
        englishLanguage = exceptEnglishLanguage
    }


    bar.text = `$(rocket) 请稍后...`
    let result = '';
    if(source === 'Google') {
     result = await googleApi(keyWord, englishLanguage)
    } else if(source === '百度'){
        result = await baiduApi(keyWord, englishLanguage)
    }else if(source === '阿里巴巴') {
        result = await aliApi(keyWord, englishLanguage)
    } else if(source === '网易有道') {
        result = await wangyiApi(keyWord, englishLanguage)
    }

    if(!Array.isArray(result)) {
        vscode.window.showErrorMessage(`error_code:${result.error_code}`, '去提Issues').then(result => {
            if (result === '去提Issues') {
                vscode.env.openExternal(vscode.Uri.parse(`https://github.com/wandou-cc/exclusive-translation/issues`))
            }
        });
        bar.text = `error:${result.error_code}`
    } else {
        show(result,type)
    }
}

let keyTranslate = vscode.commands.registerCommand('exclusive-translation.translation',function () {
    main('translation')
});

let replaceTranslate = vscode.commands.registerCommand('exclusive-translation.replace',function () {
    main('replace')
})


module.exports = {
    keyTranslate,
    replaceTranslate
}