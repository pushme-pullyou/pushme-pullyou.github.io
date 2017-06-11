
	user = {
		user : 'ladybug-tools',
		repo : 'ladybug-tools.github.io',
		branch : 'master',
		path : '',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/ladybug-tools.github.io',
		path : '',
		subText : 'adybug Tools GitHub presence!',
		tagLine : 'Ladybug Tools GitHub presence!',
		title : 'Ladybug Tools',
	};


	MNU.tableOfContents =
`


* [Ladybug Read Me]( #README.md )

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

Markdown Files
* [Read Me]( #eval/README.md )
* [Support]( #eval/support.md )
* [Credits * Biblio]( #eval/bibliography.md )

<!--
* []( #eval/.html )
* []( #eval/.html )
-->
`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

