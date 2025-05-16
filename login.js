let currentStep = 1;
const totalSteps = 8;
const formData = {};

function updateSteps() {
  document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
  document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
  document.getElementById('prevBtn').style.visibility = currentStep === 1 ? 'hidden' : 'visible';
}


function validateStep() {
  const step = document.querySelector(`[data-step="${currentStep}"]`);
  const radios = step.querySelectorAll('input[type="radio"]');
  const inputs = step.querySelectorAll('input[type="text"], input[type="email"], input[type="date"], input[type="password"]');

  let valid = true;
  let errorMsg = "";

  if (radios.length > 0) {
    const checked = Array.from(radios).some(r => r.checked);
    if (!checked) {
      valid = false;
      errorMsg = "Please select a response.";
    }
  }

  inputs.forEach(input => {
    if (!input.value.trim()) {
      valid = false;
      errorMsg = `Please fill in the ${input.placeholder || input.name || "field"}.`;
    }

    if (input.type === "date") {
      const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(input.value);
      if (!isValidDate) {
        valid = false;
        errorMsg = "Please enter a valid date in YYYY-MM-DD format.";
      }
    }
  });

  if (!valid) {
    alert(errorMsg);
  }

  return valid;
}

function nextStep() {
  if (!validateStep()) return;

  if (currentStep < totalSteps) {
    currentStep++;
    updateSteps();
  } else {
    submitForm();
  }
}

function previousStep() {
  if (currentStep > 1) {
    currentStep--;
    updateSteps();
  }
}


document.querySelectorAll('.option').forEach(option => {
  option.addEventListener('click', function () {
    if (this.querySelector('input[type="radio"]')) {
      this.parentNode.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
      this.classList.add('selected');
      const question = this.closest('.step').querySelector('h3').textContent;
      formData[question] = this.querySelector('input').value;
    }
  });
});


function submitForm() {
  const dob = document.getElementById('dob').value;
  const location = document.getElementById('location').value;
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!dob || !location || !email || !password || !confirmPassword) {
    alert("Please complete all required fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  formData['Date of Birth'] = dob;
  formData['Location'] = location;
  formData.email = email;
  formData.password = password;

  
  localStorage.setItem('formData', JSON.stringify(formData));

  
  const user = { email, password };
  localStorage.setItem('userData', JSON.stringify(user));

  
  document.querySelector('.navigation').style.display = 'none';
  document.getElementById('successMessage').style.display = 'block';
}

updateSteps();
