import { test } from 'qunit';
import moduleForAcceptance from 'droplet/tests/helpers/module-for-acceptance';
import AuthConfig from 'ember-simple-auth/configuration';


const SELECTORS = {
  emailInput: '[data-test-selector="register-page__email-input"]',
  usernameInput: '[data-test-selector="register-page__username-input"]',
  passwordInput: '[data-test-selector="register-page__password-input"]',
  confirmPasswordInput: '[data-test-selector="register-page__confirm-password-input"]',
  submitRegistrationButton: '[data-test-selector="register-page__register-form-submit"]',
};


let actual, expected;

moduleForAcceptance('Acceptance | register');

test('visiting /register', async (assert) => {
  await visit('/register');

  assert.equal(currentURL(), '/register');
});

test('successfully submitting the registration form', async (assert) => {
  await visit('/register');

  fillIn(SELECTORS.emailInput, 'bsipple57@gmail.com');
  fillIn(SELECTORS.usernameInput, 'bsipple');
  fillIn(SELECTORS.passwordInput, 'password123');
  fillIn(SELECTORS.confirmPasswordInput, 'password123');

  await click(SELECTORS.submitRegistrationButton);

  expected = AuthConfig.routeAfterAuthentication;
  actual = currentRouteName();
  assert.equal(actual, expected, `trasitions to ${expected} after a successful registration`);
});
