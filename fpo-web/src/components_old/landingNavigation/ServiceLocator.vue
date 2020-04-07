<template>
  <b-container class="container home-content" id="serviceLocator">
    <div class="intro">
      Is Victoria Law Courts' the nearest location to you OR the location where your existing matter has been filed?
      <b-form class="custom-form" @submit="onSubmit">
        <b-form-group>
          <b-form-radio v-model="form.selected" name="locationRadio" :value="true">Yes</b-form-radio>
          <b-form-radio v-model="form.selected" name="locationRadio" :value="false">No</b-form-radio>
          <b-button type="submit" :disabled="isDisabled" variant="primary" class="locator-button">Next</b-button>
        </b-form-group>
      </b-form>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "ServiceLocator",
  data() {
    return {
      form: {
        selected: ''
      }   
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if(this.form.selected) {
        this.$router.push({name: "FlappSurveys" });
      } else {
        location.replace("https://family-protection-order-dev.pathfinder.gov.bc.ca/protection-order/");
      }
    }
  },
  computed: {
    isDisabled: function() {
      return this.form.selected === '';
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
.intro {
  font-size: 24px;
  line-height: 1.6;
  margin: 4rem auto 0.5rem;
  p {
    margin-bottom: 0.5rem;
  }
}
.custom-form{
  margin-top: 1rem;
}
.locator-button {
  margin-top: 2.5rem;
  float: right;
  width: 8rem;
  
}
</style>
