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
	Place point on the map
	array[id][0] contains name of lab local and array[id][1] contains number of publication
*/
function putPointOnMap(map, array)
{
 var id;
 var marker;
 
	for (id = 0; id < array.length; id++) {
		marker = L.marker([array[id][0], array[id][1]]).addTo(map);
		marker.bindPopup('<a href="www.google.fr">' + array[id][2] + '</a>');
	}
}

/*
	return array which contain all lab local checked. [i][0]: name, [i][1]: id lab
*/

function laboIdLocal (form)	 {
	var i, j;
	var name = "structure[]";
	var building;
	var arrayIdLabLocal = [];
	var nameChecked;
	var reg = new RegExp('["%22]', 'gi');
	var cpt = 0;
	
	$.ajaxSetup({async: false});

	for (i = 0; i < document.forms[form].elements[name].length; i++) {
		building = document.forms[form].elements[name][i].value + "[]";

		for (j = 0; j <  document.forms[form].elements[building].length; j++) {
			if (document.forms[form].elements[building][j].checked == true) {
				nameChecked = document.forms[form].elements[building][j].value;
				nameChecked = nameChecked.replace(reg, "");
				
				$.getJSON("../json/structure.json", function(data){
					var k, l, m;
					var result = data.structure;

					for (k = 0; k < result.length; k++) {
						for (l = 0; l < result[k]["value"].length; l++) {
							if (nameChecked == JSON.stringify(result[k]["value"][l]["name"]).replace(reg, "")) {
								for(m = 0; m < arrayIdLabLocal.length; m++) {
									if (arrayIdLabLocal[m][1] == JSON.stringify(result[k]["value"][l]["id"])) {
										break;
									}
								}
								/*if lab local is not present, because lab can be check many times*/
								if (m == arrayIdLabLocal.length) {
									arrayIdLabLocal.push([nameChecked, JSON.stringify(result[k]["value"][l]["id"])]);
								}
							}
						}
					}
					
				});
			}
		}
	}
	
	return arrayIdLabLocal;
}

/*
	extract Id lab with field structHasAlpha
*/
function getIdStructure(string)
{
	var firstWord = "_AlphaSep_";
	var lastWord = "_FacetSep_";
	
	return string.substring(string.search(firstWord) + firstWord.length, string.search(lastWord));
}

/*
	extract Id lab with labStructNameId_fs
*/

function getIdLabStructNameId (string) {
	var word = "FacetSep_";
	return string.substring(string.search(word) + word.length, string.length - 1);
}

/*
	extract name lab with labStructNameId_fs
*/

function getNameLabStructNameId (string) {
	var firstWord = "_AlphaSep_";
	var lastWord = "_FacetSep_";
	return string.substring(string.search(firstWord) + firstWord.length, string.search(lastWord));
}

/*
	arrayId contains id publi and function create link for hal
*/

function createLinkWithTableIdPubli(arrayId) {
	var link;
	var i;
	
	
	if (arrayId.length == 0) {
		return '';
	}
	
	link = 'https://hal.archives-ouvertes.fr/search/index/?qa[halId_id][]=';
	
	for (i = 0; i < arrayId.length; i++) {
		if (i == 0) {
			link = link + arrayId[i];
		}
		
		else {
			link = link + '%20OR%20' + arrayId[i];
		}
	}
	
	link = link + '&qa[text][]=&submit_advanced=Rechercher&rows=100';
	
	return link;
}

/*
	create map in partnerMap.php
*/

