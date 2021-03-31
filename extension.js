// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
// @ts-ignore
const Tinyurl = require('tinyurl');
const path = require('path');
// @ts-ignore
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
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			let InputBoxOptions = {
				prompt: "ShortLinker ✨| Shorten",
				placeHolder: "Put your link to short it.",
				ignoreFocusOut: true
			};
			let link = await vscode.window.showInputBox(InputBoxOptions);
			if (link == '' || link == undefined) return;
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
		}
		else {
			const text_editor = editor.document.getText(editor.selection);
			if (text_editor == '' || text_editor == undefined) return vscode.window.showInformationMessage("you need to select the url in editor.");
			Tinyurl.shorten(text_editor, function (res, err) {
				if (err) {
					console.log(err);
				}
				else {
					if (res == 'Error') return vscode.window.showErrorMessage("The URL is invalid ❌");
					editor.edit((edit) => {
						edit.replace(editor.selection, res);
					})
				}

			});
		}

	});


	let expend_shorturl = vscode.commands.registerCommand('shortlinker.expend', async function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {


			let InputBoxOptions = {
				prompt: "ShortLinker ✨| Expend",
				placeHolder: "Put your link to Expend it.",
				ignoreFocusOut: true
			};
			let shorten_url = await vscode.window.showInputBox(InputBoxOptions);
			if (shorten_url == '' || shorten_url == undefined) return;
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
		}
		else {
			const expend_url = editor.document.getText(editor.selection);
			if (expend_url == '' || expend_url == undefined) return vscode.window.showInformationMessage("you need to select the url in editor.");
			urlExpander.expand(expend_url, function (err, longUrl) {
				if (err) {
					console.log(err);
					vscode.window.showErrorMessage("This is not a ShortURL")
				}
				else {
					editor.edit((edit) => {
						edit.replace(editor.selection, longUrl);
					})
				}
			});

		}
	});
	let scan_shorturl = vscode.commands.registerCommand('shortlinker.scan', async function () {
		let InputBoxOptions = {
			prompt: "ShortLinker ✨| Scan",
			placeHolder: "Put your link to Scan it.",
			ignoreFocusOut: true
		};
		let scan_url = await vscode.window.showInputBox(InputBoxOptions);

		if (scan_url == '' || scan_url == undefined) return;
		if (scan_url.indexOf("http://") == 0 || scan_url.indexOf("https://") == 0) {
			let scan_result = await vscode.window.showInformationMessage('Check if safe on', 'Web Of Trust', 'Google', 'SiteAdvisor', 'Norton')

			if (scan_result == 'Google') {
				// @ts-ignore
				vscode.env.openExternal(`https://www.google.com/safebrowsing/diagnostic?site=${scan_url}`);
			}
			else if (scan_result == 'Web Of Trust') {
				// @ts-ignore
				vscode.env.openExternal(`https://www.mywot.com/en/scorecard/${scan_url}`)
			}
			else if (scan_result == 'SiteAdvisor') {
				// @ts-ignore
				vscode.env.openExternal(`https://www.siteadvisor.com/sitereport.html?url=${scan_url}`)
			}
			else if (scan_result == 'Norton') {
				// @ts-ignore
				vscode.env.openExternal(`https://safeweb.norton.com/report/show?url=${scan_url}`)
			}
		}
		else {
			vscode.window.showErrorMessage("that's not a url ❌")
		}
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(scan_shorturl);
	context.subscriptions.push(expend_shorturl);
}



// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
