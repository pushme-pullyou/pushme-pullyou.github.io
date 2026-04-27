<span style=display:none; >[You are now in GitHub source code view. Click here to view README file in GitHub Pages view]
( https://pushme-pullyou.github.io/gubgub/r2/index.html#../README.md "View file as a web page." ) </span>
<input type=button onclick=window.location.href='https://github.com/pushme-pullyou/pushme-pullyou.github.io/tree/master/gubgub';
value='You are now in a GitHub Pages view. Click here to view README file in GitHub source code view.' >

[Pushme-Pullyou]( https://pushme-pullyou.github.io/ ) &raquo;

# [GubGub Read Me]( https://pushme-pullyou.github.io/gubgub/index.html#README.md )

_<small>
    Explore and monitor the <a href="https://github.com/about" target="_blank" >many GitHub projects</a>
    helped by the <a href="https://developer.github.com/v3/" target="_blank" >GitHub API</a> and client-side cookbook JavaScript.
</small>_

<!--
<img  style=display:none; src="https://pushme-pullyou.github.io/gubgub/r1/gubgub-r1.jpg" width=800 >
***
-->


<iframe id=ifr src=https://pushme-pullyou.github.io/gubgub/r3/ width=100% height=600px ></iframe>
_Pushme-Pullyou GubGub R2 with randomly selected user or organization_

_The above instance of GubGub is embedded inside an iframe. A number of links do not work as expected.
For a fully-working demo it's better that you open the scripts full screen._



## Full screen: [Pushme-Pullyou GubGub R3]( https://pushme-pullyou.github.io/gubgub/r3/ )


## Full screen: [Pushme-Pullyou GubGub R2]( https://pushme-pullyou.github.io/gubgub/r2/ )


## Full screen: [Pushme-Pullyou GubGub R1]( https://pushme-pullyou.github.io/gubgub/r1/r1.html)


## Concept


2017-05-27 ~ The bulk of the previous read me has been 'pushed upstairs' to the main pushMe pullYou read me.
Content specific to GubGub will be added in due course



### Mission

* Explore GitHub using the GitHub API
* Take advantage of the GitHub API search tools
* Explore dozens of GitHub users really uuickly

### Vision


### Features

* Compact interface full of data
	* Some would say too much data in too small a space


Usage
--------------------------------------------------------------------------------

The client-side JavaScript script creates and updates three columns of data/content


### Left Column / Menu / Buttons and Links

#### Things you can do as a user

* Click on title to reload
* Direct link to this read me file
* Select or enter your own search query
* Select or enter a GitHub user name < try your name ;-)
* Note the updates to the User Data section
* Click every button in GitHub User Data
* Buttons are in three columns
    * Left column buttons: cause unformatted search results to display in center columns
    * Middle column button: cause search results to display in a table
    * Right column links: open new tab to related GitHub web page or Google search results
* Note the many different ways of exploring the same search results

#### Things you can do as a coder

* Note usage of new HTML 5 `<details>` tag in the menus
* Edit 'usr-users.js' and add your user name and search queries that interest you
* Consider other ways of displaying the data returned by the GitHub Developer API
* Consider ways of improving the UI
* Simplify the menu so it just handles your particular needs


### Center Column / Contents / Tabular Data / Reports

* Displays scrolling list of the various search results
    * Initiated by button-clicks in the left column
* Displays README file - and any file in Markdown format
* Adds iframe views of README files for repositories

#### Things you can do as a user

* Click the numerous links throughout
* Consider ways in which the user experience could be improved

#### Things you can do as a coder

* Consider adding more links to the search statistics report under each iframe
* Consider adding iframes to view data other than the repos


### Right Column / Updates / Activity

* Mission: Show you - and link to - what the user or organization has accomplished recently
* Loads and display users 100 most recent events sorted by date
* Most aspects of each event are links to most appropriate GitHub page

#### Things you can do as a user

* Scroll up and down. Click on items of interest
* Identify and report incorrect or better URLs for each type of event

#### Things you can do as a coder

* Consider ways of displaying other types of search results or data in this column





Scripts
-------------------------------------------------------------------------------

* The app is built using a number of script files
* Each item on the menu has its own script file
* Each script file has its own folder
* Each script file has its own HTML file to help with testing and developing the script
* Each script file has its own three letter namespace object
	* See [JavaScript Object Management]( https://developer.mozilla.org/en-US/Add-ons/Overlay_Extensions/XUL_School/JavaScript_Object_Management )
* The namespace title relates to the title of the menu
* The three letter namespace is part of the script folder and file title

_The following describes the usage of each script_

### [COR / 0-cor-core-r1.js ]( https://github.com/pushme-pullyou/gubgub/tree/gh-pages/0-cor-core )

COR.converter = new showdown.Converter( { strikethrough: true, literalMidWordUnderscores: true, simplifiedAutoLink: true, tables: true });

* Set up the HTML for the three columns: menu, contents and updates
	* Builds header and footers
* Adds style sheet data
* Include AJAX and location.hash onchange event handling utilities used by the other scripts

### [API / api-authentication-r1.js ]( https://github.com/pushme-pullyou/gubgub/tree/gh-pages/1-api-authentication )

API Call: [https://api.github.com/rate_limit]( https://api.github.com/rate_limit )

* Enable you to enter your GitHub Developer API access token
    * Use location.hash in form of: '#token=#your_token#' then reload the page or click 'Set API Access Token'
    * Or paste access token into text input
* Provides a readout of:
    * GitHub API Usage limits
    * Number of uses remaining
    * Time when clock will return to zero


### [Namespace SEL / Source code: sel-select.js ]( https://github.com/pushme-pullyou/gubgub/tree/gh-pages/2-sel-select )

* Much of your interaction with GitHub will occur here
* Located in the top of left menu

#### Select Type of GitHub User

* Select a pre-written search query
* Edit or enter your own query
* First item in the list is a special item
    * Calls pre-selected list of users
    * Displays reslults in 'Select GitHub User...' menu item
    * Data is in `usr-usr.js`

GitHub Developer API calls:

* [https://api.github.com/search/repositories?q=stars:>60000]( https://api.github.com/search/repositories?q=stars:>60000 )

Relevant Documentation

* See [GitHub Developer API Search]( https://developer.github.com/v3/search/ )
    * https://help.github.com/articles/searching-repositories/
    * https://help.github.com/articles/search-syntax/

Investigations

* We are building up a set of standard queries
* Most of the current queries are based on this syntax: `%keyword%+stars:>%number%`
* We are looking for more varied yet still interesting types of queries to provide as samples
* See also the 'Links of Interest' section


#### Select GitHub user and repo

* Select a user from the list of results
* Enter a user name of your choice


### [DAT/ dat-data-r1.js ]( https://github.com/pushme-pullyou/gubgub/tree/gh-pages/dat-data )

API Calls:
* [https://api.github.com/users/mrdoob]( https://api.github.com/users/mrdoob )
* Click every button and every link and see what happens
* Display the data for every item in the search results
	* Left column of buttons: display raw data
	* Displays prettified data
	* Links to appropriate GitHub page for the data


### [EUS / eus-events-user-r1.js / user-events-big-r1.js ]( https://github.com/pushme-pullyou/gubgub/tree/gh-pages/eus-events-user )

* Three ways of viewing user/organization events
    * As a tight vertical list ~ see right column: COR.updates
    * By repository and type ~ See COR.center ~ default when you load a new user
    * By date with details ~ see COR.center ~ click 'events' button in left menu or 'show events by date in detail' button in right menu

### [USR/ users-r1.js ]( https://github.com/pushme-pullyou/gubgub/tree/gh-pages/usr-users )

* Default data used by SEL
* Items used to create options for SELselGroup
* Items used to create options for SELselUser
* Could be more accessible if in SEL?
* Could be created by via a Gist?
* Very much part of any effort to create bespoke GubGubs



Editing the Code
--------------------------------------------------------------------------------

<iframe src='https://pushme-pullyou.github.io/ace-editor/ace-view-r1.html#
	https://pushme-pullyou.github.io/gubgub/r2/index.html' width=100% height=600 ></iframe>

<input type=button onclick=window.location.href='https://github.com/pushme-pullyou/pushme-pullyou.github.io/blob/master/gubgub/r2/index.html';
value='Source code listing' >


* Open this file: https://github.com/pushme-pullyou/pushme-pullyou.github.io/blob/master/gubgub/r2/index.html
* Click the 'Raw' icon and save the raw file to your computer
* Once you've downloaded the file, you can click it to run it.
* Open the file with a text editor


Naming this App
--------------------------------------------------------------------------------

New name: GubGub

The code or original name for this script was 'GitHub API User Explorer'.
This title describes fairly clearly what the script's intention but does not comply with the [GitHub Logos and Usage]( https://github.com/logos ) guideline.
Examples of app names that the GitHub organization accept are listed on the GitHub [Integrations]( https://github.com/integrations ) page.
The only of integrations with the word 'github' in the title are apps produced and distributed by GitHub themselves.

So we needed a more acceptable name.

* The title should relate to the intent
* The intent is to help people peruse GitHub
* The title should not infringe GitHub Trademarks
* Should be short and catchy
* Little relation to git more relationship with 'hub'

The current solution is 'gubgub' or 'ghubghub'.

The fun thing is that Gub-Gub is the talking pig in the Dr Dolittle series of books written by Hugh Lofting in the early 1900s

See

* https://en.wikipedia.org/wiki/Doctor_Dolittle
* https://en.wikipedia.org/wiki/Gub_Gub%27s_Book

Other Dr Dolittle animal names that could be fun project names:

 The animal team includes Polynesia (a parrot), Gub-Gub (a pig), Jip (a dog), Dab-Dab (a duck), Chee-Chee (a monkey), Too-Too (an owl), the Pushmi-pullyu, and a White Mouse later named simply "Whitey".


Issues
--------------------------------------------------------------------------------

* 2017-05-23 ~ number of stars not updated when you change users
* 2016-10-30 ~ Open README with link: loads user and overwrites README
* 2016-10-29 ~ Double loads at times
* 2016-10-29 ~ Why is there an error: 2-sel-select/sel-select-r1.html ?
* 2016-10-28 ~ Decide whether or not all folder names have numbers
* 2016-10-28 ~ Reports error when cannot open README ~ probably unfixable
* 2016-10-20 ~ Microsoft Edge: Contents readme iframes not displaying data - probably issue with '/' in id



To Do List / Goals
--------------------------------------------------------------------------------

By script
* 2016-10-29 ~ HTML: Add meta descriptions to all HTML files
* 2016-10-29 ~ DAT: Followers/Following: add ?sort=updated&order=desc&per_page=100';
* 2016-11-04 ~ DAT: needs a curated list of option \ all needs a good clean-up
* 2016-10-30 ~ SEL: add examples of various search parameters,
* 2016-11-04 ~ SEL: create an onload event that other scripts can listen to
* 2016-10-30 ~ EUS: combine two events files into one? Or build as two enetirel separated scripts
* 2016-10-26 ~ EUS: Contents and Updates titles uppercase
* 2016-10-26 ~ EUS/RES: Events by repo: Display if a repo is owned by a user or an org
* 2016-10-20 ~ RES: Add ability to display readme files in full
* 2016-10-26 ~ RES: Add links to stats on events by repository and type
* RES: Add number of stars to each repo < would add to rate limit
* RES: Add iframes to orgs
* RES: Add iframes to gists

Generally
* 2016-11-04 ~ CSS: Start adding material.io touches
* 2016-10-29 ~ Split into multiple versions
    * Phone versions
    * Monitoring favorites version
    * GitHub explorer version
* 2016-10-28 ~ Decide if better to open links in same tab or new tab
* 2016-10-26 ~ Allow for translation into many languages. text in JSON file?




Copyright and License
--------------------------------------------------------------------------------
Copyright © 2016 Jaanga authors. [MIT License]( #LICENSE.md )




Change Log
--------------------------------------------------------------------------------

### 2019-10-20 ~ Theo

* F: Add bitcoin queries
* B: Allow user to update query


### 2017-05-27 ~Theo

* Update Read Me

Some time between now and previous update this project was forked from Jaanga to pushMe pullYou

### 2016-11-06

* Cleaned up all the files even more
* All the onHashChange functions work in a similar manner
* README files and their custom text work in the same way
* ShowDown updated to 1.4.4 throughout
* More files archived


### 2016-11-04

* R2 looking good
* Major issue pages loading multiple times and/or causing issues with opening README appears to have been fixed
* Files and folders renamed into more identifiable categories
* Code clean-up and streamline


### 2016-11-01 ~  ~ R2

* R2 committed
* 2016-10-26 ~ COR: Display current user in document.title < added
* Halfway through renaming folders and cleaning-up code
* Moving to onHashChange ib HTML strategy
    * Will try to use 'if not loaded then load strategy'
    * Keep all major decisions all in the HTML file
    * Use location hash to control things

### 2016-10-31

* Add COR.documentTitle + update title with user name pre-fixed
    * 2016-10-29 ~ COR? Duplicates in title.document
* 2016-10-30 ~ USR: failing on reloads. Need to add values with actual login < fixed - just change name to lower case

### 2016-10-29

* Code clean-up
* Tested on briefly MacOS Sierra with Safari 10, FF49 and Chrome 54. All seem file
* Tested on El Capitan with Safari 9.1. Fail.
* Tested on iPad Pro with iOS 10. All seems fine.
* Tested on iPad Pro with iOS 9.3. Fail.
* Tested on Windows 10 with Microsoft Edge 14. Fail.
* Tested om Windows 10 with latest FF and Chrome. Seem fine.


### 2016-10-28

* Add to README
* Code clean-up
* 2016-10-26 ~ Type not updating with change in selection < fixes

### 2016-10-26

* Leaving and coming back returns to same user / better location.hash management
* Add GitHub no connection note
* Add API key entry
* Many additions to README
* More code clean-up
* Access token seems to ne working
* Ditto location hash
* 2016-10-21 ~ API ~ reset time not updating << fixed

### 2016-10-25 ~ GubGub R1

* New Jaanga repo


### 2016-10-23

* Much cleaning up all over the place

### 2016-10-20

* Major update to this README
	* Switch from read me to README ;-(
	* README is the standard


### 2016-10-19

* All buttons have working actions
* Buttons show hand icon on mouse over
* 2016-10-18 ~ Read all cases of readme.MD < mostly fulfilled


### 2016-09-20

* 2016-09-17 ~ return to top of page when new user is loaded < 2016-09-20 fixed
* Enter search query
* View rate limits
	* Add number of hits remaining before you go over usage limits
* Repo read me in monospace font
	* Add GitHub-like CSS < partial fix
* Right menu scrolls independently

### 2016-09-17 ~ Explorer2 R1

* Major update


### 2016-09-??

* First commit
* Add Read Me

***

<center title='Jaanga ~ your 3D happy place' >
# <a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a>
</center>