function createMapPartner () {
	var request = createRequest();
	var arrayAddress = []; /*[i][0] = address, [i][1] = repetition, [i][2][k][0] = partner id lab local; [i][2][k][1] = partner lab local repetition; [i][2][k][2][j] = tab id publi */
	var arrayCoordInfo = []; /*[i][0] = lat, [i][1] = lon; [i][2] = arrayAdress[i][2]*/
	var addressLab;
	var arrayIdLabLocal = []; /*[i][0] = name of labo, [i][1] = id of labo: contains labo we have checked*/						
	var idLabAlphaStruct = []; /*contains all id of labo which participate int the publication*/
	var resultDocs;
	var reg = new RegExp('[\\[\\]"]', 'gi'); /* replace [ ] " */
	var  i = 0, j = 0, k = 0, m = 0, l = 0, n = 0;
	var idPubli;
	
	$.ajaxSetup({async: false});
	
	/*we recove the lab that we have checked*/
	arrayIdLabLocal = laboIdLocal('general');
	
	resultDocs = getDocsHAL(request);

	/*route all publication of request result*/
	for (i = 0; i < resultDocs.length; i++) {
		if (resultDocs[i]["label_s"] !== undefined) {
			idPubli = JSON.stringify(resultDocs[i]["halId_s"]).replace(reg, "");
			
			/*construct array with id of laboratory in field structHasAlphaAuthId (use this field because it can missing information if we use labStructNameId_fs with labStructAddress_s*/
			if (resultDocs[i]["structHasAlphaAuthId_fs"] !== undefined) {
				var alphaStruct;
				idLabAlphaStruct = [];
				/*all structHasAlphaAuthId*/
				for (j = 0; j < resultDocs[i]["structHasAlphaAuthId_fs"].length; j++) {
					alphaStruct = JSON.stringify(resultDocs[i]["structHasAlphaAuthId_fs"][j]);
					if (alphaStruct != undefined) {
						var idLab = getIdStructure(alphaStruct);
						
						for (k = 0; k < idLabAlphaStruct.length; k++) {
							if (idLabAlphaStruct[k] == idLab) {
								break;
							}
						}
						
						if (idLabAlphaStruct.length == k) {
							idLabAlphaStruct.push(idLab);
						}	
					}
				}
			}
			
			/*all address in request*/
			if (resultDocs[i]["labStructAddress_s"] !== undefined) {						
				for (j = 0; j < resultDocs[i]["labStructAddress_s"].length; j++) {
					addressLab = JSON.stringify(resultDocs[i]["labStructAddress_s"][j]);
														
					if (addressLab != undefined) {
						addressLab = addressLab.replace(reg, "");
						/*check if address is already present*/
						for (k = 0; k < arrayAddress.length; k++) {
							if (Object.is(arrayAddress[k][0], addressLab)) {
								/*number of times that address is present, we don't use but we have let information*/
								(arrayAddress[k][1])++;
								break;
							}
						}
						
						/*new address*/
						if (k == arrayAddress.length) {
							arrayAddress.push([addressLab, 1, []]);
						}
						
						/*insert lab local in address*/														
						for (l = 0; l < arrayIdLabLocal.length; l++) {
							for (m = 0; m < idLabAlphaStruct.length; m++) {
								if (idLabAlphaStruct[m] == arrayIdLabLocal[l][1]) {
									/*k is the case where we have edit the last address*/
									for (n = 0; n < arrayAddress[k][2].length; n++) {
										/*if partner lab is already present in this adress*/
										if (arrayAddress[k][2][n][0] == arrayIdLabLocal[l][0]) {
											arrayAddress[k][2][n][1]++;
											break;
										}
									}
									
									if (n == arrayAddress[k][2].length) {
										arrayAddress[k][2].push([arrayIdLabLocal[l][0], 1, []]);
									}
									
									arrayAddress[k][2][n][2].push([idPubli]);
								}												
							}		
						}
					}
				}
			}
		}
	}
	
	/*Convert adress in latitude and longitude but stop at 10000 beacause we are limite at 15000 query per day with api google*/
	for (i = 0; i < arrayAddress.length && i < 10000; i++) {
		//$.getJSON('http://nominatim.openstreetmap.org/search/' + tab_adresse[i] + '?format=json', function(data){
		$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + arrayAddress[i][0], function(data){
			var lat = ' ', lon = ' ';
			var reg = new RegExp('["]', 'gi'); /* delete [ ] " */
			var infoPartnerLab = "";
			if (data != undefined && data.results.length > 0) {
				//lat = parseFloat(JSON.stringify(data[0]["lat"]));
				//lon = parseFloat(JSON.stringify(data[0]["lon"]));
				
				lat = JSON.stringify(data.results[0]['geometry']['location']['lat']).replace(reg, '');
				lon = JSON.stringify(data.results[0]['geometry']['location']['lng']).replace(reg, '');
				
				if (arrayAddress[i][2] != undefined) {
					var linkPubli;
					for (j = 0; j < arrayAddress[i][2].length; j++) {
						linkPubli = createLinkWithTableIdPubli(arrayAddress[i][2][j][2]);
						infoPartnerLab =  infoPartnerLab +  '<span title="' + arrayAddress[i][2][j][2].join(", ") + '"><a href="' + linkPubli + '">' + arrayAddress[i][2][j][0] + ":" + arrayAddress[i][2][j][1] + "</a></span>  </br>";
					}
					
					if (infoPartnerLab != "") {
						arrayCoordInfo.push([lat, lon, infoPartnerLab]);
					}
				}
			}
		});
		
	}

	var map = L.map('map').setView([48.856614, 2.352222], 5);
	
	var CM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			 key: "xxxxxxxxxxxx",
			 attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>contributors, &copy <a href="http://cloudmade.com/">CloudMade</a>',
			 styleId: 22677
			 }).addTo(map);
			 
	putPointOnMap(map, arrayCoordInfo);	
}

/*
	function which create table in page partnerArray
*/

