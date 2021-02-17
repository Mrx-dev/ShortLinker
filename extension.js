// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const Tinyurl = require('tinyurl');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "shortlinker" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('shortlinker.shorten', async function () {
		var InputBoxOptions = {
			prompt: "Label: ",
			placeHolder: "Put your link to short it."
		};
		const link = await vscode.window.showInputBox(InputBoxOptions);
		// The code you place here will be executed every time your command is executed
		Tinyurl.shorten(link, function (res, err) {
			if (err) {
				console.log(err)
			}
			else {
				if (res == 'Error') {
					vscode.window.showWarningMessage('The URL is invalid')
				}
				else {
					vscode.window.showInformationMessage(`Your Link: ${res}`)
				}
			}
		})
		// Display a message box to the user
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
