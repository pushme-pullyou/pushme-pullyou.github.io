
let basicHTML =


`		<div id=menu >

			<h2>
<!--
					<a href=http://pushme-pullyou.github.io title="pushMe pullYou - your Github repo happy place" > &#x2766 </a><br>
-->
				<a id=mnuTitle href="" title="Click here to refresh this page" ></a>
				<a id=mnuHelp href=https://github.com/pushme-pullyou onmouseover=popHelp.style.display=""; onmouseout=popHelp.style.display="none"; > &#x24D8; </a>
			</h2>

			<div class=popUp id=popHelp style=display:none; ><p>Hi there!</p>Click the i-in-circle, info icon for latest updates.</div>

			<div id=mnuTagline ><small></small></div>

			<div id=mnuSelect ></div>

			<div id=mnuContents ></div>

			<div id=mnuSettings ></div>
			<div id=mnuCount ></div>
			<div id=mnuAbout ></div>

		</div>

		<div id=hamburger onclick=container.style.left=container.style.left===""?"-325px":""; >
			<div id=bars title="Click this hamburger to slide the menu" > &#9776 </div>
		</div>

		<div id=contents ></div>

		<div id=butEditFile >Edit</div>
		<div id=butNextFile >&gt;</div>
		<div id=butPreviousFile >&lt;</div>

`;
