
let command = require('./command')

function activate(context) {
	context.subscriptions.push(command.keyTranslate);
}

module.exports = {
	activate
}
