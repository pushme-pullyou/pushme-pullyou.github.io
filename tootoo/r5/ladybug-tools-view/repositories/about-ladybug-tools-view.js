
	user = {
		user : 'pushme-pullyou',
		repo : 'pushme-pullyou.github.io',
		branch : 'master',
		path : 'tootoo/r4/library-ladybug/',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/ladybug',
		path : '',
		subText : 'Browse & view stuff on Ladybug Web real fast!',
		tagLine : 'Browse & view stuff on Ladybug Web real fast!',
		title : 'Read Me',

	};


	MNU.tableOfContents =
`
* [Read Me]( #tootoo/r4/library-ladybug/README.md )
* [License]( #LICENSE )
`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = response;
		text = CON.converter.makeHtml( text );

		return text;

	};

