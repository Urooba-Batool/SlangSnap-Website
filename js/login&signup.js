     // UI Elements
        const formTitle = document.getElementById('formTitle');
        const signupFields = document.getElementById('signupFields');
        const confirmPasswordField = document.getElementById('confirmPasswordField');
        const submitBtn = document.getElementById('submitBtn');
        const toggleText = document.getElementById('toggleText');
        const toggleForm = document.getElementById('toggleForm');
        const formError = document.getElementById('formError');
        const authForm = document.getElementById('authForm');
        const addSlangSection = document.getElementById('addSlangSection');
        const addSlangForm = document.getElementById('addSlangForm');
        const slangSuccess = document.getElementById('slangSuccess');

        let isLogin = true;

        // Helper: Get/Set user data in localStorage
        function getUserData() {
            const data = localStorage.getItem('slangsnapUser');
            return data ? JSON.parse(data) : null;
        }
        function setUserData(user) {
            localStorage.setItem('slangsnapUser', JSON.stringify(user));
        }

        // Toggle Login/Signup
        function handleToggle(e) {
            e.preventDefault();
            isLogin = !isLogin;
            formError.style.display = 'none';
            if (isLogin) {
                formTitle.textContent = 'Login';
                signupFields.style.display = 'none';
                confirmPasswordField.style.display = 'none';
                submitBtn.textContent = 'Login';
                toggleText.innerHTML = `Don't have an account? <a href="#" id="toggleForm">Sign up</a>`;
            } else {
                formTitle.textContent = 'Sign Up';
                signupFields.style.display = '';
                confirmPasswordField.style.display = '';
                submitBtn.textContent = 'Sign Up';
                toggleText.innerHTML = `Already have an account? <a href="#" id="toggleForm">Login</a>`;
            }
            document.getElementById('toggleForm').addEventListener('click', handleToggle);
        }
        toggleForm.addEventListener('click', handleToggle);

        // Auth Form Submission
        authForm.addEventListener('submit', function(e) {
            e.preventDefault();
            formError.style.display = 'none';

            const email = document.getElementById('authEmail').value.trim();
            const password = document.getElementById('authPassword').value;
            const userData = getUserData();

            if (isLogin) {
                // Login flow
                if (!userData || userData.email !== email) {
                    formError.textContent = "No account found. Please sign up first.";
                    formError.style.display = 'block';
                    isLogin = false;
                    formTitle.textContent = 'Sign Up';
                    signupFields.style.display = '';
                    confirmPasswordField.style.display = '';
                    submitBtn.textContent = 'Sign Up';
                    toggleText.innerHTML = `Already have an account? <a href="#" id="toggleForm">Login</a>`;
                    document.getElementById('toggleForm').addEventListener('click', handleToggle);
                    return;
                }
                if (userData.password !== password) {
                    formError.textContent = "Incorrect password. Please try again.";
                    formError.style.display = 'block';
                    return;
                }
                // Success: Show add slang section
                authForm.style.display = 'none';
                addSlangSection.style.display = '';
            } else {
                // Signup flow
                const name = document.getElementById('signupName').value.trim();
                const age = document.getElementById('signupAge').value.trim();
                const country = document.getElementById('signupCountry').value;
                const confirmPassword = document.getElementById('signupConfirmPassword').value;

                if (!name || !age || !country || country === "Choose your country") {
                    formError.textContent = "Please fill all signup fields.";
                    formError.style.display = 'block';
                    return;
                }
                if (password.length < 6) {
                    formError.textContent = "Password must be at least 6 characters.";
                    formError.style.display = 'block';
                    return;
                }
                if (password !== confirmPassword) {
                    formError.textContent = "Passwords do not match.";
                    formError.style.display = 'block';
                    return;
                }
                // Save user data
                setUserData({ name, age, country, email, password });
                // Success: Show add slang section
                authForm.style.display = 'none';
                addSlangSection.style.display = '';
            }
        });

        // Add Slang Form Submission
        addSlangForm.addEventListener('submit', function(e) {
            e.preventDefault();
            slangSuccess.style.display = 'none';
            const slangWord = document.getElementById('slangWord').value.trim();
            const slangMeaning = document.getElementById('slangMeaning').value.trim();
            if (!slangWord || !slangMeaning) return;
            // Here you can store the slang in localStorage or send to server
            slangSuccess.style.display = 'block';
            addSlangForm.reset();
            setTimeout(() => { slangSuccess.style.display = 'none'; }, 2000);
        });