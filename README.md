# vsGhidraLink README

This extension accompanies the [Ghidra Link Plugin](https://github.com/ErikUmble/GhidraLinkPlugin), enabling Ghidra navigation links within VS Code. It is a temporary hack to get around the issue of custom url protocols [not yet supported](https://github.com/microsoft/vscode/issues/133278) in VS Code.

Warning: this extension communicates with Ghidra over a local socket. Do not use this extension in untrusted workspaces.

## Installation
This extension is not yet on the VS Code Extension Marketplace. Instead, download the [latest release](https://github.com/ErikUmble/VSGhidraLink/releases/).

In VS Code, go to `Extensions tab > ... > Install from VSIX` and choose the file you downloaded.

## Features

This extension provides a code hint for any `ghidra://filename#address` style urls found in markdown or plaintext language files. Clicking the popup sends the url to the localhost socket 24437. The popup only appears for files in edit mode - not for rendered markdown or executed markdown cells in a Jupyter notebook.



https://github.com/user-attachments/assets/12ae180b-f5bc-48e6-86ac-59eed8477f06



## Requirements

Using this extension ONLY makes sense if you have Ghidra installed, and have the [Ghidra Link Plugin](https://github.com/ErikUmble/GhidraLinkPlugin) installed and activated. Link navigation only works if Ghidra is open to a project containing the files specified by the links.


## Known Issues

Ghidra links themselves do not work inside VS Code. You must click the `"↗️ Open in Ghidra"` popup or use CTR + Click on the code hint, not the link itself.

The popup only appears for files in edit mode - not for rendered markdown or executed markdown cells in a Jupyter notebook. This is due to a limitation in modifying rendered markdown in Jupyer notebooks. 

On Windows, if using VS Code in WSL, you'll need to either run Ghidra in WSL also, or forward the socket from WSL localhost to your Windows host.

## Issues and Collaboration
You may report issues or contribute improvements on the [Github repository](https://github.com/ErikUmble/VSGhidraLink).

## Release Notes

### 0.0.1

Very simple version. Does one thing. Adds code hint popups to Ghidra links. 


**Enjoy!**
