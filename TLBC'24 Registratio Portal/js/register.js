document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  let member = document.getElementById('member');
  let is_camper = document.getElementById('areYouCamping');
  let anyHealthCondition = document.getElementById('anyHealthCondition');

  member.addEventListener('change', function () {
    let zone = document.getElementById('churchZone');
    let churchname = document.getElementById('churchname');
    let isMember = document.getElementById('is-member');
    let notMember = document.getElementById('not-member');

    if (member.value === 'Member') {
      isMember.style.display = 'block';
      zone.disabled = false;
      notMember.style.display = 'none';
      churchname.disabled = true;
    } else {
      isMember.style.display = 'none';
      zone.disabled = true;
      notMember.style.display = 'block';
      churchname.disabled = false;
    }
  });

  is_camper.addEventListener('change', function () {
    let dailyOrStream = document.getElementById('dailyOrStream');
    let dailyOrStreamDiv = document.getElementById('dailyOrStreamDiv');

    if (is_camper.value === 'Camper') {
      dailyOrStreamDiv.style.display = 'none';
      dailyOrStream.disabled = true;
    } else {
      dailyOrStreamDiv.style.display = 'block';
      dailyOrStream.disabled = false;
    }
  });

  anyHealthCondition.addEventListener('change', function () {
    let yourHealthConditionDiv = document.getElementById('yourHealthConditionDiv');

    if (anyHealthCondition.value === 'true') {
      yourHealthConditionDiv.style.display = 'block';
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors();

    let formData1 = new FormData(form);
    let bodyData = Object.fromEntries(formData1);



    let isValid = validateForm(bodyData);

    if (!isValid) {
      return;
    }

    try {
      const response = await fetch('https://lord-s-brethren-payment.onrender.com/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': getCookie('csrftoken'),
        },
        body: JSON.stringify(bodyData)
      });
      console.log('Response:', response); // Debugging statement   Success response

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

    if (data.category === 'Member' && !data.church_name) {
      displayError('churchZone-error', 'Church Zone is required');
      isValid = false;
    }

    if (data.category === 'Invitee' && !data.church_name) {
      displayError('churchname-error', 'Church Ministry name is required');
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

    if (!data.was_participant) {
      displayError('haveyouAttendedBefore-error', 'Past attendance status is required');
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
    const re = /^\d{11}$/; // Example validation for 10-digit phone numbers
    return re.test(String(phone));
  }
});

// This function is used to get the value of a cookie
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
