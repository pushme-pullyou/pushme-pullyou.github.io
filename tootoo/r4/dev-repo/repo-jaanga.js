	var user = {
		user : 'jaanga',
		subText : '',
		repo : 'jaanga.github.io',
		branch : 'master',
		folder : '',

	};

	MNU.tableOfContents =
`
* [Read Me]( #readme.md )
### Equirec
* [Read Me]( #equirec/readme.md )
### Outer Space
* [Read Me]( #outer-space/readme.md )
### Tutorials
`;



	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};