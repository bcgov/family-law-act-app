<template>
<page-base v-bind:page="page">
  <div class="home-content">
    <div class="row">
      <div class="col-md-12">
        <h1>Other Party Information</h1>
        <p>Please add the details of the other party in the fields below. If you need to add another party, click the 'Add Other Party' button. If you are done entering all the parties, click the 'Next' button.</p>
        <p>
          <b><u>Who do I name as the other party?</u></b>
          <ul>
            <li>If your application is about a child, the other party must include each of their parents and guardians</li>
            <li>If your application is about spousal support, the other party is your spouse</li>
            <li>If another adult is the subject of your application, such as a step-parent, grandparent or other important person in a child's life, this person is the other party</li>
            <li>If there is already an existing case, you cannot add more parties, the other party is the person or persons that are already involved in that case</li>
            </ul>
        </p>
        <div class="outerSection" v-if="showTable">
          <div class="innerSection">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Other Party Name</th>
                  <th scope="col">Birthdate</th>
                  <th scope="col">Your relationship to the other party</th>
                  <th scope="col">Address Information</th>
                  <th scope="col">Contact Information</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <div></div>
                <tr v-for="op in otherPartyData" :key="op.id">
                  <td>{{op.name.first}} {{op.name.middle}} {{op.name.last}}</td>
                  <td>{{op.dob}}</td>
                  <td>{{op.opRelation}}</td>
                  <td>{{op.address.street}} {{op.address.city}} {{op.address.state}} {{op.address.country}} {{op.address.postcode}}</td>
                  <td>{{op.contactInfo.phone}} {{op.contactInfo.fax}} {{op.contactInfo.email}}</td>
                  <td><a class="btn btn-light" @click="deleteRow(op.id)"><i class="fa fa-trash"></i></a> &nbsp;&nbsp; 
                  <a class="btn btn-light" @click="openForm(op)"><i class="fa fa-edit"></i></a></td>
                </tr>
                <tr class="clickableRow" @click="openForm()">
                  <td colspan = "7">
                    <a
                    >+Add Other Party</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-md-12" v-if="!showTable">
        <OtherParty-Survey v-on:showTable="childComponentData" v-on:surveyData="populateSurveyData" v-on:editedData="editRow" :editRowProp="anyRowToBeEdited" />
      </div>
    </div>
  </div>
</page-base>
</template>

<script>
import { Question } from "survey-vue";
import OtherPartySurvey from "./OtherPartySurvey.vue";
import { Page } from "@/models/page";
import PageBase from "../../PageBase.vue";

export default {
  name: "other-party",
  components: {
    OtherPartySurvey,
    PageBase
  },
  data() {
    return {
      showTable: true,
      otherPartyData: [],
      anyRowToBeEdited: null,
      editId: null
    };
  },
  created() {
    let storedData = this.$store.getters['application/getOtherParties'];
    if(storedData) {
      this.otherPartyData = storedData;
    }
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
    populateSurveyData(opValue) {
      const currentIndexValue =
        this.otherPartyData.length > 0 ? this.otherPartyData[this.otherPartyData.length - 1].id : 0;
      const id = currentIndexValue + 1;
      const newParty = { ...opValue, id };
      this.otherPartyData = [...this.otherPartyData, newParty];

      this.showTable = true; 
    },
    deleteRow(rowToBeDeleted) {
      this.otherPartyData = this.otherPartyData.filter(data => {
       return data.id !== rowToBeDeleted;
      });
    },
    editRow(editedRow) {
      this.otherPartyData = this.otherPartyData.map(data => {
        return data.id === this.editId ? editedRow : data;
      });
      this.showTable = true;
    }
  },
  props: {
    page: Page,
  },
  watch: {
    pageIndex: function(newVal) {
      this.survey.currentPageNo = newVal;
    },
    otherPartyData: function() {
      this.$store.dispatch("application/setOtherParties", this.otherPartyData);
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
.outerSection {
  border: 2px solid rgba($gov-pale-grey, 0.7);
  border-radius: 18px;
  width: 100%
}
.innerSection {
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
