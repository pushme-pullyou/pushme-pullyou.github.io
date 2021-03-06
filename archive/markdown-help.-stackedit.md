

# [Markdown Cheat Sheet]( #utilities/markdown-cheat-sheet.md )


Interesting things you can do with Markdown.


### Links of Interest

* <https://github.com/showdownjs/showdown> - Markdown to HTML converter
* https://guides.github.com/features/mastering-markdown/
* <https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet>

### Text

	_italics_

_italics_

	**Bold**

**Bold**




### Horizontal rules

```
	***
	---
	___
```

***

---

___



### Strike through

```
~~Strike through~~
```
~~Strike through~~


```
==Marked text / StackEdit only ==
```

==Marked text.==


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

```
- [ ] Incomplete item
- [x] Complete item
```

- [ ] Incomplete item
- [x] Complete item


### Definition lists

 StackEdit only.

```
Markdown
:  Text-to-HTML conversion tool

Authors
:  John
:  Luke
```

Markdown
:  Text-to-HTML conversion tool

Authors
:  John
:  Luke



### Abbreviations


Markdown converts text to HTML. StackEdit only.

```
*[HTML]: HyperText Markup Language
```

*[HTML]: HyperText Markup Language


### Code
```
	```
	line of code with 3 backquote characters
	line of code
	line of code
	```
```

	line of code
	line of code
	line of code

text with `back quote` characters

text text text


### Quotes

```
> quote
> quote
> quote
```

> quote
> quote
> quote

### Details

	<details>

		<summary>Details Summay</summary>

		lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit,

	</details>


<details>
<summary>Details Summay</summary>

lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?

</details>

### Images

* uses [picsum.photos]( https://picsum.photos ) to gather random images

````
	![External Link Icon]( https://picsum.photos/800/600/?random =100x100 )

	![ text ]( http://picsum.photos/800/600/?random  =400x300 )

	![ text ]( http://picsum.photos/800/600/?random  =200x150 )
````

![External Link Icon]( https://picsum.photos/800/600/?random =100x100 )

![ text ]( https://picsum.photos/800/600/?random =400x300 )

![ text ]( https://picsum.photos/800/600/?random =200x150 )

![ text ]( https://picsum.photos/800/600/?random =100%x200 )


### Figures

<figure style=display:inline-block; >
<a href=http://google.com >
<img src="http:///picsum.photos/200/200/" >
<figcaption>Fig1. - A view of image 1</figcaption>
<a>
</figure>

<figure style=display:inline-block; >
<a href=http://google.com ><img src="http://picsum.photos/200/200/" >
<figcaption>Fig2. - A view of the caption</figcaption>
</a>
</figure>



### Footers

<br>

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