function createArrayPartner() {
	var request = createRequest();
	var arrayIdLabLocal = []; /*[i][0] = name of labo, [i][1] = id of labo: contains labo we have checked*/						
	var idLabAlphaStruct = []; /*contains all id of labo which participate in the publication*/
	var request	= createRequest();
	var resultDocs = getDocsHAL(request);
	var arrayHtml = document.getElementById("table-partner");
	var i, j, k, l, m;
	var column;
	var row;
	var idLab;
	var arrayLabExtern = []; /*final array [i][0] = nameLab, [i][1] = idLab, */
	var arrayLabExternTmp = []; /*contains extern lab for each publication: [i][0] = name, [i][1] = id, [i][2][j][0] = number publication with lab in j position on column, [i][2][j][1] = idPubli*/
	var arrayLabLocalTmp = []; /*contains local lab for each publication: [i] = idLabLocal*/
	var idPubli;
	var reg = new RegExp('[\\[\\]"]', 'gi'); /* replace [ ] " */
	
	$.ajaxSetup({async: false});
		
	/*we recove the lab that we have checked*/
	arrayIdLabLocal = laboIdLocal('general');	
	
	row = arrayHtml.insertRow(0);
	row.insertCell(0);
	
	/*write lab checked*/
	for(i = 0; i < arrayIdLabLocal.length; i++) {
		column = row.insertCell(i + 1);
		column.innerHTML = arrayIdLabLocal[i][0] + "(" + arrayIdLabLocal[i][1] + ")";
	}
	
	/*
		for each publication
	*/

	for (i = 0; i < resultDocs.length; i++) {
		if (resultDocs[i]["halId_s"] !== undefined) {
			idPubli = JSON.stringify(resultDocs[i]["halId_s"]).replace(reg, "");
			/*construct array with id of laboratory in field labStructNameId_fs */
			if (resultDocs[i]["labStructNameId_fs"] !== undefined) {
				arrayLabExternTmp = [];
				arrayLabLocalTmp = [];
				
				for (j = 0; j < resultDocs[i]["labStructNameId_fs"].length; j++) {
					idLab = getIdLabStructNameId(JSON.stringify(resultDocs[i]["labStructNameId_fs"][j]));
					
					/*all local in publication*/
					for (k = 0; k < arrayIdLabLocal.length; k++) {
						if (arrayIdLabLocal[k][1] == idLab) {
							arrayLabLocalTmp.push(arrayIdLabLocal[k][1]);
							break;
						}
					}
					/*else is an extern*/
					if (k == arrayIdLabLocal.length) {
						arrayLabExternTmp.push([getNameLabStructNameId(JSON.stringify(resultDocs[i]["labStructNameId_fs"][j])), idLab, []]);
					}
				}
				
				/*add local in array extern*/
				
				for (j = 0; j < arrayLabExternTmp.length; j++) {
					if (arrayLabLocalTmp.length > 0) {
						arrayLabExternTmp[j][2].push(arrayLabLocalTmp);
					}
				}
					
				/*for each lab extern temporary found*/
				for (j = 0; j < arrayLabExternTmp.length; j++) {
					/*test if a lab extern is already present*/
					for (k = 0; k < arrayLabExtern.length; k++) {
						/*if exist*/
						if (arrayLabExtern[k][1] == arrayLabExternTmp[j][1]) {
							break;
						}
					}
					
					/*if not exist, create an lab with name, id and we put number of publication with lab local at 0*/
					if (k == arrayLabExtern.length) {
						arrayLabExtern.push([arrayLabExternTmp[j][0], arrayLabExternTmp[j][1], []]);
						for (l = 0; l < arrayIdLabLocal.length; l++) {
							arrayLabExtern[k][2].push([0, []]);
							
						}
					}
			
					/*add the collaboration*/

					for (l = 0; l < arrayLabExternTmp[j][2].length; l++) {
						for (m = 0; m < arrayIdLabLocal.length; m++) {
							if (arrayIdLabLocal[m][1] == arrayLabExternTmp[j][2][l]) {
								arrayLabExtern[k][2][m][0]++;
								arrayLabExtern[k][2][m][1].push(idPubli);
							}
						}
					}
				}
			}
		}
	}
	
	/*
		create table html
	*/
	
	var link;
	
	for (i = 0; i < arrayLabExtern.length; i++) {
		row = arrayHtml.insertRow(i + 1);
		column = row.insertCell(0);

		column.innerHTML = arrayLabExtern[i][0] + "(" + arrayLabExtern[i][1] + ")";
		
		for (j = 0; j < arrayLabExtern[i][2].length; j++) {
			column = row.insertCell(j + 1);
			link = createLinkWithTableIdPubli(arrayLabExtern[i][2][j][1]);
					
			if (arrayLabExtern[i][2][j][0] > 0) {
				column.innerHTML = '<span title="' + arrayLabExtern[i][2][j][1].join(", ") + '"><a href="' + link + '">' + arrayLabExtern[i][2][j][0] + '</a></span>';
			}
		}	
	}
	
	/*
		column sort
	*/
	
	sorttable.makeSortable(arrayHtml);
}