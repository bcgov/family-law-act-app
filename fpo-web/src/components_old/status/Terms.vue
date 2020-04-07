<template>
  <b-container class="container home-content" id="login">
    <div class="row">
      <div class="col-md-12">
        <h1>Register or Login</h1>
        <div class="intro">
          <p>You will need a 'Basic BCeid' or a 'BC Services card' to access the Family Law Service. This will also enable you to securely access multiple other online government services.</p>
          <div class="loginInfo-section">
            <hr class="section" />
            <div class="row">
              <div class="col-md-5">
                <div class="section-heading">Login with basic BCeID</div>
                <div>Once you login or register, you'll be taken back to this website</div>
                <a class="btn btn-success btn-lg register-button" @click="navigate()">
                  Next
                </a>
              </div>
              <div class="col-md-2">
                <div class="wrapper">
                  <div class="line"></div>
                  <div class="wordwrapper">
                    <div class="word">or</div>
                  </div>
                </div>
              </div>
              <div class="col-md-5">
                <div class="section-heading">Login with BC Service Card</div>
                <div>Once you login or register, you'll be taken back to this website</div>
                <a class="btn btn-success btn-lg register-button">
                  Next
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "Terms",
  props: ['userType'],
  data() {
    return {};
  },
  methods: {
    navigate() {
      if(this.userType === 'new') {
        this.$router.push({name: "serviceLocator"})
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/styles/common";
.home-content {
  padding-bottom: 20px;
  padding-top: 2rem;
  max-width: 950px;
  color: black;
}
hr.section {
  border: 1px solid $gov-mid-blue;
  margin-bottom: 3.5rem;
}
.section-heading {
  color: $gov-mid-blue;
  font-weight: 500;
  padding: 0rem 2rem 0rem 2rem;
}
.intro {
  font-size: 24px;
  line-height: 1.6;
  margin: 0.5rem auto 0.5rem;
  p {
    margin-bottom: 0.5rem;
  }
}
.loginInfo-section {
  margin-top: 2.5rem;
}
.register-button {
  color: $gov-white !important;
  border: 2px solid rgba($gov-pale-grey, 0.3);
  margin-top: 2.5rem;
  width: 100%;
  &:active {
    border: 2px solid rgba($gov-white, 0.8);
  }
}
.wrapper {
  position: relative;
  padding-left: 8rem;
  width: 30px;
  height: 300px;
  margin: 10px;
}

.line {
  position: absolute;
  left: 49%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: $gov-mid-blue;
  z-index: 1;
}

.wordwrapper {
  text-align: center;
  height: 12px;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin-top: -12px;
  z-index: 2;
}

.word {
  color: black;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 3px;
  font: bold 18px arial, sans-serif;
  background: #fff;
}
</style>
