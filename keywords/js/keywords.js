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

function createListKeywords()
{
	var id;
	var idPubli;
	var eltLi, eltA;
	var list = document.getElementById("keywordsList");
	
	var request = createRequest();
	var values = getDocsHAL(request);
	
	for (idPubli = 0; idPubli < values.length; idPubli ++)
	{
		if (values[idPubli]["fr_keyword_s"] !== undefined)
		{
			for (id = 0; id < values[idPubli]["fr_keyword_s"].length; id ++)
			{
				eltLi = document.createElement("li");
				eltA = document.createElement("a");
				eltA.innerHTML = values[idPubli]["fr_keyword_s"][id];
				eltA.href = "#";
				eltLi.appendChild(eltA);
				list.appendChild(eltLi);
			}
		}
	}
}

function scrollKeywords()
{
	try {
		TagCanvas.Start('myCanvas','tags',{
			textColour: '#D56022',
			outlineColour: '#99999',
			reverse: true,
			depth: 0.8,
			maxSpeed: 0.05
	});
	} catch(e) {
		// something went wrong, hide the canvas container
		document.getElementById('myCanvasContainer').style.display = 'none';
	}
}
