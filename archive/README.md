<span style=display:none; >[You are now in a GitHub source code view - click this link to view the read me file as a web page]( https://pushme-pullyou.github.io "View file as a web page." ) </span>
<div><input type=button onclick=window.location.href='https://github.com/pushme-pullyou/pushme-pullyou.github.io';
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

[Pushme-Pullyou README]( https://pushme-pullyou.github.io/ )
================================================================================

_JavaScript scripts to help you explore and build new tools on GitHub_


## [GubGub]( https://pushme-pullyou.github.io/gubgub/ ) Script

* [README]( https://pushme-pullyou.github.io/#gubgub/README.md )
* Explore the activity of many GitHub users
* View the Read Me files of their repositories
	* Helped by the GitHub API and client-side cookbook JavaScript.

## [DabDab]( https://pushme-pullyou.github.io/dabdab/ ) Script

* [README]( https://pushme-pullyou.github.io#dabdab/README.md )
* Got friends? Monitor updates for selected GitHub users
* Select users from a list
* View user's events by repo and by date
* Links to numerous GitHub user statistics

## [TooToo]( https://pushme-pullyou.github.io/tootoo/ ) Read Me
<!--
* [README]( https://pushme-pullyou.github.io#tootoo/README.md )
-->

* Browse and view many files on GitHub with remarkable ease
* Buttons for: Edit this page, Next page, Previous page
* Menus with current selection highlighted
* 2017-03-26 ~ Where the current action is occurring




Concept Attempt #1
--------------------------------------------------------------------------------
_The issues and problems we are trying to solve_

GitHub has [millions of projects]( https://github.com/about ).

With so many projects, finding GitHub projects that are of interest to you may not be easy.

Finding projects with code you might actually want to fork use can be even less easy.

And then, when you identify a GitHub user of interest, it's not that easy to explore the user's work.

When you find somebody you like, it's not easy to:

* Monitor what they have done recently
* Search their many repositories
* Discard material that looks interesting - but has not been updated in years

Then there's the other side of the coin:

* How can you make your own work more visible to the world?
* How can visitors to your GitHub projects become informed in a speedy, fun manner about all the things you are doing.

Certainly the [Explore GitHub]( https://github.com/explore ) page is a good place to start.

And there are a number of really interesting curation efforts. See 'Links of Interest' below.

And none of that stops you or us from investigating even more ways of exploring GitHub.

And, guess what, GitHub supplies a quite amazing tool for finding stuff on GitHub.

The [GitHub Developer API]( https://developer.github.com/ ) provides fast, free and easy access to millions of GitHub projects.

So, if you are looking to build tools to:

* help you snoop around GitHub
* find the things that are of particular interest to you
* and monitor their progress

then you have come to a good place...

## Concept Attempt #2

* We live in a world where the [full-stack developer]( https://www.sitepoint.com/full-stack-developer/ ) reigns supreme
* We champion [DevOps]( https://en.wikipedia.org/wiki/DevOps ) as if good DevOps is the primary goal

But:

* What if you are an entry-level coder?
* What if you are more interested in STEM topics more than [DevO.ps]( http://devo.ps ) and programming?

Then you have come to the right place.

### Mission

* Explore GitHub using the GitHub API
* Explore the GitHub API using entry-level, plain-vanilla JavaScript
* Help you build tools that make the GitHub web pages and the data come to you
	* Reduce that endless click to go there and click to come back, click go there and click come back - repeated endlessly
	* 'You don't have to go there. It comes to you.' - Henrik Bennetsen
* Provide you with as many ways as possible for viewing content and statistics - really quickly and easily readable
* Display ways of getting to content such as the README files and gists wherever possible
	* Show what is being created in a timely fashion
* Create a variety of versions - from very simple to totally custom-tailored for a particular user
* Replicate the above in various languages and dialects
* Build code so simple to read that you can easily translate/fix/alter it to make it work the way you want it to work

### Vision

To help you
* Concentrate on your project at hand - but its substance no its code
* Discover new algorithms and new concepts
* Link associated projects that you had no idea they were associated
* Transfer all of these abilities into your own set of tools


Features
--------------------------------------------------------------------------------

_See also individual script read me files in folders for more timely and script-specific features_


* Display and compare GitHub responses in many different ways
* 100% client-side - host on GitHub Pages - no server needed
* Coded throughout with entry-level JavaScript


Coding Style
--------------------------------------------------------------------------------


### Entry Level Code / Cookbook Style

* Code is almost all entry level JavaScript
* Download and run
* JavaScript is used for everything including
	* Adding HTML
	* Applying CSS
* The dependencies are:
	* ShowDown Markdown interpreter
	* GitHub API

### Compatibility

* Anticipated user: somebody who writes code
	* Sitting in front of a modern computer with recent multi-core CPU and Intel HD4000 GPU or better
	* Display 1600 x 900 pixels or better
* Every effort made to use latest most simple methods
* Tested on latest Chrome, FireFox, Edge and Safari << Not yet
* Tested on Windows and MacOS << Not yet
* Operation on Android and iOS is a bonus not a requirement
* Backwards compatibility eschewed
	* Adds complexities to scripts
	* Strikes fear in the hearts of new users
	* Looks to the future not the past
	* Simple features in the pipeline are built on the lessons learned from the complexities of the past


### No Server Needed

* 100% client side
* Loads scripts from GitHub pages or localhost
* Uses Rawgit or equivalent as a content delivery network (CDN)
* Accesses GitHub Developer API via [RESTful]( https://en.wikipedia.org/wiki/Representational_state_transfer ) URL calls
	* No terminal window/ [curl]( https://curl.haxx.se/ ) needed here

### Namespace, Variable Names and File Namespace

	* Menu and column headers have tooltips that indicate namespace and script name.
	* Example: the Select menu has `SEL` as a namespace and `sel-select-r1.js` as a file
	* Every script is in its own folder with its own HTML testing file


### Written for GitHub Users and Coders

You are here to explore code, therefore:

* Font is default monotype font - fixed character spacing
* UI is minimal
	* Offers many - too many? - options
* Uses most up-to-date JavaScript features
* Displays the identical data using varying methods

But some idiosyncrasies:

* Follows [Mr.doob coding style]( https://github.com/mrdoob/three.js/wiki/Mr.doob's-Code-Style%E2%84%A2 )
	* Open airy, almost a poetic style of displaying code
* Does not follow normal split up of HTML, CSS and JavaScript
	* Content, appearance and behavior
* Does follow the idea that its all mutable stuff in the DOM
	* Even content
	* It all starts as alphanumeric characters and ends up as pixels
	* Remix, re-appropriate, re-hash as needed
	* Uses JavaScript to do this mash-up
    * It's <s>[turtles](https://en.wikipedia.org/wiki/Turtles_all_the_way_down )</s> JavaScript all the way down

There are hundreds of computer programming languages.
And so, there can be many styles of coding in each language. And each can have its own beauty.


Script Naming Conventions
--------------------------------------------------------------------------------

The names of the scripts here are derived the the names of characters in Hugh Lofting's [Dr Dolittle]( https://en.wikipedia.org/wiki/Doctor_Dolittle ) series of children's books.

See: [List of Doctor Dolittle characters]( https://en.wikipedia.org/wiki/List_of_Doctor_Dolittle_characters )

### The pushmi-pullyu

_The pushmi-pullyu (pronounced "push-me—pull-you") is a "gazelle-unicorn cross" which has two heads (one of each) at opposite ends of its body_ - Wikipedia

We use `pushMe pullYou` instead of `pushmi-pullyu`.

The reference is based on the coincidence that much of the usage of Git is based on the process of pulling and pushing data to and fro a server.

### Gub-Gub
Gub-Gub is Doctor Dolittle's pet pig.

### Dab-Dab
Dab-Dab is Doctor Dolittle's pet duck.

### Too-Too
Too-Too is the doctor's pet owl.




Links of Interest / Background Context
--------------------------------------------------------------------------------

### Posts

* https://github.com/jaanga/gubgub/issues/2
* https://www.reddit.com/r/github/comments/5a8vzt/jaanga_gubgub_r1_explore_and_monitor_many_github/?ref=share&ref_source=link
* https://twitter.com/ta/status/792871595001847808


### Web sites that help you explore GitHub

* https://resume.github.io/ ~ added 2016-10-19
* https://github.com/trending
* https://github.com/trending/javascript
* https://www.reddit.com/r/github/
* https://www.reddit.com/r/coolgithubprojects
* https://github.com/leereilly/games
* http://www.gitlogs.com/
* http://ghv.artzub.com/
* http://github-awards.com/
* https://github-ranking.com/
* https://gist.github.com/paulmillr/2657075/
* http://githut.info/

### Things You Can Do with the [GitHub Search API]( https://developer.github.com/v3/search/ )

* https://gist.github.com/jasonrudolph/6065289
* Please add more!

### Credits

* [GitHub Developer API]( https://developer.github.com/v3/ )
* [Showdown]( https://github.com/showdownjs/showdown )
    * Showdown is a JavaScript Markdown to HTML converter, based on the original works by John Gruber.
    * Showdown can be used client side (in the browser) or server side (with NodeJs).


### README Considerations

* http://tom.preston-werner.com/2010/08/23/readme-driven-development.html
* https://github.com/noffle/art-of-readme
    * This README is much influenced by noffle's README


### Coding

* [Mozilla Developer Network (MDN) JavaScript]( https://developer.mozilla.org/en-US/docs/Web/JavaScript )
* [W3schools.com]( http://www.w3schools.com/js/ )
	* Much maligned by full-stack developers,
	* but it the first thing that show up on Google


### Coding Style

* [Mr.doob coding style]( https://github.com/mrdoob/three.js/wiki/Mr.doob's-Code-Style%E2%84%A2 )
* [Does Mr.doob approve your code style? ]( http://zz85.github.io/mrdoobapproves/ )
    * [MrDoob Approves – A Javascript CodeStyle Editor+Validator+Formatter Project]( http://www.lab4games.net/zz85/blog/2015/01/25/mrdoob-approves-a-javascript-codestyle-editor-validator-formatter-project/ )


### Users

* [theo-armour.github.io](  https://theo-armour.github.io )
* [paul-m]( http://jaanga.github.io/demo/paul-m/gubgub-pm/ )




## Copyright and License
--------------------------------------------------------------------------------

Copyright © 2017 pushMe pullYou authors. [MIT License]( #LICENSE.md ).


## To Do
--------------------------------------------------------------------------------

* 2017-07-01 ~ Bring all explore GitHub links into one place

* Start upgrading to GitHub graphQL
* Start exploring GitHub Topics
    * And projects?

## Change Log
--------------------------------------------------------------

_See also individual script read me files in folders for more timely and script-specific updates_

### 2017-07-01 ~ Theo

* Many updates to files, menus and read me files through out

### 2017-05-24

* Start moving read me data from GubGub to pushMe pullYou

### 2017-05-23

* Add Dr doLittle naming references to read me
### 2017-03-26 ~

* [Blog Post]( https://github.com/pushme-pullyou/pushme-pullyou.github.io/issues/1 )
* Many updates
* On TooToo R7 (home page script)

### 2017-03-08

* Update readme

### 2016-12-02

* Update readme

### 2016-12-01

* Create organization & first commit
* Copy over GubGub & TooToo
