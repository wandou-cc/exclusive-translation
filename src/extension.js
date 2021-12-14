
let command = require('./command')

function activate(context) {
	context.subscriptions.push(command.keyTranslate);
	context.subscriptions.push(command.replaceTranslate);
}

module.exports = {
	activate
}
