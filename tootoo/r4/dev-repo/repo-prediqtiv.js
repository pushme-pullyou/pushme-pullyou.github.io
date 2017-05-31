	var images = 'https://prediqtiv.github.io/images/';

	var user = {
		user : 'prediqtiv',

		logo: '<img src=' + images + 'five-boxes.png height=32 >',
		repo : 'prediqtiv.github.io',
		branch : 'master',
		folder : '',

		infoLink : 'https://github.com/prediqtiv',
		title : '<img src=' + images + 'predIQtiv.png  height=64 >',
		tagLine : 'Invest Smarter!',
		subText : 'Invest smarter',
//		defaultFile : 'README.md'
	};


	MNU.tableOfContents =

`
### predIQtiv
* [predIQtiv home page]( #README.md )
* [Copyright and license]( #license.md )
### eyeCue
* [eyeCue Read Me]( #eye-cue/README.md )
    * [eyeCue Replay Read Me](#eye-cue/replay/README.md )
    * [eyeCue Realtime Read]( #eye-cue/realtime/README.md )
### Trades
* [Trades Get Read Me]( #trades-get/README.md )
### Tweets
* [Tweets Read Me]( #tweets/README.md )
### Company URLs
* [URL Get Read Me]( #url-get/README.md )
### White Papers
* [White Papers Read Me]( #white-papers/README.md )
    * [Markets, Outliers and Data Normalization]( #white-papers/outliers-data-normlization.md )
    * [Code, Styling and Abstraction]( #white-papers/code-styling-abstraction.md )
### [Blog Posts]( https://github.com/prediqtiv/prediqtiv.github.io/labels/blog%20post )
`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};