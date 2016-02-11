/*
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
*/

/*
	country doit etre en majuscule
*/
function putCountryArray(array, country)
{
	var id;
	
	if (country == "FR")
		return ;
	
	for (id = 0; id < array.length; id ++)
	{
		if (array[id]["id"] == country)
		{
			array[id]["value"] = parseInt(array[id]["value"]) + 1;
			return ;
		}
	}
	
	array.push({id: country, value:1});
}

function counterCountry()
{
	var idRequest;
	var idCountry;
	var result = new Array();
	
	var value = getDocsHAL(requestHAL);
	
	/* For each publication */
	for (idRequest = 0; idRequest < value.length; idRequest ++)
	{
		for (idCountry = 0; idCountry < value[idRequest]["labStructCountry_s"].length; idCountry ++)
			putCountryArray(result, value[idRequest]["labStructCountry_s"][idCountry].toUpperCase());
	}
	
	return result;
}

var map = AmCharts.makeChart( "chartdiv", {
  type: "map",
  theme: "none",

  colorSteps: 10,

  dataProvider: {
    map: "worldLow",
    areas: counterCountry()
  },

  areasSettings: {
    autoZoom: true
  },

  valueLegend: {
    right: 10,
    minValue: "little",
    maxValue: "a lot!"
  },

  "export": {
    "enabled": true
  }

} );
