
	user = {
		user : 'ladybug-tools',
		repo : 'ladybug-dynamo',
		branch : 'master',
		path : '',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/ladybug-dynamo',
		path : '',
		subText : 'Ladybug plugin for Dynamo (WIP)',
		tagLine : 'Ladybug plugin for Dynamo (WIP)',
		title : 'Ladybug Dynamo',
	};


	MNU.tableOfContents =
`

* [Read Me]( #README.md )
* [License]( #LICENSE )

### [API Documentation](#doc/ladybugdynamo/index.html)

* [Analysis](#doc/ladybugdynamo/analysis.m.html)
* [Color](#doc/ladybugdynamo/color.m.html)
* [Core](#doc/ladybugdynamo/core.m.html)
* [EPW](#doc/ladybugdynamo/epw.m.html)
* [Geometry Operations](#doc/ladybugdynamo/geometryoperations.m.html)
* [Ladybug](#doc/ladybugdynamo/ladybug.m.html)
* [Legend Parameters](#doc/ladybugdynamo/legendparameters.m.html)
* [Sky](#doc/ladybugdynamo/sky.m.html)
* [Solar Radiation](#doc/ladybugdynamo/solarradiation.m.html)
* [Snlight Hours](#doc/ladybugdynamo/sunlighthours.m.html)
* [Sun Path](#doc/ladybugdynamo/sunpath.m.html)
* [Wrapper](#doc/ladybugdynamo/wrapper.m.html)


`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

