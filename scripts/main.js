function createTable() {
	var count = 100;
	var tbody = document.getElementById('tbody');
	var tableHeadRow = document.getElementById('tableHeadRow');
	var tr, th, div, input, td, input;
	var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
	var alphabetLength = alphabet.length;

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
			input = document.createElement('input');
			td = document.createElement('td');
			tr.appendChild(td).appendChild(input);
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
	

	tableHeadRow.appendChild(th.cloneNode(true));
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
 });

excel.addEventListener("contextmenu", function(event){
	if (event.target.tagName === 'SPAN' && event.target.id != 'new_sheet') {
		var x = confirm('Are you realy want to delete this SHEET?');
   		if (x == true) {
      		event.target.parentNode.removeChild(event.target);
   		}
	}
});
