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
	echo '
		<div id="head">
			<div id="background"><a href="./../home/about.php">Hal-ZAPT</a></div>
			<a id="head-img" href="https://hal.archives-ouvertes.fr/"><img src="./../images/hal-logo.png" /></a>
			<ul>
				<li class="mainPage">
					<a href="./../index.php">Accueil</a>
				</li>
				<li id="option" class="otherPage">
					<a href="#">Laboratoires</a>
					<ul>
						<li><a id="partnerMap" onclick="saveForm('."'general', 'partnerMap'".')" href="./../partnerLab/partnerMap.php">Carte</a></li>
						<li><a id="partnerArray" onclick="saveForm('."'general', 'partnerArray'".')" href="./../partnerLab/partnerArray.php">Tableau</a></li>
					</ul>
				</li>
				<li class="otherPage">
					<a id="searcher" onclick="saveForm('."'general', 'searcher'".')" href="./../partnerSearcher/searcher.php">Chercheurs</a>
				</li>
				<li class="otherPage">
					<a id="country" onclick="saveForm('."'general', 'country'".')" href="./../partnerCountry/country.php">Pays partenaires</a>
				</li>
				<li class="otherPage">
					<a id="keywords"  onclick="saveForm('."'general', 'keywords'".')" href="./../keywords/keywords.php">Mots-cl&eacute;s</a>
				</li>
			</ul>
		</div>
';
?>
