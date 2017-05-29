
	let user = {
		user : 'abantech',
		subText : 'Hello, there',
		repo : 'abantech.github.io',
		branch : 'master',
		folder : '',
	};


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};