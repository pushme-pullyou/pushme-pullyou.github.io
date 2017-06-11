
	user = {
		user : 'ladybug-tools',
		repo : 'honeybee',
		branch : 'master',
		path : '',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/ladybug',
		path : '',
		subText : 'A python library to create, run and visualize the results of daylight (radiance) and energy analysis (OpenStudio).',
		tagLine : 'A python library to create, run and visualize the results of daylight (radiance) and energy analysis (OpenStudio).',
		title : 'Honeybee',
	};


	MNU.tableOfContents =
`

* [honeybee Read Me]( #README.md )
* [License]( #LICENSE )
## Docs
* EnergyPlus
	* [EnergyPlus File Manager]( #doc/honeybee/energyplus/filemanager.m.html )
* Radiance
	* [Radiance]( #doc/honeybee/radiance/index.html )
	* More files to be added here
* Vector Math
	* [Vector Math]( #doc/honeybee/vectormath/euclid.m.html )
* [Config]( #doc/honeybee/config.m.html )
* [Data Operation]( #doc/honeybee/dataoperation.m.html )
* [Geometry Operation]( #doc/honeybee/geometryoperation.m.html )
* [HB Fenestration Surface]( #doc/honeybee/hbfensurface.m.html )
* [HB Object]( #doc/honeybee/hbobject.m.html )
* [HB Point Group]( #doc/honeybee/hbpointgroup.m.html )
* [HB Shade Surface]( #doc/honeybee/hbshadesurface.m.html )
* [HB Surface]( #doc/honeybee/hbsurface.m.html )
* [HB Zone]( #doc/honeybee/hbzone.m.html )
* [Helper]( #doc/honeybee/helper.m.html )
* [Room]( #doc/honeybee/room.m.html )
* [Surface Type]( #doc/honeybee/surfacetype.m.html )


`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

