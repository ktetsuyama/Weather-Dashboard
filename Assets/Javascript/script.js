var main = $("main");

function getApi() {
	var requestUrl =
		"api.openweathermap.org/data/2.5/forecast?q=london,uk&appid=4f72f14a95ae7faafb871b54db6b9ebf";

	$(function () {
		fetch(requestUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				console.log(data);
				//Loop over the data to generate a table, each table row will have a link to the repo url
				for (var i = 0; i < data.length; i++) {
					// Creating elements, tablerow, tabledata, and anchor
					var createTableRow = document.createElement("tr");
					var tableData = document.createElement("td");
					var link = document.createElement("a");

					// Setting the text of link and the href of the link
					link.textContent = data[i].html_url;
					link.href = data[i].html_url;

					// Appending the link to the tabledata and then appending the tabledata to the tablerow
					// The tablerow then gets appended to the tablebody
					tableData.append(link);
					createTableRow.append(tableData);
					main.append(createTableRow);
				}
			});
	});
}

getApi();
