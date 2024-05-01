describe('view seller sells', () => {
  //Se guardan las credenciales de un usuario en localStorage
  beforeEach(()=>{
    cy.request({
      method: 'POST',
      url: 'http://34.16.176.103:8080/user/login',
      body: {
        email: 'vendedor@gmail.com',
        password: '123456'
      }
    })
    .then((resp)=>{
      console.log(resp)
      window.localStorage.setItem('user', JSON.stringify({"type": 2, "id":resp.body.DATA}))
    })
  })

  it('Comprobar si existe la página para ver historial de ventas', () => {
    cy.visit('/profile')
    cy.contains('Mis Ventas').click()
    cy.should('contain', 'Mis Ventas')
  })
})