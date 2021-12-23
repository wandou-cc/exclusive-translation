// @ts-nocheck
const vscode = require('vscode');
const qs = require('qs');
const { getBaiduSign } = require('../utils/utils')
const axios = require('axios')
const { getLanguage } = require("../i18n/index")
const language = getLanguage()

async function sendRequire(method, url, data, headers) {
    let res = await axios({ headers, method, url, data: qs.stringify(data) })
    if (res.status === 200) {
        return res.data
    } else {
        vscode.window.showErrorMessage(`${language.BError}`);
        return 
    }
}

async function baiduApi(text, to) {
    let baiduAppid = vscode.workspace.getConfiguration().get('exclusive-translation.baiduAppid');
    let baiduPassword = vscode.workspace.getConfiguration().get('exclusive-translation.baiduPassword');
    if(baiduAppid==='' || baiduPassword==='') {
        return {error_code:`${language.Bconfiguration}`}
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
        return {error_code:res.error_code}
    }
    let s = res.trans_result[0]
    return [s.src,s.dst,[]]
}

module.exports.baiduApi = baiduApi
