const got = require('got')
const { extract,converToUrl } = require('../utils/utils')

let baseUrl = 'https://translate.google.cn/'

function decrypt(keyword,englishLanguage) {
    return got(baseUrl).then(res => {
        let a = new Date;
        let pA = 3600 * a.getHours() + 60 * a.getMinutes() + a.getSeconds();
        let Ab = 1 + pA;
        let WIZ_global_data = {
            'rpcids': 'MkEWBc',
            'f.sid': extract('FdrFJe', res),
            'bl': extract('cfb2h', res),
            'hl': 'zh-CN',
            'soc-app': 1,
            'soc-platform': 1,
            'soc-device': 1,
            '_reqid': Ab,
            'rt': 'c'
       }
       return WIZ_global_data
    }).then((WIZ_global_data)=>{
       return googleTranslate(WIZ_global_data,keyword,englishLanguage).then(res=>{
            return res
        }).catch(() => {
            return { error_code:'400' }
        })
    })
}

function googleTranslate(WIZ_global_data,keyword,englishLanguage){
    let url = baseUrl + '_/TranslateWebserverUi/data/batchexecute?' + converToUrl(WIZ_global_data)
    let options = {
        headers:{
            'content-type':'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body :'f.req=' + encodeURIComponent(JSON.stringify([[[WIZ_global_data.rpcids, JSON.stringify([[keyword, 'auto', englishLanguage, true], [null]]), null, 'generic']]]))
    }
    return got.post(url,options).then(res => {
        let resultArr = JSON.parse(res.body.slice(6).split(',"generic"')[0].replace(/(^\w*|\s*)/,'') + ']]')[0]
        let result = JSON.parse(resultArr[2])
        let value = '',name = '';
        let more = [];
        result[1][0][0][5].forEach(item=>{
            value += item[0];
            item[4] && item[4].forEach(moreItem=>{
                let s = ''
                s += moreItem[0]
                more.push(s)
            })
        })
        name = result[1][4][0].replaceAll('\n','');
        return [name,value,more]
        /*  
            result[0]:拼音
            result[1]:翻译
                [0]:数组 翻译内容
                    [0]: 翻译内容
                            [1]:拼音
                            [5]:数组  换行 分割多个 数组
                                [i]:结果
                                    [0]:第一个结果
                                    [4]:其他结果
                                        [0]:结果
                [4]:源翻译内容
        */
    }).catch(() => {
        return { error_code:'400' }
    })
}

function googleApi(keyword,englishLanguage) {
   return decrypt(keyword,englishLanguage).then(res=>{
       return res
   })
}

module.exports.googleApi = googleApi
