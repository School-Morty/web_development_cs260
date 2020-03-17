<template>
  <div id="app">


    <!--Begin navigation bar.-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light" v-bind:style="{width: setPageWidth()}">
      <router-link class="navbar-brand" to="/">
        <img id="menu-logo" src="./assets/logo.jpg"/>
      </router-link>
      <button @click="isClicked" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarNav" class="collapse navbar-collapse" >
        <ul class="navbar-nav">
          <div v-bind:class="[this.$root.$data.active ? '' : 'left-header']">
            <li class="nav-item">
              <router-link class="nav-link" to="/news">News</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link team-link" to="/team">Team</router-link>
            </li>
          </div>
<!--          <div class="menu-logo">-->
          <div class="menu-logo">
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                <img src="./assets/logo-images/top_logo_signature.png"/>
              </router-link>
            </li>
          </div>
          <div v-bind:class="[this.$root.$data.active ? '' : 'right-header']">
            <li class="nav-item">
              <router-link class="nav-link" to="/results">Results</router-link>
            </li>
            <li class="nav-item">
              <router-link id="sign-up-link" class="nav-link" to="https://clubs.byu.edu/clubs#/byudc">Sign Up</router-link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
    <!--End navigation bar.-->





     <!--Whatever displays in the router view.-->
    <router-view/>











      <!-- Footer -->
      <footer class="page-footer fixed-bottom font-small special-color-dark pt-4">

        <!-- Footer Elements -->
        <div class="container">

          <!-- Social buttons -->
          <ul class="list-unstyled list-inline text-center">
            <li class="list-inline-item left-social-footer">
              <div class="footer-copyright text-center py-3 set-copy-right">© 2020 Copyright</div>
            </li>
            <li class="list-inline-item social-media-width">
              <router-link class="btn-floating btn-tw mx-1" to="https://www.facebook.com/pages/category/Social-Club/DOTA-Cougs-102171557852322/">
                  <img src="./assets/social-media-images/facebook.png"/>
              </router-link>
            </li>
            <li class="list-inline-item social-media-width">
              <router-link class="btn-floating btn-gplus mx-1" to="https://twitter.com/mortymortensen">
                  <img src="./assets/social-media-images/twitter.png"/>
              </router-link>
            </li>
            <li class="list-inline-item">
              <div class="footer-copyright text-center py-3">
                <router-link class="copy-right-link" to="https://github.com/Morty-Mortensen/web_development_cs260/"> GitHub </router-link>
              </div>
            </li>

            <li class="list-inline-item social-media-width">
              <router-link class="btn-floating btn-li mx-1" to="https://www.linkedin.com/in/tyler-mortensen-73a602175?trk=people-guest_people_search-card">
                  <img src="./assets/social-media-images/linked_in.png"/>
              </router-link>
            </li>
            <li class="list-inline-item social-media-width">
              <router-link class="btn-floating btn-dribbble mx-1" to="https://www.google.com/">
                  <img src="./assets/social-media-images/google_plus.png"/>
              </router-link>
            </li>
          </ul>
          <!-- Social buttons -->

        </div>
        <!-- Footer Elements -->

      </footer>
      <!-- Footer -->
  </div>
</template>

<script>
  export default {
  name: 'App',
    computed: {
      pageWidth() {
        return this.$root.$data.pageWidth;
      }
      // return this.$root.$data.pageWidth
    },

    methods: {
        isClicked() {
          this.$root.$data.active = !this.$root.$data.active;
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
        }
      },
  }


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

.max-page-width
{
  width: 1920px;
}

