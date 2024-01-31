// var today = dayjs();

function getApi() {
	var requestUrl =
		"https://api.openweathermap.org/data/2.5/forecast?lat=40&lon=74&appid=2ecc56f6f728983cbd84a7025a8bc07e";

	var searchBar = $("<input>")
		.attr("type", "text")
		.attr("id", "searchBoxInput")
		.attr("placholder", "Search...")
		.attr("class", "col-2 col-md-1 hour text-center py-3")
		.val(localStorage.getItem("searchText"));

	$("#weather").append(searchBar);

	var searchBarButton = $("<button>").attr("id", "searchButton").text("Search");
	$("#weather").append(searchBarButton);

	$("#searchButton").click(function () {
		var textInput = $("#searchBoxInput").val();
		localStorage.setItem("searchText", textInput);
	});

	fetch(requestUrl)
		.then(function (response) {
			if (!response.ok) {
				return response.status;
			}
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			// $("#weather").text(data.city.name);
		})
		.catch(function (err) {
			console.log(err);
		});
}

getApi();
