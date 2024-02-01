function getApi() {
	$("#searchButton").click(function () {
		var timestamp = Date.now();
		var textInput = $("#searchBoxInput").val();
		if (textInput === "") {
			alert("Please try again");
			return;
		}
		localStorage.setItem("searchText", textInput);
		$("#searchBoxInput").val("");

		var previousSearch = $("<button>")
			.attr("class", "pastSearchBtn col-12 btn btn-info my-1")
			.text(textInput);
		$("#pastSearches").append(previousSearch);

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
				var mainDisplay = $("<div>")
					.attr("id", "mD")
					.attr("class", "col-12 text-start py-3")
					.html(
						"Today in " +
							kLocation +
							" " +
							today.format("dddd, MMM D, YYYY ") +
							iconElement[0].outerHTML
					);
				$(mainDisplayDiv).append(mainDisplay);

				var temperature = $("<p>").text("Temp: " + kTemp + "°F");
				$(mainDisplay).append(temperature);

				var windSpeed = $("<p>").text("Wind speed: " + kWindSpeed + "MPH");
				$(mainDisplay).append(windSpeed);

				var weather = $("<p>").text("Humidity: " + kHumidity + "%");
				$(mainDisplay).append(weather);
				var fiveDayTitle = $("<h4>").text("5 Day Forecast");

				$("#fiveDay").append(fiveDayTitle);

				$("<div>");
				for (var i = 0; i <= 4; i++) {
					var forecastId = "fD" + timestamp + "_" + i;
					var forecastDate = dayjs()
						.add(i + 1, "days")
						.format("dddd, MMM D, YYYY");

					var forecastDisplay = $("<card>")
						.attr("id", forecastId)
						.attr("class", "col-2 mx-2")
						.text(forecastDate);
					$("#fiveDay").append(forecastDisplay);
					var icon5D = $("<div>").html(iconElement[0].outerHTML);
					$(forecastDisplay).append(icon5D);

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
