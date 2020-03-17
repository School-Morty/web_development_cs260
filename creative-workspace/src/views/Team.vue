<template>
    <div class="main-page">
        <h1>Say hello to the Dotacougs!</h1>
        <ProfileList :profile="profile" />
        <br/>
    </div>

</template>

<script>
    import ProfileList from '../components/ProfileList.vue'
    export default {
        name: "Team",
        mounted() {
            this.$root.$data.pageWidth = 0;
        },
        components: {
            ProfileList
        },
        computed : {
            profile() {
                return this.$root.$data.profile;
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