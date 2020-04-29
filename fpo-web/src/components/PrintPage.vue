<template>
  <div
    class="fill-height-lg survey-primary fill-body"
    id="print-page"
    style="margin: 10px 10px;"
  >
    <center>
      <h2>You have completed the survey</h2>

      <div class="survey-nav">
        <div class="survey-nav-right">
          <button type="submit" class="btn btn-primary btn-lg">
            <span class="fa fa-print btn-icon-left"></span> Print Your
            Application
          </button>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  name: "Print",
  data() {
    return {};
  },

  components: {},
  methods: {},
  props: {},
  computed: {}
};
</script>
