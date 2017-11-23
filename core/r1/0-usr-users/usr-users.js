
	var USR = USR || {};

	USR.peepsFavorites =

		'<optgroup label="Theo" >' +
			'<option selected >Theo-Armour</option>' +
			'<option>jaanga</option>' +
		'</optgroup>' +

		'<optgroup label="Three.js/WedGL" >' +
			'<option>Mrdoob</option>' +
			'<option>bhouston</option>' +
			'<option>gero3</option>' +
			'<option>saqoosha</option>' +
			'<option>WestLangley</option>' +
			'<option>zz85</option>' +
			'<option>Koblin</option>' +
			'<option>alteredq</option>' +
			'<option>kig</option>' +
			'<option>spite</option>' +
			'<option>greggman</option>' +
			'<option>philigb</option>' +
			'<option>toji</option>' +
			'<option>tparisi</option>' +
			'<option>aroduc</option>' +
			'<option>lo-th</option>' +
			'<option>CallumPrentice</option>' +
		'</optgroup>' +

		'<optgroup label="FGx">' +
			'<option>GeoffMcl</option>' +
			'<option>pedromorgan</option>' +
		'</optgroup>' +

		'<optgroup label="Google" >' +
			'<option>kenrussell</option>' +
			'<option>toji</option>' +
		'</optgroup>' +

		'<optgroup label="Ladybug" >' +
			'<option>MostaphaRoudsari</option>' +
			'<option>chriswmackey</option>' +
			'<option>ayezioro</option>' +
		'</optgroup>' +

		'<optgroup label="Sage Math" >' +
			'<option>PaulMasson</option>' +
			'<option>WilliamStein</option>' +
			'<option>HaraldSchilly</option>' +
			'<option>DanDrake</option>' +
		'</optgroup>' +

		'<optgroup label="???" >' +
			'<option>3Dmashup</option>' +
			'<option>art</option>' +
			'<option>alavit-d</option>' +
			'<option>mourner</option>' +
			'<option>mbostock</option>' +
		'</optgroup>' +

		'<optgroup label="OpenDesk" >' +
			'<option>harrykeen18</option>' +
		'</optgroup>' +

		'<optgroup label="Abantech" >' +
			'<option>GMelencio</option>' +
			'<option>jamesAbantech</option>' +
		'</optgroup>' +

		'<optgroup label="Wiredcraft" >' +
			'<option>hunvreus</option>' +
			'<option>quentinberder</option>' +
		'</optgroup>' +

		'<optgroup label="Autodesk" >' +
			'<option>jeremytammik</option>' +
			'<option>KeanW</option>' +
			'<option>Autodesk</option>' +
		'</optgroup>' +

	'';


	var oneWeekAgo = new Date();
	oneWeekAgo.setDate( oneWeekAgo.getDate() - 7 );
	var oneWeekAgo$ = oneWeekAgo.toJSON().slice( 0, 10 );

	USR.groupOptions =

	/*
		'<optgroup label="" >' +
			'<option value="+stars:>0" >User w/ repo w/ word "" & stars > 0</option>' +
			'<option value="+stars:>0" >User w/ repo w/ word "" & stars > 0</option>' +
			'<option value="+stars:>0" >User w/ repo w/ word "" & stars > 0</option>' +
		'</optgroup>' +
	*/

	// at least one item must be selected

		'<option value="listFavorites" >Theo\'s list of favs</option>' +

		'<optgroup label="Popular" >' +
			'<option  selected   value="stars:>20000" >Users with repos & stars > 20,000</option>' +
			'<option value="JavaScript+stars:>3000" >Users with word \'JavaScript\' & stars > 3000</option>' +
			'<option value="Python+stars:>3000" >Users with word \'Python\' & stars > 3000</option>' +
			'<option value="created:>' + oneWeekAgo$ + '" >Users/repos newer than ' + oneWeekAgo$ + '</option>' +
		'</optgroup>' +

		'<optgroup label="Pertaining to Three.js & 3D" >' +
			'<option value="three+stars:>300" >Users with word \'three\' & stars > 300</option>' +
			'<option value="3D+stars:>1000" >Users with word \'3D\' & stars > 1000</option>' +
			'<option value="stl+stars:>50" >Users with word \'stl\' & stars > 50</option>' +
		'</optgroup>' +

		'<optgroup label="Pertaining to mathematics" >' +
			'<option value="math+stars:>200" >Users with word \'math\' & stars > 200</option>' +
			'<option value="calculus+stars:>20" >Users with word \'calculus\' & stars > 20</option>' +
			'<option value="sagemath+stars:>0" >Users with word \'sagemath\' & stars > 0</option>' +
		'</optgroup>' +

		'<optgroup label="Pertaining to cartography" >' +
			'<option value="cartography+stars:>8" >Users with word \'cartography\' & stars >8</option>' +
			'<option value="maps+stars:>1000" >Users with word \'maps\' & stars >1000</option>' +
			'<option value="geojson+stars:>100" >Users with word \'geojson\' & stars >100</option>' +
			'<option value="geography+stars:>100" >Users with word \'geography\' & stars >100</option>' +
		'</optgroup>' +

		'<optgroup label="Pertaining to flight simulation" >' +
			'<option value="flight+stars:>100" >Users with word \'flight\' & stars >100</option>' +
		'</optgroup>' +

	'';
