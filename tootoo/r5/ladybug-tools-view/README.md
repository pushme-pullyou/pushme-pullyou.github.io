<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://pushme-pullyou.github.io/tootoo/r5/ladybug-tools-view/ladybug-tools-view-r1.html#tootoo/r5/ladybug-tools-view/README.md "View file as a web page." ) </span>


[Ladybug Tools View Read Me]( https://pushme-pullyou.github.io/tootoo/r5/ladybug-tools-view/ladybug-tools-view-r1.html#tootoo/r5/ladybug-tools-view/README.md )
===
_Explore and view all the Ladybug Tools files in all repos quickly and easily_

Use the left menu to select repositories and type of menu. Click any red link to view the file.
&#x1F5D7; - when you see this icon, click it to open link in new tab.


## Concept

### Issues / Problems that need solving

<!--

The general format is an adaptation of the ideas developed in Alexander's _et al_ [A Pattern Language]( https://books.google.com/books?id=hwAHmktpk5IC&pg=PR10#v=onepage&q&f=false ) - as summarized on page 10.

Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice.

patterns are descriptions of common problems and proposal for the solutions that can be used repeatedly every time the problem is encountered and producing an different outcome.

-->

When you are exploring or testing Ladybug Tools, you want to be able to call up and display numbers of files very quickly - with the fewest clicks possible

### Mission
<!-- a statement of a rationale, applicable now as well as in the future -->

* Ladybug Tools View helps you find cool features or spot errors more quickly.

### Vision
<!--  a descriptive picture of a desired future state -->

* By helping you see more code, more quickly you find new answers and new questions


## Features

* A [file viewer]( https://en.wikipedia.org/wiki/File_viewer ) for all the Ladybug Tools files hosted on GitHub
* Display the catalog of file names in menu using a [tree view]( https://en.wikipedia.org/wiki/Tree_view ) and other methods
* When user clicks a file name, display its menu items in the menu and the file contents in a contents panel

### Maintaining
* Build your web site pages with either HTML or Markdown
* Edit pages on the fly using the GitHub editor
* Edit locally using your favorite IDE/editor with full revision and contribution  control


### Coding
* Entry level, plain-vanilla JavaScript
* Only dependencies relate to content viewing
	* Turning Markdown into HTML

### File Handling
* Updates file catalog at run time.
	* Uses GitHub API to gather list of files and folders
* Location of script is independent of files being catalogued and displayed
	* Script runs locally or from server

### Menus


### Repo listings
* Every repo displayed in the viewer has its own parameters file
* The parameters files allows you to
	* Set the branch, path, default file, tag line and more
	* Define you own menu
	* Update broken relative links to absolute links


### File Catalogs
* Multiple available methods for displaying the catalog for files
* Update catalog display type at run-time
* Current types include
	* Table of Contents: human curated menu, written in Markdown
	* All Files: familiar tree view with folder names up top and file names below
	* Folders and File: screen dump of the list of all he paths
	* Folder Groups: Display list of all folder paths with file names displayed below
	* List by folders: all files in catalog with folder names as separator
	* Alphabetical: Index of all files, numbered and in 'abc' order

### Content Display
* Display rendered HTML and Markdown
* Displays images as images
* Displays code in Ace editor container
* Every page has an 'Edit' button that takes you to the GitHub source code for that page
* Every page has 'Next' and 'Previous' buttons

### Theme
* Update User Interface at runtime
* Small selection of updatable elements included

### User Interaction
* Click three bars( 'hamburger' ) icon to slide menu in or out
* Direct link to this read me file
* Click on title to reload


## Things you can do using this script

* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors


## Things you can do by editing the code

* Open the source code for this file: Click the 'Edit' box in the top right hand corner
* Click the 'Raw' icon and save the raw file to your computer
* Once you've downloaded the file, you can click it to run it.
* Open the file with a text editor


<!--
## Users
_where used_

Intended for xxx
-->


## Links of Interest


## To Do / Goals / Up Next
* Turn it into a full [file manager]( https://en.wikipedia.org/wiki/File_manager )

## Issues / Bugs / Things that need Work

* Next, Previous and Edit buttons have issues

## Change Log

### 2017-05-28

* First commit
* Add Read Me


***

<h1><a href=javascript:window.scrollTo(0,0); style=text-align:center;text-decoration:none;width:100%; title='pushMe pullYou ~ your coming and going happy place' > ❦ </a></h1>

