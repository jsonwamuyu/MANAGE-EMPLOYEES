const form = document.getElementById('reset-password-form');
const message = document.getElementById('message');
const apiUrl = 'http://localhost:3000/users';

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = document.getElementById('token').value;
  const newPassword = document.getElementById('new-password').value;

  try {
    // Fetch all users to find the token
    const response = await fetch(apiUrl);
    const users = await response.json();

    const user = users.find(
      (user) => user.resetToken === token && Date.now() < user.tokenExpiry
    );

    if (!user) {
      message.textContent = 'Invalid or expired token.';
      message.style.color = "red";
      return;
    }

    // Update the user's password and clear the token
    await fetch(`${apiUrl}/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword, resetToken: null, tokenExpiry: null })
    });

    message.textContent = 'Password updated successfully!';
    message.style.color = "green"
    window.location.href = "./login.html"
  } catch (error) {
    console.error('Error:', error);
    message.textContent = 'Something went wrong. Please try again.';
  }
});
