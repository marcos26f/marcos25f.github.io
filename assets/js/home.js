document.addEventListener('DOMContentLoaded', (event) => {
    const loginForm = document.querySelector('.login-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        // Aqui você pode adicionar a lógica para verificar as credenciais
        console.log('E-mail:', email, 'Password:', password);

        // Se tudo estiver correto, pode redirecionar para a página principal ou dashboard do usuário
        // window.location.href = 'pagina-principal.html';
    });
});