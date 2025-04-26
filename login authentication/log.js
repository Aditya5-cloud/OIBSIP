// Show Register Page
function showRegister() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('registerPage').style.display = 'block';
    document.getElementById('securedPage').style.display = 'none';
}

// Show Login Page
function showLogin() {
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('registerPage').style.display = 'none';
    document.getElementById('securedPage').style.display = 'none';
}

// Show Secured Page
function showSecured() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('registerPage').style.display = 'none';
    document.getElementById('securedPage').style.display = 'block';
}

// Registration Logic
function register() {
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const message = document.getElementById('registerMessage');

    if (username === "" || password === "") {
        message.style.color = "red";
        message.textContent = "Please fill all fields.";
        return;
    }

    // Save credentials
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    message.style.color = "green";
    message.textContent = "Registration Successful! Redirecting to login...";

    setTimeout(() => {
        showLogin();
    }, 1500);
}

// Login Logic
function login() {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const message = document.getElementById('loginMessage');
    const spinner = document.getElementById('spinner');

    if (username === "" || password === "") {
        message.style.color = "red";
        message.textContent = "Please fill all fields.";
        return;
    }

    spinner.style.display = "block";

    setTimeout(() => {
        spinner.style.display = "none";

        if (username === storedUsername && password === storedPassword) {
            localStorage.setItem('isLoggedIn', 'true');
            showSecured();
        } else {
            message.style.color = "red";
            message.textContent = "Invalid Credentials.";
        }
    }, 1500);
}

// Logout Logic
function logout() {
    localStorage.setItem('isLoggedIn', 'false');
    showLogin();
}

// Auto check login status
window.onload = function() {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
        showSecured();
    } else {
        showLogin();
    }
};
