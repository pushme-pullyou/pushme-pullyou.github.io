
	user = {
		user : 'ladybug-tools',
		repo : 'benmap',
		branch : 'master',
		path : '',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/ladybug',
		path : '',
		subText : 'A map interface to display the Building Energy (BEn) use.',
		tagLine : 'A map interface to display the Building Energy (BEn) use.',
		title : 'Building Energy Map',
	};


	MNU.tableOfContents =
`


* [Read Me]( #README.md )
* [Sources]( #SOURCES.txt )
* [License]( #LICENSE )

* [Building Energy Map]( https://ladybug-tools.github.io/benmap/ )

`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

