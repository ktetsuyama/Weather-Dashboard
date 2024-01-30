var main = $("main");

function getApi() {
	var requestUrl =
		"https://api.openweathermap.org/data/2.5/forecast?lat=40&lon=74&appid=2ecc56f6f728983cbd84a7025a8bc07e";

	fetch(requestUrl)
		.then(function (response) {
			if (!response.ok) {
				return response.status;
			}
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			$("#schedule").text(data.city.name);
		})
		.catch(function (err) {
			console.log(err);
		});
}

getApi();
