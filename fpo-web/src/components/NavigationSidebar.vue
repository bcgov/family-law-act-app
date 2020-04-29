<template>
  <!-- https://www.w3schools.com/howto/howto_css_sidebar_responsive.asp -->
  <div class="sidebar-left" id="sidebar-left">
    <div class="sidebar-container" id="sidebar">
      <div class="sidebar-title">
        <h3>Application Steps</h3>
      </div>
      <a
        class="step"
        v-for="(step, stepIndex) in getNavigation()"
        v-show="step.active"
        v-bind:key="stepIndex"
        v-bind:id="getStepId(stepIndex)"
        v-bind:index="stepIndex"
        v-bind:class="{
          current: isCurrentStep(stepIndex) && !isAllCompleted(),
        }"
        v-on:click="onSelectStep($event)"
      >
        <div class="step-header">
          <div class="header-icon">
            <i v-bind:class="['fa', step.icon]"></i>
          </div>
          <div class="header-text">
            <div class="text-step">
              STEP {{ stepIndex + 1 }}
              <i v-show="false" class="fa fa-check" />
            </div>
            <div class="text-title">{{ step.label }}</div>
          </div>
        </div>
        <div
          class="step-pages"
          v-bind:id="getStepGroupId(stepIndex)"
          v-bind:index="stepIndex"
          v-bind:style="
            isCurrentStep(stepIndex) && !isAllCompleted()
              ? 'display: block;'
              : 'display: none;'
          "
        >
          <ul>
            <li
              tabindex="1"
              v-for="(page, pageIndex) in step.pages"
              v-bind:key="pageIndex"
              v-bind:id="getStepPageId(stepIndex, pageIndex)"
              v-bind:index="pageIndex"
              v-bind:class="{
                current: pageIndex === step.currentPage,
              }"
              v-show="page.active"
              v-on:click="onSelectPage($event)"
            >
              <div class="step-pages">{{ page.label }}</div>
            </li>
          </ul>
        </div>
      </a>
      <div class="step separate"></div>
      <div
        class="step"
        v-bind:class="{
          disabled: !isAllCompleted(),
          current: isAllCompleted(),
        }"
      >
        <div class="step-header">
          <div class="header-icon">
            <i class="fa fa-print"></i>
          </div>
          <div class="header-text">
            <div class="text-step">STEP {{ getNavigation().length + 1 }}</div>
            <div class="text-title">Print Application Forms</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Step from "../models/step";

export default {
  name: "NavigationSidebar",
  data() {
    return {};
  },
  methods: {
    onSelectStep: function(event) {
      const currIndex = this.$store.getters["application/getCurrentStep"];
      const curr = document.getElementById(this.getStepId(currIndex));
      const currChildGroup = document.getElementById(
        this.getStepGroupId(currIndex)
      );
      const next = event.currentTarget;
      const nextIndex = parseInt(next.getAttribute("index"));
      const nextChildGroup = document.getElementById(
        this.getStepGroupId(nextIndex)
      );

      if (curr == next) {
        // same choice.
        next.classList.add("current");
        nextChildGroup.style.display = "block";
      } else {
        next.classList.add("current");
        nextChildGroup.style.display = "block";

        curr.classList.remove("current");
        currChildGroup.style.display = "none";
      }

      this.$store.dispatch("application/setCurrentStep", nextIndex);
    },
    //TODO: This is where the step is selected
    onSelectPage: function(event) {
      const currStepIndex = this.$store.getters["application/getCurrentStep"];
      const currPageIndex = this.getNavigation()[currStepIndex].currentPage;
      const currPage = document.getElementById(
        this.getStepPageId(currStepIndex, currPageIndex)
      );

      const nextPage = event.currentTarget;
      const nextPageIndex = parseInt(nextPage.getAttribute("index"));

      if (currPage == nextPage) {
        // same choice; do nothing
      } else {
        nextPage.classList.add("current");

        if (currPage !== null) {
          currPage.classList.remove("current");
        }
      }

      this.$store.dispatch("application/setCurrentStepPage", {
        currentStep: currStepIndex,
        currentPage: nextPageIndex,
      });
    },
    getNavigation: function() {
      const steps = this.$store.getters["application/getNavigation"];

      return steps;
    },
    isCurrentStep: function(stepIndex) {
      return this.$store.getters["application/getCurrentStep"] === stepIndex;
    },
    isAllCompleted: function() {
      return this.$store.getters["application/isAllCompleted"];
    },
    getStepId: function(stepIndex) {
      return "step-" + stepIndex;
    },
    getStepGroupId: function(stepIndex) {
      return this.getStepId(stepIndex) + "-group";
    },
    getStepPageId: function(stepIndex, pageIndex) {
      return this.getStepId(stepIndex) + "-page-" + pageIndex;
    },
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/common";

/* Active/current link */
.sidebar a.active {
  background-color: #fcba19;
  color: white;
}

/* The side navigation menu */
.sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
}

/* Sidebar links */
.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}
/* Links on mouse-over */
.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}

