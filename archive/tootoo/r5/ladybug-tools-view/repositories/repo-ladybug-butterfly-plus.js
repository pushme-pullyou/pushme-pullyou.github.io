
	user = {
		user : 'ladybug-tools',
		repo : 'butterfly-plus',
		branch : 'master',
		path : '',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/butterfly=plus',
		path : '',
		subText : 'Browse & view stuff on Ladybug Web real fast!',
		tagLine : 'Butterfly[+] plugins...',
		title : 'Butterfly[+] plugins',
	};


	MNU.tableOfContents =
`
## Ladybug

* [Butterfly Plugins Read Me]( #README.md )
* [License]( #LICENSE )

There are many Python files here. Use the 'All Files' menu to view them.
`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = response.replace( /\.\//g, 'https://rawgit.com/ladybug-tools/butterfly-plus/master/' );
		text = CON.converter.makeHtml( text );

		return text;

	};

