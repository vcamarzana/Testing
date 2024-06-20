describe('Login Scene specs', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should visit the login page', () => {});

  it('should render the login scene with header and login form', () => {
    cy.findByRole('heading').should('exist');
    cy.findByLabelText('Usuario *').should('exist');
    cy.findByLabelText('Contraseña *').should('exist');
    cy.findByRole('button', { name: 'Login' }).should('exist');
  });

  it('should user input has the focus when it clicks on it', () => {
    //Act
    cy.findByLabelText('Usuario *').click();

    //Assert
    cy.findByLabelText('Usuario *').should('have.focus');
  });

  it('should password input has the focus when it clicks on it', () => {
    //Act
    cy.findByLabelText('Contraseña *').click();

    //Assert
    cy.findByLabelText('Contraseña *').should('have.focus');
  });

  it('should show message when user field and/or password field is left empty', () => {
    //Arrange
    cy.findByLabelText('Usuario *').click().clear().blur();
    cy.findByLabelText('Contraseña *').click().clear().blur();
    cy.findByRole('button', { name: 'Login' }).click();

    // Assert
    cy.contains('Debe informar el campo').should('exist');
    cy.contains('Debe informar el campo').should('exist');
  });

  it('should show an error message on invalid login', () => {
    //Arrange
    const user = 'admin';
    const password = '1234';

    //Act
    cy.findByLabelText('Usuario *').as('userInput');
    cy.findByLabelText('Contraseña *').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button', { name: 'Login' }).click();

    //Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
    cy.findByRole('alert').should(
      'have.text',
      'Usuario y/o password no válidos'
    );
  });

  it('should navigate to submodule-list when type valid credentials', () => {
    //Arrange
    const user = 'admin';
    const password = 'test';

    //Act
    cy.findByLabelText('Usuario *').type(user);
    cy.findByLabelText('Contraseña *').type(password);
    cy.findByRole('button', { name: 'Login' }).click();

    //Assert
    cy.url().should('equal', 'http://localhost:8080/#/submodule-list');
  });
});
