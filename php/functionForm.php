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
	function indent($nb)
	{
		if ($nb <= 0)
			return "";
		
		return "\t".indent($nb - 1);
	}
	
	function openJson($name)
	{
		$json = './../json/'.$name.'.json';
		$contents = file_get_contents($json);
		
		return json_decode($contents);
	}
	
	function createFunction($field, $id)
	{
		return $field."Checked(".$id.")";
	}
	
	function headingForm($str)
	{
		echo "<h2>".ucFirst($str)." :</h2>\n";
	}
	
	function structureForm ()
	{
		$field = "structure";
		$name = "building";
		$value = "value";
		headingForm($field);
		
		$result = openJson($field);
		
		$id = 0;
		
		foreach ($result->{$field} as $building)
		{
			echo indent(7).'<div class="building">'."\n";
			echo indent(8).'<label>';
			echo '<input type="checkbox" name="'.$field.'[]" value="'.$building->{$name}.'" onclick="allChecked(this, '."'".$building->{$name}.'[]'."'".');">';
			echo $building->{$name};
			echo '</label>'."\n";
			
			$cpt = 0;
			
			echo indent(8).'<div class="lab">'."\n";
			
			$idLab = 0;
			
			foreach ($building->{$value} as $lab)
			{
				echo indent(9);
				echo '<label>';
				echo '<input type="checkbox" name="'.$building->{$name}.'[]" ';
				echo 'value="%22'.$lab->{'name'}.'%22" onclick="labChecked('.$idLab.",'".$building->{$name}."[]'".')">'.$lab->{'name'}.'</label>'."\n";
				$idLab++;
			}
			
			echo indent(8).'</div>'."\n";
			echo indent(7).'</div>'."\n";
			
			$id ++;
		}
	}
	
	function searcherForm()
	{
		$field = "chercheur";
		$name = "name";
		$value = "value";
		
		headingForm($field);
		$result = openJson($field);
		
		foreach ($result->{$field} as $building) {
			echo indent(6).'<div class="'.$building->{$name}.'">'."\n";
			
			$idSearcher = 0;
			
			foreach($building->{$value} as $author) {
				echo indent(7).'<label><input type="checkbox" name="searcher'.$building->{$name}.'[]" value="%22'.urlencode($author).'%22" onclick="searcherChecked('.$idSearcher.", 'searcher".$building->{$name}."[]')".'" />'.ucwords($author)."</label>\n";
				$idSearcher ++;
			}
			
			echo indent(6).'</div>'."\n";
		}
	}
	
	function publicationForm()
	{
		$field = "publication";
		$name = 'code';
		$value = 'param';
		$title = 'name';
		
		headingForm($field);
		$result = openJson($field);
			
		$id = 0;
		foreach ($result->{$field} as $data)
		{
			$str = indent(7);
			
			$str = $str.'<label title="'.$data->{$title}.'">';
			
			$str = $str.'<input onclick="'.createFunction($field, $id).'" ';
			$str = $str.'type="radio" name="'.$field.'[]" value="'.$data->{$value}.'" />';
			$str = $str.$data->{$name}."</label>\n";
			
			echo $str;
			
			$id ++;
		}
	}
?>
