var count = 100;
var tbody = document.getElementById('tbody');
var tableHeadRow = document.getElementById('tableHeadRow');
var tr, th, div, input, td;
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
var alphabetLength = alphabet.length;

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
var tds = document.getElementsByTagName('INPUT');
var sheets = document.getElementsByTagName('SPAN');
var new_sheet = document.getElementById('new_sheet');

excel.addEventListener("click", function(event){
	
	if (event.target.className === 'line') {	

		for (var i = 0; i < lines.length; i++) {
			lines[i].classList.remove('selected_line');
		}
		for (var i = 0; i < tds.length; i++) {
			tds[i].classList.remove('selected_td');
		}

	 	event.target.classList.add('selected_line');
 	}


 	else if (event.target.tagName === 'SPAN') {
 		var count_sheet = 0;
 		for (var i = 0; i < sheets.length; i++) {
			sheets[i].classList.remove('active_sheet');
			count_sheet++
		}
			if (event.target.id === 'new_sheet' && count_sheet <= 20) {
				var sheet = document.createElement('span');
				var sheetsContainer = document.querySelector('.sheets');
				sheetsContainer.appendChild(sheet);
				sheet.innerHTML = ('Sheet'+count_sheet);
				sheet.classList.add('active_sheet');				
			}
		event.target.classList.add('active_sheet');
		new_sheet.classList.remove('active_sheet');
 	}

 	else if (event.target.tagName === 'TD') {
 		if (event.target.hasChildNodes() === false || event.target.hasChildNodes() === true && event.target.childNodes[0].nodeType != 'input') {
 			input = document.createElement('input');
 			input.value = event.target.innerHTML;
 			event.target.innerHTML = '';
 			event.target.appendChild(input).focus();
 		}	
 	}
 });

excel.addEventListener("blur", function(event) {
	if (event.target.value != '') {
		event.target.parentNode.classList.add('filled');
	}	
	event.target.parentNode.innerHTML = input.value;

	var filled_cells = document.getElementsByClassName('filled');
	var storage_memory = [];
	var active_sheet = document.getElementsByClassName('active_sheet');
	
	for (i = 0; i < filled_cells.length; i++) {
		var myObject = {};
		myObject.row = filled_cells[i].parentNode.rowIndex;
		myObject.cell = filled_cells[i].cellIndex;
		myObject.val = filled_cells[i].innerHTML;
		storage_memory.push(myObject);
	}
	localStorage.setItem(active_sheet[0].innerHTML, JSON.stringify(storage_memory));
}, true);

excel.addEventListener("contextmenu", function(event){
	if (event.target.tagName === 'SPAN' && event.target.id != 'new_sheet') {
		var x = confirm('Are you realy want to delete this SHEET?');
   		if (x == true) {
      		this.parentNode.removeChild(event.target);
   		}
	}
});


