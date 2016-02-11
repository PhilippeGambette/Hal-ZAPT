<!--
    This file is part of HAL ZAPT.

    HAL ZAPT is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    HAL ZAPT is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with HAL ZAPT.  If not, see <http://www.gnu.org/licenses/>
	
	Copyright (C) Thibault PEYPELUT & Aymeric ZECCHINI
-->

<?php
	include("./../php/functionForm.php");
?>
<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		
		<!-- JQuery -->
		<script src="//code.jquery.com/jquery-1.10.2.js"></script>
		<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
		<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
		
		<!-- Leaflet -->
		<link rel="stylesheet" href="./../leaflet/leaflet.css" />
		<script src="./../leaflet/leaflet.js"></script>
		<!-- Or online 		 
			<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
			<script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
		-->
		
		<!-- Function JS -->
		<script type="text/javascript" src="./../js/function.js"></script>
		<script type="text/javascript" src="./../js/requestForm.js"></script>
		<script type="text/javascript" src="./../js/saveLoadForm.js"></script>
		<script type="text/javascript" src="./js/partner.js"></script>
		
		<!-- Style CSS -->
		<link href="./../styleMain.css" rel="stylesheet" type="text/css" />
		
		<link rel="shortcut icon" href="./../images/fond.png">
		<title>Carte des labos | Hal-ZAPT</title>
	</head>

	<body onload="loadForm('general');createMapPartner();">
		<?php
			include('./../header.php');
		?>

		<div id="body">
			<?php
				include ('./../menu.php');
			?>
			<div id="main" valign="top">
				<div id="map">		
				</div>
			</div>
		</div>
	</body>
</html> 
