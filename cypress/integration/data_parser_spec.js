describe('Data parser tool ', function() {
    beforeEach(function() {
        cy.visit('http://135.181.37.120/')
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
        cy.contains('Fte')
        cy.contains('Contact')
        cy.contains('Technology')
    })

    it('Clicking a checkbox opens a drop down menu', function() {
        cy.contains('Words from messages').parent().find('input').first().click()
        cy.get('#basic-menu').should('exist')
    })

    it('Choosing a category shows the word in category column', function() {
        cy.contains('Words from messages').parent().find('input').first().click()
        cy.get('#basic-menu').find('li').first().click()
        cy.contains('Customer').parent().find('li').should('exist')
    })
})