	user = {
		user : 'abantech',
		subText : 'Hello, there',
		repo : 'interaction-studies',
		branch : 'gh-pages',
		path : '',
		rawgit : true,
		defaultFile : 'readme.md'
	};


	MNU.tableOfContents  = '';

	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

