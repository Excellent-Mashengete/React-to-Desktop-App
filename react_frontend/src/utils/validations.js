function validateName(name) {
    if (!name || name.trim() === '') {
        return 'Name is required';
    }
    if (name.length < 3) {
        return 'Name must be at least 3 characters long';
    }
    return null;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim() === '') {
        return 'Email is required';
    }
    if (!emailRegex.test(email)) {
        return 'Invalid email format';
    }
    return null;
}

function validateDateHired(dateHired) {
    if (!dateHired || dateHired.trim() === '') {
        return 'Date Hired is required';
    }
    const date = new Date(dateHired);
    if (isNaN(date.getTime())) {
        return 'Invalid date format';
    }
    return null;
}

export { 
    validateEmail, 
    validateName, 
    validateDateHired
 };