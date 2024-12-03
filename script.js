document.getElementById('toggle-form').addEventListener('click', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const formButton = document.getElementById('toggle-form');

    if (loginForm.style.display === "none") {
        loginForm.style.display = "flex";
        signupForm.style.display = "none";
        formButton.textContent = "Cadastrar"; // Botão que volta ao cadastro
    } else {
        loginForm.style.display = "none";
        signupForm.style.display = "flex";
        formButton.textContent = "Voltar"; // Botão que volta ao login
    }
});
