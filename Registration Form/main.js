function checkPasswordRequirements() {
  let pwd = document.getElementById("password").value;

  let req1 = pwd.length >= 8;
  let req2 = /[A-Z]/.test(pwd);
  let req3 = /[0-9]/.test(pwd);
  let req4 = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);

  updateRequirement("req1", req1);
  updateRequirement("req2", req2);
  updateRequirement("req3", req3);
  updateRequirement("req4", req4);
}

function updateRequirement(id, ok) {
  let el = document.getElementById(id);
  let icon = el.querySelector("i");

  if (ok) {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-check");
    icon.classList.remove("text-danger");
    icon.classList.add("text-success");
    el.classList.add("ok");
  } else {
    icon.classList.add("fa-times");
    icon.classList.remove("fa-check");
    icon.classList.add("text-danger");
    icon.classList.remove("text-success");
    el.classList.remove("ok");
  }
}

document.querySelectorAll(".form-control").forEach((input) => {
  input.addEventListener("focus", function () {
    this.classList.remove("error-input", "success-input");
    let errId = "err-" + this.id;
    let errEl = document.getElementById(errId);
    if (errEl) errEl.classList.remove("show");
  });
});

function validateField(id, type) {
  let el = document.getElementById(id);
  let val = el.value.trim();
  let errId = "err-" + id;
  let errEl = document.getElementById(errId);
  let error = "";

  if (!val) {
    error = "This field is required";
  } else if (type === "firstName" || type === "lastName") {
    if (val.length < 2) {
      error = "Minimum 2 characters";
    } else if (!/^[a-zA-Z\s'-]{2,}$/.test(val)) {
      error = "Only letters allowed";
    }
  } else if (type === "email") {
    if (!val.includes("@")) {
      error = "Email must contain @";
    } else if (!val.includes(".")) {
      error = "Invalid email format";
    }
  } else if (type === "age") {
    let num = parseInt(val);
    if (num < 18) {
      error = "Minimum age is 18";
    } else if (num > 120) {
      error = "Invalid age";
    }
  } else if (type === "postalCode") {
    if (!/^\d{5}$/.test(val)) {
      error = "Postal code must be 5 digits";
    }
  } else if (type === "address") {
    if (val.length < 5) {
      error = "Address is too short";
    }
  } else if (type === "username") {
    if (val.length < 3) {
      error = "Minimum 3 characters";
    } else if (!/^[a-zA-Z0-9_-]{3,}$/.test(val)) {
      error = "Only letters, numbers, - and _";
    }
  } else if (type === "password") {
    if (val.length < 8) {
      error = "Minimum 8 characters";
    } else if (!/[A-Z]/.test(val)) {
      error = "Needs an uppercase letter";
    } else if (!/[0-9]/.test(val)) {
      error = "Needs a number";
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val)) {
      error = "Needs a special character";
    }
  } else if (type === "confirmPassword") {
    let pwd = document.getElementById("password").value;
    if (val !== pwd) {
      error = "Passwords do not match";
    }
  }

  if (error) {
    el.classList.add("error-input");
    el.classList.remove("success-input");
    if (errEl) {
      errEl.textContent = "❌ " + error;
      errEl.classList.add("show");
    }
    return false;
  } else {
    el.classList.remove("error-input");
    el.classList.add("success-input");
    if (errEl) errEl.classList.remove("show");
    return true;
  }
}

async function validateAllFields() {
  try {
    const validations = [
      validateField("firstName", "firstName"),
      validateField("lastName", "lastName"),
      validateField("email", "email"),
      validateField("age", "age"),
      validateField("postalCode", "postalCode"),
      validateField("address", "address"),
      validateField("username", "username"),
      validateField("password", "password"),
      validateField("confirmPassword", "confirmPassword"),
    ];

    const results = await Promise.all(validations);
    const allValid = results.every((result) => result === true);

    let terms = document.getElementById("terms");
    if (!terms.checked) {
      document.getElementById("err-terms").textContent =
        "❌ You must agree to the terms";
      document.getElementById("err-terms").classList.add("show");
      return false;
    } else {
      document.getElementById("err-terms").classList.remove("show");
    }

    return allValid;
  } catch (error) {
    console.error("Validation error:", error);
    return false;
  }
}

async function saveToLocalStorage(data) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    localStorage.setItem("userRegistration", JSON.stringify(data));
    console.log("Data saved to localStorage:", data);
    return true;
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    return false;
  }
}

async function sendToAPI(data) {
  try {
    console.log("Sending data to API...");

    const response = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    console.log("API response:", result);

    return result;
  } catch (error) {
    console.error("Error sending to API:", error);
    throw error;
  }
}

async function saveAPIResponse(response) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    localStorage.setItem("userRegistrationResponse", JSON.stringify(response));
    console.log("API response saved to localStorage");
    return true;
  } catch (error) {
    console.error("Error saving API response:", error);
    return false;
  }
}

async function showSuccessModal() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let modal = new bootstrap.Modal(document.getElementById("successModal"));
    modal.show();
    console.log("Success modal displayed");
    return true;
  } catch (error) {
    console.error("Error showing modal:", error);
    return false;
  }
}

async function saveRegistration(e) {
  e.preventDefault();
  console.log("=== Registration Process Started ===");

  let btn = document.querySelector(".btn-primary");
  let originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>Processing...';

  try {
    console.log("Step 1: Validating all fields...");
    const isValid = await validateAllFields();

    if (!isValid) {
      console.log("Validation failed");
      showToast("Please fill out the form correctly", "error");
      btn.disabled = false;
      btn.innerHTML = originalText;
      return;
    }
    console.log("✓ All fields validated successfully");

    console.log("Step 2: Preparing data...");
    const data = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      age: parseInt(document.getElementById("age").value),
      phone: document.getElementById("postalCode").value,
      address: document.getElementById("address").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      isMarried: document.getElementById("isMarried").checked,
      isActive: document.getElementById("isActive").checked,
    };
    console.log("✓ Data prepared:", data);

    console.log("Step 3: Saving to localStorage...");
    const savedLocal = await saveToLocalStorage(data);
    if (!savedLocal) throw new Error("Failed to save to localStorage");
    console.log("✓ Data saved to localStorage");

    console.log("Step 4: Sending to API...");
    const apiResponse = await sendToAPI(data);
    console.log("✓ Data sent to API successfully");

    console.log("Step 5: Saving API response...");
    const savedResponse = await saveAPIResponse(apiResponse);
    if (!savedResponse) throw new Error("Failed to save API response");
    console.log("✓ API response saved");

    console.log("Step 6: Showing success modal...");
    await showSuccessModal();
    console.log("✓ Success modal displayed");

    document.getElementById("form").reset();
    console.log("=== Registration Process Completed Successfully ===");
  } catch (error) {
    console.error("Registration error:", error);
    showToast("Error: " + error.message, "error");
    btn.disabled = false;
    btn.innerHTML = originalText;
  }
}

function showToast(message, type) {
  let toast = document.getElementById("toast");
  let toastBody = document.getElementById("toastMessage");
  let toastIcon = toast.querySelector("i");

  toastBody.textContent = message;

  if (type === "error") {
    toast.classList.remove("success");
    toastIcon.classList.remove("fa-check-circle");
    toastIcon.classList.add("fa-exclamation-circle");
  } else {
    toast.classList.add("success");
    toastIcon.classList.add("fa-check-circle");
    toastIcon.classList.remove("fa-exclamation-circle");
  }

  let bsToast = new bootstrap.Toast(toast);
  bsToast.show();
}
