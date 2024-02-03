function getApi() {
	// when a search happens, run this function and set the city name to local storage
	function search(event) {
		var timestamp = Date.now();
		var textInput = $("#searchBoxInput").val();
		if (textInput === "") {
			alert("Please input a city in the search bar");
			return;
		}
		localStorage.setItem("searchText", textInput);

		// reset the main display
		$("#searchBoxInput").val("");
		$("#today").empty();
		$("#fiveDay").empty();

		// create a button for each previously searched city
		var previousSearch = $("<button>")
			.attr("class", "pastSearchBtn col-12 btn btn-info my-1")
			.text(textInput);
		$("#pastSearches").append(previousSearch);

		// search for a previous city when it's button is clicked
		previousSearch.click(function () {
			fetchWeather($(this).text());
		});

		// create the main display div
		var mainDisplayDiv = $("<div>").attr("class", "row justify-content-end");
		$("#today").append(mainDisplayDiv);

		var city = localStorage.getItem("searchText");
		var APIKey = "2ecc56f6f728983cbd84a7025a8bc07e";
		var requestUrl =
			"https://api.openweathermap.org/data/2.5/forecast?q=" +
			city +
			"&appid=" +
			APIKey +
			"&units=imperial";

		// fetch the data and return the promise
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
				var kIcon = data.list[0].weather[0].icon;
				var iconUrl = "https://openweathermap.org/img/w/" + kIcon + ".png";
				var kTemp = data.list[0].main.temp;
				var kHumidity = data.list[0].main.humidity;
				var kWindSpeed = data.list[0].wind.speed;
				var kLocation = data.city.name;
				var iconElement = $("<img>").attr("src", iconUrl);
				var divider = $("<hr>");

				// create the main display area
				var mainDisplay = $("<div>")
					.attr("id", "mD")
					.attr("class", "border border-primary col-12 text-start py-3");
				$(mainDisplayDiv).append(mainDisplay);

				var mainDisplayHead = $("<h4>").text(
					"Today in " + kLocation + " " + today.format("dddd, MMM D, YYYY ")
				);
				$(mainDisplay).append(mainDisplayHead);

				var icon5D = $("<div>").html(iconElement[0].outerHTML);
				$(mainDisplay).append(icon5D);

				var temperature = $("<p>").text("Temp: " + kTemp + "°F");
				$(mainDisplay).append(temperature);

				var windSpeed = $("<p>").text("Wind speed: " + kWindSpeed + "MPH");
				$(mainDisplay).append(windSpeed);

				var weather = $("<p>").text("Humidity: " + kHumidity + "%");
				$(mainDisplay).append(weather);

				// create the five day forecast
				var fiveDayTitle = $("<h4>")
					.attr("class", "pt-3")
					.text("5 Day Forecast");
				$("#fiveDay").append(fiveDayTitle);
				$("#fiveDay").append(divider);

				$("<div>");
				for (var i = 0; i <= 4; i++) {
					var forecastId = "fD" + timestamp + "_" + i;
					var forecastDate = dayjs()
						.add(i + 1, "days")
						.format("MMM D, YYYY");

					var forecastDisplayCard = $("<card>")
						.attr("id", "fDC")
						.attr(
							"class",
							"card text-white bg-secondary justify-content-center col-2 p-1 mx-2"
						);
					$("#fiveDay").append(forecastDisplayCard);

					var forecastDisplayHeader = $("<h5>")
						.attr("id", forecastId)
						.attr("class", "card-title")
						.text(forecastDate);
					$(forecastDisplayCard).append(forecastDisplayHeader);

					var forecastDisplayBody = $("<div>").attr("class", "card-body px-0");
					$(forecastDisplayHeader).append(forecastDisplayBody);

					var icon5D = $("<div>").html(iconElement[0].outerHTML);
					$(forecastDisplayBody).append(icon5D);

					var temperature = $("<p>")
						.attr("class", "h6 card-text text-left")
						.text("Temp: " + data.list[i].main.temp + "°F");
					$(forecastDisplayBody).append(temperature);
					var windSpeed = $("<p>")
						.attr("class", "h6 card-text text-left")
						.text("Wind speed: " + data.list[i].wind.speed + "MPH");
					$(forecastDisplayBody).append(windSpeed);
					var weather = $("<p>")
						.attr("class", "h6 card-text text-left")
						.text("Humidity: " + data.list[i].main.humidity + "%");
					$(forecastDisplayBody).append(weather);
				}
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	// register both a click and an Enter keypress to execute the search
	$("#searchButton").click(search);
	$(document).keypress(function (event) {
		var key = event.which;
		if (key == 13) {
			search();
		}
	});
}
function fetchWeather(cityName) {
	var timestamp = Date.now();
	$("#searchBoxInput").val("");
	$("#today").empty();
	$("#fiveDay").empty();

	// create the main display div
	var mainDisplayDiv = $("<div>").attr("class", "row justify-content-end");
	$("#today").append(mainDisplayDiv);

	var APIKey = "2ecc56f6f728983cbd84a7025a8bc07e";
	var requestUrl =
		"https://api.openweathermap.org/data/2.5/forecast?q=" +
		cityName +
		"&appid=" +
		APIKey +
		"&units=imperial";

	// Fetch the data and return the promise
	fetch(requestUrl)
		.then(function (response) {
			if (!response.ok) {
				return response.status;
			}
			return response.json();
		})
		.then(function (data) {
			var today = dayjs();
			var kIcon = data.list[0].weather[0].icon;
			var iconUrl = "https://openweathermap.org/img/w/" + kIcon + ".png";
			var kTemp = data.list[0].main.temp;
			var kHumidity = data.list[0].main.humidity;
			var kWindSpeed = data.list[0].wind.speed;
			var kLocation = data.city.name;
			var iconElement = $("<img>").attr("src", iconUrl);
			var divider = $("<hr>");

			// create the main display area
			var mainDisplay = $("<div>")
				.attr("id", "mD")
				.attr("class", "border border-primary col-12 text-start py-3");
			$(mainDisplayDiv).append(mainDisplay);

			var mainDisplayHead = $("<h4>").text(
				"Today in " + kLocation + " " + today.format("dddd, MMM D, YYYY ")
			);
			$(mainDisplay).append(mainDisplayHead);

			var icon5D = $("<div>").html(iconElement[0].outerHTML);
			$(mainDisplay).append(icon5D);

			var temperature = $("<p>").text("Temp: " + kTemp + "°F");
			$(mainDisplay).append(temperature);

			var windSpeed = $("<p>").text("Wind speed: " + kWindSpeed + "MPH");
			$(mainDisplay).append(windSpeed);

			var weather = $("<p>").text("Humidity: " + kHumidity + "%");
			$(mainDisplay).append(weather);

			// create the five day forecast
			var fiveDayTitle = $("<h4>").attr("class", "pt-3").text("5 Day Forecast");
			$("#fiveDay").append(fiveDayTitle);
			$("#fiveDay").append(divider);

			$("<div>");
			for (var i = 0; i <= 4; i++) {
				var forecastId = "fD" + timestamp + "_" + i;
				var forecastDate = dayjs()
					.add(i + 1, "days")
					.format("MMM D, YYYY");

				var forecastDisplayCard = $("<card>")
					.attr("id", "fDC")
					.attr(
						"class",
						"card text-white bg-secondary justify-content-center col-2 p-1 mx-2"
					);
				$("#fiveDay").append(forecastDisplayCard);

				var forecastDisplayHeader = $("<h5>")
					.attr("id", forecastId)
					.attr("class", "card-title")
					.text(forecastDate);
				$(forecastDisplayCard).append(forecastDisplayHeader);

				var forecastDisplayBody = $("<div>").attr("class", "card-body px-0");
				$(forecastDisplayHeader).append(forecastDisplayBody);

				var icon5D = $("<div>").html(iconElement[0].outerHTML);
				$(forecastDisplayBody).append(icon5D);

				var temperature = $("<p>")
					.attr("class", "h6 card-text text-left")
					.text("Temp: " + data.list[i].main.temp + "°F");
				$(forecastDisplayBody).append(temperature);
				var windSpeed = $("<p>")
					.attr("class", "h6 card-text text-left")
					.text("Wind speed: " + data.list[i].wind.speed + "MPH");
				$(forecastDisplayBody).append(windSpeed);
				var weather = $("<p>")
					.attr("class", "h6 card-text text-left")
					.text("Humidity: " + data.list[i].main.humidity + "%");
				$(forecastDisplayBody).append(weather);
			}
		})
		.catch(function (err) {
			console.log(err);
		});
}

// run the function
getApi();
