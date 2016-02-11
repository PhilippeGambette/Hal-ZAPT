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
			<div id="menu">
				<form method="get" action="index.php" name="general">
					<fieldset id="structure">
						';
	
	structureForm();
	
	echo indent(5).'</fieldset>
					
					<fieldset id="periode">
						<h2>Date de publication :</h2>
						<label id="slide">
							P&eacute;riode:
							<input type="text" name="begin" id="begin" size="4" maxlength=4 class="time" onchange="periodeChecked()" />
							&agrave;
							<input type="text" name="end" id="end" size="4" maxlength=4 class="time" onchange="periodeChecked()" />
						</label>
						
						<div id="slider-range" onmouseup="periodeChecked()"></div>
					</fieldset>
					<fieldset id="publication">
						';
	
	publicationForm();
	
	echo indent(7).'<label title="Aucune publication spécifiée"><input onclick="publicationChecked(-1)" type="radio" name="publication[]" value="" />RIEN</label>
					</fieldset>
					<fieldset id="chercheur">
						';
	searcherForm();
	
	echo indent(5).'</fieldset>
				</form>
			</div>
';
?>
