describe('purchase', () => {
  //Se guardan las credenciales de un usuario en localStorage
  beforeEach(()=>{
    cy.request({
      method: 'POST',
      url: 'http://34.16.176.103:8080/user/login',
      body: {
        email: 'usuario@gmail.com',
        password: '123456'
      }
    })
    .then((resp)=>{
      console.log(resp)
      window.localStorage.setItem('user', JSON.stringify({"type": 1, "id":resp.body.DATA}))
    })
  })

  it('realizar la compra de un producto', () => {
    //Se visita el catalogo del usuario loggeado
    cy.visit('/catalogo')

    //Debería existir un producto de Pizza de Pepperoni en ese usuario
    cy.contains('Pizza de Pepperoni').click()
    cy.url().should('include', '/product')

    //Debería existir un botón de comprar, se le hace click
    cy.contains('Comprar').click()

    //En la nueva pantalla debería existir un botón de Agregar
    cy.contains(new RegExp("^Agregar$", "g")).click()

    //Debe existir un elemento que redireccione al carrito de compras
    cy.get('[href="/carrito"]').click()

    //Abierto el carrito debe existir un dropdown para seleccionar forma de pago
    cy.get('.form-select').select('Prueba')

    //Debe existir un botón para comprar
    cy.get('.btn-buy').click()

    //Revisar que la compra se haya realizado de forma exitosa
    cy.contains('Compra exitosa')
  })
})