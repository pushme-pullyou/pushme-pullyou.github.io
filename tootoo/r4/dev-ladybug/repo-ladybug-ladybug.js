
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
## Ladybug

* [Ladybug Read Me]( #README.md )
* [License]( #LICENSE )

### [API Documentation](#doc/)

##### [ladybug.analysisperiod](#doc/analysisperiod.m.html)
##### [ladybug.color](#doc/color.m.html)
##### [ladybug.comfort](#doc/comfort/index.html)
##### [ladybug.datacollection](#doc/datacollection.m.html)
##### [ladybug.datatype](#doc/datatype.m.html)
##### [ladybug.dt](#doc/dt.m.html)
##### [ladybug.epw](#doc/epw.m.html)
##### [ladybug.header](#doc/header.m.html)
##### [ladybug.legendparameters](#doc/legendparameters.m.html)
##### [ladybug.listoperations](#doc/listoperations.m.html)
##### [ladybug.location](#doc/color.m.html)
##### [ladybug.psychrometrics](#doc/location.m.html)
##### [ladybug.rootFinding](#doc/rootFinding.m.html)
##### [ladybug.sky](#doc/sky.m.html)
##### [ladybug.skyvector](#doc/skyvector.m.html)
##### [ladybug.sunlighthours](#doc/sunlighthours.m.html)
##### [ladybug.sunpath](#doc/sunpath.m.html)
##### [ladybug.wea](#doc/wea.m.html)

### dependencies
[pyeuclid](https://code.google.com/p/pyeuclid/) for vector math calculation. It's available under LGPL.

`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

