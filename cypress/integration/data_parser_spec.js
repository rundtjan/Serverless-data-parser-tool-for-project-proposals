describe('Data parser tool ', function() {
    beforeEach(function() {
        cy.visit('http://localhost:80')
    })

    it('Front page can be opened and is rendered correctly', function() {  
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
})