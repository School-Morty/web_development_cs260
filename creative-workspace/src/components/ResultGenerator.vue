<template>

    <div v-show="this.match !== null" class="background">

        <div class="team-table">
            <table class="stats">
                <tr>
                    <th class="radiant-image-cell">
                        <img class="radiant-image" src="../assets/dota-images/radiant.jpg">
                    </th>
                    <th v-if="isDotacougsRadiant(match.players)" class="team-radiant-header">Dotacougs</th>
                    <th v-else class="team-radiant-header">Others</th>
                    <th v-if="isDotacougsRadiant(match.players)" class="team-dire-header">Others</th>
                    <th v-else class="team-dire-header">Dotacougs</th>
                    <th class="dire-image-cell">
                        <img class="dire-image" src="../assets/dota-images/dire.jpg">
                    </th>
                </tr>
                <tr>
                    <td>Game Mode</td>
                    <td>{{getMatchTypeByID(match.game_mode)}}</td>
                    <td>{{getMatchTypeByID(match.game_mode)}}</td>
                    <td>Game Mode</td>
                </tr>
                <tr>
                    <td>Duration (min)</td>
                    <td>{{(match.duration / 60).toFixed(2)}}</td>
                    <td>{{(match.duration / 60).toFixed(2)}}</td>
                    <td>Duration (min)</td>
                </tr>
                <tr>
                    <td>Hero Kills</td>
                    <td>{{match.radiant_score}}</td>
                    <td>{{match.dire_score}}</td>
                    <td>Hero Kills</td>
                </tr>
                <tr>
                    <td>Tower Status</td>
                    <td>{{match.tower_status_radiant}}</td>
                    <td>{{match.tower_status_dire}}</td>
                    <td>Tower Status</td>
                </tr>
                <tr>
                    <td>Barracks Status</td>
                    <td>{{match.barracks_status_radiant}}</td>
                    <td>{{match.barracks_status_dire}}</td>
                    <td>Barracks Status</td>
                </tr>
                <tr v-if="match.radiant_win">
                        <td>Outcome</td>
                        <td>Won</td>
                        <td>Lost</td>
                        <td>Outcome</td>
                </tr>
                <tr v-else>
                    <td>Outcome</td>
                    <td>Lost</td>
                    <td>Won</td>
                    <td>Outcome</td>
                </tr>


            </table>
            <br/>
        </div>
        <div class="individual-table">
            <table class="stats">
                <tr>
                    <th>My Player</th>
                    <th>My Hero</th>
                    <th>My Kills</th>
                    <th>My Deaths</th>
                    <th>My Assists</th>
                    <th>My GPM</th>
                    <th>My XPM</th>
                    <th>Last Hits</th>
                    <th>Creep Denies</th>
                    <th>Neutral Kills</th>
                    <th>Damage Dealt</th>
                    <th>Damage Received</th>
                    <th>Observers Killed</th>
                    <th>Observers Placed</th>
                    <th>Camps Stacked</th>
                    <th>Team Role</th>
                </tr>
                <tr v-bind:class="[player.isRadiant ? 'team-radiant-row' : 'team-dire-row']" v-for="player in match.players" :key="player.id">
                    <td v-bind:class="[player.isRadiant ? 'team-radiant-name' : 'team-dire-name']">{{isUndefined(player)}}</td>
                    <td>{{getHeroFromID(player.hero_id)}}</td>
                    <td>{{player.kills}}</td>
                    <td>{{player.deaths}}</td>
                    <td>{{player.assists}}</td>
                    <td>{{numberWithCommas(player.gold_per_min)}}</td>
                    <td>{{numberWithCommas(player.xp_per_min)}}</td>
                    <td>{{player.lane_kills}}</td>
                    <td>{{player.denies}}</td>
                    <td>{{player.neutral_kills}}</td>
                    <td>{{numberWithCommas(getDamage(Object.values(player.damage_inflictor)))}}</td>
                    <td>{{numberWithCommas(getDamage(Object.values(player.damage_taken)))}}</td>
                    <td>{{player.observer_kills}}</td>
                    <td>{{player.obs_placed}}</td>
                    <td>{{player.camps_stacked}}</td>
                    <td>{{player.lane_role}}</td>
                </tr>
            </table>
        </div>
    </div>


</template>

