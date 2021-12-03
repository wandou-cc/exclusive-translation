const vscode = require('vscode');
const md5 = require('js-md5');

// 获取选中的文字
function getSelectText() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return '';
    }
    let selection = editor.selection;
    return editor.document.getText(selection);
}

// 判断是不是包含中文
function isChinese(string){
    let state = false
    state = escape(string).indexOf( "%u" ) <0 ? false : true;
    return state
}

// 生成百度翻译需要的sign
function getBaiduSign(value) {
    let sign = md5(value);
    return sign
}

// 获取google参数
function extract(key, res) {
    var re = new RegExp(`"${key}":".*?"`);
    var result = re.exec(res.body);
    if (result !== null) {
        return result[0].replace(`"${key}":"`, '').slice(0, -1);
    }
    return '';
}

// 数组转url
function converToUrl(requestParams) {
    let params = [];
    Object.entries(requestParams).forEach(([key, value]) => {
        let param = key + '=' + value;
        params.push(param);
    });
    return params.join('&');
}

module.exports = {
    getSelectText,
    isChinese,
    getBaiduSign,
    extract,
    converToUrl
}