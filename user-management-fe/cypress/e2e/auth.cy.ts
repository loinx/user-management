describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        token: 'mock-token',
        user: {
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
          role: 'USER',
        },
      },
    }).as('loginRequest');
  });

  it('should login successfully', () => {
    cy.visit('/login');
    
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    cy.wait('@loginRequest');
    cy.url().should('include', '/dashboard');
    cy.get('strong').should('contain', 'Dashboard');
  });

  it('should show validation errors', () => {
    cy.visit('/login');
    
    cy.get('button[type="submit"]').click();
    
    cy.get('div.text-danger').should('contain', 'Username is required');
    cy.get('div.text-danger').should('contain', 'Password is required');
  });

  it('should handle login error', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: {
        message: 'Invalid credentials',
      },
    }).as('loginError');
    
    cy.visit('/login');
    
    cy.get('input[name="username"]').type('wronguser');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    
    cy.wait('@loginError');
    cy.get('.alert-danger').should('contain', 'Invalid credentials');
  });

  it('should logout successfully', () => {
    cy.login('testuser', 'password123');
    
    cy.get('a').contains('Logout').click();
    cy.url().should('include', '/login');
  });

  it('should redirect to login when accessing protected route', () => {
    cy.visit('/dashboard');
    cy.url().should('include', '/login');
  });
}); 