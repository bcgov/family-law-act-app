<template>
  <footer>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <!-- Navbar content -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a
            class="nav-link"
            href="https://www2.gov.bc.ca/gov/content/home/disclaimer"
            target="_blank"
            >Disclaimer</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="displayTerms()">Terms of Use</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="https://www2.gov.bc.ca/gov/content/home/privacy"
            target="_blank"
            >Privacy</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="https://www2.gov.bc.ca/gov/content/home/accessibility"
            target="_blank"
            >Accessibility</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="https://www2.gov.bc.ca/gov/content/home/copyright"
            target="_blank"
            >Copyright</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="contactUs = true">Contact Us</a>
        </li>
      </ul>
    </nav>

    <b-modal size="xl" v-model="contactUs" header-class="bg-white">
      <template v-slot:modal-title>
        <h1 class="mb-0 text-primary">General and Technical Enquiries</h1>
      </template>
      <div class="m-3">
        <p>Can't find what you are looking for? Have a technical issue?</p>
        <p>
          Contact us 8:00 am to 4:30 pm Pacific Time - Monday to Friday except
          Statutory Holidays
        </p>
        <p>
          CSO Support -
          <a href="mailto:Courts.CSO@gov.bc.ca">Courts.CSO@gov.bc.ca</a>
        </p>
      </div>
      <template v-slot:modal-footer>
        <b-button variant="primary" @click="contactUs = false">Close</b-button>
      </template>
      <template v-slot:modal-header-close>
        <b-button
          variant="outline-dark"
          class="closeButton"
          @click="contactUs = false"
          >&times;</b-button
        >
      </template>
    </b-modal>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class NavigationFooter extends Vue {
  contactUs = false;
  mounted() {
    this.contactUs = false;
  }

  public displayTerms() {
    this.$router.push({ name: "terms" });
  }
}
</script>