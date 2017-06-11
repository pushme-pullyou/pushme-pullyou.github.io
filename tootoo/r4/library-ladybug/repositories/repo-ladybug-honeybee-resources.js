
	user = {
		user : 'ladybug-tools',
		repo : 'honeybee-resources',
		branch : 'master',
		path : '',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/ladybug',
		path : '',
		subText : 'A repository to collect useful resources for honeybee daylight and or energy simulation',
		tagLine : 'A repository to collect useful resources for honeybee daylight and or energy simulation',
		title : 'honeybee-resources',
	};


	MNU.tableOfContents =
`


* [Honeybee Resources Read Me]( #README.md )
* [License]( #LICENSE )

### BSDF Glass Materials
* [Read Me]( #daylight/bsdf/README.md )

`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

