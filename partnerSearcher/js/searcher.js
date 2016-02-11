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

var arrayAuthors;
var arrayCountry;
var arrayCounter;

var max;

/*
	Get an identifiant of one structure of "structHasAlphaAuthId_fs"
*/
function getIdStructure(string)
{
	var firstWord = "_AlphaSep_";
	var lastWord = "_FacetSep_";
	
	return string.substring(string.search(firstWord) + firstWord.length, string.search(lastWord));
}

/*
	Get an author of one data of "structHasAlphaAuthId_fs"
*/
function getAuthor(string)
{
	var firstWord = "_FacetSep_";
	var otherWord = "_JoinSep_";
	var result = new Array();
	
	/* Delete the unnecessary part */
	var strTemp = string.substring(string.search(firstWord) + firstWord.length);
	
	/* The name of the author */
	result[0] = strTemp.substring(strTemp.search(firstWord) + firstWord.length);
	/* The id of the author */
	result[1] = strTemp.substring(strTemp.search(otherWord) + otherWord.length, strTemp.search(firstWord));
	
	return result;
}

/*
	@brief Parse a data of "structHasAlphaAuthId_fs" of the HAL's data base
	@param arrayData "structHasAlphaAuthId_fs" of the HAL's data base
	@return An array of the authors
*/
function getAuthorsLocal(arrayData)
{
	var id;
	
	var author;
	var idStructure;
	
	var result = new Array();
	
	if (arrayData === undefined)
		return undefined;
	
	for (id = 0; id < arrayData.length; id ++)
	{
		/* Get the number of the structure (Identifiant) */
		idStructure = getIdStructure(arrayData[id]);
		
		/* Get an author of the publication */
		author = getAuthor(arrayData[id]);
		
		/* If it's a searcher local, we take him */
		if (isLaboSelect(idStructure) == true)
			result[result.length] = author;
	}
	
	return result;
}

/*
	@brief Parse a data of "structHasAlphaAuthId_fs" of the HAL's data base
	@param arrayData "structHasAlphaAuthId_fs" of the HAL's data base
	@return An array of the country
*/
function getCountry(arrayData)
{
	var id;
	var result = new Array();
	
	if (arrayData === undefined)
		return undefined;
	
	for (id = 0; id < arrayData.length; id ++)
		if (arrayData[id] != "fr")
			result.push(arrayData[id]);
	
	return result;
}

function getIdArrayCountry(array, country, arrayCounter)
{
	var id;
	
	for (id = 0; id < array.length; id ++)
		if (array[id] == country)
			return id;
	
	array.push(country);
	
	for (id = 0; id < arrayCounter.length; id ++)
		arrayCounter[id].push([0]);
	
	return array.length - 1;
}

function getIdArrayAuthor(array, author, arrayCounter)
{
	var id;
	
	for (id = 0; id < array.length; id ++)
		if (array[id][0] == author[0])
			return id;
	
	array.push(author);
	arrayCounter.push(new Array(arrayCounter[0].length));
	
	for (id = 0; id < arrayCounter[arrayCounter.length - 1].length; id ++)
		arrayCounter[arrayCounter.length - 1][id] = 0;
	
	return array.length - 1;
}

/*
	Create an array of all searchers
*/
function getArraySearcherVSCountry()
{
	var idRequest;
	var ida, idc;
	var idauthor;
	var idcountry;
	
	arrayAuthors = new Array();
	arrayCountry = new Array();
	arrayCounter = new Array(new Array());
	
	var request = createRequest();
	var value = getDocsHAL(request);
	
	/* For each publication */
	for (idRequest = 0; idRequest < value.length; idRequest ++)
	{
		/* Get a list of author local */
		var authorsLocal = getAuthorsLocal(value[idRequest]["structHasAlphaAuthId_fs"]);
		/* Get a list of country */
		var country = getCountry(value[idRequest]["labStructCountry_s"]);
		
		if (authorsLocal !== undefined && country !== undefined)
		{
			/* For each author */
			for (ida = 0; ida < authorsLocal.length; ida ++)
			{
				idauthor = getIdArrayAuthor(arrayAuthors, authorsLocal[ida], arrayCounter);
				
				for (idc = 0; idc < country.length; idc ++)
				{
					idcountry = getIdArrayCountry(arrayCountry, country[idc], arrayCounter);
					arrayCounter[idauthor][idcountry] = parseInt(arrayCounter[idauthor][idcountry]) + 1;
					
					if (max < arrayCounter[idauthor][idcountry])
						max = arrayCounter[idauthor][idcountry];
				}
			}
		}
	}
	
	return value.length;
}

function createArraySearcher()
{
	var idx, idy;
	var line;
	var column;
	var name;
	var nameCountry;
	var elt;
	var arrayHtml = document.getElementById("table-searcher");
	
	max = 0;
	
	while (arrayHtml.rows.length)
		arrayHtml.deleteRow(-1);
	
	getArraySearcherVSCountry();
	
	/* nothing data */
	if (arrayCountry.length <= 0 || arrayAuthors.length <= 0)
		return ;
	
	$.getJSON("./../json/country.json", function(data){ nameCountry = data.country; });
	
	line = arrayHtml.insertRow(0);
	line.insertCell(0);
	
	/* print country */
	for (idx = 0; idx < arrayCountry.length; idx ++)
	{
		column = line.insertCell(idx + 1);
		name = nameCountry[arrayCountry[idx]];
		
		if (name === undefined)
			column.innerHTML = "Code: " + arrayCountry[idx];
		else
			column.innerHTML = nameCountry[arrayCountry[idx]];
	}
	
	/* print author and affiliation */
	for (idy = 0; idy < arrayAuthors.length; idy ++)
	{
		line = arrayHtml.insertRow(idy + 1);
		column = line.insertCell(0);
		column.innerHTML = arrayAuthors[idy][0];
		
		for (idx = 0; idx < arrayCountry.length; idx ++)
		{
			column = line.insertCell(idx + 1);
			
			if (arrayCounter[idy][idx] != 0)
			{
				elt = document.createElement("a");
				elt.innerHTML = arrayCounter[idy][idx];
				elt.href = "https://hal.archives-ouvertes.fr/search/index/?qa[structCountry_t][]=" + arrayCountry[idx] + "&qa[authId_i][]=\"" + arrayAuthors[idy][1] + "\"&qa[text][]=&submit_advanced=Rechercher&rows=30";
				
				column.appendChild(elt);
			}
		}
	}
	
	sorttable.makeSortable(arrayHtml);
}
