/// <reference types="cypress" />

describe('Llena los campos de una nueva cita y la muestra', () => {
  beforeEach(() => {
    cy.viewport(1280, 900);
  });
  it('Campos nueva cita', () => {
    cy.visit('/index.html');

    // Llenar formulario

    cy.get('[data-cy=mascota]').type('Momo');
    cy.get('[data-cy=propietario]').type('Andres');
    cy.get('[data-cy=telefono]').type('2616976994');
    cy.get('[data-cy=fecha]').type('2022-10-22');
    cy.get('[data-cy=hora]').type('10:32');
    cy.get('[data-cy=sintomas]').type('Solo duerme y tambien vomita');

    cy.get('[data-cy=submit-cita]').click();

    // Validar mensaje de clase creada
    cy.get('[data-cy="alerta"]')
      .should('have.class', 'alert-success')
      .invoke('text')
      .should('equal', 'Se agrego correctamente');
  });

  it('Edita la cita', () => {
    // Click en editar y cambia el nombre de la mascota a Kimbo y nombre de propietario a Fernando
    cy.get('[data-cy=btn-editar]').click();
    cy.get('[data-cy=mascota]').clear().type('Kimbo');
    cy.get('[data-cy=propietario]').clear().type('Fernando');
    cy.get('[data-cy=submit-cita]').click();

    // Validar mensaje cita editada correctamente
    // Validar mensaje de clase creada
    cy.get('[data-cy="alerta"]')
      .should('have.class', 'alert-success')
      .invoke('text')
      .should('equal', 'Editado correctamente');
  });
});
