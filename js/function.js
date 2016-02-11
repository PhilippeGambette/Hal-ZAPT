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
	
	Copyright (C) Thibault PEYPELUT & Aymeric Zecchini
*/

/*
	toolbar for scroll date
*/
$(function()
{
	var day = new Date();
	var minimum = 1900;
	var maximum = day.getFullYear() + 1;
	
	$("#slider-range").slider(
	{
		range: true,
		min: minimum,
		max: maximum,
		values: [minimum, maximum],
		slide: function(event, ui)
		{
			$("#begin").val(ui.values[0]);
			$("#end").val(ui.values[1]);
		}
	});
	
	$("#begin").val($("#slider-range").slider("values", 0));
	$("#end").val($("#slider-range").slider("values", 1));
});

/*
	Return a table wich contains the answer docs of hal request.
*/

function getDocsHAL(name)
{
	var result;

	$.ajaxSetup({async: false});
	$.getJSON(name, function(data){ result = data.response.docs; });

	return result;
}

/*
	test if laboratory is checked or not
*/

function isLaboSelect(idStructure)
{
	
	var listLabo;
	
	$.getJSON("./../json/structure.json", function(data){ listLabo = data.structure; });
	
	for (var id = 0; id < listLabo.length; id ++)
	{
		var building = listLabo[id]["building"];
		
		for (var idv = 0; idv < listLabo[id]["value"].length; idv ++)
			if (listLabo[id]["value"][idv]["id"] == idStructure && document.forms["general"].elements[building + "[]"][idv].checked == true)
				return true;
	}
	
	return false;
}
