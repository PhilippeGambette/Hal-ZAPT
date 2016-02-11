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

		<!-- Function JS -->
		<script type="text/javascript" src="./../js/function.js"></script>
		<script type="text/javascript" src="./../js/requestForm.js"></script>
		<script type="text/javascript" src="./../js/saveLoadForm.js"></script>
		<script type="text/javascript" src="./js/keywords.js"></script>
		
		<!-- Style CSS -->
		<link href="./../styleMain.css" rel="stylesheet" type="text/css" />
		<link href="./styleKeywords.css" rel="stylesheet" type="text/css" />
		
		<link rel="shortcut icon" href="./../images/fond.png">
		<title>Mots-cl&eacute;s | Hal-ZAPT</title>
	</head>

	<body onload="loadForm('general');">
		<?php
			include('./../header.php');
		?>
		
		<div id="body">
			<?php
				include ('./../menu.php');
			?>
			<div id="main">
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
				<script src="./plugin/jquery.awesomeCloud-0.2.js"></script>
				
				<div id="wordcloud">
					<?php
						include("./../php/loadForm.php");
						createList();
					?>
				</div>
				
				<script>
					$(document).ready(function(){
						$("#wordcloud").awesomeCloud({
							"size" : {
								"grid" : 9,
								"factor" : 1
							},
							"options" : {
								"color" : "random-dark",
								"rotationRatio" : 0.35
							},
							"font" : "'Times New Roman', Times, serif",
							"shape" : "circle"
						});
					});
				</script> 
				<!--[if lt IE 7 ]>
						<script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
						<script>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
						<![endif]-->
						
				<script type="text/javascript">

					var _gaq = _gaq || [];
					_gaq.push(['_setAccount', 'UA-36251023-1']);
					_gaq.push(['_setDomainName', 'jqueryscript.net']);
					_gaq.push(['_trackPageview']);

					(function() {
						var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
						ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
						var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
					})();
					
				</script>
				
			</div>
		</div>
	</body>
</html> 
 
