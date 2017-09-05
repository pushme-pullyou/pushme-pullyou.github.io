
	user = {
		user : 'ladybug-tools',
		repo : 'butterfly-primer',
		branch : 'master',
		path : '',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/ladybug',
		path : '',
		subText : 'Browse & view stuff on Ladybug Web real fast!',
		tagLine : 'Browse & view stuff on Ladybug Web real fast!',
		title : 'Butterfly Primer',
	};


	MNU.tableOfContents =
`

* [Butterfly-primer Read Me]( #README.md )
* [License]( #LICENSE )
`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = response.replace( /..\/..\/images/g, 'https://rawgit.com/ladybug-tools/butterfly-primer/master/images')
		text = CON.converter.makeHtml( text );

		return text;

	};

