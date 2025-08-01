import * as vscode from 'vscode';
import * as net from 'net';

const GHIDRA_PORT = 24437;
const GHIDRA_HOST = '127.0.0.1';

/**
 * Provides a clickable "Open in Ghidra" inlay hint before any ghidra:// link.
 */
class GhidraInlayHintsProvider implements vscode.InlayHintsProvider {

    public provideInlayHints(document: vscode.TextDocument, range: vscode.Range, token: vscode.CancellationToken): vscode.ProviderResult<vscode.InlayHint[]> {
        const hints: vscode.InlayHint[] = [];
        const regex = /ghidra:\/\/([^#]+)#([0-9a-fA-F]+)/g;
        const text = document.getText();
        let matches;

        while ((matches = regex.exec(text)) !== null) {
            const position = document.positionAt(matches.index);

            const hint = new vscode.InlayHint(
                position, 
                [{
                    value: `↗️ Open in Ghidra`,
                    command: {
                        title: "Open Link in Ghidra",
                        command: "ghidra-link-opener.openInGhidra",
                        arguments: [matches[0]]
                    }
                }]
            );

            // add space for readability
            hint.paddingRight = true;

            hints.push(hint);
        }

        return hints;
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

    // Register the Inlay Hints provider for supported languages
    const inlayHintsProvider = vscode.languages.registerInlayHintsProvider(
        supportedLanguages.map(language => ({ language })),
        new GhidraInlayHintsProvider()
    );

    // Push everything into subscriptions to properly dispose on deactivation
    context.subscriptions.push(openInGhidraCommand, inlayHintsProvider);

    vscode.window.setStatusBarMessage('VSGhidraLink is active ✔️', 3000);
}
export function deactivate() {}