	var user = {
		user : 'ladybug-tools',
		repo : 'ladybug-web',
		branch : 'gh-pages',
		rawgit : true,

		help : 'https://github.com/ladybug-tools/',
		path : '',
		subText : 'Browse & view stuff on Ladybug Web real fast!',
	};


	MNU.tableOfContents =
`
## Ladybug Web

* [Ladybug Web Read Me]( #readme.md )
* [Coding Style]( #coding-style.md )
* [License]( #license.md )
<!--[Project Explorer-readme]( #project-explorer-readme.md ) -->
### Analemma 3D
* [Analemma 3D Read Me]( #analemma-3d/readme.md )
* [Analemma 3D]( #analemma-3d/index.html )
### Ladybug Web Solar Calculator
#### Ladybug Solar Calculator
* [Ladybug Solar Calculator Read me]( #solar-calculator-ladybug-web/readme.md)
* [Ladybug Solar Calculator]( #solar-calculator-ladybug-web/solar-calculator-ladybug-web-viewer-r3.html )
#### Agafonkin
* [Agafonkin Solar Calculator Read Me]( #solar-calculator-agafonkin/readme.md )
* [Agafonkin Solar Calculator]( #solar-calculator-agafonkin/suncalc-sandbox-r7.html )
#### Bostock
* [Bostock Solar Calculator Read Me]( #solar-calculator-bostock/readme.md )
* [Bostock Solar Calculator]( #solar-calculator-bostock/bostock-solar-calculator-viewer-r5.html )
#### NOAA
* [NOAA Solar Calculator Read Me]( #solar-calculator-noaa/readme.md )
* [NOAA Solar Calculator]( #solar-calculator-noaa/ladybug-web-solar-calculator-noaa-viewer-r3.html )
#### Solar Calculator Compare
* [Calculators Compare Read me]( #solar-calculator-compare/readme.md )
* [Calculators Compare]( #solar-calculator-compare/calculations-compare-r5.html )

### Shadows
#### Shadow OBJ Core
* [Shadow OBJ Core Read Me]( #shadow-obj-core/readme.md )
* [Shadow OBJ Core ]( #shadow-obj-core/ladybug-web-shadow-obj-core-r3.html )
#### Shadow OBJ Gallery
* [Shadow OBJ Gallery Read Me]( #shadow-obj-gallery/readme.md )
* [Shadow OBJ Gallery ]( #shadow-obj-gallery/ladybug-web-shadow-obj-gallery-r3.html )
`;

	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};