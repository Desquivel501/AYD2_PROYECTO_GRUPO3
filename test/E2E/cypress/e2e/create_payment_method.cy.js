describe('create payment methods', () => {
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

  it('comprobar si existe la opción de crear métodos de pago nuevos', () => {
    const val = Math.floor(Math.random()*1000000)
    const cvv = Math.floor(Math.random()*1000)

    cy.visit('/catalogo')
    cy.get('[href="/carrito"]').click()
    cy.get('[style="height: 40px;"]').click()

    cy.get('form').find('input').each(($input, index)=>{
      if(index == 0){
        cy.get($input).type('test_alias ' + val)
        cy.get($input).should('have.value', 'test_alias ' + val)

      }else if(index == 1){
        cy.get($input).type('test_name ' + val)
        cy.get($input).should('have.value', 'test_name ' + val)

      }else if(index == 2){
        cy.get($input).type(val)
        cy.get($input).should('have.value', val)
      
      }else if(index == 3){
        cy.get($input).type('07/29')
        cy.get($input).should('have.value', '07/29')
      
      }else if(index == 4){
        cy.get($input).type(cvv)
        cy.get($input).should('have.value', cvv)
      }
    })

    cy.get('.btn-primary').contains('Agregar').click()

    cy.contains('Metodo de pago agregado')
  })
})