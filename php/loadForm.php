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
	$max = 0;
	
	function loadRequest()
	{
		$field = "structure";
		$data = openJson($field);
		$request = "http://api.archives-ouvertes.fr/search/?q=";
		
		/* Laboratoire */
		$id = 0;
		foreach ($data->{$field} as $building)
		{
			foreach ($_GET[$building->{"building"}] as $labo)
			{
				if ($id == 0)
					$request = $request.'collCode_s:'.str_replace('"', '%22', $labo);
				else
					$request = $request."%20OR%20".str_replace('"', '%22', $labo);
				
				$id = $id + 1;
			}
		}
		
		/* Searcher */
		if ($id != 0)
			$request = $request."&fq=";
		
		$id = 0;
		foreach ($_GET["searcherUPEM"] as $searcher)
		{
			if ($id == 0)
				$request = $request.'authFullName_t:'.str_replace('"', '%22', $searcher);
			else
				$request = $request."%20OR%20".str_replace('"', '%22', $searcher);
			
			$id ++;
		}
		
		/* Date */
		if ($id != 0)
			$request = $request."&fq=";
		
		$request = $request."producedDateY_i:[".$_GET["begin"]."%20TO%20".$_GET["end"]."]";
		
		if ($_GET["publication"] != "")
		{
			if ($id != 0)
				$request = $request."&fq=";
			
			$request = $request.$_GET["publication"];
		}
		
		return $request.'&rows=100000000000000&fl=label_s,structHasAlphaAuthId_fs,labStructAddress_s,labStructCountry_s,halId_s,labStructNameId_fs,labStructAcronym_s,fr_keyword_s&indent=true';
	}
	
	function idOccurence($array, $word)
	{
		if (isset($array) == false)
			return -1;
		
		$id = 0;
		foreach ($array as $data)
		{
			if (strcmp($data[0], $word) == 0)
				return $id;
			
			$id ++;
		}
		
		return -1;
	}
	
	function createList()
	{
		$request = loadRequest();
		$contents = file_get_contents($request);
		$publi = json_decode($contents);
		
		foreach ($publi->{"response"}->{"docs"} as $data)
		{
			
			if (isset($data->{"fr_keyword_s"}) == true)
			{
				foreach ($data->{"fr_keyword_s"} as $word)
				{
					$id = idOccurence($array, $word);
					
					if ($id < 0)
						$array[] = [0 => $word, 1 => 1];
					else
					{
						$array[$id][1] ++;
						
						if ($array[$id][1] > $max)
							$max = $array[$id][1];
					}
				}
			}
		}
		
		$id = 0;
		foreach ($array as $data)
		{
			if ($id != 0)
				echo indent(5);
				
			echo '<span data-weight="'.($data[1] * 6).'"><a href="https://hal.archives-ouvertes.fr/search/index/?qa[keyword_t][]='.$data[0].'&qa[text][]=&submit_advanced=Rechercher&rows=30">'.$data[0].'</a></span>'."\n";
			
			$id ++;
		}
	}
	
	function createRequestForJS()
	{
		echo '<script type="text/javascript">'."\n";
		echo indent(3).'var requestHAL = "'.loadRequest()."\";\n";
		echo indent(2)."</script>\n";
	}
?>
