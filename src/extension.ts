import * as vscode from 'vscode';
import * as net from 'net';

const GHIDRA_PORT = 24437;
const GHIDRA_HOST = '127.0.0.1';

/**
 * This class provides the "Open in Ghidra" CodeLens over any ghidra:// link.
 */
class GhidraLinkCodeLensProvider implements vscode.CodeLensProvider {

    public provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CodeLens[]> {
        const codeLenses: vscode.CodeLens[] = [];
        const regex = /ghidra:\/\/([^#]+)#([0-9a-fA-F]+)/g;
        const text = document.getText();
        let matches;

        while ((matches = regex.exec(text)) !== null) {
            const url = matches[0];
            const startPos = document.positionAt(matches.index);
            const endPos = document.positionAt(matches.index + url.length);
            const range = new vscode.Range(startPos, endPos);
            
            if (range) {
                const command: vscode.Command = {
                    title: "↗️ Open in Ghidra",
                    tooltip: `Send this link directly to Ghidra: ${url}`,
                    command: "ghidra-link-opener.openInGhidra",
                    arguments: [url]
                };
                codeLenses.push(new vscode.CodeLens(range, command));
            }
        }
        return codeLenses;
    }
}

/**
 * Sends the given URL to the Ghidra plugin's socket server.
 * @param url The ghidra:// link to send.
 */
function sendUrlToGhidra(url: string) {
    const client = new net.Socket();

    client.connect(GHIDRA_PORT, GHIDRA_HOST, () => {
        client.write(url + '\n');
        client.end();
        vscode.window.setStatusBarMessage(`Ghidra Link: Sent successfully!`, 3000);
    });

    client.on('error', (err) => {
        console.error('Ghidra connection error:', err);
        vscode.window.showErrorMessage(`Failed to connect to Ghidra. Is it running with the GhidraLinkPlugin enabled?`);
    });
}


export function activate(context: vscode.ExtensionContext) {
    console.log('VSGhidraLink extension activated!');

    const openInGhidraCommand = vscode.commands.registerCommand(
        'ghidra-link-opener.openInGhidra',
        (url: string) => {
            sendUrlToGhidra(url);
        }
    );

    const supportedLanguages = ['plaintext', 'markdown'];

    // Register CodeLens provider for supported languages
    const codeLensProviders = supportedLanguages.map(lang =>
        vscode.languages.registerCodeLensProvider(
            { language: lang },
            new GhidraLinkCodeLensProvider()
        )
    );

    // Push everything into subscriptions to properly dispose on deactivation
    context.subscriptions.push(openInGhidraCommand, ...codeLensProviders);

    vscode.window.setStatusBarMessage('VSGhidraLink is active ✔️', 3000);
}
export function deactivate() {}