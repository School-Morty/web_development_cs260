



document.getElementById("match-submit").addEventListener("click", function (event) {
    let UNKNOWN = "UNKNOWN"; //The rest
    let ALL_PICK = "All Pick"; //1
    let RANDOM_DRAFT = "Random Draft"; //3
    let SINGLE_DRAFT = "Single Draft"; //4
    let ALL_RANDOM = "ALl Random"; //5
    let MID_ONLY = "Mid Only"; //11
    let CUSTOM_MODE = "Custom Mode"; //15
    let CAPTAINS_DRAFT = "Captains Draft"; //16
    let ABILITY_DRAFT = "Ability Draft"; //18
    let ALL_RANDOM_DEATH_MATCH = "All Random Death Match"; //20
    let ONE_VS_ONE = "One vs One"; //21
    let TURBO = "Turbo"; //23

    let game_modes = [UNKNOWN, ALL_PICK, UNKNOWN, RANDOM_DRAFT, SINGLE_DRAFT, ALL_RANDOM, UNKNOWN, UNKNOWN, UNKNOWN, UNKNOWN, UNKNOWN, MID_ONLY, UNKNOWN, UNKNOWN, UNKNOWN, CUSTOM_MODE, CAPTAINS_DRAFT, UNKNOWN, ABILITY_DRAFT, UNKNOWN, ALL_RANDOM_DEATH_MATCH,
        ONE_VS_ONE, UNKNOWN, TURBO, UNKNOWN];


// function mostRecentDota2Game(event)
// {
    event.preventDefault();

    const value = document.getElementById("match-id-input").value;
    if (value === "")
    {
        return;
    }


    const url = "https://api.opendota.com/api/matches/" + value;
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
        let results = "";

        console.log(json);
        // results += '<h2>Weather in ' + json.name + "</h2>";
        // for (let i=0; i < json.weather.length; i++) {
        //     results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        // }
        // results += '<h2>' + json.main.temp + " &deg;F</h2>"
        // results += "<p>"
        // for (let i=0; i < json.weather.length; i++) {
        //     results += json.weather[i].description + " ";
        //     if (i !== json.weather.length - 1)
        //         results += ", "
        // }
        // results += "</p>";


        // <table>
        //     <tr>
        //     <th>name</th>
        //     <th>height</th>
        //     <th>place</th>
        //     </tr>
        //     <tr>
        //     <td>Kilimanjaro</td>
        //     <td>5895</td>
        //     <td>Tanzania</td>
        //     </tr>
        //     </table>

        // let currVisibleDiv = document.getElementById('mountains');
        // let table = document.createElement('table');
        // currVisibleDiv.appendChild(table);
        //
        // //First section of rows.
        // let row = document.createElement('tr');
        // table.appendChild(row);
        //
        // //Creates column headers
        // let arrayOfKeys = Object.keys(MOUNTAINS[0]);
        // for(let i = 0; i < arrayOfKeys.length; i++)
        // {
        //     let tableHeader = document.createElement('th');
        //     let keyNode = document.createTextNode(arrayOfKeys[i]);
        //     tableHeader.appendChild(keyNode);
        //     row.appendChild(tableHeader);

        //     document.createTextNode
        // }

        let team_table_element = document.getElementById("match-results");
        let table = document.createElement('table');
        let new_row = document.createElement('tr');
        let head_cells = document.createElement('th');
        let normal_cells = document.createElement('td');
        let image = document.createElement('img');


        team_table_element.appendChild(table);
        table.appendChild(new_row);
        new_row.appendChild(head_cells);
        head_cells.appendChild(image);
        image.src = "/images/radiant.jpg";
        new_row.appendChild(head_cells);
        head_cells.append("this is the radiant message");
        new_row.appendChild(head_cells);
        head_cells.append("this is the dire message");
        new_row.appendChild(head_cells);
        head_cells.appendChild(image);
        image.src = "/images/dire.jpg";

        let team_table = "";

        team_table += "<table id='individual-stats' class=\"center-container\">";
        team_table += "<tr>";
        team_table += "<th class=\"radiant-image-cell\">";
        team_table += "<img class=\"radiant-image\" src=\"/images/radiant.jpg\"/>";
        team_table += "</th>";

        let dotacougs_radiant = false;
        for(let i = 0; i < json.players.length; i++)
        {
            if(isDotacougsRadiant(json.players[i].personaname))
            {
                dotacougs_radiant = true;
                break;
            }
        }


        if(dotacougs_radiant)
        {
            team_table += "<th style='color: #ccffff; background-image: linear-gradient(to right, rgba(18,39,134,1), rgba(18,39,134,0))'>" + "Dotacougs" + "</th>";
            team_table += "<th style='color: #ffffcc; background-image: linear-gradient(to right, rgba(160,30,25,1), rgba(160,30,25,0))'>" + "Dire" + "</th>";
        }
        else
        {
            team_table += "<th style='color: #ccffff; background-image: linear-gradient(to right, rgba(18,39,134,1), rgba(18,39,134,0))'>" + "Radiant" + "</th>";
            team_table += "<th style='color: #ffffcc; background-image: linear-gradient(to right, rgba(160,30,25,1), rgba(160,30,25,0))'>" + "Dotacougs" + "</th>";
        }

        team_table += "<th align=\'right\' class=\"dire-image-cell\">";
        team_table += "<img class=\"dire-image\" src=\"/images/dire.jpg\"/>";
        team_table += "</th>";
        team_table += "</tr>";

        console.log(json.game_mode);


        let game_mode = "";
        game_mode = teamRowsSame("Game Mode", getGameMode(json.game_mode));

        let duration = "";
        duration = teamRowsSame("Duration", (json.duration / 60).toFixed(2));

        let hero_kills = "";
        hero_kills = teamRowsDiff("Hero Kills", json.radiant_score, json.dire_score);

        // function teamRowsDiff(table, rowName, cellStatRadiant, cellStatDire)

        //Higher is better (max is like 2000)
        let tower_status = "";
        tower_status = teamRowsDiff("Tower Status", json.tower_status_radiant, json.tower_status_dire);
        //Higher is better (63 max)
        let barracks_status = "";
        barracks_status = teamRowsDiff("Barracks Status", json.barracks_status_radiant, json.barracks_status_dire);

        let win_status = "";
        if (json.radiant_win) {
            win_status = teamRowsDiff("Outcome", "Win", "Lose");
        } else {
            win_status = teamRowsDiff("Outcome", "Lose", "Win");
        }


        // team_table += teamRowsDiff(team_table, "Game Mode", game_modes[json.game_mode]);
        //
        // team_table += teamRowsDiff(team_table, "Game Mode", game_modes[json.game_mode]);

        team_table = team_table + game_mode + duration + hero_kills + tower_status + barracks_status + win_status;
        // team_table += hero_kills;








        team_table += "</table>";

        //------------------------------Individual table

        let individual_table = "";
        individual_table += "<table id='individual-stats' class='individual-bottom-margin'>";
            individual_table += "<tr>";
                individual_table += "<th>" + "My Player" + "</th>";
                individual_table += "<th>" + "My Hero" + "</th>";
                individual_table += "<th>" + "My Kills" + "</th>";
                individual_table += "<th>" + "My Deaths" + "</th>";
                individual_table += "<th>" + "My Assists" + "</th>";
                individual_table += "<th>" + "My GPM" + "</th>";
                individual_table += "<th>" + "My XPM" + "</th>";
                individual_table += "<th>" + "Last Hits" + "</th>";
                individual_table += "<th>" + "Creep Denies" + "</th>";
                individual_table += "<th>" + "Neutral Kills" + "</th>";
                individual_table += "<th>" + "Damage Dealt" + "</th>";
                individual_table += "<th>" + "Damage Received" + "</th>";
                individual_table += "<th>" + "Observers Killed" + "</th>";
                individual_table += "<th>" + "Observers Placed" + "</th>";
                individual_table += "<th>" + "Camps Stacked" + "</th>";
                individual_table += "<th>" + "Team Role" + "</th>";
            individual_table += "</tr>";

            for(let i = 0; i < json.players.length; i++)
            {
                if(json.players[i].isRadiant)
                {
                    individual_table += "<tr style='background-image: linear-gradient(to right, rgba(18,39,134,1), rgba(18,39,134,0))'>";

                }
                else
                {
                    individual_table += "<tr style='background-image: linear-gradient(to right, rgba(160,30,25,1), rgba(160,30,25,0))'>";
                }


                if(json.players[i].personaname === undefined)
                {
                    if(json.players[i].isRadiant)
                    {
                        individual_table += "<td style='color: #ccffff'>" + "Radiant " + (i+1) + "</td>";
                    }
                    else
                    {
                        individual_table += "<td style='color: #ffffcc'>" + "Dire " + (i+1 - (5)) + "</td>";
                    }

                }
                else
                {
                    if(json.players[i].isRadiant)
                    {
                        individual_table += "<td style='color: #ccffff'>" + json.players[i].personaname + "</td>";
                    }
                    else
                    {
                        individual_table += "<td style='color: #ffffcc'>" + json.players[i].personaname + "</td>";
                    }

                }

                individual_table += "<td>" + getHeroFromID(json.players[i].hero_id) + "</td>";



                individual_table += "<td>" + json.players[i].kills + "</td>";
                individual_table += "<td>" + json.players[i].deaths + "</td>";
                individual_table += "<td>" + json.players[i].assists + "</td>";
                individual_table += "<td>" + json.players[i].gold_per_min + "</td>";
                individual_table += "<td>" + json.players[i].xp_per_min + "</td>";
                individual_table += "<td>" + json.players[i].lane_kills + "</td>";
                individual_table += "<td>" + json.players[i].denies + "</td>";
                individual_table += "<td>" + json.players[i].neutral_kills + "</td>";
                let damage_inflicted = 0;
                let damage_inflicted_array = [];
                damage_inflicted_array = Object.values(json.players[i].damage_inflictor);

                for(let j = 0; j < damage_inflicted_array.length; j++)
                {
                    damage_inflicted += damage_inflicted_array[j];
                }
                individual_table += "<td>" + damage_inflicted + "</td>";

                let damage_received = 0;
                let damage_received_array = [];
                damage_received_array = Object.values(json.players[i].damage_taken);

                for(let j = 0; j < damage_received_array.length; j++)
                {
                    damage_received += damage_received_array[j];
                }
                individual_table += "<td>" + damage_received + "</td>";
                individual_table += "<td>" + json.players[i].observer_kills + "</td>";
                individual_table += "<td>" + json.players[i].obs_placed + "</td>";
                individual_table += "<td>" + json.players[i].camps_stacked + "</td>";
                individual_table += "<td>" + json.players[i].lane_role + "</td>";

                individual_table += "</tr>"
            }


        individual_table += "</table>"





        team_table += individual_table + "</br>";

        // results += "<p style='color: white'>";
        // let radiant = true;
        // for(let i = 0; i < json.players.length; i++)
        // {
        //     results += json.players[i].personaname + '\n';
        //     if(json.players[i].personaname === "CrossCountryMan")
        //     {
        //         radiant = json.players[i].isRadiant;
        //     }
        // }
        // // results += json.first_blood_time + '\n';
        // results += "</p>";



        document.getElementById("match-results").innerHTML = team_table;


        });



    // // let steam_32 = (bignumber('76561198097446318').minus('76561197960265728'));
    //
    //
    //
    //     // const url2 = "https://api.opendota.com/api/players/137180590/wl";
    //     const url2 = "https://api.opendota.com/api/players/114650188/recentMatches";
    // // const url2 = "https://api.opendota.com/api/players/76561198097446318";
    // fetch(url2)
    //     .then(function(response) {
    //         return response.json();
    //     }).then(function(json) {
    //     let results = "";
    //
    //     console.log(json);
    //
    //     // results += "<p style='color: white'>";
    //
    //
    //     // for(let i = 0; i < json.length; i++)
    //     // {
    //     //
    //     //     results += json[i] + '\n';
    //     // }
    //
    //     // results += json[0].match_id;
    //     // results += json[0].game_mode;
    //     // results += json[0].kills;
    //
    //     // results += json.first_blood_time + '\n';
    //     results += "</p>";
    //
    //
    //     document.getElementById("test").innerHTML = results;
    // });




});

