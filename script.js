const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');


navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);


        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');


        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
    });
});


document.getElementById('form-anuncio').addEventListener('submit', e => {
    e.preventDefault();
    alert('Anúncio publicado com sucesso!');
});