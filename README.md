# Nomoshpere wifi connection automation

## Overview

This project aims at authenticate oneself to the [nomosphere wifi portal](https://controller.access.network/101/portal/) automatically instead of using a web browser.
It works by directly using the portal's API rather than the user interface.

## Installation and setup - Windows

### Installing the required tools

 - Install [Node.js](https://nodejs.org/en/download/prebuilt-installer) and [git](https://git-scm.com/downloads/win) if not already installed.
 - Open a terminal, navigate to the desired location and clone the project.
    - `git clone todo`
    - __Note:__ Do not remove this folder nor its content at the end of the installation
 - To install the javascript dependencies, run `npm install -g pkg`.

### Building the executable

 - Use the following command will compile the javascript into a windows exectuable application: `pkg --target node18 .\main.js`
    - This executable should remain here as it needs some files in this folder.

### Setting up your credentials

 - From the file `config.example.json`, create a similare file names `config.json`.
 - In this file, enter your credentials in the corresponding fields.

### Creating shortcuts

 - Finally, you want this program to be easy to run. There are two places in which you to create shortcuts for it:

    1. On your __Desktop__. If you ever get disconnected you need to be able to reconnect easily
    2. In your __Start-up Folder__. This one is probably the most intersting one. Indeed, when your computer starts up, it looks in this folder and run every programs it finds. So placing a shortcut here would mean connecting to the wifi on start up.

Here's how you can create these two shortcuts at once: 
```PS
$ExecutablePath = Join-Path (Get-Location) "main.exe"; $ShortcutName="Authenticate"; $WScriptShell=New-Object -ComObject WScript.Shell; $DesktopShortcut=$WScriptShell.CreateShortcut([System.IO.Path]::Combine([Environment]::GetFolderPath('Desktop'), "$ShortcutName.lnk")); $DesktopShortcut.TargetPath=$ExecutablePath; $DesktopShortcut.Save(); $StartupShortcut=$WScriptShell.CreateShortcut([System.IO.Path]::Combine([Environment]::GetFolderPath('Startup'), "$ShortcutName.lnk")); $StartupShortcut.TargetPath=$ExecutablePath; $StartupShortcut.Save(); Write-Output "Shortcuts created on Desktop and in Startup folder."
```

## Installation and setup - Linux

 - You're using linux, I'm sure you'll manage to adapt what's above ;D


## Misc

### Troubleshooting

 - If you have a anti-virus, it may block the request using the credentials. If it happens, it should give you the option of white listing this endpoint. 
 - If the program doesn't manage to retreive the credentials, check the file `config.json` at the root of the project and check its integrity. See the _Setting up your credentials_ section.
 - If the authenticate fails, check the credentials you set in the file `config.json` at the root of the project.

### Safety

Remember to always be carefull when manipulating you credentials. 
A good practice would be not to enter them in a stranger's program without any precautions.
It's an open-source, therefore, I recommend you try and read the source code to understand what's done with it.

### Developement process

When logging in using a web browser, you can see the network traffic caused by the active page.
Using this you're able to see and `copy as fetch` the request that picked your interest. 
Doing this, you can see which are usefull and which one are not.

Once you get the mandatory requests, it's only a matter of programing to create a proper that will exploit it.

### Legal issue

This project is using the __MIT Liscence__. In other words, I am not responsible for anything that you might do with it.

### Enjoy

Now you're all set up. Enjoy winning 30 secondes everyday, hopefully, it will be worth the couple of hours I spent making this... 🫠

## Developer's notes

 - Firefox's portal look up URI: http://detectportal.firefox.com/canonical.html
