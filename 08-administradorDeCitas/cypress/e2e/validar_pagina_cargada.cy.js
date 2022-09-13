/// <reference types="cypress" />
describe('Carga la pagina principal', () => {
  beforeEach(() => {
    cy.viewport(1280, 900);
  });
  it('Carga la pagina principal', () => {
    cy.visit('/index.html');

    // Verificar el elemento y su texto
    cy.contains('h1', 'Administrador de Pacientes de Veterinaria');

    // Verificar que exista el elemento
    cy.get('[data-cy="titulo-proyecto"]').should('exist');

    // Verificar que exista el elemento y contenta un texto especifico
    cy.get('[data-cy="titulo-proyecto"]').invoke('text').should('equal', 'Administrador de Pacientes de Veterinaria');

    // Verificar el texto de las citas
    cy.get('[data-cy="citas-heading"]').invoke('text').should('equal', 'Administra tus Citas');
  });
});
