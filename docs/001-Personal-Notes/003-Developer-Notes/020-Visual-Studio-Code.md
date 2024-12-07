---
title: "IDE: Visual Studio Code"
sidebar_position: 20
description: "Setting up VS Code for Development"
tags: [Development, Terminal, IDE, Visual Studio Code, DevOps]
last_update:
  date: 11/22/2023
---


## How to edit settings.json in Visual Studio Code? 

Reference: https://supunkavinda.blog/vscode-editing-settings-json



I got stuck when I was trying to change the settings.json in Visual Studio Code becuase of not understanding there are different ways for different situations.

As I figured out, there are three ways to edit settings.json

- In User Preferences (Global)
- In Folder
- In Workspace

#### User Preferences 

You can change the settings.json from your user preferences. This changes are global. Therefore it will affect all of your projects. Here are 2 ways to reach that global settings.json file.

```bash
File -> Preferences -> Settings -> Extensions -> Scroll down and find "Edit in settings.json"
```

Or in these paths in your OS

```bash
Windows: %APPDATA%\Code\User\settings.json
macOS: $HOME/Library/Application Support/Code/User/settings.json
Linux: $HOME/.config/Code/User/settings.json
```

You can add the settings to this file (may be given by a extension) and make all of these settings global.

#### Folder

If you have opened a folder (File -> Open Folder), hereis the way to add settings.json in the folder. This will affect only the current folder

Create a folder named .vscode in the root folder
Create a file named settings.json in that folder and add your settings there.

```json
{    
     "settings-key": {
        "setting-1":  true,
        "setting-2":  "../css/",
        "setting-3": "> 0.2%, last 1 version"
    }
}  
```


#### Workspace

If you have opened a workspace (File -> Open Workspace to open or saved using File -> Save Workspace As...), here are the steps to change settings of the workspace. Note that in this way, you dont have a settings.json. But, you can do everything done by it in another way.

When you save the workspace, it creates a file called yourworkspace.code-workspace

Open that file in Visual Studio Code. Then you will see something like this.


```json
{
	"folders": [
		{
			"path": "F:\\Projects\\Unknown\\stable"
		}
	]
} 
```

You can add the settings by adding a key named "settings" in JSON.

```json
{
	"folders": [
		{
			"path": "F:\\Projects\\Groups\\groups"
		}
	],
	"settings": {    
	    "settings-key": {
        	"setting-1":  true,
        	"setting-2":  "../css/",
        	"setting-3": "> 0.2%, last 1 version"
    	}
	}
} 
```

When you add settings into yourwokspace.code-workspace file, the settings will only be available for the current workspace.



## Undo and Redo 

Visual studio code follows the same:

```bash
# Undo 
Ctrl + z 

# Redo 
Ctrl + Shift + z
```

## Create nested folders 

Click the folder icon to add a folder.

![](/img/docs/ide-terminal-add-folder.png)

To add nested folder, type the subsequent folders after "/".

![](/img/docs/ide-terminal-neted-folder.png)

## Collapse all folders 

![](/img/docs/ide-terminal-collapse-all-folders.png)

## Hidden Files 

Some hidden files normally start with "." and are excluded from view. You can add more excluded files by:

- Click gear icon at the bottom left ⚙
- Select Settings
- Search for "exclude" 
- To add more file format, click Add pattern

    ![](/img/docs/ide-terminal-exclude.png)


## Search inside a file 

To search for a particular section of a file or a code, we can use the shortcut below.
This saves time from scrolling over the whole file. This works with code too.

```bash
Ctrl + Shift + P --> @ 
```

![](/img/docs/ide-terminal-move-toheadings.png)

## Run/Search for a command

To run a command, we can also use the same, then type the command.

```bash
Ctrl + Shift + P --> > 
```

![](/img/docs/ide-terminal-any-command.png)

## Duplicate a line 

To duplicate a line multiple times, click and hold the keys:

```bash
Alt + Shift + Down arrow 
```

## Move a line 

Similar to cutting a line and pasting it somewhere else in the file, we can also use the shortcut below.

```bash
Alt + Up/Down arrow 
```

## Fold sections of a file 

We can hide sections of a file by "folding" them.

```bash
Ctrl + Shift + p 
>fold all 
```

## Multicursor Editing (adding same text to multiple lines)

To type the same text on multiple places simulatenously:

```bash
Alt (hold) 
Use the mouse to click the places to edit
```

![](/img/docs/ide-terminal-multicursor2.png)
![](/img/docs/ide-terminal-multicursor1.png)

Note that in some cases, it could be:

```bash
Ctrl (hold) 
Use the mouse to click the places to edit  
```

## Replace all Occurence 

To replace all occurence of a text in a file (for example, the word), select the particular word and:

```bash
Shift + o 
```

All occurence of the word will be highlighted and will be edited at the same time.

![](/img/docs/ide-terminal-edit-all-occurence.png)

The number of occurence will also appear at the bottom right.

![](/img/docs/ide-terminal-all-occurence.png)


## Linked Editing (for HTML Tags)

To edit the open and closing tag at the same time, we can enable linked editing.

```bash
Ctrl + Shift + p 
>linked editing 
```

![](/img/docs/ide-terminal-linkededitign.png)

## Auto Save 

Go to File  > Preferences > Settings 

![](/img/docs/ide-autosave.png)

## Format on Save 

Go to File  > Preferences > Settings 

![](/img/docs/ide-formatonsave.png)

## Shortcut for Keyboard Shortcuts 

Open the keyboard shortcuts page for the first time by

```bash
Ctrl + Shift + P
> keyboard shortcuts
```

Then select "Preferences: Open Keyboard Shortcuts"

![](/img/docs/ide-terminal-keyboardshortcuts.png)

Type "Open keyboard shortcuts". 
For the keybinding, click "CTRL (hold), K, S, enter"

![](/img/docs/ide-terminal-set-ks.png)

The next time you want to see the keyboard shortcuts, just type:

```bash
Ctrl (hold) + k + s" 
```

## Change keyboard shortcuts 

Make sure to follow the step before this to set the shortcut for the keyboard shortcuts page first. To change or set a keyboard shortcut:

```bash
Ctrl (hold) + k + s" 
```

## HTML Trick - Emmet

This syntax assistance is particularly useful for HTML for writing boilerplate code.

To generate a layout, define the keywords/letters followed by "+" sign.
Example:

```bash
article > header+h1+p
press tab  
```
which will generate:

```html
<article></article>
<header></header>
<h1></h1> 
```

To create a numbered list with 10 items:

```bash
ul>li*5
press tab
```

which will generate:

```bash
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul> 
```

## Other Stuff 

- Terminal - VS Code has a built-in terminal. Cons is that some Linux command doesn't work inside the terminal (e.g reverse search)

- Peek definitions/implementations 

- Integration with Git

- Remote repositories 

- Remote SSH 

- Remote containers

- .devcontainer 

- Debugger 

- Debugger: Breakpoint and Logpoint  

- HTTP Client like Thunder Client (for API testing)

- Docker extension 

- VS Code tasks (for repetitive shell commands)

- Snippets


