<template>
    <b-container class="container home-content" id="terms">
        <div class="row">
            <div class="col-md-12">
                <h1>Terms and Conditions</h1>
                <p>
                    "Apply for a Family Law Protection Order" Terms of Use
                    <br />Version 0.1, May 28, 2018
                </p>
                <p>The "Apply for a Family Law Protection Order" Service ("this service") is provided as a public service by the Government of British Columbia, Box 9411, Victoria, British Columbia, Canada V8W 9V1.</p>
                <h3>User Agreement</h3>
                <p>Every person who uses this service ("User" or "You") agrees to the Terms of Use in this document and to the fact that the Government of British Columbia may amend these terms from time to time. The Government of British Columbia reserves the right, at its discretion, to change, modify, add, or remove portions of these terms at any time. Please check these terms periodically for changes. Your continued use of this service following the posting of changes to these terms will mean you accept these changes.</p>
                <h3>Privacy Protection</h3>
                <p>
                    This service does not collect personal information about Users without their consent, and has set up means to keep personal information confidential.
                    However, the Government of British Columbia does collect aggregate data about Users' use of this service to better understand general User trends at an aggregate
                    level and improve web performance, web services, and website maintenance.
                </p>
                <p>
                    An Internet Protocol (IP) network domain name (e.g. shaw.ca) and a partial, non-specific IP address (e.g. 216.10.100.xx) of the computer you
                    are using may be collected and stored on servers located outside Canada. Other information that this service collects (e.g. email addresses) is stored in Canada.
                </p>
                <p>
                    The anonymity of Users is therefore reasonably protected but not fully guaranteed. This service's management of personal information
                    is described more fully on the Government of British Columbia's Privacy Policy page.
                </p>
                <p>
                    Absent the use of encryption, the internet and email are not secure media and privacy cannot be ensured. The Government of British Columbia will not be
                    responsible for any damages you or any third party may suffer as a result of the transmission of confidential information that you make to any party through the
                    internet email links provided on this service. The Government of British Columbia is not responsible for any errors or any changes made to any transmitted information.
                    Should you decide to transmit information using internet email links, you do so at your own risk.
                </p>
            </div>
        </div>
    </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class terms extends Vue {

  
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
