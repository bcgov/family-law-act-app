<template>
  <header class="app-header">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <!-- Navbar content -->

      <div class="container-fluid">
        <a class="navbar-brand" href="https://www2.gov.bc.ca">
          <img
            class="img-fluid d-none d-md-block"
            src="../../public/images/bcid-logo-rev-en.svg"
            width="177"
            height="44"
            alt="B.C. Government Logo"
          />

          <img
            class="img-fluid d-md-none"
            src="../../public/images/bcid-symbol-rev.svg"
            width="63"
            height="44"
            alt="B.C. Government Logo"
          />
        </a>
        <div class="navbar-brand navbar-text">
          Apply for a Family Law Act Protection Order
          <span class="navbar-tag">BETA</span>
        </div>

        <div class="navbar-extra">
          <div id="app-profile">
            <a routerLink="" class="btn btn-primary"
              ><span class="fa fa-user"></span> Profile</a
            >
          </div>
        </div>
        <div id="app-exit" class="app-exit">
          <a
            @click="quickExit()"
            target="_blank"            
            id="quick-exit"
            rel="external"
            class="btn btn-primary"
            ><span class="fa fa-sign-out"></span> Quick Exit</a
          >
        </div>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <!-- <a class="nav-item nav-link" href="#">Home</a>
            <a class="nav-item nav-link" href="#">Getting Started</a>
            <a class="nav-item nav-link" href="#">Theme Demo</a> -->
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import {Component, Vue} from "vue-property-decorator";

export default {
  data() {
    return {};
  },  
  methods: {
    quickExit: function() {
      const emptyApplicationRoutes = ['/', '/status', '/serviceLocator']

      if (emptyApplicationRoutes.indexOf(this.$route.fullPath) == -1) { 
        const lastUpdated = new Date();
        this.$store.dispatch("application/setLastUpdated", lastUpdated); 
        const application = this.$store.getters["application/getApplication"]      
        const applicationId = application.id;

        this.$http.put(
          "/app/"+ applicationId + "/",
          application,
          {
            responseType: "json",
            headers: {
              "Content-Type": "application/json",
            }
          }
        )
        .then(res => {
          console.log(res.data); 
          this.error = "";      
        })
        .catch(err => {
          console.error(err);
          this.error = err;      
        });
      } 
       
      Vue.nextTick().then(() => { 
        this.$store.dispatch("application/init");
        window.location.replace("https://www.google.ca");
      });       
          
      
    }
  }  
};
</script>

<style scoped lang="scss">
@import "../styles/common";

.app-exit + .navbar {
  padding-right: 170px;
}

.navbar-brand:not(.logo) {
  flex: 1 1 auto;
}

.navbar-extra {
  display: inline-block;
  flex: 1 1 auto;
  text-align: right;
}
.navbar .navbar-extra {
  display: inline-block;
  flex: 1 1 auto;
  text-align: right;
}

.app-exit,
.navbar {
  .btn-primary {
    border-color: #ccc;
  }
}

#app-exit {
  padding: 8px 15px;
  position: absolute;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  .btn {
    border-radius: 10rem;
    font-size: 110%;
    padding: 0.5em 1em;
  }
}

#app-profile {
  color: $gov-white;
}
</style>
