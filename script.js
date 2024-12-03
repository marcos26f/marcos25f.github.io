document.getElementById("toggle-form").addEventListener("click", function() {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const formTitle = document.getElementById("form-title");

    if (loginForm.style.display === "none") {
        loginForm.style.display = "flex";
        signupForm.style.display = "none";
        formTitle.textContent = "Login";
        this.textContent = "Cadastrar";
    } else {
        loginForm.style.display = "none";
        signupForm.style.display = "flex";
        formTitle.textContent = "Cadastro";
        this.textContent = "Voltar ao Login";
    }
});
