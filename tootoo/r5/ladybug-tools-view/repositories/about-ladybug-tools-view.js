
	user = {
		user : 'pushme-pullyou',
		repo : 'pushme-pullyou.github.io',
		branch : 'master',
		path : 'tootoo/r4/library-ladybug/',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/ladybug',
		path : '',
		subText : 'Browse & view stuff on Ladybug Tools real fast!',
		tagLine : 'Browse & view stuff on Ladybug Tools real fast!',
		title : 'Ladybug Tools View',

	};


	MNU.tableOfContents =
`

* [Read Me]( #tootoo/r5/ladybug-tools-View/README.md )
* [License]( #LICENSE )
`;

// &#x1F5D7;

	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

