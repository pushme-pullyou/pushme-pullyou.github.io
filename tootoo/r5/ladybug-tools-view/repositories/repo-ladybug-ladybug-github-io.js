
	user = {
		user : 'ladybug-tools',
		repo : 'ladybug-tools.github.io',
		branch : 'master',
		path : '',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/ladybug-tools.github.io',
		path : '',
		subText : 'Ladybug Tools GitHub presence!',
		tagLine : 'Ladybug Tools GitHub presence!',
		title : 'Ladybug Tools',
	};


	MNU.tableOfContents =
`Home Pages
* [Ladybug Read Me]( #README.md )
* [Ladybog.tools]( #index.html )
### Eval Web Site

* [Home]( #eval/index.html )
* [Services]( #eval/services.html )
* Tools
	* [Ladybug]( #eval/ladybug.html )
	* [Honeybee]( #eval/honeybee.html )
	* [Butterfly]( #eval/butterfly.html )
	* [Dragonfly]( #eval/dragonfly.html )
* [Forum]( #eval/forum.html )
* [About]( #eval/about.html )
* [Contribute]( #eval/contribute.html )
<br>
#### WIP Markdown Files
* [Read Me]( #eval/README.md )
* [Support]( #eval/support.md )
* [Credits & Bibliography]( #eval/bibliography.md )

`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

