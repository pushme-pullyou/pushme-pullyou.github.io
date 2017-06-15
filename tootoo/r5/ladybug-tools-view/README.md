<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://pushme-pullyou.github.io/tootoo/r5/ladybug-tools-view/ladybug-tools-view-r1.html#tootoo/r5/ladybug-tools-view/README.md "View file as a web page." ) </span>


[Ladybug Tools View Read Me]( https://pushme-pullyou.github.io/tootoo/r5/ladybug-tools-view/ladybug-tools-view-r1.html#tootoo/r5/ladybug-tools-view/README.md )
===
_Explore and view all the Ladybug Tools files in all repositories quickly and easily_

Use the left menu to select repositories and type of menu. Click any red link to view the file.
&#x1F5D7; - when you see this icon, click it to open link in new tab.


## Concept
<!--

The general format is an adaptation of the ideas developed in Alexander's _et al_ [A Pattern Language]( https://books.google.com/books?id=hwAHmktpk5IC&pg=PR10#v=onepage&q&f=false ) - as summarized on page 10.

Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice.

patterns are descriptions of common problems and proposal for the solutions that can be used repeatedly every time the problem is encountered and producing an different outcome.

-->

### Issues / Problems that need solving

There's a lot of code out there and it's not always easy to access, view or share.

You have to click and click and click in order just to see the next file.
	* Click to open file in new tab
	* Click new tab to view file
	* Click to close the new tab
	* Repeat

It's easy to view the source code, but what does the code you are looking at actually do or show?

There's a web site for the project, but it's often out of date.

If you are a developer, your priorities are on building code. Taking the time to make your code accessible is time taken away from your real coding

There are terrific tools out there, but they require skill, time and effort to get going, but you can't afford the devops peeps that are needed.

There are not a lot of free, open source, plain-vanilla entry-level JavaScript tools to help you turn GitHub repos into websites auto-magically.

Software that's easy-peasy readable so you can re-write in your favorite language is rare.

### Solution

As you are exploring or testing Ladybug Tools, you are able to call up and display numbers of files very quickly - with single clicks.

Whenever content is renderable in the browser - text, html, markdown, images, 3D models - you can view the rendered version and the source code version.

Whenever there is source code, you see it well-formatted and well-styled


#### Mission
<!-- a statement of a rationale, applicable now as well as in the future -->

* Ladybug Tools View helps you find cool features or spot errors more quickly, easily and faster


#### Vision
<!--  a descriptive picture of a desired future state -->

* By helping you see more code, more quickly you find new answers and generate new questions
* Sharing code just happens


## General Usage

* A free, open source [file viewer]( https://en.wikipedia.org/wiki/File_viewer ) for all the Ladybug Tools files hosted on GitHub
* Displays the catalog of file names in menu using [tree views]( https://en.wikipedia.org/wiki/Tree_view ) and other methods
* Click a file name link to display the file contents in a contents panel

## Features

### Genera Operations

#### File Handling
* Complete separation between code and content
	* No need to compile to build the site
* Updates file catalog at run time
	* Uses GitHub API to gather list of files and folders
* Location of scripts is independent of files being cataloged and displayed
	* Script may be run locally or from server
* Data may be local and/or in any public GitHub repository
	* Data does not have to be available via GitHub pages
	* Uses [rawgit.com]( https://rawgit.com ) as a content delivery network (CDN)


#### Maintaining

* Build web site pages with either HTML or Markdown
	* Uses [Showdown.js]( https://github.com/showdownjs/showdown ) to create HTML from Markdown on the fly
* Edit pages on the fly using the GitHub editor
* Edit locally using your favorite IDE/editor with full revision and contribution  control
* Committing files to GitHub generates a new release of the site

#### Coding
* Entry level, plain-vanilla JavaScript
* Only dependencies relate to content viewing
	* Turning Markdown into HTML

#### Repo listings
* Every repo displayed in the viewer may have its own parameters file
* The parameters files allows you to
	* Set the branch, path, default file, tag line and more
	* Define you own menu
	* Update broken relative links to absolute links
* The beginning of an API?



### User Interaction

#### File Catalogs
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

### More tweaks
* Click three bars( 'hamburger' ) icon to slide menu in or out
* Direct link to this read me file
* Click on title to reload


## More Usage

### Things you can do using this script

* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors


### Things you can do by editing the code

* Open the source code for this file: Click the 'Edit' box in the top right hand corner
* Click the 'Raw' icon and save the raw file to your computer
* Once you've downloaded the file, you can click it to run it.
* Open the file with a text editor


## Installation

* In principle, you should be able to download the source code. click on 'ladybug-tools-view-r1.html' and it should run
* After that ball is in your court
*

## Links of Interest


## To Do / Goals / Up Next
* Turn it into a full [file manager]( https://en.wikipedia.org/wiki/File_manager )

## Issues / Bugs / Things that need Work

* Next and Previous buttons have issues

## Change Log

### 2017-06-14 ~ Theo

* All beginning to look good

### 2017-05-28

* First commit
* Add Read Me


***

<h1><a href=javascript:window.scrollTo(0,0); style=text-align:center;text-decoration:none;width:100%; title='pushMe pullYou ~ your coming and going happy place' > ❦ </a></h1>

