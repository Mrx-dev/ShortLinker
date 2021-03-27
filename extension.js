// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const Tinyurl = require('tinyurl');
const path = require('path');
const urlExpander = require('expand-url');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Thank you for using ShortLinker <3\nShortLinker made with love by MrxDev for you (https://mrxdev.ml/)');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('shortlinker.shorten', async function () {
		var InputBoxOptions = {
			placeHolder: "Put your link to short it.",
			ignoreFocusOut: true
		};
		let link = await vscode.window.showInputBox(InputBoxOptions);
		if (link == '') return;
		// The code you place here will be executed every time your command is executed
		Tinyurl.shorten(link, function (res, err) {
			if (err) {
				console.log(err);
			}
			else {
				if (res == 'Error') {
					console.error('The URL is invalid ❌')
					let panel = vscode.window.createWebviewPanel(
						'ShortLinker Shorten ✨',
						'ShortLinker Shorten ✨',
						vscode.ViewColumn.Active,
						{}
					);
					let shortlinker_icon = vscode.Uri.file(
						path.join(context.extensionPath, 'images', 'ShortLinker.png')
					);
					panel.iconPath = shortlinker_icon
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
								width: 100%;
								height: 50%;
							}
						
							.url {
								color: #222;
								width: 100%;
								background-color: transparent;
								border: none;
								outline: none;
								text-decoration: none;
								font-size: 150%;
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
				}
				else {
					let panel = vscode.window.createWebviewPanel(
						'ShortLinker Shorten ✨',
						'ShortLinker Shorten ✨',
						vscode.ViewColumn.Active,
						{}
					);
					let shortlinker_icon = vscode.Uri.file(
						path.join(context.extensionPath, 'images', 'ShortLinker.png')
					);
					panel.iconPath = shortlinker_icon

					let html_code = `<!DOCTYPE html>
					<html lang="en">
					
					<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<meta http-equiv="X-UA-Compatible" content="ie=edge">
						<meta name="Description" content="Enter your description here" />
						<link rel="shortcut icon" href="images/ShortLinker.png" type="image/png"> 
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
							width: 100%;
							height: 50%;
						}
					
						.url {
							color: #222;
							width: 100%;
							background-color: transparent;
							border: none;
							outline: none;
							text-decoration: none;
							font-size: 150%;
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


	let expend_shorturl = vscode.commands.registerCommand('shortlinker.expend', async function () {
		var InputBoxOptions = {
			placeHolder: "Put your link to Expend it.",
			ignoreFocusOut: true
		};
		let shorten_url = await vscode.window.showInputBox(InputBoxOptions);
		if (shorten_url == '') return;
		urlExpander.expand(shorten_url, function (err, longUrl) {
			if (err) {
				console.log(err);
				let panel = vscode.window.createWebviewPanel(
					'ShortLinker Expend ✨',
					'ShortLinker Expend ✨',
					vscode.ViewColumn.Active,
					{}
				);
				let shortlinker_icon = vscode.Uri.file(
					path.join(context.extensionPath, 'images', 'ShortLinker.png')
				);
				panel.iconPath = shortlinker_icon
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
							width: 100%;
							height: 50%;
						}
					
						.url {
							color: #222;
							width: 100%;
							background-color: transparent;
							border: none;
							outline: none;
							text-decoration: none;
							font-size: 150%;
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
			}
			else {
				console.log(longUrl);
				let panel = vscode.window.createWebviewPanel(
					'ShortLinker Expend ✨',
					'ShortLinker Expend ✨',
					vscode.ViewColumn.Active,
					{}
				);
				let shortlinker_icon = vscode.Uri.file(
					path.join(context.extensionPath, 'images', 'ShortLinker.png')
				);
				panel.iconPath = shortlinker_icon
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
							width: 100%;
							height: 50%;
						}
					
						.url {
							color: #222;
							width: 100%;
							background-color: transparent;
							border: none;
							outline: none;
							text-decoration: none;
							font-size: 150%;
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
								<input class="url" value="${longUrl}" disabled></input>
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
		});
	});



	context.subscriptions.push(disposable);
	context.subscriptions.push(expend_shorturl);
}



// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
