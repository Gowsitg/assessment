let currentPage = 1;
const userGrid = document.getElementById('userGrid');
const searchInput = document.getElementById('searchInput');
const onSubmit = document.getElementById('onsubmit');
const loadMoreBtn = document.getElementById('loadMore');
const themeToggle = document.getElementById('themeToggle');

themeToggle.innerText = 'Light Mode';

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  document.body.classList.toggle('light', !isDark);
  themeToggle.innerText = isDark ? 'Light Mode' : 'Dark Mode';
});

// Load users from API
const fetchUsers = async (page = 1) => {
  const res =await fetch(`https://reqres.in/api/users?page=${page}`, {
    headers: {
        'x-api-key': 'reqres-free-v1',
        'Accept': 'application/json'
    }
  });
  const { data } = await res.json();
  return data;
};

// Render user cards
const renderUsers = (users) => {
  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
      <img src="${user.avatar}" alt="${user.first_name}" width="80" />
      <h3>${user.first_name}</h3>
      <p>${user.email}</p>
    `;
    userGrid.appendChild(card);
  });
};

// Filter users
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('.user-card');
  cards.forEach(card => {
    const name = card.querySelector('h3').innerText.toLowerCase();
    const email = card.querySelector('p').innerText.toLowerCase();
    card.style.display = (name.includes(query) || email.includes(query)) ? 'block' : 'none';
  });
});

// Load more users
loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  const users = await fetchUsers(currentPage);
  renderUsers(users);
});

fetchUsers().then(renderUsers);

document.getElementById('onsubmit').addEventListener('click', () => {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  let hasError = false;

  nameError.textContent = '';
  emailError.textContent = '';
  passwordError.textContent = '';

  if (!nameInput.value.trim()) {
    nameError.textContent = 'Name is required';
    hasError = true;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim()) {
    emailError.textContent = 'Email is required';
    hasError = true;
  } else if (!emailRegex.test(emailInput.value)) {
    emailError.textContent = 'Invalid email format';
    hasError = true;
  }

  const passwordValue = passwordInput.value.trim();
  if (!passwordValue) {
    passwordError.textContent = 'Password is required';
    hasError = true;
  } else if (passwordValue.length < 7) {
    passwordError.textContent = 'Password must be at least 7 characters';
    hasError = true;
  }

  if (!hasError) {
    console.log('Form submitted successfully!');
  }
});



// Accordion toggle
const headers = document.querySelectorAll('.accordion-header');
headers.forEach(header => {
  header.addEventListener('click', () => {
    const body = header.nextElementSibling;
    body.classList.toggle('show');
  });
});