function teamRowsSame(rowName, cellStat)
{
    let table = "";
    table += "<tr>";
    table += "<td>" + rowName + "</td>";
    table += "<td>" + cellStat + "</td>";
    table += "<td>" + cellStat + "</td>";
    table += "<td align='right'>" + rowName + "</td>";
    table += "</tr>";
    return table;
}

function teamRowsDiff(rowName, cellStatRadiant, cellStatDire)
{
    let table = "";
    table += "<tr>";
    table += "<td>" + rowName + "</td>";
    table += "<td>" + cellStatRadiant + "</td>";
    table += "<td>" + cellStatDire + "</td>";
    table += "<td align='right'>" + rowName + "</td>";
    table += "</tr>";
    return table;
}

function getGameMode(mode_id)
{
    switch (mode_id)
    {
        case 0: return "Unknown";
        case 1: return "All Pick";
        case 2: return "Captains Mode";
        case 3: return "Random Draft";
        case 4: return "Single Draft";
        case 5: return "All Random";
        case 6: return "Intro";
        case 7: return "Diretide";
        case 8: return "Reverse Captains Draft";
        case 9: return "Greeviling";
        case 10: return "Tutorial";
        case 11: return "Mid Only";
        case 12: return "Least Played";
        case 13: return "Limited Heroes";
        case 14: return "Compendium Matchmaking";
        case 15: return "Custom";
        case 16: return "Captains Draft";
        case 17: return "Balanced Draft";
        case 18: return "Ability Draft";
        case 19: return "Event";
        case 20: return "All Random Death Match";
        case 21: return "1v1";
        case 22: return "All Draft";
        case 23: return "Turbo";
        case 24: return "Mutation";
        default: return "Unknown";
    }
}

