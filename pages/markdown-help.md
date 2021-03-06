# [Markdown Cheat Sheet]( #utilities/markdown-cheat-sheet.md )

Interesting things you can do with Markdown.


## Links of Interest

* https://daringfireball.net/projects/markdown/ << where it all started
* https://en.wikipedia.org/wiki/Markdown
* https://en.wikipedia.org/wiki/Wiki#Editing
* https://github.com/showdownjs/showdown
* https://guides.github.com/features/mastering-markdown/
* https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
* https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md
* https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf

### Text

	_italics_ *italics*

_italics_ *italics*

	**bold**

**bold**

	***bold and italics***

***bold and italics***

### Strike through

```
~~Strike through~~
```
~~Strike through~~

### Horizontal rules

```
	***
	---
	___
```

***

---

___


### Links

``` Markdown
[Example.com]( https://example.com "title" )
```

[Example.com]( https://example.com "title" )

text [^1] not

[^1]: footnote


### Tables
```
| h1    |    h2   |      h3 |
|:------|:-------:|--------:|
| 100   | [a][1]  | ![b][2] |
| *foo* | **bar** | ~~baz~~ |
```

| h1    |    h2   |      h3 |
|:------|:-------:|--------:|
| 100   | [a][1]  | ![b][2] |
| *foo* | **bar** | ~~baz~~ |


### Lists

```
* item
* item
* item
	* item
	* item
		* item
* item
```

* item
* item
* item
	* item
	* item
		* item
* item



### Code

``` Markdown
	```
	line of code with 3 backquote characters
	line of code
	line of code
	```
```

``` Markdown

	line of code
	line of code
	line of code

```

``` Markdown
text with `back quote` characters
```
text `text` text


### Quotes

``` markdown
> quote
> quote
> quote
```

> quote
> quote
> quote


### Images

* Uses [picsum.photos]( https://picsum.photos ) to gather random images

```
	![External Link Icon]( https://picsum.photos/800/600/?random =100x100 )

	![ text ]( https://picsum.photos/800/600/?random  =400x300 )

	![ text ]( https://picsum.photos/800/600/?random  =200x150 )
```

![External Link Icon]( https://picsum.photos/800/600/?random =100x100 )

![ text ]( https://picsum.photos/800/600/?random =400x300 )

![ text ]( https://picsum.photos/800/600/?random =200x150 )


### Figures

```
<figure style=display:inline-block; >
<a href=https://google.com >
<img src="https://picsum.photos/200/200/" >
<figcaption>Fig1. - A view of image 1</figcaption>
<a>
</figure>
```

<figure style="background-color:#ddd;display:inline-block;border: 1px solid #888;" >
	<a href=https://google.com >
		<img src="https:///picsum.photos/200/200/" >
		<figcaption>Fig1. - A view of image 1</figcaption>
	<a>
</figure>

<figure style="display:inline-block;border: 1px solid #888;" >
	<a href=https://google.com >
		<img src="https://picsum.photos/200/200/" >
		<figcaption>Fig2. A view of the caption</figcaption>
	</a>
</figure>

### Details Tag


<details style=display:none; hidden>

<summary>Details and Summary</summary>

Work inside Markdown

<iframe src=https://example.com  ></iframe>

</details>

### Columns tag

_Not working on GitHub_

<p style ="border: 0px solid #aaa; columns: 3 auto; column-rule-width: 1px;column-rule-style: solid;">
  This is a bunch of text split into three columns
  using the CSS `columns` property. The text
  is equally distributed over the columns. <br> lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?
</p>

### Dialog tag

_Not working on GitHub_

<div><input type=button onclick=dia.open=!dia.open; value="toggle dialog" ></div>

<div><dialog id=dia onclick="this.open=!this.open" open>Hi there! Click me.<br><iframe src=https://example.com ></iframe></dialog></div>


### iframe try

_Not working on GitHub_

<div style=display:none; ><iframe src=https://example.com  > &nbsp; </iframe></div>




### Footers

***

<center title="dingbat" >

# <a href=javascript:window.scrollTo(0,0); style=text-decoration:none; >❦</a>
</center>

<center title="dingbat" >
# <span onclick=window.scrollTo(0,0); style=cursor:pointer; >❦</span>
</center>

<center title="dingbat" >
## <a href=javascript:content.scrollTop=0; >❦</a>
</center>

<center title="dingbat" >
# <a href=javascript:window.scrollTop=0; style=text-decoration:none; >❦</a>
</center>
