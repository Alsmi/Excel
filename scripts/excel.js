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

function onClickTh () {

	for (var n = 0; n < lines.length; n++) {
		lines[n].classList.remove('selected_line');
		lines[n].classList.remove('coordinate_td');

		if (!isNaN(+event.target.innerHTML) && event.target.innerHTML != '') {
			if (isNaN(+lines[n].innerHTML) === true) {
				lines[n].classList.add('coordinate_td');
			}	
		}
		else if (isNaN(+event.target.innerHTML)){
			if (isNaN(+lines[n].innerHTML) === false && lines[n].innerHTML != '') {
				lines[n].classList.add('coordinate_td');
			}
		}
		else {
			if (lines[n].innerHTML != '') {
				lines[n].classList.add('coordinate_td');
			}
		}		
	}
 		
 	event.target.classList.add('selected_line');

 	for (var i = 0; i < td.length; i++) {

		td[i].classList.remove('selected_td');

		if (event.target.parentNode.parentNode.rowIndex === td[i].parentNode.rowIndex || event.target.parentNode.cellIndex === td[i].cellIndex) {
			td[i].classList.add('selected_td');
		}

		else if (event.target.innerHTML === '') {
			td[i].classList.add('selected_td');
		}
	}
}
function onClickSpan () {
	var count_sheet = 0;
 		
	for (var i = 0; i < lines.length; i++) {
		lines[i].classList.remove('coordinate_td');
		lines[i].classList.remove('selected_line');
	}

	for (var i = 0; i < sheets.length; i++) {
		sheets[i].classList.remove('active_sheet');
		count_sheet++
	}
	event.target.classList.add('active_sheet');
	for (var i = 0; i < td.length; i++) {
		td[i].innerHTML = null;
		td[i].classList.remove('selected_td');
		td[i].classList.remove('filled');
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
	
	new_sheet.classList.remove('active_sheet');
}

function onClickTd () {
	if (!event.target.hasChildNodes() || event.target.hasChildNodes() && event.target.childNodes[0].nodeType != 'input') {
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
		for (var i = 0; i < lines.length; i++) {
			lines[i].classList.remove('coordinate_td');
			if (event.target.parentNode.rowIndex === lines[i].parentNode.parentNode.rowIndex || event.target.cellIndex === lines[i].parentNode.cellIndex) {
				lines[i].classList.add('coordinate_td');
			}
		}
}

function onBlurInput () {

	if (event.target.value != '') {
		event.target.parentNode.classList.add('filled');
	}
	else {
		event.target.parentNode.classList.remove('filled');
	}

	event.target.parentNode.innerHTML = input.value;

	for (var i = 0; i < lines.length; i++) {
		lines[i].classList.remove('coordinate_td');
	}

}

function contextmenuSpan () {
	var x = confirm('Are you realy want to delete this SHEET?');
	if (x == true) {
		event.target.parentNode.removeChild(event.target);
	}
}

function setStorageObject () {
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

function getStorageObject () {
	var MyStorageObject = JSON.parse(localStorage.getItem(active_sheet[0].innerHTML));
	if (MyStorageObject) {
		for (var i = 0; i < MyStorageObject.length; i++) {
			for (var k = 0; k < td.length; k++) {
				if (td[k].parentNode.rowIndex === MyStorageObject[i].row && td[k].cellIndex === MyStorageObject[i].cell) {
					td[k].innerHTML = MyStorageObject[i].val;
				}
			}
		}
	}	
}

function loadJSONData() {

	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log('Saccess!!!');
        }
    };
	for (var z = 1; z < sheets.length; z++) {

		if (sheets[z].innerHTML === active_sheet[0].innerHTML) {

			for (var i = 0; i < filled_cells.length; i++) {	
				var myObject = {};
					myObject.sheet = active_sheet[0].innerHTML;
					myObject.row = filled_cells[i].parentNode.rowIndex;
					myObject.cell = filled_cells[i].cellIndex;
					myObject.val = filled_cells[i].innerHTML;
					server_memory.push(myObject);
			}
		}
	}
	
	for (var i = 0; i < server_memory.length; i++) {
		for (var j = i+1; j < server_memory.length; j++){
			if (server_memory[i].sheet == server_memory[j].sheet && server_memory[i].row == server_memory[j].row && server_memory[i].cell == server_memory[j].cell && server_memory[i].val == server_memory[j].val) {
				server_memory[j] = 0;
			}
		}
	}
	var result_memory = [];
	for (var k = 0; k < server_memory.length; k++) {
		
		if (server_memory[k] !== 0){
			result_memory.push(server_memory[k]);
		}

	}
    xhttp.open("POST", "test.php", true);
    xhttp.send(JSON.stringify(result_memory));
}
    function getJSONData(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
}
function getJSONData(path, callback) {
	
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);            
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
    
	
}







