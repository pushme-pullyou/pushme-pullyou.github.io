
	var user = {
		user : 'jaanga',
		subText : 'Your 3D happy place',
		repo : 'jaanga.github.io',
		branch : 'master',
		folder : 'documents',

	};

	MNU.tableOfContents =
`### Documents
* [Read Me]( #readme.md )
### Jaanga Practice Notes
* [Read Me]( #jaanga-practice-notes/readme.md )
### Coding Styles Gallery
* [Read Me]( #coding-styles-gallery/readme.md )
### CS482
* [Read Me]( #cs482/readme.md )

`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

