const form = document.getElementById('forgot-password-form');
const message = document.getElementById('message');
const apiUrl = 'http://localhost:3000/users';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  
  try {
    // Fetch all users to find the email
    const response = await fetch(apiUrl);
    const users = await response.json();

    const user = users.find((user) => user.email === email);

    if (!user) {
      message.textContent = 'Email not found.';
      return;
    }

    // Generate a reset token and expiry time
    const resetToken = Math.random().toString(36).substr(2);
    const tokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

    // Update the user in the database
    await fetch(`${apiUrl}/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resetToken, tokenExpiry })
    });

    // Display the token (simulating email sending)
    message.textContent = `Password reset token: ${resetToken} (valid for 1 hour)`;
    

  } catch (error) {
    console.error('Error:', error);
    message.textContent = 'Something went wrong. Please try again.';
  }
});
