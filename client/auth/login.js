const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const formInfo = document.getElementById('form-info');
const rootUrl = 'http://localhost:5000';

function loginValidation(user) {
  const errors = {};

  if (!user.email || user.email === '') {
    errors.email = 'Email is required';
  }
  if (!user.password || user.password === '') {
    errors.password = 'Password is required';
  }
  return errors;
}

function displayFormErrors(errors) {
  let formErrors = '<div class="form-errors">';
  Object.keys(errors).forEach((field) => {
    formErrors = `${formErrors}<li>${errors[field]}</li>`;
  });
  formErrors = `${formErrors}</div>`;
  formInfo.innerHTML = formErrors; // eslint-disable-line
}

function loginUser(e) {
  e.preventDefault();
  formInfo.innerHTML = '';
  loginBtn.classList.add('is-loading');
  loginBtn.disabled = true;

  const user = {
    email: email.value,
    password: password.value,
  };

  const errors = loginValidation(user);
  if (Object.keys(errors) > 0) {
    displayFormErrors(errors);
  }

  fetch(`${rootUrl}/api/v1/auth/login`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(user),
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  }).then(res => res.json())
    .then((response) => {
      loginBtn.classList.remove('is-loading');
      loginBtn.disabled = false;

      if (response.errors) {
        displayFormErrors(response.errors);
        return;
      }
      const userInfo = {
        token: response.data.token,
        id: response.data.user.id,
        username: response.data.user.username,
        role: response.data.user.role,
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      window.location.href = 'index.html';
    })
    .catch(error => console.error(error));
}

loginBtn.addEventListener('click', loginUser);
