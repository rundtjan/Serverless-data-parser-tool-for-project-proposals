describe('Data parser tool ', function() {
    
    beforeEach(function() {
        cy.visit('/')
    })

    it('Front page can be opened', function() {
        cy.contains('Slack Messages')
        cy.contains('Words from messages')
    })

    /**This test loops through all messages and checks for a button. If has button checks for a thread */
    it('Message with an expander has a thread', function(){
        cy.get('#messageList').find('ul').first().find('.MuiBox-root').each(($el, index, $list) => {
        if ($el.find('svg').length > 1){//message has an expander
            cy.wrap($el).children().should('have.length.of.at.least', 2)
        }
        })
    })

    /**This test loops through all messages and checks that there isn't a button. If has button checks that there's no thread */
    it('Message without an expander has no thread', function(){
        cy.get('#messageList').find('ul').first().find('.MuiBox-root').each(($el, index, $list) => {
        if ($el.find('svg').length == 1){//message has no expander
            cy.wrap($el).children().should('have.length', 1)
        }
        })
    })

    it('Fields for categories exist', function() {
        cy.contains('Customer')
        cy.contains('Price')
        cy.contains('Deadline')
        cy.contains('FTEs')
        cy.contains('Contact')
        cy.contains('Technology')
    })

    it('Before choosing words, the SendToHubSpot-button is disabled', function(){
      cy.get('#sendToHubSpotButton').should('be.disabled')
    })

    /**This test needs to get the second button (index eq(1)), because the first button is the filter-button. */
    it('Clicking a checkbox opens a drop down menu', function() {
        cy.get('#wordList').parent().find('button').eq(1).click()
        cy.get('#basic-menu').should('exist')
    })

    it('Choosing a category shows the word in category column', function() {
        cy.get('#wordList').parent().find('button').eq(1).click()
        cy.get('#basic-menu').find('li').first().click()
        cy.get('#categoryGrid').find('li').should('exist')
    })

    it('Unchecking the checkbox removes the word from the column', function() {
        cy.get('#wordList').parent().find('button').eq(1).click()
        cy.get('#basic-menu').find('li').first().click()
        cy.get('#categoryGrid').find('li').should('exist')
        cy.contains('Words from messages').parent().find('input').first().click()
        cy.contains('Customer').parent().find('li').should('not.exist')
    })

    it('Clicking Filter words open a drop down meny', function() {
        cy.contains('Filter words')
        cy.get('#wordList').find('#filter-button').click()
        cy.get('#filter-menu').should('exist')
    })

    it('Labels for filter exist', function() {
        cy.get('#wordList').find('#filter-button').click()
        cy.contains('Technology')
        cy.contains('Number')
        cy.contains('Date')
        cy.contains('Show all')
    })

    it('After choosing a word to a category, the SendToHubSpot-button is not disabled', function(){
        cy.get('#wordList').parent().find('button').eq(1).click()
        cy.get('#basic-menu').find('li').first().click()
        cy.get('#sendToHubSpotButton').should('not.be.disabled')
    })

    it('After choosing words and clicking SendToHubSpot and waiting, a success or error label is shown', function() {
        cy.get('#wordList').parent().find('button').eq(1).click()
        cy.get('#basic-menu').find('li').first().click()
        cy.get('#sendToHubSpotButton').click()
        cy.get('#HubSpotSuccess').should('be.visible') || cy.get('#HubSpotError').should('be.visible')
    })

    /** Assigns the first word to customer and then again the same word to price. Checks that Json is updated  */
    it('Json field is updated when same word is assigned multiple times', function() {
        cy.get('#wordList').parent().find('button').eq(1).click()
        cy.get('#basic-menu').find('li').first().click()
        cy.get('#jsonField').find('#json').should('exist')
        cy.get('#jsonField').find('#json').contains('Customer')
        cy.get('#wordList').parent().find('button').eq(1).click()
        cy.get('#basic-menu').find('li').eq(1).click()
        cy.get('#jsonField').find('#json').contains('Price')
        cy.get('#json').should('not.contain', 'Customer')
    }) 
    /** Assigns 1. word to Deadline and 2. word to  Contact. Checks that json field includes both. */
    it('Json field is updated when 2 words are added to different categories', function() {
        cy.get('#wordList').parent().find('button').eq(1).click()
        cy.get('#basic-menu').find('li').eq(2).click()
        cy.get('#wordList').parent().find('button').eq(2).click()
        cy.get('#basic-menu').find('li').eq(4).click()
        cy.get('#json').contains('Deadline')
        cy.get('#json').contains('Contact')
    })


    it('Clicking delete button in categoryfields removes word from it', function() {
        cy.get('#wordList').parent().find('button').eq(1).click()
        cy.get('#basic-menu').find('li').first().click()
        cy.get('#categoryGrid').find('li').should('exist')
        cy.get('#delete-button').click()
        cy.get('#categoryGrid').find('li').should('not.exist')
    })
})
