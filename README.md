# vsGhidraLink README

This extension accompanies the [Ghidra Link Plugin](https://github.com/ErikUmble/GhidraLinkPlugin), enabling Ghidra navigation links within VS Code. It is a temporary hack to get around the issue of custom url protocols [not yet supported](https://github.com/microsoft/vscode/issues/133278) in VS Code.

Warning: this extension communicates with Ghidra over a local socket. Do not use this extension in untrusted workspaces.

## Features

This extension provides a popup code lens for any `ghidra://filename#address` style urls found in markdown or plaintext language files. Clicking the popup sends the url to the localhost socket 24437. The popup only appears for files in edit mode - not for rendered markdown or executed markdown cells in a Jupyter notebook.


## Requirements

Using this extension ONLY makes sense if you have Ghidra installed, and have the [Ghidra Link Plugin](https://github.com/ErikUmble/GhidraLinkPlugin) installed and activated. Link navigation only works if Ghidra is open to a project containing the files specified by the links.


## Known Issues

Ghidra links themselves do not work inside VS Code. You must click the `"↗️ Open in Ghidra"` popup, not the link itself.

The popup only appears for files in edit mode - not for rendered markdown or executed markdown cells in a Jupyter notebook. This is due to a limitation in modifying rendered markdown in Jupyer notebooks. 

## Issues and Collaboration
You may report issues or contribute improvements on the [Github repository](https://github.com/ErikUmble/VSGhidraLink).

## Release Notes

### 0.0.1

Very simple version. Does one thing. Adds code lens popups to Ghidra links. 


**Enjoy!**
