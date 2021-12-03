// @ts-nocheck
const vscode = require('vscode');
const qs = require('qs');
const { getBaiduSign } = require('../utils/utils')
const axios = require('axios')

async function sendRequire(method, url, data, headers) {
    let res = await axios({ headers, method, url, data: qs.stringify(data) })
    if (res.status === 200) {
        return res.data
    } else {
        vscode.window.showErrorMessage('出错请重新尝试');
        return
    }
}

async function baiduApi(text, to) {
    let baiduAppid = vscode.workspace.getConfiguration().get('exclusive-translation.baiduAppid');
    let baiduPassword = vscode.workspace.getConfiguration().get('exclusive-translation.baiduPassword');
    if(baiduAppid==='' || baiduPassword==='') {
        vscode.window.showErrorMessage('未配置Appid或密钥') 
        return
    }
    let baseUrl = 'http://api.fanyi.baidu.com/api/trans/vip/translate';
    let salt = 56985425
    let signString = getBaiduSign(baiduAppid + text + salt + baiduPassword);
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    let params = {
        q: text,
        from: 'auto',
        to,
        appid:baiduAppid,
        salt,
        sign: signString
    };
    let res = await sendRequire('post', baseUrl, params, headers)
    if(res.error_code) {
        vscode.window.showErrorMessage(`error_code:${res.error_code}`, '查看错误原因').then(result => {
            if (result === '查看错误原因') {
                vscode.env.openExternal(vscode.Uri.parse(`http://api.fanyi.baidu.com/doc/21`))
            }
        });
        return
    }
    let s = res.trans_result[0]
    return [s.src,s.dst,[]]
}


module.exports.baiduApi = baiduApi
