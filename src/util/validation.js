export function signUpValidation(data) {
  const errors = {};

  !validateEmail(data.email) &&
    (errors.email =
      "Please enter a valid email address (e.g., user@example.com).");

  if (data.password.length < 8) {
    errors.password = "At least 8 characters long.";
  } else {
    !validatePassword(data.password) &&
      (errors.password = "At least one letter and one number.");
  }

  !validateText(data.name) &&
    (errors.name =
      "At least 3 characters, Can't contain numbers or special characters.");

  !validateText(data.position) &&
    (errors.position =
      "At least 3 characters, Can't contain numbers or special characters.");

  !validateLocation(data.location) &&
    (errors.location =
      "At least 3 characters, only letters, spaces, and commas.");

  !validateBio(data.bio) && (errors.bio = "Bio can't exceed 500 characters.");

  return errors;
}

export function signInValidation(data) {
  const errors = {};

  !validateEmail(data.email) &&
    (errors.email =
      "Please enter a valid email address (e.g., user@example.com).");

  return errors;
}

export function postValidation(data) {
  const errors = {};

  if (data.title.length < 3) {
    errors.title = "Title must be at least 3 characters.";
  }

  if (data.author.length < 3) {
    errors.author = "Author must be at least 3 characters";
  } else {
    !validateText(data.author) &&
      (errors.author = "Author Can't contain numbers or special characters.");
  }

  if (data.content.length < 3) {
    errors.content = "Content must be at least 3 characters.";
  }

  return errors;
}

// Email validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password validation (minimum 8 characters, at least one letter and one number)
function validatePassword(password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
}

// Name validation (only letters and spaces, minimum 2 characters)
function validateText(name) {
  const nameRegex = /^[A-Za-z\s]{3,}$/;
  return nameRegex.test(name);
}

// Bio validation (maximum 150 characters)
function validateBio(bio) {
  return bio.length <= 150;
}

// Location validation (only letters, spaces, and commas, minimum 3 characters)
function validateLocation(location) {
  const locationRegex = /^[A-Za-z\s,]{2,}$/;
  return locationRegex.test(location);
}
