<template>
<page-base v-bind:hideNavButtons="!showTable" v-on:onPrev="onPrev()" v-on:onNext="onNext()" v-on:onComplete="onComplete()">
  <div class="home-content">
    <div class="row">
      <div class="col-md-12"> <!-- v-if="showTable" -->
        <h1>Children Details</h1>
        <p>Add each child who is the subject of your family law matter application. To add a child, click the "Add Child" button. If you are done entering all the children, click the "Next" button.</p>
        <div class="childSection" v-if="showTable">
          <div class="childAlign">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Child's name</th>
                  <th scope="col">Birthdate</th>
                  <th scope="col">Your relationship to the child</th>
                  <th scope="col">Child's relationship to the other party</th>
                  <th scope="col">Child currently living with</th>
                  <th scope="col">Additional Information</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <div></div>
                <tr v-for="child in childData" :key="child.id">
                  <td>{{child.name.first}} {{child.name.middle}} {{child.name.last}}</td>
                  <td>{{child.dob}}</td>
                  <td>{{child.relation}}</td>
                  <td>{{child.opRelation}}</td>
                  <td>{{child.currentLiving}}</td>
                  <td>{{child.additionalInfoDetails}}</td>
                  <td><a class="btn btn-light" @click="deleteRow(child.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                  <a class="btn btn-light" @click="openForm(child)"><i class="fa fa-edit"></i></a></td>
                </tr>
                <tr class="clickableRow" @click="openForm()">
                  <td colspan = "7">
                    <a
                    >+Add Child</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-md-12" v-if="!showTable">
        <Children-Survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
      </div>
    </div>
  </div>
</page-base>
</template>

<script>
import { Question } from "survey-vue";
import ChildrenSurvey from "./ChildrenSurvey.vue";
import { Step } from "@/types/models/step";
import PageBase from "../../PageBase.vue";

export default {
  name: "children-info",
  components: {
    ChildrenSurvey,
    PageBase
  },
  data() {
    return {
      showTable: true,
      childData: [],
      anyRowToBeEdited: null,
      editId: null
    };
  },
  methods: {
    openForm(anyRowToBeEdited) {
      this.showTable = false;
      if(anyRowToBeEdited) {
        this.editId = anyRowToBeEdited.id;
        this.anyRowToBeEdited = anyRowToBeEdited;
      } else {
        this.anyRowToBeEdited = null;
      }
    },
    childComponentData(value) {
      this.showTable = value;
    },
    populateSurveyData(childValue) {
      const currentIndexValue =
        this.childData.length > 0 ? this.childData[this.childData.length - 1].id : 0;
      const id = currentIndexValue + 1;
      const newChild = { ...childValue, id };
      this.childData = [...this.childData, newChild];

      this.showTable = true; 
    },
    deleteRow(rowToBeDeleted) {
      this.childData = this.childData.filter(data => {
       return data.id !== rowToBeDeleted;
      });
    },
    editRow(editedRow) {
      this.childData = this.childData.map(data => {
        return data.id === this.editId ? editedRow : data;
      });
      this.showTable = true;
    },
    onPrev() {
      this.$store.dispatch("application/gotoPrevStepPage");
    },
    onNext() {
      this.$store.dispatch("application/gotoNextStepPage");
    },
    onComplete() {
      this.$store.dispatch("application/setAllCompleted", true);
    }
  },
  props: {
    step: Step | Object,
  },
  created() {
    if (this.step.result.childData) {
      this.childData = this.step.result.childData;
    }
  },
  beforeDestroy() {
    this.$store.dispatch("application/updateStepResultData", {
      step: this.step,
      data: {childData: this.childData}
    });
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
.childSection {
  border: 2px solid rgba($gov-pale-grey, 0.7);
  border-radius: 18px;
  width: 100%
}
.childAlign {
  padding: 20px;
}
.table, td, th{
  border: 1px solid rgba($gov-pale-grey, 0.9);
  
}
.clickableRow {
  background-color: rgba($gov-pale-grey, 0.5);
  td a {
    display: block;
  }
}
</style>
