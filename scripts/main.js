var count = 100;
var tbody = document.getElementById('tbody');
var tableHeadRow = document.getElementById('tableHeadRow');
var tr, th, div, input;
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
var alphabetLength = alphabet.length;
var active_sheet = document.getElementsByClassName('active_sheet');
var filled_cells = document.getElementsByClassName('filled');

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
		onClickTh();
	}

 	else if (event.target.tagName === 'SPAN') {
 		onClickSpan();
 	}

 	else if (event.target.tagName === 'TD') {
 		onClickTd();
 	}

 
 });

excel.addEventListener("blur", function(event) {
	if (event.target.tagName === 'INPUT') {
		onBlurInput();
	}
}, true);

excel.addEventListener("contextmenu", function(event){
	if (event.target.tagName === 'SPAN' && event.target.id != 'new_sheet') {
		contextmenuSpan();
	}
});


