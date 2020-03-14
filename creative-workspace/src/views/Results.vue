<template>
    <div class="submit-match-id">
        <form class="match-id-form">
            <label style="color: white">Enter a match ID</label>
            <input v-model="userInput" id="match-id-input" type="text">
            <input @click="generateMatchData" id="match-submit" type="button"  value="submit">
        </form>
    </div>
<!--    <ResultGenerator :match="match" />-->
</template>

<script>
    // import ResultGenerator from "../components/ResultGenerator";
    export default {
        name: "Results",
        props: {
            userInput: String,
            players: Array,
        },
        components: {
            // ResultGenerator
        },

        methods: {
            generateMatchData() {
                debugger;
                console.log();
                if (this.userInput === "")
                {
                    return;
                }

                var fs = require('browserify-fs');
                const url = "https://api.opendota.com/api/matches/" + this.userInput;
                fetch(url)
                    .then(function(response) {
                        return response.json();
                    }).then(function(json) {

                        let test = [];

                    fs.writeFile("test.txt", json.toString(), function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });



                    test = json.players;
                    // this.$root.$data.match = json.players;
                    // console.log(test);
                    // return test;
                    return test;





                });
            }
        }
    }
</script>


<style scoped>

    /*.submit-match-id*/
    /*{*/
    /*    display: none;*/
    /*}*/

</style>