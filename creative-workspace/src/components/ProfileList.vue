<template>
    <div class="wrapper">
        <div class="profiles">
            <div class="profile" v-for="prof in profile" :key="prof.id">
                <div class="profile-title">
                    <h2>{{prof.name}}</h2>
                    <h4>{{prof.nickName}}</h4>
                    <p>Hero of Choice: <strong>{{prof.hero}}</strong></p>
                </div>
                <div class="profile-images">
                    <img :src="'/images/profiles/' + prof.image">
                </div>
                <div class="hero-positions">
                    <h6>- Hero Positions -</h6>
                    <ul>
                        <li v-for="hero in prof.positions" :key="hero.id">{{hero}}</li>
                    </ul>
                </div>
                <div class="profile-bio">
                    <p>{{prof.bio}}</p>
                </div>
            </div>
            <!--Set up the layout for the profiles here-->
        </div>
    </div>

    
</template>

<script>
    export default {
        name: "ProfileList",
        props: {
            profile: Array,
        }
    }
</script>

<style scoped>

    ul
    {
        list-style: none;
    }

    .hero-positions li
    {
        display: inline;
        padding: 20px;
    }

    .hero-positions
    {
        align-content: center;
    }

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url('../assets/background-images/main-page-background.jpg');
        background-repeat: repeat;
        background-size: contain;
        color: #e0e0e0;
    }

    .profiles {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .profile h2
    {
        font-family: Century,sans-serif;
    }

    .profile h4
    {
        background: -webkit-linear-gradient(#333, #eee);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .profile {
        margin: 10px;
        margin-top: 50px;
        width: 400px;
    }

    .profile-images img
    {
       height: 350px;
        width: 300px;
        object-fit: cover;
        margin-top: -20px;
    }

    .profile-bio p
    {
        border-bottom: solid white 1px;
        padding-bottom: 20px;
        border-bottom-style: groove;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 10px;
    }

    .hero-positions h6
    {
        padding-top: 20px;
    }

</style>