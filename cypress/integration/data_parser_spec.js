describe('Data parser tool ', function() {
    
    beforeEach(function() {
        cy.visit('/')
    })

    it('Front page can be opened', function() {
        cy.contains('Slack messages')
        cy.contains('Words from messages')
        cy.contains('Make choices')
    })

    it('Message which is a thread has an expander', function() {
        cy.contains('Slack messages')
        cy.contains('Message massage sent by Jan Rundt')
        cy.get('[id=text-727f403c-f840-4735-abc4-654471c549ed]').contains('Message massage sent by Jan Rundt')
        cy.contains('Tämä on uusi thredvastaus vanhaan parentviestiin!! sent by Jan Rundt').should('not.exist')
        cy.get('[id=button-727f403c-f840-4735-abc4-654471c549ed]').click()
        cy.contains('Tämä on uusi threadvastaus vanhaan parentviestiin!! sent by Jan Rundt')
    })

    it('Message with an expander has a thread', function(){
        cy.get('#messageList').find('button').first().click()
        cy.get('#messageList').find('button').first().parent().parent().parent().children().should('have.length.of.at.least', 2)
    })

    it('Message without an expander has no thread', function(){
        cy.get('#messageList').find('ul').first().find('.MuiGrid-root').each(($el, index, $list) => {
        cy.log($el)
        if ($el.find('button').length == 0){//message has no expander
            cy.log('not finding any button')

        }
        })
    })

    it('Message which is not a thread does not have an expander', function() {
        cy.contains('Slack messages')
        cy.contains('Diba daba sent by Jan Rundt')
        cy.get('[id=text-0b990549-d16b-4ede-a1d5-19fcfa9255ae]').contains('Diba daba sent by Jan Rundt')
        cy.get('[id=button-0b990549-d16b-4ede-a1d5-19fcfa9255ae]').should('not.exist')
    })

    it('Fields for categories exist', function() {
        cy.contains('Customer')
        cy.contains('Price')
        cy.contains('Deadline')
        cy.contains('FTEs')
        cy.contains('Contact')
        cy.contains('Technology')
    })

    it('Clicking a checkbox opens a drop down menu', function() {
        cy.get('#wordList').parent().find('input').first().click()
        cy.get('#basic-menu').should('exist')
    })

    it('Choosing a category shows the word in category column', function() {
        cy.get('#wordList').parent().find('input').first().click()
        cy.get('#basic-menu').find('li').first().click()
        cy.get('#categoryGrid').find('li').should('exist')
    })

    it('Unchecking the checkbox removes the word from the column', function() {
        cy.get('#wordList').find('input').first().click()
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

    it('Category Technology shows right words', function() {
        cy.get('#wordList').find('#filter-button').click()
        cy.get('#filter-menu').find('li').first().click()
        cy.contains('python')
        !cy.contains('kissa')
    })
})
