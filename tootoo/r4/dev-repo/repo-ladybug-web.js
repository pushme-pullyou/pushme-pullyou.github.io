	var user = {
		user : 'ladybug-tools',
		subText : 'Browse & view stuff on Ladybug Web real fast!',
		repo : 'ladybug-web',
		rawgit: true,
		branch : 'gh-pages',

		path : '',
	};


	MNU.tableOfContents =
`## Ladybug Web

[Ladybug Web Read Me]( #readme.md )
[Coding Style]( #coding-style.md )
[License]( #license.md )
[Project Explorer-readme]( #project-explorer-readme.md )
### Analemma 3D
[Annalema 3D Read Me]( #analemma-3d/readme.md )

### Ladybug Web Solar Calculator
[Solar Calculator Read me]( #solar-calculator-ladybug-web/readme.md)
[Solar Calculator](  #solar-calculator-ladybug-web/solar-calculator-ladybug-web-viewer-r3.html )
#### Agafonkin
[Agafonkin Solar Calculator Read Me]( #solar-calculator-agafonkin/readme.md )
[Agafonkin Solar Calculator]( #solar-calculator-agafonkin/suncalc-sandbox-r7.html )
#### Bostock
[Bostock Solar Calculator Read Me]( #solar-calculator-bostock/readme.md )
[Bostock Solar Calculator]( #solar-calculator-bostock/bostock-solar-calculator-viewer-r5.html )
#### NOAA
[NOAA Solar Calculator Read Me]( #solar-calculator-noaa/readme.md )
[NOAA Solar Calculator]( #solar-calculator-noaa/ladybug-web-solar-calculator-noaa-viewer-r3.html )
`;

	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};