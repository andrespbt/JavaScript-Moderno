/// <reference types="cypress" />

describe('Valida el formulario', () => {
  beforeEach(() => {
    cy.viewport(1280, 900);
  });
  it('Submit al formulario y mostrar alerta de error', () => {
    cy.visit('/index.html');

    cy.get('[data-cy="formulario"]').submit();

    // Seleccionar la alerta y testear mensaje y clase correctos
    cy.get('[data-cy="alerta"]')
      .should('have.class', 'alert-danger')
      .invoke('text')
      .should('equal', 'Todos los campos son obligatorios');
  });
});
