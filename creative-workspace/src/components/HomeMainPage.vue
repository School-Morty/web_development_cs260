<template>
    <div class="main-page">
        <div class="title">
            <h1>{{message}}</h1>
        </div>

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
</template>

<script>
    export default {
        name: "HomeMainPage",
        props: {
            message: String
        }
    }
</script>

<style scoped>

.main-page
{
    background-image: url("../assets/dota-images/dota2.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center center;
}

.title
{
    /*justify-content: center;*/
    text-align: center;
    margin: auto;
    color: beige;
    background-color: #202020;
    opacity: .65;
    /*font-family: 'Montserrat', sans-serif;*/
    font-family: Baghdad;

}

</style>