.main-page
{
  background-image: url('/assets/background-images/main-page-background.jpg');
  background-repeat: repeat;
  background-size: cover;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 20px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

img
{
  width: 100%;
}

.nav-link
{


}

.navbar-light .navbar-nav .nav-link
{
  color: #E0E0E0;
}

.navbar, .navbar-expand-lg, .navbar-light, .bg-light
{
  background-color: #7E8184 !important;
  max-height: 70px;
}

.show
{
  display: flex;
  flex-direction: column;
  background-color: #7E8184 !important;
  z-index: 100;
}

.navbar-nav
{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;

}

.left-header
{
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 300px;
  margin-left: 100px;
}

.menu-logo
{
  /*display: flex;*/
  /*flex-flow: row;*/
  /*justify-content: space-between;*/
  /*width: 20%;*/

  max-width: 200px;
  min-width: 200px;
  max-height: 70px;
  margin-top: -10px;
  display: block; /* remove extra space below image */
}

.right-header
{
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 300px;
  margin-right: 100px;
}

.nav-img
{

  /*flex: 1;*/
  width: 10%;
}


.navbar
{
  padding: 0.3rem .1rem;

}


.navbar-brand
{
  /*margin-right: 0rem;*/
  /*padding-top: 0px;*/
  /*padding-bottom: 0px;*/
  padding-left: 5px;
  /*margin-top: -10px;*/
  align-content: center;
  width: 70px;
  height: 45px;
  max-width: 55px;
  min-width: 55px;
    max-height: 48px;
    min-height: 48px;
  display: block; /* remove extra space below image */
  padding-bottom: 60px;
}


#menu-logo
{
  position: absolute;
  border-right: solid black;
  align-content: initial;
  max-width: 55px;
  min-width: 55px;
  max-height: 48px;
  min-height: 48px;
  padding-right: .25em;
  border-right-width: 2px;
  /*margin-left: 10px;*/
  margin-top: 0px;
  margin-left: -25px;
  width: 5.5%;
}

#sign-up-link
{
  color: #B2D6FF;
}

#sign-up-link:hover
{
  color: #111111;
}

#sign-up-link
{
  color: #B2D6FF;
}

#sign-up-link:hover
{
  color: #111111;
}

/* -----Footer----- */
.page-footer
{
  background-color: #7E8184;
}

.pt-4, .py-4
{
  padding-top: 0rem !important;
  /*align-content: center;*/
}

.pb-3, .py-3
{
  padding-top: 0rem !important;
  padding-bottom: 0.3rem !important;
}

dl, ol, ul
{
  margin-bottom: 0.2em;
  margin-top: 0.2em;
}

.list-inline-item
{
  width: 4%;
}

.list-inline-item:not(:last-child)
{
  margin-right: 40px;
}

.fa-linkedin-in
{
  margin-left: 30px;
}

.fa-dribbble
{
  margin-left: 30px;
}


.left-social-footer
{
  float: left;
  position: absolute;
  left: 180px;
  bottom: 5px;
  text-align: center;
  width: 20%;
  margin-left: -200px;
}

.footer-copyright
{
  font-size: 1.0em;
    padding-right: 50px;
}

.copy-right-link
{
  color: #E0E0E0;
}

a:link
{
  text-decoration: none;

}

a:hover
{
  color: black;
}

.set-copy-right
{
    display: block;
    position: fixed;
    bottom: 5px;
    left: 5px;
    margin-right: 100px;
}

.social-media-width
{
    max-width: 35px;
    min-width: 35px;
    max-height: 30px;
    min-height: 30px;
}

@media (max-width: 990px)
{
  .menu-logo{
    display: none;
  }
}

@media (min-width: 992px)
{


  .navbar-expand-lg
  {
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
}

@media (max-width: 750px)
{
    .set-copy-right{
        opacity: .5;
    }
}

@media (max-width: 700px)
{
    .set-copy-right{
        opacity: .25;
    }
}

@media (max-width: 650px)
{
    .set-copy-right{
        display: none;
    }
}



/*@media (max-width: 991px)*/
/*{*/

/*  .left-social-footer*/
/*  {*/
/*    font-size: 0.9em;*/
/*  }*/

/*  .navbar-nav*/
/*  {*/
/*    !*display: flex;*!*/
/*    flex-flow: row;*/
/*    left: 0;*/
/*    !*align-items: center;*!*/
/*    !*justify-content: space-between;*!*/
/*    !*width: 100%;*!*/
/*    !*position: relative;*!*/
/*  }*/
/*  .left-header*/
/*  {*/
/*    !*display: flex;*!*/
/*    !*flex-flow: row nowrap;*!*/
/*    !*justify-content: space-between;*!*/
/*    width: 250px;*/
/*    margin-left: 20px;*/
/*  }*/
/*  .right-header*/
/*  {*/
/*    !*display: flex;*!*/
/*    !*flex-flow: row nowrap;*!*/
/*    !*justify-content: space-between;*!*/
/*    width: 250px;*/
/*    margin-left: 100px;*/
/*  }*/

/*  .menu-logo*/
/*  {*/
/*    !*opacity: 1;*!*/
/*    !*width: 38%;*!*/
/*    !*left: 350px;*!*/
/*    !*margin-top: -55px;*!*/
/*  }*/
/*}*/

/*@media (max-width: 929px)*/
/*{*/
/*  .left-social-footer*/
/*  {*/
/*    font-size: 0.8em;*/
/*  }*/
/*  .menu-logo*/
/*  {*/
/*    opacity: 0;*/
/*  }*/
/*}*/

/*@media (max-width: 866px)*/
/*{*/
/*  .left-social-footer*/
/*  {*/
/*    font-size: 0.7em;*/
/*  }*/
/*}*/

/*@media (max-width: 803px)*/
/*{*/
/*  .left-social-footer*/
/*  {*/
/*    font-size: 0.6em;*/
/*  }*/
/*}*/

/*@media (max-width: 740px)*/
/*{*/
/*  .left-social-footer*/
/*  {*/
/*    font-size: 0.5em;*/
/*    bottom: 10px;*/
/*    right: 100px;*/
/*  }*/
/*}*/

/*@media (max-width: 670px)*/
/*{*/
/*  .left-social-footer*/
/*  {*/
/*    margin-left: -180px;*/
/*  }*/

/*  #sign-up-link*/
/*  {*/
/*    margin-right: 20px;*/
/*  }*/
/*}*/

/*@media (max-width: 625px)*/
/*{*/

/*  #sign-up-link*/
/*  {*/
/*    margin-right: 40px;*/
/*  }*/
/*}*/

/*@media (max-width: 600px)*/
/*{*/

/*  #sign-up-link*/
/*  {*/
/*    margin-right: 60px;*/
/*  }*/
/*  .team-link*/
/*  {*/
/*    margin-left: -110px;*/
/*  }*/
/*}*/

/*@media (max-width: 590px)*/
/*{*/

/*  #sign-up-link*/
/*  {*/
/*    margin-left: -30px;*/
/*  }*/

/*  .right-header*/
/*  {*/
/*    margin-left: 10px;*/
/*  }*/
/*  !*.team-link*!*/
/*  !*{*!*/
/*  !*    margin-left: -130px;*!*/
/*  !*}*!*/
/*}*/


</style>
