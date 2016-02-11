<?php
	include("./../php/functionForm.php");
?>
<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		
		<link rel="shortcut icon" href="./../images/fond.png">
		
		<script src="//code.jquery.com/jquery-1.10.2.js"></script>
		<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
		<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
		
		<script type="text/javascript" src="./../js/requestForm.js"></script>
		<script type="text/javascript" src="./../js/saveLoadForm.js"></script>
		<script type="text/javascript" src="./../js/function.js"></script>
		<link href="./../styleMain.css" rel="stylesheet" type="text/css" />
		
		<title>Accueil | Projet</title>
	</head>

	<body onload="loadForm('general')">
		<div id="head">
			<div id="background">Thibault Aymeric</div>
			<a id="head-img" href="https://hal.archives-ouvertes.fr/"><img src="./../images/hal-logo.png" /></a>
			<ul>
				<li class="mainPage"><a href="index.php">Accueil</a></li>
				<li class="otherPage"><a id="index" onclick="saveForm('general', 'index')" href="index.php">Filtrage</a></li>
				<li class="otherPage"><a id="searcher" onclick="saveForm('general', 'searcher')" href="searcher.php">Chercheurs</a></li>
				<li id="option" class="otherPage">
					<a href="#">Pays partenaires</a>
					<ul>
						<li><a id="partnerMap" onclick="saveForm('general', 'partnerMap')" href="partnerMap.php">Carte</a></li>
						<li><a id="partnerArray" onclick="saveForm('general', 'partnerArray')" href="partnerArray.php">Tableau</a></li>
						<li><a id="partnerReseau" onclick="saveForm('general', 'partnerReseau')" href="partnerReseau.php">R&eacute;seau</a></li>
					</ul>
				</li>
				<li class="otherPage"><a id="keywords"  onclick="saveForm('general', 'keywords')" href="keywords.php">Mots-cl&eacute;s</a></li>
			</ul>
		</div>
		
		<div id="body">
			<div id="menu">
			</div>
			<div id="main">
				<a id="print" href=""></a>
			</div>
		</div>
	</body>
</html> 
