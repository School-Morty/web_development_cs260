<template>
    <div class="background" v-bind:style="{width: setPageWidth()}">
        <div class="submit-match-id">
            <form v-on:submit.prevent="generateMatchData" class="match-id-form">
                <label>Enter a match ID: </label>
                <input v-model="matchID" id="match-id-input" type="text">
            </form>

            <ResultGenerator :match="match" />

            <div v-if="this.$root.$data.match.length !== 0">
                <br/>
                <br/>
            </div>
            <div v-else>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>

        </div>
    </div>


</template>

<script>
    import ResultGenerator from "../components/ResultGenerator";
    const axios = require('axios').default;
    export default {
        name: "Results",
        mounted() {
            if(this.$root.$data.match.length !== 0)
            {
                this.$root.$data.pageWidth = 1920;
            }
            else
            {
                this.$root.$data.pageWidth = 10;
            }

        },
        beforeDestroy() {
            this.$root.$data.pageWidth = 0;
        },
        props: {
            matchID: String,
        },
        components: {
            ResultGenerator
        },


        watch: {
            matchID(newVal) {
                try{
                    debugger;
                    axios
                        .get("https://api.opendota.com/api/matches/" + newVal)
                        .then(response => (this.$root.$data.match = response.data));
                    this.$root.$data.pageWidth = 1920;
                }
                catch(err)
                {
                    console.log(err);
                }

            }
        },

        computed: {
            match() {
                return this.$root.$data.match;
            }
        },

        methods: {

            setPlayers(players) {
                this.$root.$data.match.players = players;
            },
            generateMatchData() {
                if (this.matchID === "")
                {
                    return;
                }
            },
            setPageWidth() {
                if(this.$root.$data.pageWidth > 100)
                {
                    return '1920px'
                }
                else
                {
                    return 'auto';
                }


            },

        },
    }
</script>


<style scoped>

.max-page-width
{
    width: 1920px
}

.background
{
    background-image: url('../assets/background-images/main-page-background.jpg');
    background-repeat: repeat;
    background-size: cover;
    color: white;
    text-align: center;
}

th
{
    max-height: 93px;
    max-width: 500px;
    min-height: 90px;
}

.match-id-form
{
    background-color: #303030;
    padding-top: 10px;
    padding-left: 10px;
    text-align: left;
}

#match-id-input
{
    margin-left: 10px;

}
    /*.submit-match-id*/
    /*{*/
    /*    display: none;*/
    /*}*/

</style>