/* Page content. The value of the margin-left property should match the value of the sidebar's width property */
div.content {
  margin-left: 200px;
  padding: 1px 16px;
}

/* On screens that are less than 700px wide, make the sidebar into a topbar */
@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {
    float: left;
  }
  div.content {
    margin-left: 0;
  }
}

/* On screens that are less than 400px, display the bar vertically, instead of horizontally */
@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}

/*
 * ported from sidebar.component.scss
 */

// outer sidebar
.sidebar-container {
  background: #eee;
  border-right: 2px solid #ddd;
  bottom: 0;
  display: block;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;
  position: absolute;
  top: 0;
  width: $sidebar-width-md;
  height: 100%;
}

// sidebar title
.sidebar-title {
  padding: 1rem 2rem 1.5rem;
  h3 {
    margin: 0;
  }
}

// Sidebar Nav

$link-active-color: #349;
$link-current-color: $gov-white;
$link-hover-color: #57d;
$link-disabled-color: #777;
$step-header-current-color: #fcba19;
$step-header-hover-color: #efefef;

.step-header {
  flex-flow: row nowrap;
  background: #eee;
  display: flex;
  list-style-type: none;
  margin: 0;
  width: 100%;
  padding: 1em 1em;
  .header-icon {
    border-color: $text-color;
    color: $text-color;
    font-weight: bold;
    position: relative;
    top: 0.15em;
    border: 2px solid $text-color;
    border-radius: 50%;
    font-size: 20px;
    flex: none;
    height: 38px;
    line-height: 34px;
    width: 38px;
    text-align: center;
    transition: border-color color 0.1s linear;
    font-variant-numeric: tabular-nums;

    i.fa {
      line-height: 23px;
      padding-left: 2px;
    }
  }
  .header-text {
    display: flex;
    flex-flow: column nowrap;
    padding: 0.2em;
    .text-step {
      font-weight: bold;
    }
  }
}

.step-pages {
  margin: 0;
  width: 100%;
  ul {
    list-style-type: none;
    padding: 0;
    border-left: solid $gov-gold;
    margin-left: 2em;
    margin-top: 1em;
    margin-right: 2em;
    li {
      margin-top: 1em;
      margin-left: 1em;

      &.current {
        color: $gov-gold;
        outline: none;
      }
      &:active {
        outline: none;
      }
    }
  }
}

.step {
  cursor: pointer;
  display: block;
  list-style-type: none;
  margin: 0;
  max-width: 100%;
  padding: 0;
  &.disabled {
    cursor: not-allowed;
    .step-header {
      .header-icon,
      .header-text {
        border-color: $link-disabled-color;
        color: $link-disabled-color;
      }
    }
  }
  &.current {
    .step-header {
      background: $gov-gold;
      display: flex;
      list-style-type: none;
      margin: 0;
      width: 100%;
      padding: 1em 1em;
      .header-icon {
        border-color: $gov-white;
        color: $gov-white;
      }
      .header-text {
        color: $gov-white;
        display: flex;
        flex-flow: column nowrap;
        color: $link-current-color;
      }
    }
  }
  &.separate {
    margin-top: 2em;
    margin-right: 3em;
    &::before {
      display: block;
      content: " ";
      margin: 0 1.5em;
      position: relative;
      top: -0.75em;
      height: 1px;
      background: #25b;
      width: 100%;
    }
  }
}
</style>
