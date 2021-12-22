// @ts-nocheck
const got = require('got');
const { converToUrl } = require("../utils/utils")
var n = function (e, t) { return e << t | e >>> 32 - t },
    r = function (e, t) {
        var n, r, i, o, a;
        return i = 2147483648 & e,
            o = 2147483648 & t,
            n = 1073741824 & e,
            r = 1073741824 & t,
            a = (1073741823 & e) + (1073741823 & t),
            n & r ? 2147483648 ^ a ^ i ^ o : n | r ? 1073741824 & a ? 3221225472 ^ a ^ i ^ o : 1073741824 ^ a ^ i ^ o : a ^ i ^ o
    },
    i = function (e, t, n) {
        return e & t | ~e & n
    },
    o = function (e, t, n) {
        return e & n | t & ~n
    },
    a = function (e, t, n) {
        return e ^ t ^ n
    }
    , s = function (e, t, n) {
        return t ^ (e | ~n)
    }
    , l = function (e, t, o, a, s, l, c) {
        return e = r(e, r(r(i(t, o, a), s), c)),
            r(n(e, l), t)
    }
    , c = function (e, t, i, a, s, l, c) {
        return e = r(e, r(r(o(t, i, a), s), c)),
            r(n(e, l), t)
    }
    , u = function (e, t, i, o, s, l, c) {
        return e = r(e, r(r(a(t, i, o), s), c)),
            r(n(e, l), t)
    }
    , d = function (e, t, i, o, a, l, c) {
        return e = r(e, r(r(s(t, i, o), a), c)),
            r(n(e, l), t)
    }
    , f = function (e) {
        for (var t, n = e.length, r = n + 8, i = 16 * ((r - r % 64) / 64 + 1), o = Array(i - 1), a = 0, s = 0; s < n;)
            a = s % 4 * 8,
                o[t = (s - s % 4) / 4] = o[t] | e.charCodeAt(s) << a,
                s++;
        return t = (s - s % 4) / 4,
            a = s % 4 * 8,
            o[t] = o[t] | 128 << a,
            o[i - 2] = n << 3,
            o[i - 1] = n >>> 29,
            o
    }
    , p = function (e) {
        var t, n = "", r = "";
        for (t = 0; t <= 3; t++)
            n += (r = "0" + (e >>> 8 * t & 255).toString(16)).substr(r.length - 2, 2);
        return n
    }
    , h = function (e) {
        e = e.replace(/\x0d\x0a/g, "\n");
        for (var t = "", n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128)
                t += String.fromCharCode(r);
            else if (r > 127 && r < 2048)
                t += String.fromCharCode(r >> 6 | 192),
                    t += String.fromCharCode(63 & r | 128);
            else if (r >= 55296 && r <= 56319) {
                if (n + 1 < e.length) {
                    var i = e.charCodeAt(n + 1);
                    if (i >= 56320 && i <= 57343) {
                        var o = 1024 * (r - 55296) + (i - 56320) + 65536;
                        t += String.fromCharCode(240 | o >> 18 & 7),
                            t += String.fromCharCode(128 | o >> 12 & 63),
                            t += String.fromCharCode(128 | o >> 6 & 63),
                            t += String.fromCharCode(128 | 63 & o),
                            n++
                    }
                }
            } else
                t += String.fromCharCode(r >> 12 | 224),
                    t += String.fromCharCode(r >> 6 & 63 | 128),
                    t += String.fromCharCode(63 & r | 128)
        }
        return t
    }

