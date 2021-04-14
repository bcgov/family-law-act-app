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
    cy.get('.survey-yesno-outer > :nth-child(1)').click()

    //Select Victoria
    cy.get('#sq_103i_1').click()

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
    cy.get('.col-5 > .btn').click()

    //Protection from family violence
    cy.get(':nth-child(1) > .custom-control').click()

    //Next button
    cy.get('.survey-nav-right > .btn').click()

    //I need a protection order
    cy.get(':nth-child(2) > label').click()

    //Click continue
    cy.get('.col-sm-12 > .btn').click()

    //Is someone making you feel unsafe - Yes
    //Can be 112 or 116
    cy.get('#sq_112i').click()

    //Is the individual that needs protectiong a family member... - Yes
    //Can be 114 or?
    cy.get('#sq_114i').click()

    //I want to apply for a provincial court family act protection order 
    cy.get('.sv-checkbox > label > .sv-checkbox-label > :nth-child(1) > span').click()
    
    //Next
    cy.get('.survey-nav-right > .btn').click();

    const randomString = () => [...Array(50)].map(() => Math.random().toString(36)[2]).join('');
    //Fill in name
    cy.get('#sq_130i').type(randomString())
    cy.get('#sq_130i-middle').type(randomString())
    cy.get('#sq_130i-last').type(randomString())

    cy.get('#sq_131i').select('2021')
    cy.get('#sq_131i-month').select('January')
    cy.get('#sq_131i-day').select('1')

    //Has a lawyer agreed to receive court documents for you? - Yes
    cy.get('#sq_132i').click()

    //Lawyer Name
    cy.get('#sq_138i').type(randomString())
    cy.get('#sq_138i-middle').type(randomString())
    cy.get('#sq_138i-last').type(randomString())

    //Lawyer Address
    cy.get('#sq_139i').type(randomString())
    cy.get('#sq_139i-city').type(randomString())
    cy.get('#sq_139i-state').select('Yukon') // Shouldn't be able to select Yukon
    cy.get('#sq_139i-country').select('USA')
    cy.get('#sq_139i-postcode').type(randomString())

    //Lawyer Contact
    cy.get('#sq_140i').type(randomString())
    cy.get('#sq_140i-email').type(randomString())
    cy.get('#sq_140i-fax').type(randomString())
    //Check for .alert?

    //Profession
    cy.get('#sq_141i').type(randomString())

    cy.get('.survey-nav-right > .btn').click()

    //Protection from Whom?
    cy.get('#sq_177i').type(randomString())
    cy.get('#sq_177i-middle').type(randomString())
    cy.get('#sq_177i-last').type(randomString())


    //Know date of birth? - Yes
    cy.get('#sq_178i').click()

    cy.get('#sq_179i').select('2021')
    cy.get('#sq_179i-month').select('January')
    cy.get('#sq_179i-day').select('1')

    //Address
    cy.get('#sq_180i').type(randomString())
    cy.get('#sq_180i-city').type(randomString())
    cy.get('#sq_180i-state').select('Nunavut')
    cy.get('#sq_180i-country').select('Canada')
    cy.get('#sq_180i-postcode').type(randomString())

    //Contact Info
    cy.get('#sq_181i').type(randomString())
    cy.get('#sq_181i-email').type(randomString())
    cy.get('#sq_181i-fax').type(randomString())

    //Do you need to be protected? - Yes
    cy.get('#sq_182i').click()

    //Do you have a child that needs to be protected? - Yes
    cy.get('#sq_188i').click()

    //Name of Child
    cy.get('#sq_205i').type(randomString())
    cy.get('#sq_205i-middle').type(randomString())
    cy.get('#sq_205i-last').type(randomString())

    cy.get('#sq_206i').select('1955')
    cy.get('#sq_206i-month').select('February')
    cy.get('#sq_206i-day').select('5')

    //Relationship to child:
    cy.get('#sq_207i').type(randomString())
    //Who does child live with:
    cy.get('#sq_208i').type(randomString())

    //Is there another adult family member sharing a residence? - Yes
    cy.get('#sq_195i').click()

    //Name
    cy.get('#sq_209i').type(randomString())
    cy.get('#sq_209i-middle').type(randomString())
    cy.get('#sq_209i-last').type(randomString())
    //Birthday
    cy.get('#sq_210i').select('1955')
    cy.get('#sq_210i-month').select('February')
    cy.get('#sq_210i-day').select('5')
    //Relationship
    cy.get('#sq_211i').type(randomString())

    //Is there already a file? - Yes
    cy.get('#sq_201i').click()

    cy.get('#sq_203i').select('Victoria')
    cy.get('#sq_204i').type('20210317')

    //Next
    cy.get('.survey-nav-right > .btn').click()

    //Share a residence - Yes
    cy.get('#sq_214i').click()

    //I believe police assistance - All options
    cy.get('#sq_215i_0').click()
    cy.get('#sq_215i_1').click()
    cy.get('#sq_215i_2').click()
    cy.get('#sq_215i_3').click()
    cy.get('#sq_215i_4').click()
    cy.get('.sv_q_checkbox_other').type(randomString())

    //Next
    cy.get('.survey-nav-right > .btn').click()

    //No Go - Are there places where you want to stay away from - Yes - all
    cy.get('#sq_219i').click()

    cy.get('#sq_220i_0').click()
    cy.get('#sq_220i_1').click()
    cy.get('#sq_220i_2').click()
    cy.get('#sq_220i_3').click()
    cy.get('#sq_220i_4').click()
    cy.get('.sv_q_checkbox_other').type(randomString())

    //Next
    cy.get('.survey-nav-right > .btn').click()

    //No Contact - Yes
    cy.get('#sq_226i').click()
    cy.get('#sq_227i_0').click()
    cy.get('#sq_227i_1').click()
    cy.get('#sq_227i_2').click()
    cy.get('#sq_227i_3').click()
    cy.get('.sv_q_checkbox_other').type(randomString())

    //Next
    cy.get('.survey-nav-right > .btn').click()

    //Concerns with weapons or Firearms - Yes
    cy.get('#sq_237i').click()
    cy.get('#sq_238i').type(randomString())

    //Do you think they have other firearms - Yes
    cy.get('#sq_239i').click()
    cy.get('#sq_240i').type(randomString())

    //Concerns would threaten with weapons that aren't guns or explosives - Yes
    cy.get('#sq_241i').click()
    cy.get('#sq_242i').type(randomString())

    //Own any weapons that are not everyday objects, guns or explosives?
    cy.get('#sq_243i').click()
    cy.get('#sq_244i').type(randomString())

    //Next
    cy.get('.survey-nav-right > .btn').click()

    //Describe how..
    cy.get('#sq_287i').type(randomString())

    //Is the protected party a spouse or has been a spouce - Yes
    cy.get('#sq_289i').click()

    //Date which parties live like marriage
    cy.get('#sq_291i').select('1955')
    cy.get('#sq_291i-month').select('February')
    cy.get('#sq_291i-day').select('5')
    //Date of marriage
    cy.get('#sq_292i').select('1955')
    cy.get('#sq_292i-month').select('February')
    cy.get('#sq_292i-day').select('5')

    //Are they currently separated? - Yes
    cy.get('#sq_293i_0').click()
    //Seperated On
    cy.get('#sq_294i').select('1955')
    cy.get('#sq_294i-month').select('February')
    cy.get('#sq_294i-day').select('5')

    //Additional Children - Yes
    cy.get('#sq_298i').click()
    cy.get('#sq_323i').type(randomString())
    cy.get('#sq_323i-middle').type(randomString())
    cy.get('#sq_323i-last').type(randomString())
    cy.get('#sq_324i').select('1955')
    cy.get('#sq_324i-month').select('February')
    cy.get('#sq_324i-day').select('5')
    //Relationship to child
    cy.get('#sq_325i').type(randomString())
    //Relationship to child2
    cy.get('#sq_326i').type(randomString())
    //Living with
    cy.get('#sq_327i').type(randomString())

    //Are there any existing written agreements? - Yes
    cy.get('#sq_305i').click()

    //Any information about cultural.. upbringing.. - Yes
    cy.get('#sq_307i').click()
    cy.get('#sq_308i').type(randomString())

    //Mental health concerns? - Yes
    cy.get('#sq_309i').click()
    cy.get('#sq_310i').type(randomString())

    //Circumstances that increase risk of family violence? - Yes
    cy.get('#sq_311i').click()
    cy.get('#sq_312i').type(randomString())

    //Existing court orders between?  - Yes
    cy.get('#sq_313i').click()

    //Failed to obey court order?  - Yes
    cy.get('#sq_315i_0').click()
    cy.get('#sq_316i').type(randomString())

    //Concerns other party wont obey a court order? - Yes
    cy.get('#sq_317i').click()
    cy.get('#sq_318i').type(randomString())

    //Reported safety concerns to police? - Yes
    cy.get('#sq_319i').click()
    cy.get('#sq_320i').type(randomString())

    //Reported safety concerns to social worker? - Yes
    cy.get('#sq_321i').click()
    cy.get('#sq_322i').type(randomString())

    //Next
    cy.get('.survey-nav-right > .btn').click()

    //Any family violence not described? - Yes
    cy.get('#sq_336i').click()
    cy.get('#sq_337i').type(randomString())

    //Concerns for safety? - Yes
    cy.get('#sq_338i').click()
    cy.get('#sq_339i').type(randomString())

    //Describe any recent incidents
    cy.get('#sq_340i').type(randomString())

    //Next
    cy.get('.survey-nav-right > .btn').click()

    //Do you want the judge to make their decision before the other paty gets to tell their story? - Yes
    cy.get('#sq_347i').click()
    cy.get('#sq_348i').type(randomString())

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
