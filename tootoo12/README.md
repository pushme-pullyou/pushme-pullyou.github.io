<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://rawgit.com/ladybug-tools/spider/master/ "View file as a web page." ) </span>


# [tooToo12 Read Me]( #README.md )



## Concept

### Issue / The problem to be solved

The [GitHub Pages]( https://pages.github.com/ ) description reads:

> Websites for you and your projects, hosted directly from your GitHub repository. Just edit, push, and your changes are live.

GitHub pages is a wonderful way to host static web pages such as HTML, CSS, images and JavaScript files.

If you are a Ruby on Rails/Jekyll user, GitHub provides tools to help you create a blog hosted on Pages. For any other use, you are on your own.

The intent here is to provide a simple [content management system(CMS)]( https://en.wikipedia.org/wiki/Content_management_system ) for GitHub pages

### Mission


### Vision


## Features

* Script works remotely and locally
* Git push updates the CMS
* Automatically updates menu - uses GitHubAPI to obtain list of files
* Obtains files via a content delivery network( CDN) - Uses rawgit.com
* Renders Markdown as HTML - uses Showdown.js as converter
* Displays all file types - available plugins to render PDFs, STL and other file types
* Supports location hash to create SEO-friendly URLs
* Obtains filenames and files via GitHub API
* Mobile-friendly sliding hamburger menu
* Written in plain-vanilla entry-level JavaScript - under 500 lines of code

typical menu items

* Click the Octocat icon to edit the file on GitHub
* Click title to view in CMS
* Click window icon to open in new tab
* Working breadcrumbs

## To Do

* 2017-12-02 ~ Add ability to scroll to internal links
* 2017-12-02 ~ Add default files for local and cloud runs
* Better handling of three.js files
* Sort folders in reverse order?


## Change Log


### 2018-02-01 ~ Theo

Beginning to settle down


### 2017-11-25 ~ Theo

* location.hash change updates file, breadcrumb and menu

### 2017-11-22 ~ Theo

* top margin for images
* update breadcrumbs with location hash
* get github api contents link via location hash << can do. creates menu, but then need to reset all the variables. easier just to create a new file.
* link to any file on GitHub via link in read me or menu

### 2017-11-20 ~ Theo

* index for ladybug.tools/spider
* Add open read me file if it exists on folder change




### 2017-08-24 ~ Theo

* First commit



