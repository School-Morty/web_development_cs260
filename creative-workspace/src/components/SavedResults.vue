<template>
    <div class="wrapper">
        <div class="items">
            <div class="item" v-for="item in savedItems" :key="item.id">
                <router-link to="/Results/results">
                    <div @click="displayResults(item)">
                        <h5 style="color: white; padding-top: 10px; border-bottom: solid black 1px;">{{item.matchID}}</h5>
                        <p class="team-radiant-header" v-if="isDotacougsRadiant(item.match.players) === 'radiant' && item.match.radiant_win">Victory!</p>
                        <p class="team-dire-header" v-if="isDotacougsRadiant(item.match.players) === 'dire' && !item.match.radiant_win">Victory!</p>
                        <p class="team-radiant-header" v-if="isDotacougsRadiant(item.match.players) === 'radiant' && !item.match.radiant_win">Needs Improvement</p>
                        <p class="team-dire-header" v-if="isDotacougsRadiant(item.match.players) === 'dire' && item.match.radiant_win">Needs Improvement</p>
                        <p style="color: white;" v-if="isDotacougsRadiant(item.match.players) === 'radiant'">{{haveName(item.match.players[0].personaname)}}, {{haveName(item.match.players[1].personaname)}}, {{haveName(item.match.players[2].personaname)}}, etc</p>
                        <p style="color: white;" v-else>{{haveName(item.match.players[5].personaname)}}, {{haveName(item.match.players[6].personaname)}}, {{haveName(item.match.players[7].personaname)}}, etc</p>
                    </div>
                </router-link>
                <router-link to="/Results/results">
                    <button @click="deleteItem(item)" class="deleteButton" type="button">Delete</button>
                </router-link>


            </div>
        </div>


    </div>
    
</template>

<script>
    import axios from "axios";

    export default {
        name: "SavedResults",
        data() {
            return {
                deletedItem: {}
            }
        },
        props: {
            savedItems: Array
        },
        created() {
            this.$root.$data.successDeletedMatch = '';
        },

        methods: {
            isDotacougsRadiant(players) {
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
                    return "radiant";
                }
                else
                {
                    return "dire";
                }
            },
            isDotacougMember(person_name) {
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

            haveName(person_name) {
                if(person_name === undefined)
                {
                    return "Unknown";
                }
                else
                {
                    return person_name
                }
            },
            displayResults(item) {
                this.$root.$data.savedMatchData = item.match;
            },
            async deleteItem(item) {
                try {
                    await axios.delete("/api/items/" + item._id);
                    this.$root.$data.successDeletedMatch = item.matchID;
                    return true;
                } catch (error) {
                    //check error
                }
            },
        }
    }
</script>

<style scoped>
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url('../assets/background-images/main-page-background.jpg');
        background-repeat: repeat;
        background-size: contain;
        color: #e0e0e0;
    }

    .items {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .item {
        padding: 10px;
        margin-top: 50px;
        width: 400px;
        background-color: #555555;
        border-radius: 15px;
    }

    .item:hover {
        box-shadow: 0px 0px 40px #555555;
        cursor: pointer;
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

    .deleteButton
    {
        width: 100%;
        background-color: #202020;
        color: white;
        border-radius: 3px;

    }

    .deleteButton:hover
    {
        box-shadow: 0px 0px 20px #ffffcc;
    }



</style>