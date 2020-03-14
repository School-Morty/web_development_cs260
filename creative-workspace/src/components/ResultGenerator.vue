<template>
    <h1>Do not mind me.</h1>
</template>

<script>
    export default {
        name: "ResultGenerator",
        props: {
            match: Array
        }
    }
</script>

<style scoped>
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

    table#individual-stats
    {
        left: 0;
    }

    table#individual-stats th
    {
        text-align: center;
        border: 1px solid grey;
        justify-content: center;
    }

    table#individual-stats th, table#individual-stats td
    {
        padding: 5px;
    }

    table#individual-stats tr:nth-child(even)
    {
        background-color: #303030;
        border-right: 2px solid grey;
        border-left: 2px solid grey;
        /*border-right: 2px solid lightgray;*/
        /*border-left: 2px solid lightgray;*/

    }
    table#individual-stats tr:nth-child(odd)
    {
        background-color: #202020;
        border-right: 2px solid grey;
        border-left: 2px solid grey;
        /*border-right: 2px solid lightgray;*/
        /*border-left: 2px solid lightgray;*/
    }
    table#individual-stats th
    {
        color: white;
        background-color: black;
    }

    table#individual-stats tr:nth-last-child(1)
    {
        background-color: #202020;
        border-bottom: 2px solid grey;
    }

    .radiant-image-cell
    {
        /*padding-right: -150px;*/
        /*align: right;*/
        text-align: right;
    }

    .dire-image-cell
    {
        margin-right: -100px;
    }

    .radiant-image
    {
        width: 30%;
    }

    .dire-image
    {
        width: 30%;
    }
</style>