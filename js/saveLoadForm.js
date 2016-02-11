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
	Save the choice when click in other page
*/
/*
function saveFormInput(form, name)
{
	var id;
	var cpt = 0;
	var text = "";
	
	for (id = 0; id < document.forms[form].elements[name].length; id ++)
	{
		if (document.forms[form].elements[name][id].checked == true)
		{
			if (cpt > 0)
				text += "&";
			
			text += name + "=" + document.forms[form].elements[name][id].value;
			cpt ++;
		}
	}

	return text;
}*/

/*
	Save the labs checked
*/
function saveStructureLab(form)
{
	var id;
	var cpt = 0;
	var idBuilding;
	var building;
	var name = "structure[]";
	var result = "";
	
	for (idBuilding = 0; idBuilding < document.forms[form].elements[name].length; idBuilding ++)
	{
		building = document.forms[form].elements[name][idBuilding].value;
		building += "[]";
		
		for (id = 0; id < document.forms[form].elements[building].length; id ++)
		{
			if (document.forms[form].elements[building][id].checked == true)
			{
				if (cpt > 0)
					result += "&";
			
				result += building + "=" + document.forms[form].elements[building][id].value;
				cpt ++;
			}
		}
	}
	
	return result;
}

/*
	Save the searchers check
*/

function saveSearcher(form) {
	var id;
	var cpt = 0;
	var name = "searcherUPEM[]";
	var result = "";
	
	for (id = 0; id < document.forms[form].elements[name].length; id++) {
		
		if (document.forms[form].elements[name][id].checked == true) {
			if (cpt > 0)
				result += "&";
			
				result += name + "=" + document.forms[form].elements[name][id].value;

			cpt++;
		}
	}
	
	return result;
}

/*
	Save the date choice
*/
function saveDate(form)
{
	var begin = "begin=" + document.forms[form].elements["begin"].value;
	var end = "end=" + document.forms[form].elements["end"].value;
	
	return begin + "&" + end;
}

/*
	Save the publication checked
*/
function savePublication(form)
{
	var id;
	var name = "publication[]";
	
	for (id = 0; id < document.forms[form].elements[name].length - 1; id ++)
		if (document.forms[form].elements[name][id].checked == true)
			return name + "=" + document.forms[form].elements[name][id].value;

	return "";
}

/*
	Save the choice when click in other page
*/
function saveForm(form, id)
{
	var structure = saveStructureLab(form);
	var date = saveDate(form);
	var publication = savePublication(form);
	var searcher = saveSearcher(form);

	document.getElementById(id).href = document.getElementById(id).href + "?" + ((structure == "")?"":structure + "&") + date + ((searcher == "")?"":"&" + searcher) + "&" + ((publication == "")?"publication":publication);
}

/*
	get element in the link
*/
function $_GET(param)
{
	var vars = {};
	document.location.href.replace
	( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function(m, key, value)
		{
			// callback
			vars[key] = ((value !== undefined)?value:'');
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;
	}
	return vars;
}

/*
	Load choice form at the begin
*//*
function loadFormInput(url, form, name)
{
	var id;
	
	for (id = 0; id < document.forms[form].elements[name].length; id ++)
	{
		if (url.search(document.forms[form].elements[name][id].value) > 0)
		{
			document.forms[form].elements[name][id].checked = true;
			if (name == "structure[]")
				structureChecked(id);
			else if (name == "publication[]")
				publicationChecked(id);
		}
	}
}*/
/*
function loadStructureLab(url, form)
{
	var id;
	var idBuilding;
	var name = "structure[]";
	var building;
	
	for (idBuilding = 0; idBuilding < document.forms[form].elements[name].length; idBuilding ++)
	{
		building = document.forms[form].elements[name][idBuilding].value;
		building += "[]";

		for (id = 0; id < document.forms[form].elements[building].length; id ++)
		{
			var str = document.forms[form].elements[name][idBuilding].value + "\\[\\]=" + document.forms[form].elements[building][id].value;
			var integer = url.search(str);

			if (integer > 0)
			{
				document.forms[form].elements[building][id].checked = true;
				labChecked(id, building);
			}
		}
	}
}
*/

/*
	Load structure with url
*/

function loadStructureLab(url, form)
{
	var id;
	var start = ".php?";
	var strtemp;
	var building;
	var lab;
	
	var intEnd = url.search("begin");
	
	url = url.substring(url.search(start) + start.length, intEnd);
	
	while (intEnd >= 0)
	{
		intEnd = url.search("&");
		
		if (intEnd == -1)
			break;
		
		strtemp = url.substring(0, intEnd);
		id = strtemp.search("=");
		
		building = strtemp.substring(0, id);
		lab = strtemp.substring(id + 1);
		
		for (id = 0; id < document.forms[form].elements[building].length; id ++)
		{
			if (document.forms[form].elements[building][id].value == lab)
			{
				document.forms[form].elements[building][id].checked = true;
				labChecked(id, building);
			}
		}
		
		url = url.substring(intEnd + 1);
	}
}

/*
	Load searcher with url
*/

function loadSearcher(url, form)
{
	var id;
	var strtemp;
	var name = "searcherUPEM[]";
	var nameUrl = "searcherUPEM\\[\\]=";
	var integer = url.search("publication");
	
	url = url.substring(url.search(nameUrl), integer);
	
	while (integer >= 0)
	{
		integer = url.search("&");
		
		if (integer == -1)
			break;
		
		strtemp = url.substring(name.length + 1, integer);
		url = url.substring(integer + 1);
		
		for (id = 0; id < document.forms[form].elements[name].length; id ++)
		{
			if (document.forms[form].elements[name][id].value == strtemp)
			{
				document.forms[form].elements[name][id].checked = true;
				searcherChecked(id, name);
				break;
			}
		}
	}
}

/*
	Load date with url
*/

function loadDate(url, form)
{
	var begin = "begin";
	var end = "end";
	
	if ($_GET(begin) != null && $_GET(end) != null)
	{
		document.forms[form].elements[begin].value = $_GET(begin);
		document.forms[form].elements[end].value = $_GET(end);
		periodeChecked();
	}
}

/*
	Load publication with url
*/

function loadPublication(url, form)
{
	var id;
	var name = "publication[]";
	
	for (id = 0; id < document.forms[form].elements[name].length - 1; id ++)
	{
		if (document.forms[form].elements[name][id].value == $_GET(name))
		{
			document.forms[form].elements[name][id].checked = true;
			publicationChecked(id);
			return ;
		}
	}
	
	document.forms[form].elements[name][document.forms[form].elements[name].length - 1].checked = true;
}

/*
	Load all element in url
*/
function loadForm(form)
{
	var url = document.location.href;
	
	loadStructureLab(url, form);
	loadDate(url, form);
	loadPublication(url, form);
	loadSearcher(url, form);
}
