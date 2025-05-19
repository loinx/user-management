describe('User Management Flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: [
        {
          id: 1,
          username: 'admin',
          email: 'admin@example.com',
          role: 'ADMIN',
        },
        {
          id: 2,
          username: 'user1',
          email: 'user1@example.com',
          role: 'USER',
        },
      ],
    }).as('getUsers');

    cy.login('admin', 'admin123');
    cy.visit('/users');
    cy.wait('@getUsers');
  });

  it('should display user list', () => {
    cy.get('table').should('be.visible');
    cy.get('tbody tr').should('have.length', 2);
    cy.get('tbody tr').first().should('contain', 'admin');
    cy.get('tbody tr').last().should('contain', 'user1');
  });

  it('should create a new user', () => {
    cy.intercept('POST', '/api/users', {
      statusCode: 201,
      body: {
        id: 3,
        username: 'newuser',
        email: 'newuser@example.com',
        role: 'USER',
      },
    }).as('createUser');

    cy.get('a').contains('Add User').click();
    cy.url().should('include', '/users/new');

    cy.get('input[name="username"]').type('newuser');
    cy.get('input[name="email"]').type('newuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('select[name="role"]').select('USER');
    cy.get('button[type="submit"]').click();

    cy.wait('@createUser');
    cy.url().should('include', '/users');
    cy.get('tbody tr').should('have.length', 3);
    cy.get('tbody tr').last().should('contain', 'newuser');
  });

  it('should edit an existing user', () => {
    cy.intercept('PUT', '/api/users/2', {
      statusCode: 200,
      body: {
        id: 2,
        username: 'user1',
        email: 'updated@example.com',
        role: 'ADMIN',
      },
    }).as('updateUser');

    cy.get('tbody tr').contains('user1').parent().find('button').first().click();
    cy.url().should('include', '/users/2/edit');

    cy.get('input[name="email"]').clear().type('updated@example.com');
    cy.get('select[name="role"]').select('ADMIN');
    cy.get('button[type="submit"]').click();

    cy.wait('@updateUser');
    cy.url().should('include', '/users');
    cy.get('tbody tr').contains('user1').parent().should('contain', 'updated@example.com');
  });

  it('should delete a user', () => {
    cy.intercept('DELETE', '/api/users/2', {
      statusCode: 204,
    }).as('deleteUser');

    cy.get('tbody tr').contains('user1').parent().find('button').last().click();
    cy.get('.modal-footer button.btn-danger').click();

    cy.wait('@deleteUser');
    cy.get('tbody tr').should('have.length', 1);
    cy.get('tbody tr').should('not.contain', 'user1');
  });

  it('should show validation errors when creating user', () => {
    cy.get('a').contains('Add User').click();
    cy.get('button[type="submit"]').click();

    cy.get('div.text-danger').should('contain', 'Username is required');
    cy.get('div.text-danger').should('contain', 'Email is required');
    cy.get('div.text-danger').should('contain', 'Password is required');
  });

  it('should handle API errors', () => {
    cy.intercept('GET', '/api/users', {
      statusCode: 500,
      body: {
        message: 'Internal server error',
      },
    }).as('getUsersError');

    cy.visit('/users');
    cy.wait('@getUsersError');
    cy.get('.alert-danger').should('contain', 'Internal server error');
  });
}); 