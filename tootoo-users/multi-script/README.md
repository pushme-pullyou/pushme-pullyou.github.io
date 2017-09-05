<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://theo-armour.github.io/snippets/tootoo8-core/#README.md "View file as a web page." ) </span>


[Multi Script Read Me]( #README.md )
====

<iframe class=iframeReadMe src=./plugins/threejs-basic.html width=100% height=600px onload=this.contentWindow.controls.enableZoom=false; ></iframe>

## Full Screen: [Three.js Basic]( ./plugins/threejs-basic.html )

Seems to be working as desired

## Concept

### Issue / The problem to be solved

<!-- 
The general idea is to adapt the practices developed in Christopher Alexander's _et al_ [A Pattern Language]( https://books.google.com/books?id=hwAHmktpk5IC&pg=PR10#v=onepage&q&f=false ) - as summarized on page 10.

> Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice.

>Patterns are descriptions of common problems and proposal for the solutions that can be used repeatedly every time the problem is encountered and producing an different outcome.


[Greeking]( https://en.wikipedia.org/wiki/Greeking ): lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?
 -->

### Mission

<!-- * Statement of goals, objectives or strategies, applicable now as well as in the future -->

* Single index.html
    * Handles opening and displaying any and all files in sub-folders and whereever
* Single main menu
    * Written in Markdown
* Multiple sub folders
    * All files accessible from main menu
* Multiple scripts
    * Content may be Markdown of HTML in an iframe
    * Menus can be markdown or HTML in an iframe
   * Allows menus to behave like dialog boxes
* Multiple sub menus
    * Scripts loaded at run time
* Multiple Read Me
     * Every folder can have its own read me
* All hosted as static files on GitHub/Bl.ocks.org/Glitch or wherever


* Content files
	* Appear in main body
	* Current principal content
	* May be .md or .html files
	* only Three.js or equal as external library dependency
* Content files HTML
	* Run perfectly standalone or in iframe
* Content file HTML menus
	* If need .md files
		* cannot depend on parent for conversion to HTML because file must be able to run standalone
	* When standalone
		* Menu content appears on right side - or as indicated in initialize defaults file
		* Two placement areas in HTML file
			* Div with id 'divMenuSub'
			* Iframe with id 'ifrMenuSub'
	* When inside iframe 
* Menus should try to clean up after themselves
````window.addEventListener( "unload", function() { parent.divMenuSub.innerHTML = ''; }, false );````


### Vision

<!-- * Descriptive picture of a desired future state -->


## Links of Interest


## Change Log


### 2017-08-24 ~ Theo

* First commit


