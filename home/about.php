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

<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		
		<!-- JQuery -->
		<script src="//code.jquery.com/jquery-1.10.2.js"></script>
		<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
		<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
		
		<!-- Function JS -->
		<script type="text/javascript" src="./../js/function.js"></script>
		<script type="text/javascript" src="./../js/requestForm.js"></script>
		<script type="text/javascript" src="./../js/saveLoadForm.js"></script>
		
		<!-- Style CSS -->
		<link href="./../styleMain.css" rel="stylesheet" type="text/css" />
		
		<link rel="shortcut icon" href="./../images/fond.png">
		<title>A propos | Hal-ZAPT</title>
	</head>

	
	<body onload="loadForm('general')">
		<?php
			include('./../header.php');
		?>
		
		<div id="body">
			<div id="main">
				<h2>Qu'est ce que Hal-ZAPT</h2>
				<p style="margin:3em;">Logiciel libre permettant de visualiser des informations extraites de HAL</p>
				
				<h2>Mentions l&eacute;gales et droit d'auteurs</h2>
				<h3>Licence</h3>
				<p style="margin:3em;"><a href="http://www.gnu.org/licenses/gpl-3.0.fr.html">Licence GNU</a></p>
				<h3>Droit d'auteurs</h3>
				<p style="margin:3em;">
					Thibault PEYPELUT<br>
					Aymeric ZECCHINI
				</p>
			</div>
		</div>
	</body>
</html> 
