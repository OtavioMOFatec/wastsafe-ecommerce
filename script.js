// --- Definições Globais e Navegação da SPA ---
const navLinks = document.querySelectorAll('.nav-link');
const sections = ['home', 'market', 'track', 'how', 'about', 'announce', 'login', 'signup'];

function showPage(page) {
    // Esconde todas as seções e mostra a solicitada
    sections.forEach(s => {
        const el = document.getElementById(s);
        if (el) {
            el.style.display = (s === page) ? 'block' : 'none';
        }
    });

    // Remove a classe 'active' de todos os links e adiciona ao link da página atual
    navLinks.forEach(a => {
        a.classList.toggle('active', a.dataset.page === page);
    });

    // Se estiver em login/signup, remove o 'active' de todos os links principais
    if (page === 'login' || page === 'signup') {
        navLinks.forEach(a => a.classList.remove('active'));
    }

    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Renderiza produtos se for para o Marketplace
    if (page === 'market') renderProducts();
}

// Ouvintes de evento para links de navegação e botões [data-page]
document.querySelectorAll('[data-page]').forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    const targetPage = btn.dataset.page;
    if (targetPage) showPage(targetPage);
}));

// Tratamento especial para o botão "Anunciar Material" no cabeçalho
document.getElementById('announceBtn').addEventListener('click', () => showPage('announce'));


// --- Simulação de Produtos e Renderização (Marketplace) ---
const products = [];
for (let i = 1; i <= 24; i++) {
    products.push({
        id: i,
        title: ["Teclado de Membrana", "Monitor CRT", "Laptop com defeito", "Relógio Digital", "Placa Mãe", "Pendrive", "Lote de Gabinetes", "Fone de ouvido", "Lote de Mouses", "Baterias de Lítio"][i % 10] + ' #' + i,
        category: ["perifericos", "componentes", "acessorios", "componentes"][i % 4],
        price: (Math.floor(Math.random() * 450) + 30),
        img: `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='%23f3f3f3'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='28' fill='%23999'>Item ${i}</text></svg>`)}`
    });
}

// Estado de Paginação
let page = 1;
const perPage = 8; // Mudado para 8 para melhor visualização no grid 4x2
const productGrid = document.getElementById('productGrid');
const paginationContainer = document.getElementById('pagination');

function renderProducts() {
    productGrid.innerHTML = '';

    const cat = document.getElementById('categorySelect').value;
    const q = document.getElementById('searchInput').value.toLowerCase();

    const filtered = products.filter(p =>
        (cat === 'all' || p.category === cat) &&
        (p.title.toLowerCase().includes(q) || p.category.includes(q))
    );

    const totalPages = Math.ceil(filtered.length / perPage);
    page = Math.min(page, totalPages || 1);

    const start = (page - 1) * perPage;
    const slice = filtered.slice(start, start + perPage);

    slice.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product';
        card.innerHTML = `
            <img src='${p.img}' alt='${p.title}'>
            <h4>${p.title}</h4>
            <div style="font-size:13px;color:#666">Categoria: ${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</div>
            <div class='price'>R$ ${p.price.toFixed(2)}</div>
        `;
        productGrid.appendChild(card);
    });

    // Renderiza Paginação
    paginationContainer.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const b = document.createElement('button');
        b.className = 'page-btn';
        b.textContent = i;
        // Adiciona a classe 'active' para o botão da página atual (Correção de estilo)
        if (i === page) b.classList.add('active');
        b.addEventListener('click', () => {
            page = i;
            renderProducts();
        });
        paginationContainer.appendChild(b);
    }
}

// Ouvintes de evento para Filtros e Busca
document.getElementById('searchBtn').addEventListener('click', () => { page = 1; renderProducts(); });
document.getElementById('categorySelect').addEventListener('change', () => { page = 1; renderProducts(); });


// --- Ações do Formulário de Anúncio ---
document.getElementById('publishBtn').addEventListener('click', () => {
    const t = document.getElementById('annTitle').value.trim();
    if (!t) { alert('Preencha o Título do Anúncio.'); return }
    alert('✅ Anúncio publicado com sucesso (Simulado): ' + t);
    // Limpa o formulário após a simulação
    document.getElementById('annTitle').value = '';
    document.getElementById('annDesc').value = '';
    document.getElementById('annPrice').value = '';
    document.getElementById('annQty').value = '';
    document.getElementById('annCat').value = '';
});

document.getElementById('previewBtn').addEventListener('click', () => {
    const t = document.getElementById('annTitle').value || 'Sem Título';
    const p = document.getElementById('annPrice').value || '---';
    alert(`Preview Simples:\nProduto: ${t}\nPreço: R$ ${p}`);
});


// --- Ações dos Formulários de Autenticação (Login/Cadastro) ---
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✅ Login realizado com sucesso (Simulado)!');
    // Você pode redirecionar para 'home' ou para uma dashboard aqui
    showPage('home');
});

document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const p1 = document.getElementById('signupPassword').value;
    const p2 = document.getElementById('signupConfirmPassword').value;

    if (p1 !== p2) {
        alert('As senhas não coincidem. Por favor, verifique.');
        return;
    }

    alert('✅ Cadastro realizado com sucesso (Simulado)!');
    // Redireciona para login após o cadastro
    showPage('login');
});


// --- Inicialização ---
// Se houver um hash na URL, tenta navegar para a seção
if (location.hash) {
    const target = location.hash.replace('#', '');
    if (sections.includes(target)) showPage(target);
} else {
    // Garante que a página inicial 'home' esteja ativa por padrão
    showPage('home');
}