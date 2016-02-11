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

var requestStruct = "";
var requestLab = "";
var requestPeriod = "";
var requestPubli = "";
var requestSearcher = "";
var date = "";


/*Concat the element 'add' to 'request' and separe with 'asssociation' if the request is not empty.*/
function addString(request, add, association)
{
	if (request == "")
		request = add;
	else
		request = request + association + add;
	
	return request;
}

/*
	Delete the element 'remove' to 'request' if the request is not empty.
*/
function removeString(request, remove, association)
{
	var temp1 = request.replace(remove + association, "");
	var temp2 = request.replace(association + remove, "");
	
	/*not association ex: q=UPEM*/
	if (request == temp1 && request == temp2)
		request = request.replace(remove, "");
	else
	{
		/*association left: ex: q=UPEM%20UPEC and delete UPEC*/
		if (request == temp1)
			request = temp2;
		else
			request = temp1;
	}
	
	return request;
}

/*
	Add element at the request if the element is checked or delete if is unchecked in the form 'general' only
*/
function getValueChecked(request, name, id, association)
{
	if (document.forms["general"].elements[name][id].checked == true)
		request = addString(request, document.forms["general"].elements[name][id].value, association);
	else
		request = removeString(request, document.forms["general"].elements[name][id].value, association);
	
	return request;
}

/*
	Return Date selected with the value in the form
*/
function getDate()
{
	var begin = document.forms["general"].elements["begin"].value;
	var end = document.forms["general"].elements["end"].value;
	return "[" + begin + "%20TO%20" + end + "]";
}

/*
	Return request hal with element checked.
*/
function createRequest()
{
	var id = 0;
	
	/* the begin of any request */
	var request = 'http://api.archives-ouvertes.fr/search/?q=';
	
	/* Lab */
	if (requestLab != "") {
		request = request + 'collCode_s:' + requestLab;
		id++;
	}
	
	/* Searcher */
	if (requestSearcher != "") {
		if (id == 0)
			request = request + "authFullName_t:" + requestSearcher;
		else
			request = request + "&fq=authFullName_t:" + requestSearcher;
		id++;
	}
	
	/* Date */
	if (requestPeriod != "")
	{
		if (id == 0)
			request = request + "producedDateY_i:" + requestPeriod;
		else if (id >= 1)
			request = request + "&fq=producedDateY_i:" + requestPeriod;
		id ++;
	}
	
	/* Publi */
	if (requestPubli != "")
	{
		if (id == 0)
			request = request + requestPubli;
		else if (id >= 1)
			request = request + "&fq=" + requestPubli;
		
		id ++;
	}
	
	if (id == 0)
		request = "";
	else
		request = request + '&rows=100000000000000&fl=label_s,structHasAlphaAuthId_fs,labStructAddress_s,labStructCountry_s,halId_s,labStructNameId_fs,labStructAcronym_s,fr_keyword_s&indent=true';
	
	return request;
}

/*
	Update request in web page when we change an element.
*/
function changeAdress(name)
{
	$.ajaxSetup({async: false});
	var request = createRequest();

	/*Transform id name in html page in link*/
	if (document.getElementById(name) != null) {
		document.getElementById(name).innerHTML = request;
		document.getElementById(name).href = request;
	}
	
	$.getJSON(request, function(data){
		var docs = data.response.docs;
		var id = 0;
		var result = "";
		
		for (id = 0; id < docs.length; id ++)
		{
			result = result + '<br><br>' + JSON.stringify(docs[id]["label_s"]);
		}
		
		/*replace id 'publi' by the result of request*/
		
		if (document.getElementById('publi') != null) {
			document.getElementById('publi').innerHTML = result;
		}
	});
}

/*
	call when check a lab
*/

function labChecked(id, nameStruct){
	requestLab = getValueChecked(requestLab, nameStruct, id, "%20OR%20");
	changeAdress('print');
}

/*
	call when check a searcher
*/

function searcherChecked(id, nameStruct) {
	requestSearcher = getValueChecked(requestSearcher, nameStruct, id, "%20OR%20");
	changeAdress('print');
}

/*
	Update the date when it is changed.
*/

function periodeChecked()
{
	requestPeriod = getDate();
	changeAdress('print');
}

/*
	call when check a publication
*/
function publicationChecked(id)
{
	if (id >= 0)
		requestPubli = getValueChecked("", "publication[]", id, "");
	else
		requestPubli = "";

	changeAdress('print');
}

/*
	check all labo when click on struct
*/

function allChecked(ref, name) {
	var form = ref;
	var id = 0;
	/*gone to field that we want*/
	
	while (form.parentNode && form.nodeName.toLowerCase() != 'form') {
		form = form.parentNode;
	}
	
	var elements = form.getElementsByTagName('input');
	
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].type == 'checkbox' && elements[i].name == name)  {
			elements[i].checked = ref.checked;
			requestLab = getValueChecked(requestLab, elements[i].name, id, "%20OR%20");
			id++;
		}
	}
	
	changeAdress('print');
}
