document.addEventListener("DOMContentLoaded", function () {
    initAuthTabs();
    initMembershipCalculator();
    initRegistrationForm();
    initLoginForm();
    initTimetableFilter();
});

// ---------------------------------------------------------
// Auth tab switching (register.html)
// ---------------------------------------------------------
function initAuthTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");
    const switchLink = document.getElementById("switch-to-register");

    if (!tabButtons.length) return;

    function switchTab(tabName) {
        tabButtons.forEach(function (btn) {
            const isActive = btn.getAttribute("data-tab") === tabName;
            btn.classList.toggle("active", isActive);
            btn.setAttribute("aria-selected", isActive);
        });

        tabPanels.forEach(function (panel) {
            panel.classList.toggle("active", panel.id === tabName + "-panel");
        });

        hideFormMessage();
    }

    tabButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            switchTab(button.getAttribute("data-tab"));
        });
    });

    if (switchLink) {
        switchLink.addEventListener("click", function (e) {
            e.preventDefault();
            switchTab("register");
        });
    }
}

function hideFormMessage() {
    const formMessage = document.getElementById("form-message");
    if (formMessage) {
        formMessage.style.display = "none";
        formMessage.classList.remove("error", "success");
    }
}

function showMessage(msg, type) {
    const formMessage = document.getElementById("form-message");
    if (!formMessage) return;

    formMessage.textContent = msg;
    formMessage.style.display = "block";
    formMessage.classList.remove("error", "success");
    formMessage.classList.add(type);
}

// ---------------------------------------------------------
// Membership fee calculator (register.html)
// ---------------------------------------------------------
function initMembershipCalculator() {
    const planSelect = document.getElementById("membership");
    const extraSessionsInput = document.getElementById("extra-sessions");
    const totalDisplay = document.getElementById("total-price");

    const prices = {
        "Basic Plan": 25.00,
        "Intermediate Plan": 35.00,
        "Advanced Plan": 45.00,
        "Elite Plan": 60.00,
        "Junior Membership": 25.00,
        "6-Week Self-Defence Course": 180.00
    };

    function calculateTotal() {
        if (!planSelect || !totalDisplay) return;

        const selectedPlan = planSelect.value;
        const baseCost = prices[selectedPlan] || 0;
        const extraSessions = extraSessionsInput ? parseInt(extraSessionsInput.value) || 0 : 0;
        const extraCost = extraSessions * 15.00;
        const total = baseCost + extraCost;

        totalDisplay.textContent = "Total Monthly Fee: \u00A3" + total.toFixed(2);
    }

    if (planSelect) {
        planSelect.addEventListener("change", calculateTotal);
    }
    if (extraSessionsInput) {
        extraSessionsInput.addEventListener("input", calculateTotal);
    }

    calculateTotal();
}

// ---------------------------------------------------------
// Registration form validation (register.html)
// ---------------------------------------------------------
function initRegistrationForm() {
    const registerForm = document.getElementById("registration-form");

    if (!registerForm) return;

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (name.length < 3) {
            showMessage("Please enter a valid full name (at least 3 characters).", "error");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            showMessage("Please enter a valid email address.", "error");
            return;
        }

        if (password.length < 6) {
            showMessage("Password must be at least 6 characters long.", "error");
            return;
        }

        showMessage("Account successfully created for " + name + "! Welcome to DoBu Martial Arts.", "success");
        registerForm.reset();

        const totalDisplay = document.getElementById("total-price");
        if (totalDisplay) totalDisplay.textContent = "Total Monthly Fee: \u00A3" + "25.00";
    });
}

// ---------------------------------------------------------
// Login form validation (register.html)
// ---------------------------------------------------------
function initLoginForm() {
    const loginForm = document.getElementById("login-form");

    if (!loginForm) return;

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        if (!email.includes("@") || !email.includes(".")) {
            showMessage("Please enter a valid email address.", "error");
            return;
        }

        if (password.length < 6) {
            showMessage("Password must be at least 6 characters long.", "error");
            return;
        }

        showMessage("Welcome back! You have been logged in successfully.", "success");
        loginForm.reset();
    });
}

// ---------------------------------------------------------
// Weekly timetable filter (classes.html)
// ---------------------------------------------------------
function initTimetableFilter() {
    const filterBar = document.getElementById("timetable-filter");
    const table = document.getElementById("timetable");

    if (!filterBar || !table) return;

    const buttons = filterBar.querySelectorAll(".filter-btn");
    const rows = table.querySelectorAll("tbody tr");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            buttons.forEach(function (b) { b.classList.remove("active"); });
            button.classList.add("active");

            const sport = button.getAttribute("data-sport").toLowerCase();

            rows.forEach(function (row) {
                if (sport === "all") {
                    row.classList.remove("row-hidden");
                    row.classList.remove("row-highlight");
                    return;
                }

                const rowText = row.textContent.toLowerCase();
                const matches = rowText.includes(sport);

                row.classList.toggle("row-hidden", !matches);
                row.classList.toggle("row-highlight", matches);
            });
        });
    });
}
