var weekly_forecast = [];
var weekly_forecast_index = 4;


function sleep(milliseconds)
{
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

document.getElementById("weatherSubmit").addEventListener("click", function(event)
{

    //Prevents page from fully reloading and makes the experience more local.

    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
        return;
    console.log(value);

    //Fetches the weather based upon the user's input (value)

    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=d11e69dd645bb657245ea7b9fb863a83";
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {


        //Outputs results from the weather API JSON file to the .html page.

        let results = "";
        results += '<h2>Weather in ' + json.name + "</h2>";
        for (let i=0; i < json.weather.length; i++) {
            results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '<h2>' + json.main.temp + " &deg;F</h2>"
        results += "<p>"
        for (let i=0; i < json.weather.length; i++) {
            results += json.weather[i].description + " ";
            if (i !== json.weather.length - 1)
                results += ", "
        }
        results += "</p>";
        document.getElementById("weatherResults").innerHTML = results;
    });

    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=d11e69dd645bb657245ea7b9fb863a83";

    fetch(url2)
        .then(function(response) {
            return response.json();
        }).then(function(json) {

        let temp_iteration = 0;
        let forecast = "";
        let temp_forecast = "";
        let add_temp_forecast = "";
        let max_4 = 0;
        for (let i=0; i < json.list.length; i++) {

            temp_forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm a') + "</h2>";
            temp_forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
            temp_forecast += "<p>Hummidity: " + json.list[i].main.humidity + "</p>";
            temp_forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'

            forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm a') + "</h2>";
            forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
            forecast += "<p>Hummidity: " + json.list[i].main.humidity + "</p>";
            forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'

            weekly_forecast.push(temp_forecast);
            console.log("iteration: " + temp_iteration);
            temp_iteration++

            //Output the initial hours.
            if(max_4 < 4)
            {
                console.log(max_4);
                add_temp_forecast += temp_forecast;

            }
            if(max_4 === 4)
            {
                document.getElementById("forecastResults").innerHTML = add_temp_forecast;
            }
            max_4++;
            temp_forecast = "";
        }

        // document.getElementById("forecastResults").innerHTML = weekly_forecast[test_index];
        // test_index++;
        // document.getElementById("forecastResults").innerHTML = forecast;


    });
    return weekly_forecast;


});

document.getElementById("next_4_hours").addEventListener("click", function(event)
{
    if(weekly_forecast_index === weekly_forecast.length)
    {
        return;
    }

    if(weekly_forecast_index < 4)
    {
        weekly_forecast_index = 4;
    }

    // document.getElementById("forecastResults").innerHTML = "";

    let e = document.getElementById("forecastResults");

    //e.firstElementChild can be used.
    let child = e.lastElementChild;
    while (child)
    {
        // console.log("did it romove anything???");
        e.removeChild(child);
        child = e.lastElementChild;
    }

    // sleep(2000);

    let i = 0;
    let four_hour_forecast = "";
    for(i = weekly_forecast_index; i < (weekly_forecast_index + 4); i++)
    {
        if(i === weekly_forecast.length)
        {
            weekly_forecast_index = i;
            return;
        }
        console.log("I'm addding iteration: " + i + "    " + weekly_forecast[i]);
        four_hour_forecast += weekly_forecast[i];

    }
    document.getElementById("forecastResults").innerHTML = four_hour_forecast;
    weekly_forecast_index = i;
    console.log("after add index: " + weekly_forecast_index);



    // document.getElementById("forecastResults").innerHTML = "It worked";
});

document.getElementById("previous_4_hours").addEventListener("click", function(event)
{
    let orig_value = weekly_forecast_index;
    if(weekly_forecast_index < 4)
    {
        // console.log("I'm inside.")
        return;
    }
    // weekly_forecast_index = weekly_forecast_index - 1;
    weekly_forecast_index = weekly_forecast_index - 5;

    if(weekly_forecast_index < 3)
    {
        // console.log("I'm inside.")
        weekly_forecast_index = orig_value;
        return;
    }

    let e = document.getElementById("forecastResults");

    //e.firstElementChild can be used.
    let child = e.lastElementChild;
    while (child)
    {
        // console.log("did it romove anything???");
        e.removeChild(child);
        child = e.lastElementChild;
    }

    // sleep(3000);

    let i = 0;
    let four_hour_forecast = [];
    let concat = "";
    for(i = weekly_forecast_index; i > (weekly_forecast_index - 4); i--)
    {
        console.log("I'm inside the for loop iteration." + i);

        four_hour_forecast.push(weekly_forecast[i]);
    }
    // console.log("before reverse:" + four_hour_forecast);
    four_hour_forecast = four_hour_forecast.reverse();
    // console.log("after reverse:" + four_hour_forecast);

    for(let j = 0; j < four_hour_forecast.length; j++)
    {
        concat +=four_hour_forecast[j];
    }

    document.getElementById("forecastResults").innerHTML = concat;
    weekly_forecast_index = i;
    console.log("after minus index: " + weekly_forecast_index);

    if(weekly_forecast_index < 0)
    {
        weekly_forecast_index = 0;
    }

});