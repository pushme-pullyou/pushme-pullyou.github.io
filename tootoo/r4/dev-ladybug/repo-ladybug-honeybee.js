
	user = {
		user : 'ladybug-tools',
		repo : 'honeybee',
		branch : 'master',
		path : '',
		rawgit: true

		help : 'https://github.com/ladybug-tools/ladybug',
		path : '',
		subText : 'A python library to create, run and visualize the results of daylight (radiance) and energy analysis (OpenStudio).',
		tagLine : 'A python library to create, run and visualize the results of daylight (radiance) and energy analysis (OpenStudio).',
		title : 'honeybee',
	};


	MNU.tableOfContents =
`
## honeybee

* [honeybee Read Me]( #readme.md )
* [License]( #license.md )
`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

