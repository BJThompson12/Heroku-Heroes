const logout = async () => {
  const response = await fetch('/api/userroutes/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    localStorage.removeItem('user_id');
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.getElementById('log-out-button').addEventListener('click', logout);
document.getElementById('logout-button-hamburger').addEventListener('click', logout);