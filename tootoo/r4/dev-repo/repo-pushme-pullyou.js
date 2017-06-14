
	var user = {
		user : 'pushme-pullyou',
		repo : 'pushme-pullyou.github.io',
		branch : 'master',
		path : '',


//		infoLink : '''
		tagLine : 'Browse & view stuff on GitHub real fast!',
		subText : 'Browse & view stuff on GitHub real fast!',
		title : 'PushMe PullYou',
	};


	MNU.tableOfContents =
`### Pushme-Pullyou
* [Read Me]( #README.md )
### GubGub
* [Read Me]( #gubgub/README.md )
### DabDab
* [Read Me]( #dabdab/README.md )
### TooToo
* [TooToo Read Me]( #tootoo/README.md )
#### TooToo 4
* [Dev Read Me]( #tootoo/r3/dev/README.md )
* [Library Read Me]( #tootoo/r4/library/README.md )
* [Skim Read Me]( #tootoo/r4/skim/README.md )
### TooToo 5
* [Ladybug Tools View Read Me ]( tootoo/r5/ladybug-tools-view/README.md )
* &#x1F5D7; [Ladybug Tools View]( https://pushme-pullyou.github.io/tootoo/r5/ladybug-tools-view/ladybug-tools-view-r1.html )
#### TooToo Utilities
* [Utilities Read Me]( #tootoo/r4/utilities/README.md )
* [get-github-dir-names]( #tootoo/r4/utilities/get-github-dir-names/README.md )
* [Make Read Me Read Me]( #tootoo/r4/utilities/make-github-readme/README.md )
* [Merge Files into one]( #tootoo/r4/utilities/merge-files-into-one/README.md )

`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};
