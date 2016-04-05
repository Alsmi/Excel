var tbl = document.getElementById("table");

tbl.addEventListener("click", function(event){
	if (event.target.className === 'col') {
			var cols = document.getElementsByClassName('col');
			var tds = document.getElementsByTagName('INPUT');

			for (var i = 0; i < cols.length; i++) {
				cols[i].classList.remove('selected_line');
			}
			for (var i = 0; i < tds.length; i++) {
				tds[i].classList.remove('selected_td');
			}

			var thisColLetter = event.target.textContent;
		 	event.target.classList.add('selected_line');
		 	for(var i = 1; i <= 6; i++) {
		 		document.getElementById(thisColLetter + i).classList.add('selected_td');
		 	}
 	}

 	// $.ajax({
  //       type: 'GET',
  //       url: "data/json.php",
  //       accept: 'application/json',
  //       contentType: "application/json; charset=utf-8",
  //       success: function (data) {
  //           for (key in data) {
  //           	alert(data[key]);
  //           }
  //       },
  //       error: function () {
  //           alert('Error');
  //       }
  //   });
});

function createTable() {
	var count = 100;
	var tbody = document.getElementById('tbody');
	var tableHeadRow = document.getElementById('tableHeadRow');
	var tr, th, div, input, td, input;
	var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
	var alphabetCount = count / alphabet.length;
	var j = 1;

	for (var i = 1; i <= count; i++) {
		tr = document.createElement('tr');
		th = document.createElement('th');
		div = document.createElement('div');

		tr.appendChild(th).appendChild(div);

		
		if (i > 1) {
			if (i < alphabet.length + 2) {
				div.innerHTML = alphabet[i - 2];
			} 
		}
		

		for (var n = 1; n <= count; n++) {
			input = document.createElement('input');
			td = document.createElement('td');
			td.setAttribute('id','row' + i + 'col' + n)
			tr.appendChild(td).appendChild(input);
		}

		tbody.appendChild(tr);
		tableHeadRow.appendChild(th.cloneNode(true));
		div.innerHTML = i;
	}

	console.log(alphabet);
	

	tableHeadRow.appendChild(th.cloneNode(true));
}
createTable();