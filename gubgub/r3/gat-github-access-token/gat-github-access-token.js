/* globals FIL */
/* jshint esversion: 6 */
/* jshint loopfunc: true */

const GAT = {

	"copyright": "Copyright 2019 PushMe-PullYou authors",
	"date": "2019-06-08",
	"description": "GitHub access token",
	"helpFile": "https://pushme-pullyou.github.io/tootoo14/js-14-1/gat-github-access-token/README.md",
	"license": "MIT License",
	"version": "0.14.06-0gat",
};



GAT.getMenuGitHubAccessToken = function() {

	//GAT.divContents = divContents;
	//GAT.urlGitHubSource = "https://github.com/" + GAT.user + "/" + GAT.repo;
	//GAT.urlGitHubApiContents = 'https://api.github.com/repos/' + GAT.user + "/" + GAT.repo + '/contents/' + GAT.pathRepo;
	const token = localStorage.getItem( "githubAccessToken" );

	GAT.accessToken = token ? `access_token=${ token }`: "";

	const htm =
	`
		<details>

			<summary><h3>GitHub API Access Token</h3>
			</summary>
			<button id=butGAT class=butHelp onclick="POP.setPopupShowHide(butGAT,GAT.helpFile);" style=float:right; >?</button>

			<p>
				<div>Access token</div>
				<input value="${ GAT.accessToken.replace(/access_token=/,"") }" id=GATinpGitHubApiKey  onclick=this.select(); onblur=GAT.setGitHubAccessToken(this.value); title="Obtain API Access Token" style=width:100%; >
			</p>

			<p>
				<button id=GATbutRateLimits onclick=GAT.rateLimits(GATbutRateLimits); title='If files and folder stop appearing, it is likely due to too many API calls' >
					View GitHub API rate limits</button>
			</p>

			<div id=GATdivLimits ></div>

		</details>
	`;

	return htm;

}

GAT.setGitHubAccessToken = function( accessToken ) {

	localStorage.setItem( "githubAccessToken", accessToken );


	//GAT.accessToken = accessToken ? `access_token= ${ GAT.accessToken }`: "";


	console.log( 'GAT.accessToken', GAT.accessToken );

};




GAT.getGitHubAccessToken = function() {

	console.log( '', 23 );

	const token = localStorage.getItem( "githubAccessToken" );

	GAT.accessToken = token ? `access_token= ${ token }`: "";


	console.log( 'GAT.accessToken', GAT.accessToken );

};




GAT.rateLimits = function( button, target = GATdivLimits) {
	//console.log( 'button', button );

	const url = "https://api.github.com/rate_limit";

	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', url, true );
	xhr.onload = callback;
	xhr.send( null );

	function callback( xhr ) {

		const htm =
		`
			<h3>GitHub rate limits status</h3>

			<p>
				Some TooToo scripts use the GitHub Developer API which has rate limits.
			</p>

			<p>See <a href="https://developer.github.com/v3/#rate-limiting" target="_blank">developer.github.com/v3</a>.</p>

			<pre> ${ xhr.target.response } </pre>
		`;

		target.innerHTML = htm;

	}

};