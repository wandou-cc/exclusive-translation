const Core = require('@alicloud/pop-core');
const vscode = require('vscode');

async function aliApi(text,to) {
    let accessKeyId = vscode.workspace.getConfiguration().get('exclusive-translation.aliAccessKeyId');
    let accessKeySecret = vscode.workspace.getConfiguration().get('exclusive-translation.aliAccessKeySecret');
    var client = new Core({
        accessKeyId,
        accessKeySecret,
        endpoint: 'https://mt.aliyuncs.com',
        apiVersion: '2018-10-12'
    });
    var params = {
        "FormatType": "text",
        "SourceLanguage": 'auto',
        "TargetLanguage": to,
        "SourceText": text
    }

    var requestOption = {
        method: 'POST'
    };

    return client.request('TranslateGeneral', params, requestOption).then((result) => {
        if(result.Code === '200') {
            return [text,result.Data.Translated,[]]
        }else {
            return {error_code:'accessKeyId/accessKeySecret错误'}
        }
    }, (ex) => {
        return {error_code:ex}
    })
}
module.exports.aliApi = aliApi
