/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    // Preserve cookie in every test
    Cypress.Cookies.defaults({
      preserve: (cookie) => {
        return true;
      }
    })
  })

  //read environment variables for creds.
  it('Smoke Test - Login to BCEID', () => {
    cy.log('Checking for CYPRESS_BCEID_USERNAME &&  CYPRESS_BCEID_PASSWORD environment variables.')
    .wait(1000)
    .skipOn(Cypress.env('BCEID_USERNAME') === undefined || Cypress.env('BCEID_PASSWORD') === undefined)
    //Click login
    cy.visit('https://dev.oidc.gov.bc.ca/auth/admin/tz0e228w/console')
    cy.get('#zocial-bceid').click()

    cy.get('#user').type(Cypress.env('BCEID_USERNAME'))
    cy.get('#password').type(Cypress.env('BCEID_PASSWORD'))

    cy.get('.btn').click()
    cy.url({timeout: 20000}).should('eq', 'https://dev.oidc.gov.bc.ca/auth/admin/tz0e228w/console/#/forbidden')
  })

  //This handles the case where the user has never logged in, and selects a location.
  it('Smoke Test - First Login Choose Location', () => {
    cy.visit('http://localhost:8080')

    //Returning user
    cy.get(':nth-child(2) > .btn').click()

    //Wait for BCEID dropdown
    cy.get('#profileDropdown__BV_toggle_')

    cy.request('apply-for-family-order/api/v1/app-list/')
    .as('appListCheck')
    .then((appList) => {
      if (appList.body.length != 0) cy.skipOn(true)
    })

    cy.waitFor('@appListCheck')

    //Click on agree
    cy.get('#__BVID__29___BV_modal_footer_ > .btn').click()

    //Select Yes
    cy.get('span[data-test-id="isVictoriaLawCourt_y"]').click()

    //Select Victoria
    cy.get('div[name="ServiceLocation"] input[value="Victoria"]').click()

    cy.intercept('POST', 'apply-for-family-order/api/v1/app/').as('updateApp')

    //Click Next
    cy.get('#service-locator > .btn').click()

    cy.wait('@updateApp')
  })

  //Should be logged in.
  it('Smoke Test - New Basic Protection Order', () => {
    cy.visit('http://localhost:8080')

    cy.request('apply-for-family-order/api/v1/user-info/')
    .as('loginCheck')
    .then((userInfo) => {
      if (!userInfo.body.universal_id) {
          //Returning user button
          cy.get(':nth-child(2) > .btn').click()

          //Wait for BCEID dropdown (page load)
          cy.get('#profileDropdown__BV_toggle_')
      }
    })

    cy.waitFor('@loginCheck')

    cy.request('apply-for-family-order/api/v1/app-list/')
    .as('appListCheck')
    .then((appList) => {
      if (appList.body.length == 0) {
        cy.skipOn(true)
      }
    })

    cy.waitFor('@appListCheck')

    //Click on begin new application 
    cy.get('.register-button').click()

    //Protection from family violence
    cy.get('input[value="protectionOrder"]').click({force: true})

    //Next button
    cy.get('.survey-nav-right > .btn').click()

    //I need a protection order
    cy.get('div[name="orderType"] input[value="needPO"]').click()

    //Click continue
    cy.get('.col-sm-12 > .btn').click()

    //Is someone making you feel unsafe - Yes
    cy.get('span[data-test-id="unsafe_y"]').click()

    //Is the individual that needs protectiong a family member... - Yes
    cy.get('span[data-test-id="familyUnsafe_y"]').click()

    //I want to apply for a provincial court family act protection order 
    cy.get('input[value="confirmed"]').click()
    
    //Next
    cy.get('.survey-nav-right > .btn').click();

    const randomString = () => [...Array(50)].map(() => Math.random().toString(36)[2]).join('');
    //Fill in name
    cy.get('div[name="ApplicantName"] input[data-test-id="first"]').type(randomString())
    cy.get('div[name="ApplicantName"] input[data-test-id="middle"]').type(randomString())
    cy.get('div[name="ApplicantName"] input[data-test-id="last"]').type(randomString())

    cy.get('div[name="ApplicantDOB"] select[data-test-id="year"]').select('2021')
    cy.get('div[name="ApplicantDOB"] select[data-test-id="month"]').select('January')
    cy.get('div[name="ApplicantDOB"] select[data-test-id="day"]').select('1')

    //Has a lawyer agreed to receive court documents for you? - Yes
    cy.get('span[data-test-id="Lawyer_y"]').click()

    //Lawyer Name
    cy.get('div[name="LawyerName"] input[data-test-id="first"]').type(randomString())
    cy.get('div[name="LawyerName"] input[data-test-id="middle"]').type(randomString())
    cy.get('div[name="LawyerName"] input[data-test-id="last"]').type(randomString())

    //Lawyer Address
    cy.get('div[name="LawyerAddress"] input[data-test-id="address"]').type(randomString())
    cy.get('div[name="LawyerAddress"] input[data-test-id="city"]').type(randomString())
    cy.get('div[name="LawyerAddress"] select[data-test-id="state"]').select('Yukon') // Shouldn't be able to select Yukon
    cy.get('div[name="LawyerAddress"] select[data-test-id="country"]').select('USA')
    cy.get('div[name="LawyerAddress"] input[data-test-id="postcode"]').type(randomString())

    //Lawyer Contact
    cy.get('div[name="LawyerContact"] input[data-test-id="phone"]').type(randomString())
    cy.get('div[name="LawyerContact"] input[data-test-id="email"]').type(randomString())
    cy.get('div[name="LawyerContact"] input[data-test-id="fax"]').type(randomString())
    //Check for .alert?

    //Profession
    cy.get('div[name="ApplicantOccupation"] input').type(randomString())

    cy.get('.survey-nav-right > .btn').click()

    //Protection from Whom?
    cy.get('div[name="RespondentName"] input[data-test-id="first"]').type(randomString())
    cy.get('div[name="RespondentName"] input[data-test-id="middle"]').type(randomString())
    cy.get('div[name="RespondentName"] input[data-test-id="last"]').type(randomString())


    //Know date of birth? - Yes
    cy.get('span[data-test-id="RespondentDOBExact_y"]').click()

    cy.get('div[name="RespondentDOB"] select[data-test-id="year"]').select('2021')
    cy.get('div[name="RespondentDOB"] select[data-test-id="month"]').select('January')
    cy.get('div[name="RespondentDOB"] select[data-test-id="day"] ').select('1')

    //Address
    cy.get('div[name="RespondentAddress"] input[data-test-id="address"]').type(randomString())
    cy.get('div[name="RespondentAddress"] input[data-test-id="city"]').type(randomString())
    cy.get('div[name="RespondentAddress"] select[data-test-id="state"]').select('Nunavut')
    cy.get('div[name="RespondentAddress"] select[data-test-id="country"]').select('Canada')
    cy.get('div[name="RespondentAddress"] input[data-test-id="postcode"]').type(randomString())

    //Contact Info
    cy.get('div[name="RespondentContact"] input[data-test-id="phone"]').type(randomString())
    cy.get('div[name="RespondentContact"] input[data-test-id="email"]').type(randomString())
    cy.get('div[name="RespondentContact"] input[data-test-id="fax"]').type(randomString())

    //Do you need to be protected? - Yes
    cy.get('span[data-test-id="ApplicantNeedsProtection_y"]').click()

    //Do you have a child that needs to be protected? - Yes
    cy.get('span[data-test-id="childPO_y"]').click()

    //Name of Child
    cy.get('div[name="childName"] input[data-test-id="first"]').type(randomString())
    cy.get('div[name="childName"] input[data-test-id="middle"]').type(randomString())
    cy.get('div[name="childName"] input[data-test-id="last"]').type(randomString())

    cy.get('div[name="childDOB"] select[data-test-id="year"]').select('2021')
    cy.get('div[name="childDOB"] select[data-test-id="month"]').select('January')
    cy.get('div[name="childDOB"] select[data-test-id="day"]').select('1')

    //Relationship to child:
    cy.get('div[name="childRelationship"] input').type(randomString())
    //Who does child live with:
    cy.get('div[name="childLivingWith"] input').type(randomString())

    //Is there another adult family member sharing a residence? - Yes
    cy.get('span[data-test-id="anotherAdultSharingResi_y"]').click()

    //Name
    cy.get('div[name="anotherAdultSharingResiName"] input[data-test-id="first"]').type(randomString())
    cy.get('div[name="anotherAdultSharingResiName"] input[data-test-id="middle"]').type(randomString())
    cy.get('div[name="anotherAdultSharingResiName"] input[data-test-id="last"]').type(randomString())

    //Birthday
    cy.get('div[name="anotheradultSharingResiDOB"] select[data-test-id="year"]').select('2021')
    cy.get('div[name="anotheradultSharingResiDOB"] select[data-test-id="month"]').select('January')
    cy.get('div[name="anotheradultSharingResiDOB"] select[data-test-id="day"]').select('1')

    //Relationship
    cy.get('div[name="anotherAdultSharingResiRelation"] input').type(randomString())
    //Is there already a file? - Yes
    cy.get('span[data-test-id="ExistingFamilyCase_y"]').click()

    cy.get('div[name="ExistingCourt"] select').select('Victoria')
    cy.get('div[name="ExistingFileNumber"] input').type('20210317')

    //Next
    cy.get('.survey-nav-right > .btn').click()

    //Share a residence - Yes
    cy.get('span[data-test-id="RespondentLiveTogether_y"]').click()

    //I believe police assistance - All options
    cy.get('div[name="needPolice"] input[type="checkbox"]').each(($el, index, $list) => { // Get the elements and run .each() on them
      cy.wrap($el).check();
    })
    cy.get('div[name="needPolice"] textarea').type(randomString())

    //Next - No Go
    cy.get('.survey-nav-right > .btn').click()

    //No Go - Are there places where you want to stay away from - Yes - all
    cy.get('span[data-test-id="RespondentNoGo_y"]').click()

    cy.get('div[name="RespondentNoGoPlaces"] input[type="checkbox"]').each(($el, index, $list) => { // Get the elements and run .each() on them
      cy.wrap($el).check();
    })
    cy.get('div[name="RespondentNoGoPlaces"] textarea').type(randomString())

    //Next - No Contact
    cy.get('.survey-nav-right > .btn').click()

    //No Contact - Yes
    cy.get('span[data-test-id="needCommunication_y"]').click()
    cy.get('div[name="reasonForCommunication"] input[type="checkbox"]').each(($el, index, $list) => { // Get the elements and run .each() on them
      cy.wrap($el).check();
    })
    cy.get('div[name="reasonForCommunication"] textarea').type(randomString())

    //Next - Weapons and Firearms
    cy.get('.survey-nav-right > .btn').click()

    //Concerns with weapons or Firearms - Yes
    cy.get('span[data-test-id="RespondentFirearms_y"]').click()
    cy.get('div[name="firearmsReason"] textarea').type(randomString())

    //Do you think they have other firearms - Yes
    cy.get('span[data-test-id="RespondentFirearmsYes_y"]').click()
    cy.get('div[name="firearmsYesReason"] textarea').type(randomString())

    //Concerns would threaten with weapons that aren't guns or explosives - Yes
    cy.get('span[data-test-id="RespondentWeapons_y"]').click()
    cy.get('div[name="weaponsReasons"] textarea').type(randomString())

    //Own any weapons that are not everyday objects, guns or explosives?
    cy.get('span[data-test-id="RespondentWeaponsYes_y"]').click()
    cy.get('div[name="weaponsYesReason"] textarea').type(randomString())

    //Next - Background tab
    cy.get('.survey-nav-right > .btn').click()

    //Describe how..
    cy.get('div[name="howPartiesRelated"] textarea').type(randomString())

    //Is the protected party a spouse or has been a spouce - Yes
    cy.get('span[data-test-id="werePOPartiesMarried_y"]').click()

    //Date which parties live like marriage
    cy.get('div[name="liveTogetherPODate"] select[data-test-id="year"]').select('2021')
    cy.get('div[name="liveTogetherPODate"] select[data-test-id="month"]').select('January')
    cy.get('div[name="liveTogetherPODate"] select[data-test-id="day"]').select('1')

    //Date of marriage
    cy.get('div[name="dateOfMarriagePO"] select[data-test-id="year"]').select('2021')
    cy.get('div[name="dateOfMarriagePO"] select[data-test-id="month"]').select('January')
    cy.get('div[name="dateOfMarriagePO"] select[data-test-id="day"]').select('1')

    //Are they currently separated? - Yes
    cy.get('div[name="isSeperatedPO"] input[value="Yes"]').click()
    //Seperated On
    cy.get('div[name="separationDate"] select[data-test-id="year"]').select('2021')
    cy.get('div[name="separationDate"] select[data-test-id="month"]').select('January')
    cy.get('div[name="separationDate"] select[data-test-id="day"]').select('1')

    //Additional Children - Yes
    cy.get('span[data-test-id="PartiesHasOtherChilderen_y"]').click()
    cy.get('div[name="childName"] input[data-test-id="first"]').type(randomString())
    cy.get('div[name="childName"] input[data-test-id="middle"]').type(randomString())
    cy.get('div[name="childName"] input[data-test-id="last"]').type(randomString())
    cy.get('div[name="childDOB"] select[data-test-id="year"]').select('2021')
    cy.get('div[name="childDOB"] select[data-test-id="month"]').select('January')
    cy.get('div[name="childDOB"] select[data-test-id="day"]').select('1')
    //Relationship to child
    cy.get('div[name="childRelationshipWithProtected"] input').type(randomString())
    //Relationship to child2
    cy.get('div[name="childRelationshipWithOther"] input').type(randomString())
    //Living with
    cy.get('div[name="childLivingWith"] input').type(randomString())

    //Are there any existing written agreements? - Yes
    cy.get('span[data-test-id="ExistingOrders_y"]').click()

    //Any information about cultural.. upbringing.. - Yes
    cy.get('span[data-test-id="likeToAddCulturalExplanation_y"]').click()
    cy.get('div[name="culturalExplain"] textarea').type(randomString())

    //Mental health concerns? - Yes
    cy.get('span[data-test-id="mentalHealthConcernPO_y"]').click()
    cy.get('div[name="explainReasonsPO"] textarea').type(randomString())

    //Circumstances that increase risk of family violence? - Yes
    cy.get('span[data-test-id="riskOfViolencePO_y"]').click()
    cy.get('div[name="describeCirumstancesPO"] textarea').type(randomString())

    //Existing court orders between?  - Yes
    cy.get('span[data-test-id="existingPOOrders_y"]').click()

    //Failed to obey court order?  - Yes
    cy.get('div[name="otherPartyDisobeyOrder"] input[value="Yes"]').click()
    cy.get('div[name="describeDisobeyOrder"] textarea').type(randomString())

    //Concerns other party wont obey a court order? - Yes
    cy.get('span[data-test-id="concernForNotObeying_y"]').click()
    cy.get('div[name="explainReasonsForConcern"] textarea').type(randomString())

    //Reported safety concerns to police? - Yes
    cy.get('span[data-test-id="reportedConcernsToPolice_y"]').click()
    cy.get('div[name="describeActionsByPolice"] textarea').type(randomString())

    //Reported safety concerns to social worker? - Yes
    cy.get('span[data-test-id="reportedConcernsToSW_y"]').click()
    cy.get('div[name="desrcibeSWAction"] textarea').type(randomString())

    //Next
    cy.get('.survey-nav-right > .btn').click()

    //Any family violence not described? - Yes
    cy.get('span[data-test-id="isFamilyViolence_y"]').click()
    cy.get('div[name="whatViolence"] textarea').type(randomString())

    //Concerns for safety? - Yes
    cy.get('span[data-test-id="isNoneExplainedConcerns_y"]').click()
    cy.get('div[name="noneExplainedConcerns"] textarea').type(randomString())

    //Describe any recent incidents
    cy.get('div[name="recentIncidents"] textarea').type(randomString())

    //Next
    cy.get('.survey-nav-right > .btn').click()

    //Do you want the judge to make their decision before the other paty gets to tell their story? - Yes
    cy.get('span[data-test-id="PORNoNotice_y"]').click()
    cy.get('div[name="PORWhyNoNotice"] textarea').type(randomString())

    //Next
    cy.get('.survey-nav-right > .btn').click()

    //Review Page - Next
    cy.get('.survey-nav-right > .btn').click()

    //Preview Page - Next
    cy.get('.survey-nav-right > .btn').click()

    //Select efiling
    //cy.get('#sq_365i_2').click()
    //cy.get('.survey-nav-right > .btn').click()
  }) 
  
})
