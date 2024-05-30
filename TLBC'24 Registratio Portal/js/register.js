document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors();

    const formData = {
      firstname: document.getElementById('firstname').value.trim(),
      lastname: document.getElementById('lastname').value.trim(),
      email: document.getElementById('email').value.trim(),
      password: document.getElementById('password').value.trim(),
      phone: document.getElementById('number').value.trim(),
      gender: document.getElementById('gender').value,
      birthdate: document.getElementById('date').value,
      address: document.getElementById('address').value.trim(),
      category: document.getElementById('member').value,
      church_name: document.getElementById('churchname').value.trim(),
      attendance_mode: document.getElementById('areYouCamping').value ? document.getElementById('areYouCamping').value : document.getElementById('dailyOrStream').value,
      was_participant: document.getElementById('haveyouAttendedBefore').value,
      is_aware_of_convention: document.getElementById('areYouAware').value,
      health_issue: document.getElementById('yourHealthCondition').value.trim(),
      reach: document.getElementById('reach').value
    };

    console.log('Form data:', formData); // Debugging statement

    let isValid = validateForm(formData);

    if (!isValid) {
      return;
    }

    try {
      const response = await fetch('https://lord-s-brethren-payment.onrender.com/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': 'KgazvmVtp7eihHzNATYcVslWoKtrNICpO8c2PY31BIN51bsKDEYUe9YotsrXZQ1u',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData); // Debugging statement
        throw new Error('Registration failed');
      }

      const responseData = await response.json();
      console.log('Registration successful:', responseData); // Debugging statement

      // Redirect to dashboard with user details as query parameters
      const queryParams = new URLSearchParams(formData).toString();
      window.location.href = `dashboardd.html?${queryParams}`;

    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed. Please try again.');
    }
  });

  function validateForm(data) {
    let isValid = true;

    if (!data.firstname) {
      displayError('firstname-error', 'Firstname is required');
      isValid = false;
    }

    if (!data.lastname) {
      displayError('lastname-error', 'Lastname is required');
      isValid = false;
    }

    if (!data.gender) {
      displayError('gender-error', 'Gender is required');
      isValid = false;
    }

    if (!validateEmail(data.email)) {
      displayError('email-error', 'Invalid email address');
      isValid = false;
    }

    if (!data.birthdate) {
      displayError('date-error', 'Birth Date is required');
      isValid = false;
    }

    if (!validatePhone(data.phone)) {
      displayError('number-error', 'Invalid phone number');
      isValid = false;
    }

    if (!data.address) {
      displayError('address-error', 'Address is required');
      isValid = false;
    }

    if (!data.category) {
      displayError('member-error', 'Membership status is required');
      isValid = false;
    }

    if (data.category === 'yes' && !data.church_name) {
      displayError('churchZone-error', 'Church/Zone is required');
      isValid = false;
    }

    if (data.category === 'no' && !data.church_name) {
      displayError('churchname-error', 'Church/Ministry name is required');
      isValid = false;
    }

    if (!data.is_aware_of_convention) {
      displayError('areYouAware-error', 'Awareness confirmation is required');
      isValid = false;
    }

    if (!data.attendance_mode) {
      displayError('areYouCamping-error', 'Camping intention is required');
      isValid = false;
    }

    if (data.attendance_mode === 'no' && !data.reach) {
      displayError('dailyOrStream-error', 'Participation method is required');
      isValid = false;
    }

    if (!data.was_participant) {
      displayError('haveyouAttendedBefore-error', 'Past attendance status is required');
      isValid = false;
    }

    if (!data.health_issue) {
      displayError('anyHealthCondition-error', 'Health condition status is required');
      isValid = false;
    }

    if (data.health_issue && !data.health_issue) {
      displayError('yourHealthCondition-error', 'Health condition details are required');
      isValid = false;
    }

    if (!data.password) {
      displayError('password-error', 'Password is required');
      isValid = false;
    }

    return isValid;
  }

  function displayError(elementId, message) {
    document.getElementById(elementId).textContent = message;
  }

  function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePhone(phone) {
    const re = /^\d{10}$/; // Example validation for 10-digit phone numbers
    return re.test(String(phone));
  }
});
