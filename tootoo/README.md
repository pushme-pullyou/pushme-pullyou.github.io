<span style=display:none; >[You are now in GitHub source code view - click this link to view this read me file as a web page]( https://pushme-pullyou.github.io/tootoo/ "View file as a web page." ) </span>


TooToo Read Me
===
_Browse and view files on GitHub with remarkable ease_

<iframe id=ifr src=https://pushme-pullyou.github.io/tootoo/r4/library/tootoo4-library.html ></iframe>
_TooToo Library_

_The above instance of TooToo is embedded inside an iframe. A number of links do not work as expected.
For a fully-working demo it's better that you open the scripts full screen._

## Full screen example [TooToo Library R4]( https://pushme-pullyou.github.io/tootoo/r4/library/tootoo4-library.html )


## Versions R5

#### Ladybug Tools View

* https://pushme-pullyou.github.io/tootoo/r5/ladybug-tools-view/index.html

### TooToo Best Websites R2

* https://pushme-pullyou.github.io/tootoo/r5/best-websites/best-websites-r1.html

#### Anywhere

* https://pushme-pullyou.github.io/tootoo/r5/anywhere/tootoo-anywhere-in-one-r1.html


## Versions R4

#### Basic

* https://pushme-pullyou.github.io/tootoo/r4/dev
* https://pushme-pullyou.github.io/tootoo/r4/dev/tootoo3-basic.html

#### All-in-One

* [TooToo Dev Select Read Me ]( https://pushme-pullyou.github.io/tootoo/r4/all-in-one/ )
* [TooToo Dev Select]( https://pushme-pullyou.github.io/tootoo/r4/all-in-one/tootoo4-all-in-one.html  )


#### Library

* [TooToo Dev Select Read Me ]( https://pushme-pullyou.github.io/tootoo/r4/library/ )
* [TooToo Dev Select]( https://pushme-pullyou.github.io/tootoo/r4/library/tootoo4-library.html  )


#### Select

* [TooToo Dev Select Read Me ]( https://pushme-pullyou.github.io/tootoo/r4/skim/ )
* [TooToo Dev Select]( https://pushme-pullyou.github.io/tootoo/r4/skim/tootoo4-skim.html )




## Concept

The [GitHub web site]( https://github.com ) allows you to do many wonderful things.

Nonetheless it would be nice to have even more ways of doing more things including features such as the following:

* View HTML, Markdown format files - and many other file types - as rendered web pages
* Browse the contents of many files on GitHub really quickly
	* Move to the next file using only a single click
	* Views files as rendered or as source code
* Access files quickly and then edit and commit changes using the GitHub interface

It would also be nice to do these things and have the code still be understandable by an entry level programmer


### Mission

#### User / Client-side

* View HTML files as rendered web pages
* Browse the contents of many files on GitHub really quickly
	* Move to the next file using only a single click
	* Views files as rendered or as source code
* To demonstrate that the GitHub API is accessible by beginner to intermediate coders
* To demonstrate that you can do many nice things with the GitHub API without having to use a server or a terminal window or localhost
* To enable you to see what your peeps have been working on and playing with
* Encourage you to edit any file on GitHub
* Code written in pure vanilla simple JavaScript
* Few external dependencies
* Easy enough to learn what's going on in a day or so


### Vision

* Find even more ways of showing more fun things to do with coding and sharing


## Features


### User Features
* View files via a human-curated table of contents or view all files as compiled by the computer
* Edit button at top right allows you to jump straight to the source code on GitHub - fully editable by YOU
* Next and previous arrows allow you to jump to the next file in the Table of Contents or All Files views
* Currently displayed file is is highlighted in the menu
* Settings menu - a work in progress - allows you to update the font, text size and colors
* Click the title to reload the page, Click the 'hamburger to slide the menu out of the view
* Works 'kind of OK' on a small screen


### Developer Features

* Menus are generated on the fly
	* Drop the script in any folder on GitHub and it generates the menu and display
	* Drop the script in one of your local folders, update the link, and it generates the menu and display of the remote folder
* Everything is client-side
    * Runs on GitHub
    * Runs on your local GitHub repo
* Accesses the GitHub Restful API so menus are always as up to date as the latest commit
* All FOSS written in plain-vanilla entry level JavaScript
* Create the Table of Contents using GitHub-flavor Markdown

### All-in-One Basic Version

* Copy the single file to any folder available via GitHub pages
* At run time the script auto-magically identifies the user and repo and creates a menu and contents view of the repo
	* Menu with links to all folders and files in the repo
	* Contents can be text, code or images

### Select Version
* Select GitHub users and repos from a drop down list
* Creates breadcrumbs and tree menu with data accessed via the GitHub Developer API

### Custom Versions

* User defined custom menu table of contents
* Based on Markdown format



### All versions

* Display rendered file contents with a single click
* Edit button takes you to source code file on GitHub
* Next and previous buttons allow for fast file browsing
* Currently selected file is highlighted in the menu
* Direct link to this read me file
* Click on title to reload
* Breadcrumb menu enables folder navigation
* Hamburger menu facilitates viewing on small devices
* Click three bars( 'hamburger' ) icon to slide menu in or out


## To Do

* 2017-05-08 ~ Add recent events
* 2017-05-08 ~ tootoo3.js see // move to TOO.setDefaultContents
	* 2017-05-07 ~ TOO.setDefaultContents: change to: TOO.files.includes( 'readme.md' )
* 2017-05-08 ~ Add full folder and file stats
* 2017-05-08 ~ user.folder > user.path
* 2017-05-08 ~ Scroll menu items into view
* 2017-05-08 ~ Cursor key movement through menus
* 2017-05-08 ~ Jazz up menu title in menu bar
* 2017-05-08 ~ Edit button broken
* 2017-05-07 ~ handle if sub-repo or or folder
* Enter the name of a GitHub user you know in the input box

## Change Log


### 2017-05-18 ~ Theo

* Reorganizing folder structure. Hopefully not messing things up too much
* Update readme files


### 2017-05-08 ~ Theo

Many little fixes



### 2017-05-07 ~ Theo

* TooToo3 ~ slimmer and trimmer than ever before
* Has real HTML and CSS
