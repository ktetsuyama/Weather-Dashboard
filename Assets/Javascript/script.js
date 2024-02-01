function getApi() {
	var searchRow = $("<div>").attr("id", "searchRow").attr("class", "row");
	$("#weather").append(searchRow);
	var searchBarPrompt = $("<h2>").text("Search for a city");
	$(searchRow).append(searchBarPrompt);
	var searchBar = $("<input>")
		.attr("type", "text")
		.attr("id", "searchBoxInput")
		.attr("placeholder", "Search...")
		.attr("class", "col-2 text-center py-3");

	$(searchRow).append(searchBar);

	var searchBarButton = $("<button>")
		.attr("class", "btn btn-primary col-1")
		.attr("id", "searchButton")
		.text("Search");
	$(searchRow).append(searchBarButton);

	$("#searchButton").click(function () {
		var timestamp = Date.now();
		$("#mD").empty();
		for (var i = 0; i < 5; i++) {
			var forecastId = "fD" + timestamp + "_" + i;
			$("#" + forecastId).remove();
		}
		var textInput = $("#searchBoxInput").val();
		if (textInput === "") {
			alert("Please try again");
			return;
		}
		localStorage.setItem("searchText", textInput);

		var previousSearchDiv = $("<div>")
			.attr("class", "list-group col-2")
			.attr("id", "previousSearches");
		$("#searchRow").append(previousSearchDiv);

		var previousSearch = $("<button>")
			.attr("class", "btn col-1")
			.attr("id", "prevsearch")
			.text(textInput);
		$("#previousSearches").append(previousSearch);

		var mainDisplayDiv = $("<div>").attr("class", "row justify-content-end");
		$("#weather").append(mainDisplayDiv);

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
					.attr("id", "mD")
					.attr("class", "col-8 text-start py-3")
					.text(
						"Today in " + kLocation + " " + today.format("dddd, MMM D, YYYY")
					);
				$(mainDisplayDiv).append(mainDisplay);

				var temperature = $("<p>").text("Temp: " + kTemp + "°F");
				$(mainDisplay).append(temperature);
				var windSpeed = $("<p>").text("Wind speed: " + kWindSpeed + "MPH");
				$(mainDisplay).append(windSpeed);
				var weather = $("<p>").text("Humidity: " + kHumidity + "%");
				$(mainDisplay).append(weather);

				$("<div>").attr("class", "row");
				for (var i = 0; i <= 4; i++) {
					var forecastId = "fD" + timestamp + "_" + i;
					var forecastDate = dayjs()
						.add(i + 1, "days")
						.format("dddd, MMM D, YYYY");

					var forecastDisplay = $("<div>")
						.attr("id", forecastId)
						.attr("class", "col-1 justify-content-start")
						.text(kLocation + " " + forecastDate);
					$(mainDisplayDiv).append(forecastDisplay);

					var temperature = $("<p>").text(
						"Temp: " + data.list[i].main.temp + "°F"
					);
					$(forecastDisplay).append(temperature);
					var windSpeed = $("<p>").text(
						"Wind speed: " + data.list[i].wind.speed + "MPH"
					);
					$(forecastDisplay).append(windSpeed);
					var weather = $("<p>").text(
						"Humidity: " + data.list[i].main.humidity + "%"
					);
					$(forecastDisplay).append(weather);
				}
			})
			.catch(function (err) {
				console.log(err);
			});
	});
}

getApi();
