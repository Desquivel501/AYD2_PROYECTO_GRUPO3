describe('view admin reports', () => {
  //Se guardan las credenciales de un usuario en localStorage
  beforeEach(()=>{
    cy.request({
      method: 'POST',
      url: 'http://34.16.176.103:8080/user/login',
      body: {
        email: 'admin@gmail.com',
        password: '123456'
      }
    })
    .then((resp)=>{
      console.log(resp)
      window.localStorage.setItem('user', JSON.stringify({"type": 0, "id":resp.body.DATA}))
    })
  })

  it('verificar que estén todos los reportes de administrador', () => {
    cy.visit('/admin/reportes')
    cy.contains('Productos mas vendidos')
    cy.contains('Vendedores con mas ventas')
    cy.contains('Categorias mas vendidas')
    cy.contains('Ventas por fecha')
    cy.contains('Top ventas')
  })
})