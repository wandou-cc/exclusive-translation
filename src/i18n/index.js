const vscode = require('vscode');

function  getLanguage() {
    let lang = vscode.env.language;
    let langLocale;
    try {
        langLocale = require(`./language.${lang}.json`);
    } catch (err){
        langLocale = require(`./language.en.json`);
    }
    return langLocale
}

module.exports.getLanguage = getLanguage