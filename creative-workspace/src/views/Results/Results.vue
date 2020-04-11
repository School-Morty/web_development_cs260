<template>
    <div class="background" v-bind:style="{width: setPageWidth()}">
        <div class="submit-match-id">
            <form v-on:submit.prevent="generateMatchData" class="match-id-form">
                <label></label>
                <input v-model="matchID" id="match-id-input" type="text" placeholder="Enter a match ID: " style="color: black">
                <button @click="getDotaData()" id="submitDotaMatch" class="submitButton" type="button">Submit</button>
                <button v-show="!emptyData && success" @click="saveDotaData()" id="saveDotaMatch" class="submitButton" type="button">Save</button>
                <h4 v-show="!success" class="error">{{errMessage}}</h4>
                <h4 v-show="savedSuccess" class="successfulSave">{{errMessage}}</h4>
                <h4 v-show="savedFail" class="error">{{errMessage}}</h4>
                <h4 class="successfulSave" v-show="this.$root.$data.successDeletedMatch !== '' && !savedSuccess && !savedFail && success">Successfully deleted match: {{this.$root.$data.successDeletedMatch}}</h4>
            </form>

            <div v-if="loading" class="loadingIcon">
                <img src="../../assets/loading.gif"/>
                <h2>Loading...</h2>
            </div>

            <ResultGenerator :match="match" />

            <div v-if="!emptyData">
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
    import ResultGenerator from "../../components/ResultGenerator";
    // const axios = require('axios').default;
    import axios from 'axios';
    export default {
        name: "Results",

        data() {
            return {
                // pageWidth: 0,
                matchID: "",
                match: {},
                matches: [],
                emptyData: false,
                success: true,
                savedSuccess: false,
                savedFail: false,
                errMessage: "",
                loading: false,
            }
        },

        mounted() {
            if(this.isEmpty(this.match) || this.match.chat === null)
            {
                this.emptyData = true;
                this.$root.$data.pageWidth = 10;
                this.match = this.$root.$data.savedMatchData;
            }
            else
            {
                this.emptyData = false;
                this.$root.$data.pageWidth = 1920;

            }

            this.$root.$data.resultPage = true;

        },
        beforeDestroy() {
            this.$root.$data.pageWidth = 0;
            this.$root.$data.resultPage = false;
            this.savedFail = false;
            this.savedSuccess = false;
            this.$root.$data.successDeletedMatch = '';
        },

        components: {
            ResultGenerator
        },


        watch: {
            match(newVal) {

                if(this.isEmpty(newVal) || newVal.chat === null)
                {
                    this.emptyData = true;
                    this.$root.$data.pageWidth = 0;
                }
                else
                {
                    this.emptyData = false;
                    this.$root.$data.pageWidth = 1920;

                }
            }

        },

        // computed: {
        //     // match() {
        //     //     return this.match;
        //     // }
        // },

        methods: {
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
            isEmpty(obj) {
                for(var prop in obj) {
                    if(Object.prototype.hasOwnProperty.call(obj, prop)) {
                        return false;
                    }

                }

                return true;
            },
            async getDotaData() {
                this.success = true;
                this.savedSuccess = false;
                this.savedFail = false;
                this.loading = true;

                if(this.matchID === "") {
                    return;
                }

                try{
                    let response = await axios.get("https://api.opendota.com/api/matches/" + this.matchID);
                    if(response.data.barracks_status_dire !== null)
                    {
                        this.match = response.data;
                        this.success = true;
                    }
                    else
                    {
                        this.errMessage = "Invalid match ID, please enter another one.";
                        this.success = false;
                    }
                    this.loading = false;
                }
                catch(err)
                {
                    this.success = false;
                    this.errMessage = "Invalid match ID, please enter another one.";
                    this.loading = false;
                }
            },

            async saveDotaData() {
                try {
                    //Check if there are duplicates
                    if(await this.getMatches(true))
                    {
                        let response = await axios.post('/api/items', {
                            matchID: this.matchID,
                            match: this.match,
                        });

                        if(response.status !== 200) {
                            this.savedFail = true;
                            this.errMessage = "Unable to save changes.";
                        }
                        else {
                            this.savedSuccess = true;
                            this.errMessage = "Saved Successfully! (See admin page for details).";
                        }
                    }
                    else
                    {
                        this.savedFail = true;
                        this.errMessage = "Unable to save changes.";
                    }
                } catch (error) {
                    this.savedFail = true;
                    this.errMessage = "Unable to save changes.";
                }
            },

            async getMatches(doesNotExists = false) {
                try {
                    let response = await axios.get("/api/items");
                    this.matches = response.data;
                    if(doesNotExists)
                    {
                        const result = this.matches.filter(match => match.matchID === this.matchID || match === this.match);

                        if(result.length > 0) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                    else
                    {
                        return true;
                    }
                } catch (error) {
                    //check error
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
    background-image: url('../../assets/background-images/main-page-background.jpg');
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
    padding-top: 5px;
    padding-left: 10px;
    padding-bottom: 5px;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: start;
}

#match-id-input
{
    margin-left: 10px;
    margin-right: 10px;

}

.submitButton
{
    color: black;
    border-radius: 5px;
    margin-left: 5px;
    padding: 2px;
}

.error
{
    color: red;
    margin-left: 15px;
    margin-bottom: -5px;
}

.successfulSave
{
    color: lightsteelblue;
    margin-left: 15px;
    margin-bottom: -5px;
}

.loadingIcon
{
    display: block;
    padding-top: 100px;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    height: 50%;
    z-index: 2;

}

.loadingIcon img {
    border-radius: 30px;
}


</style>