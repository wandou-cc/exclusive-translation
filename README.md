简体中文说明  / [English Readme](README.en.md)

# Exclusive Translation

![教程](./asserts/Tutorial.gif)

1. 默认基于 [Google 翻译](https://translate.google.cn)逆向开发，支持多语言输入 输出,直接使用即可
2. 支持百度开发者接入需要 在配置项 `Baidu Appid` 以及 `Baidu Password` 中配置 appid 以及 密钥

[百度翻译官网直达](https://api.fanyi.baidu.com/product/11)

![百度配置](./asserts/baiduconfig.png)
![百度配置](./asserts/baiduwebsite.png)

3. 支持阿里开发者接入需要 在配置项 `Ali Access Key ID` 以及 `Ali Access Key Secret` 中配置 aid 以及 key

[ali官网直达](https://www.aliyun.com/product/ai/alimt?spm=5176.21213303.8115314850.4.6bbf3edaYx4bLO&scm=20140722.S_card@@%E5%8D%A1%E7%89%87@@1954._.ID_card@@%E5%8D%A1%E7%89%87@@1954-RL_%E6%9C%BA%E5%99%A8%E7%BF%BB%E8%AF%91-OR_ser-V_2-P0_0)

![阿里巴巴配置](./asserts/aliconfig.png)
![阿里巴巴配置](./asserts/aliwebsite.png)

`百度`跟 `阿里` 需要配置 但是 只有你自己能用 更稳定 虽然麻烦了一点 可以找我帮忙

`google`是不需要任何配置的 直接选中后 按键 就好

# Instructions
1. 选中文字后按键
windows/linux用户:`ctrl+shift+t`

mac用户:`cmd+shift+t`

# Language Control
## google
简称|语言
--|:--|
zh|中文
en|英文
ru|俄语
fr|法语
de|德语
ko|韩语
ja|日语
th|泰语
es|西班牙语

## baidu
### 语言简称对照
简称|语言|
--|:--|
zh|中文|
en|英文|
yue|粤语|
wyw|文言文|
jp|日语|
kor|韩语|
fra|法语|
spa|西班牙语|
th|泰语|
ara|阿拉伯语|
ru|俄语|
pt|葡萄牙语|
de|德语|
it|意大利语|
el|希腊语|
nl|荷兰语|
pl|波兰语|
bul|保加利亚语|
est|爱沙尼亚语|
dan|丹麦语|
fin|芬兰语|
cs|捷克语|
rom|罗马尼亚语|
slo|斯洛文尼亚语|
swe|瑞典语|
hu|匈牙利语|
cht|繁体中文|
vie|越南语|

### 错误码
错误码|含义|解决办法
--|:--|:--|
52001|请求超时|重试|
52002|系统错误|重试|
52003|未授权用户|检查您的 appid 是否正确，或者服务是否开通|
54000|必填参数为空|检查是否少传参数|
54001|签名错误|请检查您的签名生成方法|
54003|访问频率受限|请降低您的调用频率|
54004|账户余额不足|请前往管理控制台为账户充值|
54005|长query请求频繁|请降低长query的发送频率，3s后再试|
58000|客户端IP非法|检查个人资料里填写的 IP地址 是否正确|可前往管理控制平台修改|IP限制，IP可留空|
58001|译文语言方向不支持|检查译文语言是否在语言列表里|
58002|服务当前已关闭|请前往管理控制台开启服务|
90107|认证未通过或未生效|请前往我的认证查看认证进度|

## ali
简称|语言|
--|:--|
zh|中文|
en|英文|
yue|粤语|
ja|日语|
ko|韩语|
fr|法语|
es|西班牙语|
th|泰语|
ar|阿拉伯语|
ru|俄语|
pt|葡萄牙语|
de|德语|
it|意大利语|
el|希腊语|
nl|荷兰语|
pl|波兰语|

# Version
## 1.0.0
1. 初始化版本,可自定义配置翻译语言 默认`中日韩`等语言 默认转换成`英文`;`英文`等语言默认转换成`中文`
2. google翻译源支持点击 `查看更多` 进行选择其他翻译 点击并实现复制操作

## 1.0.1
1. 完善简介,更新使用说明

# Planning
1. 简化操作 并 支持 悬浮 翻译
2. 加入百度逆向翻译,金山翻译逆向等
3. 不需要用户配置进行多翻译引擎的切换

# End
1. 有问题 联系作者 git 提bug 祝您使用快乐