document.addEventListener('DOMContentLoaded', (event) => {
    const cadastroForm = document.querySelector('.cadastro-form');

    cadastroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.querySelector('#nome').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        // Aqui você pode adicionar a lógica para registrar o usuário com as informações fornecidas
        console.log('Nome:', nome, 'E-mail:', email, 'Senha:', password);

        // Após o registro, redirecionar para a página de login ou outra página necessária
        // window.location.href = 'login.html';
    });
});