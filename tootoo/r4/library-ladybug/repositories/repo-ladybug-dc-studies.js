
	user = {
		user : 'ladybug-tools',
		repo : 'dc-studies',
		branch : 'master',
		path : '',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/dc-studies',
		path : '',
		subText : 'This repository contains the Radiance models and weather-data used for studies performed to improve the performance of Daylighting Simulations used in Honeybee',
		tagLine : 'This repository contains the Radiance models and weather-data used for studies performed to improve the performance of Daylighting Simulations used in Honeybee',
		title : 'dc-studies',
	};


	MNU.tableOfContents =
`

* [Read Me]( #README.md )
* [License]( #LICENSE )

`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

