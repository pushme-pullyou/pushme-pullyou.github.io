
	user = {
		user : 'ladybug-tools',
		repo : 'ladybug',
		branch : 'master',
		path : '',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/ladybug',
		path : '',
		subText : 'Browse & view stuff on Ladybug Web real fast!',
		tagLine : 'Browse & view stuff on Ladybug Web real fast!',
		title : 'Ladybug',
	};


	MNU.tableOfContents =
`

* [Ladybug Read Me]( #README.md )
* [License]( #LICENSE )

### [API Documentation](#doc/ladybug/index.html)

* [ladybug.analysisperiod](#doc/ladybug/analysisperiod.m.html)
* [ladybug.color](#doc/ladybug/color.m.html)
* [ladybug.comfort](#doc/ladybug/comfort/index.html)
* [ladybug.datacollection](#doc/ladybug/datacollection.m.html)
* [ladybug.datatype](#doc/ladybug/datatype.m.html)
* [ladybug.dt](#doc/ladybug/dt.m.html)
* [ladybug.epw](#doc/ladybug/epw.m.html)
* [ladybug.header](#doc/ladybug/header.m.html)
* [ladybug.legendparameters](#doc/ladybug/legendparameters.m.html)
* [ladybug.listoperations](#doc/ladybug/listoperations.m.html)
* [ladybug.location](#doc/ladybug/location.m.html)
* [ladybug.psychrometrics](#doc/ladybug/psychrometrics.m.html)
* [ladybug.rootFinding](#doc/ladybug/rootFinding.m.html)
* [ladybug.sky](#doc/ladybug/sky.m.html)
* [ladybug.skyvector](#doc/ladybug/skyvector.m.html)
* [ladybug.sunlighthours](#doc/ladybug/sunlighthours.m.html)
* [ladybug.sunpath](#doc/ladybug/sunpath.m.html)
* [ladybug.wea](#doc/ladybug/wea.m.html)
* [ladybug.wrapper](#doc/ladybug/wrapper.m.html)

### dependencies
* &#x1F5D7; [pyeuclid](https://code.google.com/p/pyeuclid/) - for vector math calculation. Available under LGPL.

`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

