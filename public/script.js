// Register Function
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;
  const email = document.getElementById("registerEmail").value;

  const response = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email })
  });

  const message = await response.text();
  document.getElementById("registerMessage").innerText = message;
});

// Login Function
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    window.location.href = '/home.html';
  } else {
    const message = await response.text();
    document.getElementById("loginMessage").innerText = message;
  }
});
