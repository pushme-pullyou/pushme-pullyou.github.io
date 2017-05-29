	var user = {
		user : 'github',
		subText: 'Your open source exploring happy place',
		repo : 'open-source-guide',
		branch : 'gh-pages',
		folder : '',
		rawgit: true,
		title : 'Open Source Guides'
	};


	MNU.tableOfContents =
`
* [About]( #README.md )

### Open Source Guides
* [How to Contribute to Open Source]( #_articles/how-to-contribute.md )
* [Starting an Open Source Project]( #_articles/starting-a-project.md )
* [Finding Users For Your Project]( #_articles/finding-users.md )
* [Building Welcoming Communities]( #_articles/building-community.md )
* [Best Practices for Maintainers]( #_articles/best-practices.md )
* [Leadership and Governance]( #_articles/leadership-and-governance.md )
* [Getting Paid for Open Source Work]( #_articles/getting-paid.md )
* [Your Code of Conduct]( #_articles/code-of-conduct.md )
* [Open Source Metrics]( #_articles/metrics.md )
* [The Legal Side of Open Source]( #_articles/legal.md )

### More
* [Contribute ]( #CONTRIBUTING.md )
* [Contributor Covenant Code of Conduct]( #CODE_OF_CONDUCT.md )
* [Legal Disclaimer / Licenses]( #notices.md )

### Docs
* [Content Model]( #docs/content-model.md )
* [Proposing a new guide]( #docs/new-guides.md )
* [Personas]( #docs/personas.md )
* [Roadmap]( #docs/roadmap.md )
* [Style Guide]( #docs/styleguide.md )

`;



	CON.massageText = function( response ){

		raw = response.slice( 4 )

		raw = raw.slice( raw.indexOf( '---' ) + 3 );

		text = TOO.converter.makeHtml( raw );

		text = text.replace( /image: \/assets/g, '<img src="https://rawgit.com/github/opensource.guide/gh-pages/assets' );

		text = text.replace( /src="\/assets/g, 'src="https://rawgit.com/github/opensource.guide/gh-pages/assets' );

		return text;

	}
