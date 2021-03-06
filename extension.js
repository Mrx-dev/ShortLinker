// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const Tinyurl = require('tinyurl');
const fs = require('fs');

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
				console.log(err);
			}
			else {
				if (res == 'Error') {
					let panel = vscode.window.createWebviewPanel(
						'ShortLinker',
						'ShortLinker',
						vscode.ViewColumn.One,
						{}
					);

					let html_code = `<!DOCTYPE html>
						<html lang="en">
						
						<head>
							<meta charset="UTF-8">
							<meta name="viewport" content="width=device-width, initial-scale=1.0">
							<meta http-equiv="X-UA-Compatible" content="ie=edge">
							<meta name="Description" content="Enter your description here" />
							<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css">
							<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">
							<link rel="stylesheet" href="assets/css/style.css">
							<link rel="stylesheet" href="css/main.css">
							<title>ShortLinker</title>
						</head>
						<style>
							body {
								margin: 0%;
								padding: 0%;
								-webkit-box-sizing: border-box;
								box-sizing: border-box;
								background-color: royalblue;
								color: white;
							}
						
							.title {
								margin: 5%;
								text-align: center;
							}
						
							.label {
								margin: auto;
								padding: 3%;
								color: black;
								background-color: white;
								border: 2px solid white;
								border-radius: 15px 0px;
								width: 70%;
								height: 50%;
							}
						
							.url {
								color: #222;
								width: 100%;
								background-color: transparent;
								border: none;
								outline: none;
								text-decoration: none;
								font-size: 170%;
								text-align: center;
							}
						
							/*# sourceMappingURL=main.css.map */
						</style>
						
						<body>
						
							<header>
								<h1 class="title">ShortLinker ✨</h1>
							</header>
							<div class="cotainer">
								<div class="label">
									<input class="url" value="The URL is invalid ❌" disabled></input>
								</div>
							</div>
							<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js"></script>
							<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.1/umd/popper.min.js"></script>
							<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js"></script>
						</body>
						
						</html>`

					panel.webview.html = getWebviewContent(html_code);
					function getWebviewContent(html_code) {
						return `${html_code}`;
					}

					panel.onDidDispose(
						() => {
							panel = undefined;
						},
						null,
						context.subscriptions
					);
					console.log(err)
				}
				else {
					let panel = vscode.window.createWebviewPanel(
						'ShortLinker',
						'ShortLinker',
						vscode.ViewColumn.One,
						{}
					);
					let html_code = `<!DOCTYPE html>
					<html lang="en">
					
					<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<meta http-equiv="X-UA-Compatible" content="ie=edge">
						<meta name="Description" content="Enter your description here" />
						<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css">
						<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">
						<link rel="stylesheet" href="assets/css/style.css">
						<link rel="stylesheet" href="css/main.css">
						<title>ShortLinker</title>
					</head>
					<style>
						body {
							margin: 0%;
							padding: 0%;
							-webkit-box-sizing: border-box;
							box-sizing: border-box;
							background-color: royalblue;
							color: white;
						}
					
						.title {
							margin: 5%;
							text-align: center;
						}
					
						.label {
							margin: auto;
							padding: 3%;
							color: black;
							background-color: white;
							border: 2px solid white;
							border-radius: 15px 0px;
							width: 70%;
							height: 50%;
						}
					
						.url {
							color: #222;
							width: 100%;
							background-color: transparent;
							border: none;
							outline: none;
							text-decoration: none;
							font-size: 170%;
							text-align: center;
						}
					
						/*# sourceMappingURL=main.css.map */
					</style>
					
					<body>
					
						<header>
							<h1 class="title">ShortLinker ✨</h1>
						</header>
						<div class="cotainer">
							<div class="label">
								<input class="url" value="${res}" disabled></input>
							</div>
						</div>
						<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js"></script>
						<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.1/umd/popper.min.js"></script>
						<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js"></script>
					</body>
					
					</html>`

					panel.webview.html = getWebviewContent(html_code);
					function getWebviewContent(html_code) {
						return `${html_code}`;
					}

					panel.onDidDispose(
						() => {
							panel = undefined;
						},
						null,
						context.subscriptions
					);
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
