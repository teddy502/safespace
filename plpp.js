
        const text="The power of letting go is the greatest gift you can ever offer yourself By Dr LORNA KARUMBA"
      let index= 0;
      function typeWriter() {
  if (index < text.length) {
    document.getElementById("typing-text").textContent += text.charAt(index);
    index++;
    setTimeout(typeWriter, 50);
  }  
}

window.onload = typeWriter;

  function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('show');
  }
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  const stored = JSON.parse(localStorage.getItem('userData'));

  if (stored && email === stored.email && password === stored.password) {
    window.location.href = 'therapy.html'; 
  } else {
    alert('Incorrect email or password. Please sign up first.');
    window.location.href = 'signup.html'; 
  }
});
