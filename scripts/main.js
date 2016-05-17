var table = new Excel (50);

var tbody = document.getElementById('tbody');
var tableHeadRow = document.getElementById('tableHeadRow');
var tr, th, div, input;
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var alphabetLength = alphabet.length;
var active_sheet = document.getElementsByClassName('active_sheet');
var filled_cells = document.getElementsByClassName('filled');
var lastTd = document.getElementsByClassName('lastTd');
var currCol;

table.createTable();

var excel = document.getElementById('excel');
var lines = document.getElementsByClassName('line');
var selected_lines = document.getElementsByClassName('selected_line');
var sheets = document.getElementsByTagName('SPAN');
var new_sheet = document.getElementById('new_sheet');
var td = document.getElementsByTagName('td');
var selected_cells = document.getElementsByClassName('selected_td');
var coordinate_td = document.getElementsByClassName('coordinate_td');
var server_memory = [];
var mirror = document.getElementById('mirror');
var tdShow = document.getElementsByClassName('tdShow');
var key_code = {
  ENTER: 13
};
var inProcess;

excel.addEventListener("blur", function(event) {
	if (event.target.tagName === 'INPUT' && event.target.id != 'mirror') {
		if(event.target.value[0] === '=') {
			table.getMath ();
		}
		table.onBlurInput();
		table.setStorageObject();
		table.loadJSONData();
	}
}, true);

excel.addEventListener("click", function(event){
	
	if (event.target.classList.contains('line')) {	
		table.onClickTh();
	}

 	else if (event.target.tagName === 'SPAN' && event.target.className != 'tdShow') {
 		table.onClickSpan();
	 	table.getStorageObject();
	 	// table.getJSONData('textfile.txt', function(data){
	  //   		for (let i = 0; i < data.length; i++) {
			// 		for (let k = 0; k < td.length; k++) {
			// 			if (active_sheet[0].innerHTML === data[i].sheet && td[k].parentNode.rowIndex === data[i].row && td[k].cellIndex === data[i].cell) {
			// 				td[k].innerHTML = data[i].val;
			// 			}
			// 		}
			// 	}	
			// });
 	}

 	else if (event.target.id === 'mirror') {
 		table.onClickMirror();
 	}

 	else if (event.target.tagName === 'TD') {
 		table.onClickTd();
 	}

 });

excel.addEventListener("contextmenu", function(event){
	if (event.target.tagName === 'SPAN' && event.target.id != 'new_sheet') {
		table.contextmenuSpan();
	}
});

excel.addEventListener("keydown", function(event){
	if (event.target.tagName === 'INPUT') {
		if(event.keyCode === key_code.ENTER && event.target.value[0] === '=') {
			table.getMath ();
		}
	}
});

window.addEventListener("load", table.getStorageObject());

// window.addEventListener("load", table.getJSONData('textfile.txt', function(data){
// 	for (let i = 0; i < data.length; i++) {
// 		for (let k = 0; k < td.length; k++) {
// 			if (active_sheet[0].innerHTML === data[i].sheet && td[k].parentNode.rowIndex === data[i].row && td[k].cellIndex === data[i].cell) {
// 				td[k].innerHTML = data[i].val;
// 			}
// 		}
// 	}	
// }));

excel.addEventListener("keyup", function(event){
	if (event.target.tagName === 'INPUT' && event.target.id != 'mirror') {
		table.keyUpTd();
	}
	else if (event.target.id === 'mirror') {
		table.keyUpMirror();
	}
});