	var user = {
		user : 'pushme-pullyou',
		subText : 'Browse & view stuff on GitHub real fast!',
		repo : 'pushme-pullyou.github.io',
		branch : 'master',
		folder : '',
	};


	MNU.tableOfContents =
`
## Ladybug Web

[Ladybug Web Read Me]( #README.md )

.;

	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};