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
        cy.get('.css-9l3uo3').contains('Message massage sent by Jan Rundt')
    })
})