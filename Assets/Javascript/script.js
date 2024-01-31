function getApi() {
	var searchBarPrompt = $("<h2>").text("Search for a city");
	$("#weather").append(searchBarPrompt);
	var searchBar = $("<input>")
		.attr("type", "text")
		.attr("id", "searchBoxInput")
		.attr("placeholder", "Search...")
		.attr("class", "col-1 col-md-3 text-center py-3");

	$("#weather").append(searchBar);

	var searchBarButton = $("<button>")
		.attr("class", "btn col-2 col-md-1")
		.attr("id", "searchButton")
		.text("Search");
	$("#weather").append(searchBarButton);

	$("#searchButton").click(function () {
		var textInput = $("#searchBoxInput").val();
		if (textInput === "") {
			alert("Please try again");
			return;
		}
		localStorage.setItem("searchText", textInput);

		var previousSearchDiv = $("<div>").attr("id", "previousSearches");
		$("#weather").append(previousSearchDiv);
		var previousSearch = $("<button>")
			.attr("class", "btn col-2 col-md-1")
			.attr("id", "prevsearch")
			.text(textInput);
		$("#previousSearches").append(previousSearch);

		var city = localStorage.getItem("searchText");
		var APIKey = "2ecc56f6f728983cbd84a7025a8bc07e";
		var requestUrl =
			"https://api.openweathermap.org/data/2.5/forecast?q=" +
			city +
			"&appid=" +
			APIKey +
			"&units=imperial";

		fetch(requestUrl)
			.then(function (response) {
				if (!response.ok) {
					return response.status;
				}
				return response.json();
			})
			.then(function (data) {
				console.log(data);
				var today = dayjs();
				var kTemp = data.list[0].main.temp;
				var kHumidity = data.list[0].main.humidity;
				var kWindSpeed = data.list[0].wind.speed;
				var kLocation = data.city.name;
				var mainDisplay = $("<div>")
					.attr("class", "col-2 col-md-1 hour text-start py-3")
					.text(kLocation + " " + today.format("dddd, MMM D, YYYY"));
				$("#weather").append(mainDisplay);

				var temperature = $("<p>").text("Temp: " + kTemp + "°F");
				$("#weather").append(temperature);
				var windSpeed = $("<p>").text("Wind speed: " + kWindSpeed + "MPH");
				$("#weather").append(windSpeed);
				var weather = $("<p>").text("Humidity: " + kHumidity + "%");
				$("#weather").append(weather);
			})
			.catch(function (err) {
				console.log(err);
			});
	});
}

getApi();
