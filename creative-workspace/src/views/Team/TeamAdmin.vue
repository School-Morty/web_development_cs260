<template>
    <div class="background">
        <br/>
        <form v-on:submit.prevent class="inputItems">
            <h3>Create a DotaCougs profile.</h3>
            <input class="item" v-model="name" placeholder="First & Last Name">
            <input class="item" v-model="nickName" placeholder="Dota Name (Online)">
            <input class="item" v-model="hero" placeholder="Preferred Hero (Pudge?)">
            <p style="margin-bottom: -5px;"><u>Hero Positions</u></p>
            <div class="checkboxes">
                <label class="checkbox-item">
                    <input v-model="position1" type="checkbox"/>1
                </label>

                <label class="checkbox-item">
                    <input v-model="position2" type="checkbox">2
                </label>

                <label class="checkbox-item">
                    <input v-model="position3" type="checkbox">3
                </label>

                <label class="checkbox-item">
                    <input v-model="position4" type="checkbox">4
                </label>

                <label class="checkbox-item">
                    <input v-model="position5" type="checkbox">5
                </label>
            </div>


            <textarea class="item" v-model="bio" placeholder="Personal Bio"/>

            <p style="margin-bottom: -20px;"><u>Profile Picture</u></p>
            <input class="item" type="file" name="photo" @change="fileChanged">
            <button class="item" style="color: black" @click="upload">Submit</button>
            <p style="color: red" v-if="errorOccurred">{{message}}</p>
            <p style="color: red" v-if="isDuplicate">{{message}}</p>
            <p style="color: lightsteelblue" v-if="success">{{message}}</p>
        </form>

        <div class="form" v-show="!viewSearchBar">
            <button style="color: black; background-color: #b0c4de" type="button" @click="closeSearch">Search Profile</button>
        </div>

        <div v-show="viewSearchBar">
            <div class="form">
                <input style="color: black;" v-model="searchName" placeholder="Search">
                <div class="suggestions" v-if="suggestions.length > 0">
                    <div class="suggestion" v-for="prof in suggestions" :key="prof.id" @click="selectItem(prof)">
                        {{prof.name}}
                    </div>
                </div>
                <button style="color: black; background-color: #b0c4de" type="button" @click="closeSearch">Close Search Bar</button>
            </div>
        </div>


        <div v-if="!isEmpty(searchProfile)">
            <div class="wrapper">
                <div class="profiles">
                    <div class="profile">
                        <div class="profile-title">
                            <h2>{{searchProfile.name}}</h2>
                            <h4>{{searchProfile.nickName}}</h4>
                            <p>Hero of Choice: <strong>{{searchProfile.hero}}</strong></p>
                        </div>
                        <div class="profile-images">
                            <img :src="searchProfile.path">
                        </div>
                        <div class="hero-positions">
                            <h6>- Hero Positions -</h6>
                            <ul>
                                <li v-for="hero in searchProfile.positions" :key="hero.id">{{hero}}</li>
                            </ul>
                        </div>
                        <div class="profile-bio">
                            <p>{{searchProfile.bio}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid-it">
                <button style="color: black; margin-right: 10px; padding: 2px" type="button" @click="deleteItem(searchProfile)">Delete</button>
                <input style="color: black;" class="item" v-model="searchProfile.name" placeholder="Update Name">
                <button style="color: black; padding: 2px" type="button" @click="updateItem(searchProfile)">Update</button>
            </div>

        </div>


        <br/>
        <br/>
        <br/>
        <br/>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "TeamAdmin",
        data() {
            return {
                name: "",
                nickName: "",
                positions: [],
                hero: "",
                bio: "",
                file: null,
                position1: false,
                position2: false,
                position3: false,
                position4: false,
                position5: false,
                isDuplicate: false,
                errorOccurred: false,
                success: false,
                message: "",
                profiles: [],
                searchName: "",
                searchProfile: {},
                viewSearchBar: false,
            }
        },
        created() {
            this.moreProfiles()
        },

        mounted() {
            this.$root.$data.teamPage = true;
        },
        beforeDestroy() {
            this.$root.$data.teamPage = false;
        },
        computed: {
            suggestions() {
                let items = this.profiles.filter(item => item.name.toLowerCase().startsWith(this.searchName.toLowerCase()));
                return items.sort((a, b) => a.name > b.name);
            },
        },
            methods: {
                async upload() {
                    this.message = "";
                    this.isDuplicate = false;
                    this.errorOccurred = false;
                    try {
                        if (this.updatePositions()) {
                            if (await this.getProfiles()) {
                                const formData = new FormData();
                                formData.append('photo', this.file, this.file.name);
                                let pathToPhoto = await axios.post('/api/photos', formData);
                                await axios.post('/api/profiles', {
                                    name: this.name,
                                    nickName: this.nickName,
                                    positions: this.positions,
                                    hero: this.hero,
                                    bio: this.bio,
                                    path: pathToPhoto.data.path
                                });
                                this.moreProfiles();
                                this.success = true;
                                this.isDuplicate = false;
                                this.errorOccurred = false;
                                this.message = "Success! Your profile has been added to the Teams page.";
                            } else {
                                this.isDuplicate = true;
                                this.message = "Duplicate account, please try again.";
                            }

                            this.positions.clear();
                        } else {
                            this.errorOccurred = true;
                            this.message = "Error, all the fields have not been filled out.";
                        }
                    } catch (error) {
                        //check error
                    }
                },
                updatePositions() {
                    if (this.position1) {
                        this.positions.push(1);
                    }
                    if (this.position2) {
                        this.positions.push(2);
                    }
                    if (this.position3) {
                        this.positions.push(3);
                    }
                    if (this.position4) {
                        this.positions.push(4);
                    }
                    if (this.position5) {
                        this.positions.push(5);
                    }
                    if (this.name === "" || this.nickName === "" || this.hero === "" || this.bio === "") {
                        return false;
                    } else {
                        return true;
                    }
                },
                async getProfiles() {
                    try {
                        let response = await axios.get("/api/profiles");
                        this.profiles = response.data;

                        const result = this.profiles.filter(profile => profile.name === this.name && profile.nickName === this.nickName);

                        if (result.length > 0) {
                            return false;
                        } else {
                            return true;
                        }
                    } catch (error) {
                        this.errorOccurred = true;
                        this.message = "Error occurred, please try again.";
                    }
                },
                async moreProfiles() {
                    try {
                        let response = await axios.get("/api/profiles");
                        this.profiles = response.data;
                        return true;
                    } catch (error) {
                        //check error
                    }
                },
                async deleteItem(profile) {
                    try {
                        await axios.delete("/api/profiles/" + profile._id);
                        this.searchProfile = null;
                        this.moreProfiles();
                        return true;
                    } catch (error) {
                        //check error
                    }
                },
                async updateItem(profile) {
                    try {
                        await axios.put("/api/profiles/" + profile._id, {
                            name: this.searchProfile.name
                        });
                        this.searchProfile = null;
                        this.moreProfiles();
                        return true;
                    } catch (error) {
                        //check error
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
                fileChanged(event) {
                    this.file = event.target.files[0]
                },
                selectItem(profile) {
                    this.searchName = "";
                    this.searchProfile = profile;
                },
                closeSearch() {
                    this.viewSearchBar = !this.viewSearchBar;
                }

            },
    }
</script>

<style scoped>
    .background
    {
        /*background-image: url('../../assets/background-images/main-page-background.jpg');*/
        background-repeat: repeat;
        background-size: cover;
        color: white;
        text-align: center;
        background-color: black;
    }

    .inputItems
    {
        display: inline-block;
        align-items: center;
        background-color: #5D6063;
        color: black;
        width: 40%;

    }
    .item {
        margin: 20px;
        width: 50%;
    }

    .item:hover {
        box-shadow: 0px 0px 5px #f3f3f3;
    }


    .checkboxes {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .checkbox-item {
        margin-right: 10px;
        margin-left: 10px;
        font-size: 18px;
    }

    button:hover {
        box-shadow: 0px 0px 5px #f3f3f3;
        cursor: pointer;
        font-weight: bold;
    }

    .suggestion {
        border-bottom: solid darkgrey 2px;
    }

    .suggestion:hover {
        background-color: #5BDEFF;
        color: #fff;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #5D6063;
        margin-top: 20px;
        margin-right: 10px;
        margin-left: 10px;
    }



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
        /*background-image: url('../assets/background-images/main-page-background.jpg');*/
        background-repeat: repeat;
        background-size: contain;
        color: #e0e0e0;
        border: solid darkgrey 2px;
        border-radius: 10px;
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
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

    .grid-it {
        display: inline-block;
        flex-direction: column;
    }



</style>