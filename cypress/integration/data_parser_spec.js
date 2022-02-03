describe('Data parser tool ', function() {
    it('Front page can be opened', function() {
        cy.visit('http://localhost:80')
        cy.contains('Slack messages')
        cy.contains('Words from messages')
        cy.contains('Make choices')
    })

    it('Message which is a thread has an expander', function() {
        cy.visit('http://localhost:80')
        cy.contains('Slack messages')
        cy.contains('Message massage sent by Jan Rundt')
        cy.get('[id=text-727f403c-f840-4735-abc4-654471c549ed]').contains('Message massage sent by Jan Rundt')
        cy.contains('Tämä on uusi thredvastaus vanhaan parentviestiin!! sent by Jan Rundt').should('not.exist')
        cy.get('[id=button-727f403c-f840-4735-abc4-654471c549ed]').click()
        cy.contains('Tämä on uusi threadvastaus vanhaan parentviestiin!! sent by Jan Rundt')
    })
})