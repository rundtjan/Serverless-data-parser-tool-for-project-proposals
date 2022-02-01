describe('Data parser tool ', function() {
    it('Front page can be opened', function() {
        cy.visit('http://localhost:80')
        cy.contains('Slack messages')
        cy.contains('Words from messages')
        cy.contains('Make choices')
    })
})