function md5(e) {
    var t, n, i, o, a, s, m, g, v, y = Array();
    for (e = h(e),
        y = f(e),
        s = 1732584193,
        m = 4023233417,
        g = 2562383102,
        v = 271733878,
        t = 0; t < y.length; t += 16)
        n = s,
            i = m,
            o = g,
            a = v,
            s = l(s, m, g, v, y[t + 0], 7, 3614090360),
            v = l(v, s, m, g, y[t + 1], 12, 3905402710),
            g = l(g, v, s, m, y[t + 2], 17, 606105819),
            m = l(m, g, v, s, y[t + 3], 22, 3250441966),
            s = l(s, m, g, v, y[t + 4], 7, 4118548399),
            v = l(v, s, m, g, y[t + 5], 12, 1200080426),
            g = l(g, v, s, m, y[t + 6], 17, 2821735955),
            m = l(m, g, v, s, y[t + 7], 22, 4249261313),
            s = l(s, m, g, v, y[t + 8], 7, 1770035416),
            v = l(v, s, m, g, y[t + 9], 12, 2336552879),
            g = l(g, v, s, m, y[t + 10], 17, 4294925233),
            m = l(m, g, v, s, y[t + 11], 22, 2304563134),
            s = l(s, m, g, v, y[t + 12], 7, 1804603682),
            v = l(v, s, m, g, y[t + 13], 12, 4254626195),
            g = l(g, v, s, m, y[t + 14], 17, 2792965006),
            m = l(m, g, v, s, y[t + 15], 22, 1236535329),
            s = c(s, m, g, v, y[t + 1], 5, 4129170786),
            v = c(v, s, m, g, y[t + 6], 9, 3225465664),
            g = c(g, v, s, m, y[t + 11], 14, 643717713),
            m = c(m, g, v, s, y[t + 0], 20, 3921069994),
            s = c(s, m, g, v, y[t + 5], 5, 3593408605),
            v = c(v, s, m, g, y[t + 10], 9, 38016083),
            g = c(g, v, s, m, y[t + 15], 14, 3634488961),
            m = c(m, g, v, s, y[t + 4], 20, 3889429448),
            s = c(s, m, g, v, y[t + 9], 5, 568446438),
            v = c(v, s, m, g, y[t + 14], 9, 3275163606),
            g = c(g, v, s, m, y[t + 3], 14, 4107603335),
            m = c(m, g, v, s, y[t + 8], 20, 1163531501),
            s = c(s, m, g, v, y[t + 13], 5, 2850285829),
            v = c(v, s, m, g, y[t + 2], 9, 4243563512),
            g = c(g, v, s, m, y[t + 7], 14, 1735328473),
            m = c(m, g, v, s, y[t + 12], 20, 2368359562),
            s = u(s, m, g, v, y[t + 5], 4, 4294588738),
            v = u(v, s, m, g, y[t + 8], 11, 2272392833),
            g = u(g, v, s, m, y[t + 11], 16, 1839030562),
            m = u(m, g, v, s, y[t + 14], 23, 4259657740),
            s = u(s, m, g, v, y[t + 1], 4, 2763975236),
            v = u(v, s, m, g, y[t + 4], 11, 1272893353),
            g = u(g, v, s, m, y[t + 7], 16, 4139469664),
            m = u(m, g, v, s, y[t + 10], 23, 3200236656),
            s = u(s, m, g, v, y[t + 13], 4, 681279174),
            v = u(v, s, m, g, y[t + 0], 11, 3936430074),
            g = u(g, v, s, m, y[t + 3], 16, 3572445317),
            m = u(m, g, v, s, y[t + 6], 23, 76029189),
            s = u(s, m, g, v, y[t + 9], 4, 3654602809),
            v = u(v, s, m, g, y[t + 12], 11, 3873151461),
            g = u(g, v, s, m, y[t + 15], 16, 530742520),
            m = u(m, g, v, s, y[t + 2], 23, 3299628645),
            s = d(s, m, g, v, y[t + 0], 6, 4096336452),
            v = d(v, s, m, g, y[t + 7], 10, 1126891415),
            g = d(g, v, s, m, y[t + 14], 15, 2878612391),
            m = d(m, g, v, s, y[t + 5], 21, 4237533241),
            s = d(s, m, g, v, y[t + 12], 6, 1700485571),
            v = d(v, s, m, g, y[t + 3], 10, 2399980690),
            g = d(g, v, s, m, y[t + 10], 15, 4293915773),
            m = d(m, g, v, s, y[t + 1], 21, 2240044497),
            s = d(s, m, g, v, y[t + 8], 6, 1873313359),
            v = d(v, s, m, g, y[t + 15], 10, 4264355552),
            g = d(g, v, s, m, y[t + 6], 15, 2734768916),
            m = d(m, g, v, s, y[t + 13], 21, 1309151649),
            s = d(s, m, g, v, y[t + 4], 6, 4149444226),
            v = d(v, s, m, g, y[t + 11], 10, 3174756917),
            g = d(g, v, s, m, y[t + 2], 15, 718787259),
            m = d(m, g, v, s, y[t + 9], 21, 3951481745),
            s = r(s, n),
            m = r(m, i),
            g = r(g, o),
            v = r(v, a);
    return (p(s) + p(m) + p(g) + p(v)).toLowerCase()
}

function initQuery (text, to) {
    var r = "" + (new Date).getTime()
    , i = r + parseInt(10 * Math.random(), 10);

  return {
      'i': encodeURIComponent(text),
      'from': 'AUTO',
      'to': to,
      'smartresult': 'dict',
      'client': 'fanyideskweb',
      'lts': r,
      'bv': "719a5d636d2b5983088003dccfe2e2c8",
      'salt': i,
      'sign': md5("fanyideskweb" + text + i + "Y2FYu%TNSbMCxc3t2u^XT"),
      'doctype': 'json',
      'version': '2.1',
      'keyfrom': 'fanyi.web',
      'action': 'FY_BY_CLICKBUTTION',
  }
}

function wangyiApi(text, to) {
    var query = initQuery(text, to);
    let headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36',
            'Referer': 'https://fanyi.youdao.com/?keyfrom=fanyi-new.logo',
            'Host': 'fanyi.youdao.com',
            'Origin': 'https://fanyi.youdao.com',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Cookie': `OUTFOX_SEARCH_USER_ID=1296163371@39.155.255.202; JSESSIONID=aaaTtN8Ni_IPM_Ar8Zt2x; OUTFOX_SEARCH_USER_ID_NCOO=77298182.48721957; UM_distinctid=17d9430f1bf1e8-0db4a55c189649-162d1e0a-1fa400-17d9430f1c06d8; ___rl__test__cookies=${new Date().valueOf()}`
    }
    let url = 'https://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule'

    let options = {
        headers,
        body:converToUrl(query)
    }
    return got.post(url,options).then(res=> {
        let result = JSON.parse(res.body)
        if(result.errorCode === 0) {
            let name = '' ,value = '' ,more = [];
            result.translateResult.forEach(item => {
                name += item[0].src + ' '
                value += item[0].tgt + ' '
            })
            if(result.smartResult) {
                result.smartResult.entries.forEach(item => {
                    if(item !== '') {
                        more.push(item.replace(/(\r|\n)$/,''))
                    }
                })
            }
            return [name,value,more]
        } else {
            return {error_code:result.errorCode}
        }
    })
}


module.exports.wangyiApi = wangyiApi