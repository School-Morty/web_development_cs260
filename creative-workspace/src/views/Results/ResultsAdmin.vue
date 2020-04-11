<template>
    <div class="background">
        <div v-if="loading" class="loadingIcon">
            <img src="../../assets/loading.gif"/>
            <h2>Loading...</h2>
        </div>

        <SavedResults :savedItems="savedItems" />
        <div v-if="savedItems.length >= 8">
            <br/>
            <br/>
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
            <br/>
            <br/>
        </div>

    </div>
</template>

<script>
    import SavedResults from "../../components/SavedResults";
    import axios from "axios";
    export default {
        name: "ResultsAdmin",
        components: {SavedResults},
        data() {
            return {
                savedItems: [],
                loading: false,
            }
        },
        computed: {
            items() {
                return this.savedItems;
            }
        },
        mounted() {
            this.$root.$data.resultPage = true;
            this.getMatches()

        },
        beforeDestroy() {
            this.$root.$data.resultPage = false;
        },
        methods: {
            async getMatches() {
                this.loading = true;
                try {
                    let response = await axios.get("/api/items");
                    this.savedItems = response.data;
                    this.loading = false;
                    return true;
                } catch (error) {
                    this.loading = false;
                }
            },
        }
    }

</script>

<style scoped>
    .background
    {
        background-image: url('../../assets/background-images/main-page-background.jpg');
        background-repeat: repeat;
        background-size: cover;
        color: white;
        text-align: center;
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

    img {
        border-radius: 30px;
    }

</style>