<template>
    <div class="main-page">
        <h1>Say hello to the Dotacougs!</h1>
        <ProfileList :profile="profile" />
        <br/>
    </div>

</template>

<script>
    import ProfileList from '../../components/ProfileList.vue'
    import axios from "axios";
    // import axios from 'axios';
    export default {
        name: "Team",
        data() {
            return {
                profiles: [],
                isDuplicate: false,
                errorOccurred: false,
                success: false,
                message: "",
            }
        },
        mounted() {
            this.$root.$data.pageWidth = 0;
            this.$root.$data.teamPage = true;
            this.getProfiles();
        },
        beforeDestroy() {
            this.$root.$data.teamPage = false;
        },
        components: {
            ProfileList
        },
        computed : {
            profile() {
                return this.profiles;
            },
        },
        methods: {
            async getProfiles() {
                try {
                    let response = await axios.get("/api/profiles");
                    this.profiles = response.data;
                } catch (error) {
                    //check error
                }
            },
        },

    }
</script>

<style scoped>

    .main-page
    {
        background-color: #303030;
    }

    .main-page h1
    {

        /*color: white;*/
        font-family: Century,sans-serif;
        margin: auto auto;
        /*background-image: linear-gradient(to right, rgba(18,39,134,1), rgba(18,39,134,.1))*/
        font-size: 72px;
        background: -webkit-linear-gradient(#eee, #333);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

</style>