<script>
    export default {
        name: "ResultGenerator",
        props: {
            match: Object
        },
        methods: {
            isDotacougsRadiant(players)
            {
                let indexOfDotaCougsMember = 0;
                for(let i = 0; i < players.length; i++)
                {
                    if(this.isDotacougMember(players[i].personaname))
                    {
                        indexOfDotaCougsMember = i;
                    }
                }

                if(indexOfDotaCougsMember < 5)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            },
            isDotacougMember(person_name)
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
            },
            numberWithCommas(number)
            {
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },

            isUndefined(player)
            {
                if(player.personaname === undefined)
                {
                    if(player.isRadiant)
                    {
                        return "Radiant " + (player.player_slot + 1);
                    }
                    else
                    {
                        return "Dire " + (player.player_slot - 127);
                    }
                }
                else
                {
                    return player.personaname;
                }

            },
            //Either damage inflicted or damage taken.
            getDamage(arrayOfDamage)
            {
                let damage_inflicted = 0;

                for(let j = 0; j < arrayOfDamage.length; j++)
                {
                    damage_inflicted += arrayOfDamage[j];
                }

                return damage_inflicted;
            },
            getMatchTypeByID(match_type_id)
            {
                switch (match_type_id)
                {
                    case 1 : return "All Pick";
                    case 3 : return "Random Draft";
                    case 4 : return "Random Draft";
                    case 5 : return "ALl Random";
                    case 11 : return "Mid Only";
                    case 15 : return "Custom Mode";
                    case 16 : return "Captains Draft";
                    case 18 : return "Ability Draft";
                    case 20 : return "All Random Death Match";
                    case 21 : return "One vs One";
                    case 23 : return "Turbo";
                    default: return "Unknown";
                }
            },
            getHeroFromID(hero_id)
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
            },
            getGameMode(mode_id)
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
        }
    }
</script>

<style scoped>

    .background
    {
        background-image: url('../assets/background-images/main-page-background.jpg');
        background-repeat: repeat;
        background-size: cover;
        color: white;
        text-align: center;
        width: 1920px;
    }

    th
    {
        max-height: 93px;
        max-width: 500px;
        min-height: 90px;
    }



    table, th, td
    {
        border: 1px solid black;
    }

    table
    {
        /*width: 100%;*/
        border-spacing: 5px;
        /*margin-left: 17px;*/
        padding-left: 10px;
        /* How to keep this centered?? It minimizes well, but doesn't initiallly display in the middle. */
        position: sticky;
        width: 100%;

    }

    #match-results
    {
        width: 100%;
    }

    .individual-bottom-margin
    {
        margin-bottom: 50px;
    }

    table.stats
    {
        left: 0;
    }

    table.stats th
    {
        text-align: center;
        border: 1px solid grey;
        justify-content: center;
    }

    table.stats th, table#individual-stats td
    {
        padding: 5px;
    }

    table.stats tr:nth-child(even)
    {
        background-color: #303030;
        border-right: 2px solid grey;
        border-left: 2px solid grey;
        /*border-right: 2px solid lightgray;*/
        /*border-left: 2px solid lightgray;*/

    }
    table.stats tr:nth-child(odd)
    {
        background-color: #202020;
        border-right: 2px solid grey;
        border-left: 2px solid grey;
        /*border-right: 2px solid lightgray;*/
        /*border-left: 2px solid lightgray;*/
    }
    table.stats th
    {
        color: white;
        background-color: black;
    }

    table.stats tr:nth-last-child(1)
    {
        background-color: #202020;
        border-bottom: 2px solid grey;
    }

    .radiant-image-cell
    {
        /*padding-right: -150px;*/
        /*align: right;*/
        /*text-align: right;*/
    }

    .dire-image-cell
    {
        /*margin-right: -100px;*/
    }

    .radiant-image
    {
        width: 30%;
    }

    .dire-image
    {
        width: 30%;
        /*align: right;*/
    }

    .team-radiant-header
    {
        font-family: Century,sans-serif;
        font-size: 1.5em;
        color: #ccffff;
        background-image: linear-gradient(to right, rgba(18,39,134,1), rgba(18,39,134,0))
    }

    .team-dire-header
    {
        font-family: Century,sans-serif;
        font-size: 1.5em;
        color: #ffffcc;
        background-image: linear-gradient(to right, rgba(160,30,25,1), rgba(160,30,25,0))
    }

    .team-radiant-row
    {
        background-image: linear-gradient(to right, rgba(18,39,134,1), rgba(18,39,134,.1))
    }

    .team-dire-row
    {
        background-image: linear-gradient(to right, rgba(160,30,25,1), rgba(160,30,25,.1))
    }

    .team-radiant-name
    {
        color: #ccffff
    }

    .team-dire-name
    {
        color: #ffffcc
    }

</style>