
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            document.getElementById("message").textContent =
                "Email already registered!";
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password
        };
        

        users.push(user);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful!");
        window.location.href = "login.html";
    });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            user => user.email === email && user.password === password
        );

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify({
                name: user.name,
                email: user.email
            }));

            window.location.href = "dashboard.html";
        } else {
            document.getElementById("message").textContent =
                "Invalid email or password!";
        }
    });
}

const welcome = document.getElementById("welcome");

if (welcome) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        window.location.href = "login.html";
    } else {
        welcome.textContent = `Welcome, ${loggedInUser.name}!`;
    }
}

const logout = document.getElementById("logout");

if (logout) {
    logout.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    });
}
