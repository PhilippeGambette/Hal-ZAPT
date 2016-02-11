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
		
		<!-- Function JS -->
		<script type="text/javascript" src="./../js/function.js"></script>
		<script type="text/javascript" src="./../js/requestForm.js"></script>
		<script type="text/javascript" src="./../js/saveLoadForm.js"></script>
		
		<!-- Style CSS -->
		<link href="./../styleMain.css" rel="stylesheet" type="text/css" />
		
		<link rel="shortcut icon" href="./../images/fond.png">
		<title>Accueil | Hal-ZAPT</title>
	</head>

	
	<body onload="loadForm('general')">
		<?php
			include('./../header.php');
		?>
		
		<div id="body">
			<?php
				include ('./../menu.php');
			?>
			<div id="main">
				<a id="print" href=""></a>
				<p id="publi">
					<h3>ZAPT est une application permettant de filtrer des publications via l'api de HAL.</h3><br>
					Pour cela vous disposez de divers champs pour filtrer vos publications:<br>
					<ul id="field">
						<li>Les laboratoires qui ont particip&eacute;s aux publications</li>
						<li>L'ann&eacute;e de publication</li>
						<li>Le type de publication</li>
						<li>Les chercheurs qui ont particip&eacute;s aux publications</li>
					</ul>
					<br>
					Divers page s'offre alors à vous:<br>
					<ul>
						<li><u>Laboratoire carte:</u> permet d'afficher sur une map la position des laboratoires partenaires avec les laboratoires que vous avez coch&eacute;.</li><br>
						<li><u>Laboratoire tableau:</u> permet d'afficher en ligne les laboratoires partenaires et en colonne les laboratoires que vous avez coch&eacute;.</li><br>
						<li><u>Chercheurs:</u> permet d'afficher un tableau contenant les chercheurs des laboratoires selectionn&eacute;es qui ont particip&eacute;s aux publications et affiche avec quels pays ils ont fait un partenariat</li><br>
						<li><u>Pays partenaire:</u> permet d'afficher sur une carte les pays qui ont particip&eacute;s le plus aux publications filtr&eacute;es avec une graduation. (Exept&eacute; la France)</li><br>
						<li><u>Les mots cl&eacute;s:</u> permet d'afficher les mots qui apparaissent le plus dans les publications filtr&eacute;es.</li><br>
					</ul>
				</p>
			</div>
		</div>
	</body>
</html> 
