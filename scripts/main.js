var count = 100;
var tbody = document.getElementById('tbody');
var tableHeadRow = document.getElementById('tableHeadRow');
var tr, th, div, input;
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
var alphabetLength = alphabet.length;
var active_sheet = document.getElementsByClassName('active_sheet');
var filled_cells = document.getElementsByClassName('filled');

function createTable() {

	alphabet.forEach(function(item, i, arr) {
		for (var k = 1; k <= alphabetLength; k++){
			arr.push( item + arr[k-1] );
		}
	});

	for (var i = 1; i <= count; i++) {
		tr = document.createElement('tr');
		th = document.createElement('th');
		div = document.createElement('div');
		div.setAttribute('class','line');

		tr.appendChild(th).appendChild(div)

		for (var n = 1; n <= count; n++) {
			
			td = document.createElement('td');
			tr.appendChild(td);
		}
		
		if (i > 1) {
			if (i < alphabet.length) {
				div.innerHTML = alphabet[i-2];
			}
		}

		tbody.appendChild(tr);
		tableHeadRow.appendChild(th.cloneNode(true));

		div.innerHTML = i;
	}
}
createTable();

var excel = document.getElementById('excel');
var lines = document.getElementsByClassName('line');
var selected_lines = document.getElementsByClassName('selected_line');
var sheets = document.getElementsByTagName('SPAN');
var new_sheet = document.getElementById('new_sheet');
var td = document.getElementsByTagName('td');
var selected_cells = document.getElementsByClassName('selected_td');
var coordinate_td = document.getElementsByClassName('coordinate_td');


excel.addEventListener("click", function(event){
	
	if (event.target.className === 'line' || event.target.className === 'coordinate_td') {	
		
		for (var i = 0; i < lines.length; i++) {
			lines[i].classList.remove('selected_line');		
		}
 		
	 	event.target.classList.add('selected_line');
	 	for (var i = 0; i < td.length; i++) {
			td[i].classList.remove('selected_td');
			if (event.target.parentNode.parentNode.rowIndex === td[i].parentNode.rowIndex || event.target.parentNode.cellIndex === td[i].cellIndex) {
				td[i].classList.add('selected_td');
			}
			else if (event.target.innerHTML === '') {
				for (var i = 0; i < td.length; i++) {
					td[i].classList.add('selected_td');
				}
			}
		}	

		// if (!isNaN(+event.target.innerHTML) && event.target.innerHTML != '') {
		// 	for (var n = 0; n < lines.length; n++) {
		// 		if (isNaN(+lines[n].innerHTML) === true) {
					
		// 			lines[n].classList.add('coordinate_td');
		// 		}
		// 	}
		// }
		// else if (isNaN(+event.target.innerHTML)){
		// 	for (var n = 0; n < lines.length; n++) {
		// 		if (isNaN(+lines[n].innerHTML) === false && lines[n].innerHTML != '') {
					
		// 			lines[n].classList.add('coordinate_td');
		// 		}
		// 	}
		// }
		// else {
		// 	for (var n = 0; n < lines.length; n++) {
		// 		if (lines[n].innerHTML != '') {
		// 			lines[n].classList.add('coordinate_td');
		// 		}
		// 	}
		// 	for (var i = 0; i < td.length; i++) {
		// 		td[i].classList.add('selected_td');
		// 	}
		// }

	}

	 // else if (event.target.className === 'line') {
	 	// for (var i = 0; i < lines.length; i++) {
 		// 	lines[i].classList.remove('coordinate_td');
 		// }
	 // }

 	else if (event.target.tagName === 'SPAN') {
 		var count_sheet = 0;
 		
 		for (var i = 0; i < lines.length; i++) {
 			lines[i].classList.remove('coordinate_td');
 		}

 		for (var i = 0; i < sheets.length; i++) {
			sheets[i].classList.remove('active_sheet');
			count_sheet++
		}
		event.target.classList.add('active_sheet');
		for (var i = 0; i < td.length; i++) {
			td[i].innerHTML = null;
			td[i].classList.remove('selected_td');
		}
		if (event.target.id === 'new_sheet' && count_sheet <= 20) {
			var sheet = document.createElement('span');
			var sheetsContainer = document.querySelector('.sheets');
			sheetsContainer.appendChild(sheet);
			sheet.innerHTML = ('Sheet'+count_sheet);
			sheet.classList.add('active_sheet');
			for (var n = 0; n < filled_cells.length; n++) {
				filled_cells[n].innerHTML =  null;
				filled_cells[n].classList.remove('filled');
			}		
		}
		
		for (var i = 0; i < selected_lines.length; i++) {
			selected_lines[i].classList.remove('selected_line');
		}

		getMyObject = JSON.parse(localStorage.getItem(active_sheet[0].innerHTML));
		if (getMyObject != null) {
			for (var i = 0; i < getMyObject.length; i++) {
				for (var k = 0; k < td.length; k++) {
					if (td[k].parentNode.rowIndex === getMyObject[i].row && td[k].cellIndex === getMyObject[i].cell) {
						td[k].innerHTML = getMyObject[i].val;
					}
				}
			}	
		}

		else {
			for (var z = 0; z < td.length; z++) {
				td[z].innerHTML = null;
			}
		}

		new_sheet.classList.remove('active_sheet');
 	}

 	else if (event.target.tagName === 'TD') {
 		if (event.target.hasChildNodes() === false || event.target.hasChildNodes() === true && event.target.childNodes[0].nodeType != 'input') {
 			input = document.createElement('input');
 			input.value = event.target.innerHTML;
 			event.target.innerHTML = '';
 			event.target.appendChild(input).focus();
 		}	
 		for (var i = 0; i < selected_lines.length; i++) {
				selected_lines[i].classList.remove('selected_line');
			}
		for (var i = 0; i < td.length; i++) {
			td[i].classList.remove('selected_td');
		}
 	}

 
 });

excel.addEventListener("blur", function(event) {
	if (event.target.tagName === 'INPUT') {
		if (event.target.value != '') {
			event.target.parentNode.classList.add('filled');
		}

		event.target.parentNode.innerHTML = input.value;

		
		var storage_memory = [];
		
		for (var i = 0; i < filled_cells.length; i++) {			
				if (filled_cells[i].innerHTML != '') {
					var myObject = {};
						myObject.row = filled_cells[i].parentNode.rowIndex;
						myObject.cell = filled_cells[i].cellIndex;
						myObject.val = filled_cells[i].innerHTML;
					
						storage_memory.push(myObject);
						
				}				
				localStorage.setItem(active_sheet[0].innerHTML, JSON.stringify(storage_memory));
		}

	}

}, true);

excel.addEventListener("contextmenu", function(event){
	if (event.target.tagName === 'SPAN' && event.target.id != 'new_sheet') {
		var x = confirm('Are you realy want to delete this SHEET?');
   		if (x == true) {
      		event.target.parentNode.removeChild(event.target);
   		}
	}
});