function getHeroFromID(hero_id)
{
    switch(hero_id)
    {
        case 1: return "Antimage";
        case 2: return "Axe";
        case 3: return "Bane";
        case 4: return "Bloodseeker";
        case 5: return "Crystal Maiden";
        case 6: return "Drow Ranger";
        case 7: return "Earthshaker";
        case 8: return "Juggernaut";
        case 9: return "Mirana";
        case 10: return "Morphling";
        case 11: return "Shadow Fiend";
        case 12: return "Phantom Lancer";
        case 13: return "Puck";
        case 14: return "Pudge";
        case 15: return "Razor";
        case 16: return "Sand King";
        case 17: return "Storm Spirit";
        case 18: return "Sven";
        case 19: return "Tiny";
        case 20: return "Vengeful Spirit";
        case 21: return "Windranger";
        case 22: return "Zeus";
        case 23: return "Kunkka";
        // case 24: return "Lina";
        case 25: return "Lina";
        case 26: return "Lion";
        case 27: return "Shadow Shaman";
        case 28: return "Slardar";
        case 29: return "Tidehunter";
        case 30: return "Witch Doctor";
        case 31: return "Lich"
        case 32: return "Riki";
        case 33: return "Enigman";
        case 34: return "Tinker";
        case 35: return "Sniper";
        case 36: return "Necrophos";
        case 37: return "Warlock";
        case 38: return "Beastmaster";
        case 39: return "Queen of Pain";
        case 40: return "Venomancer";
        case 41: return "Faceless Void";
        case 42: return "Skeleton King";
        case 43: return "Death Prophet";
        case 44: return "Phantom Assassin";
        case 45: return "Pugna";
        case 46: return "Templar Assassin";
        case 47: return "Viper";
        case 48: return "Luna";
        case 49: return "Dragon Knight";
        case 50: return "Dazzle";
        case 51: return "Clockwerk";
        case 52: return "Leshrac";
        case 53: return "Nature's Prophet";
        case 54: return "Lifestealer";
        case 55: return "Dark Seer";
        case 56: return "Clinkz";
        case 57: return "Omniknight";
        case 58: return "Enchantress";
        case 59: return "Huskar";
        case 60: return "Night Stalker";
        case 61: return "Broodmother";
        case 62: return "Bounty Hunter";
        case 63: return "Weaver";
        case 64: return "Jakiro";
        case 65: return "Batrider";
        case 66: return "Chen";
        case 67: return "Spectre";
        case 68: return "Doom";
        case 69: return "Ancient Apparition";
        case 70: return "Ursa";
        case 71: return "Spirit Breaker";
        case 72: return "Gyrocopter";
        case 73: return "Alchemist";
        case 74: return "Invoker";
        case 75: return "Silencer";
        case 76: return "Outworld Devourer";
        case 77: return "Lycanthrope";
        case 78: return "Brewmaster";
        case 79: return "Shadow Demon";
        case 80: return "Lone Druid";
        case 81: return "Chaos Knight";
        case 82: return "Meepo";
        case 83: return "Treant Protector";
        case 84: return "Ogre Magi";
        case 85: return "Undying";
        case 86: return "Rubick";
        case 87: return "Disruptor";
        case 88: return "Nyx Assassin";
        case 89: return "Naga Siren";
        case 90: return "Keeper of the Light";
        case 91: return "Wisp";
        case 92: return "Visage";
        case 93: return "Slark";
        case 94: return "Medusa";
        case 95: return "Troll Warlord";
        case 96: return "Centaur Warrunner";
        case 97: return "Magnus";
        case 98: return "Timbersaw";
        case 99: return "Bristleback";
        case 100: return "Tusk";
        case 101: return "Skywrath Mage";
        case 102: return "Abaddon";
        case 103: return "Elder Titan";
        case 104: return "Legion Commander";
        case 105: return "Ember Spirit";
        case 106: return "Earth Spirit";
        case 107: return "Abyssal Underlord";
        case 108: return "Terrorblade";
        case 109: return "Phoenix";
        case 110: return "Techies";
        case 111: return "Oracle";
        case 112: return "Winter Wyvern";
        case 113: return "Arc Warden";
        case 114: return "Monkey King";
        case 119: return "Dark Willow";
        case 120: return "Pangolier";
        case 121: return "Grimstroke";
        case 126: return "Void Spirit";
        case 128: return "Snapfire";
        case 129: return "Mars";
        default: return "Unknown";
    }
}

function isDotacougsRadiant(person_name)
{
    if(person_name === "Quiet" || person_name === "♪♫Twilitwolf♫♪" || person_name === "natekronos"
        || person_name === "NumNeNumNe" || person_name === "3Gundi" || person_name === "CrossCountryMan")
    {
        return true;
    }
    else
    {
       return false;
    }
}


// document.getElementById("match").addEventListener("click", mostRecentDota2Game);