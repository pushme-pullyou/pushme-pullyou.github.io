
	user = {
		user : 'ladybug-tools',
		repo : 'epwmap',
		branch : 'gh-pages',
		path : '',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/ladybug',
		path : '',
		subText : 'Map of available .epw weather files',
		tagLine : 'Map of available .epw weather files',
		title : 'epwmap',
	};


	MNU.tableOfContents =
`

* [Read Me]( #README.md )
* [License]( #LICENSE )

### &#x1F5D7; [EPW Map]( http://www.ladybug.tools/epwmap/ )
`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

