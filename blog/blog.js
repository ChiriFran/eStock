const BLOG_POSTS = [
  {
    slug: "marketing-digital-y-redes-sociales-para-tu-negocio",
    title: "Marketing digital y redes sociales con mkt.digital_carla: el complemento ideal para tu ecommerce",
    category: "Marketing digital",
    excerpt: "Sumá estrategia de redes, contenido y publicidad a tu tienda online para atraer más clientes y vender mejor, junto al equipo de mkt.digital.",
    date: "2026-10-15",
    dateLabel: "15 de octubre de 2026",
    readingTime: "6 min de lectura",
    image: "img/carla-logo.webp",
    tags: ["marketing digital", "redes sociales", "publicidad"],
  },
  {
    slug: "bawax-club-comunidad-suscripciones-y-escalado-en-ecommerce",
    title: "BAWAX Club: convertir una comunidad en una experiencia dentro de tu ecommerce",
    category: "Casos de éxito",
    excerpt: "Caso BAWAX: suscripciones automáticas, Mercado Pago y beneficios exclusivos integrados a su tienda online. Más de 60 miembros en solo 3 días.",
    date: "2026-10-15",
    dateLabel: "15 de octubre de 2026",
    readingTime: "5 min de lectura",
    image: "img/bawax-club.webp",
    tags: ["caso de exito", "suscripciones", "ecommerce", "comunidad"],
  },
  {
    slug: "como-organizar-el-stock-de-un-ecommerce",
    title: "Cómo organizar el stock de tu ecommerce y evitar errores de inventario",
    category: "Gestión de stock",
    excerpt: "Un método simple para ordenar inventario, reducir quiebres de stock y vender con información confiable.",
    date: "2026-08-28",
    dateLabel: "28 de agosto de 2026",
    readingTime: "8 min de lectura",
    image: "img/scroll-section-admin.png",
    tags: ["stock", "operaciones", "ecommerce"],
  },
  {
    slug: "como-vender-mas-por-internet",
    title: "Cómo vender más por internet: 10 estrategias para mejorar tu ecommerce",
    category: "Ventas online",
    excerpt: "Diez mejoras concretas para atraer visitas de calidad, generar confianza y convertir más ventas online.",
    date: "2026-08-21",
    dateLabel: "21 de agosto de 2026",
    readingTime: "10 min de lectura",
    image: "img/scroll-section-ecom.png",
    tags: ["ventas", "conversion", "ecommerce"],
  },
  {
    slug: "tiendanube-vs-tienda-online-personalizada",
    title: "Tiendanube vs. una tienda online personalizada: ¿qué opción conviene?",
    category: "Tiendanube",
    excerpt: "Comparamos costos, control, velocidad y posibilidades de crecimiento para elegir con criterio.",
    date: "2026-08-14",
    dateLabel: "14 de agosto de 2026",
    readingTime: "9 min de lectura",
    image: "assets/home-hero-test.png",
    tags: ["tiendanube", "plataformas", "ecommerce"],
  },
  {
    slug: "como-automatizar-pedidos-de-un-ecommerce",
    title: "Cómo automatizar la gestión de pedidos de un ecommerce",
    category: "Automatización",
    excerpt: "Qué tareas automatizar primero y cómo diseñar un flujo de pedidos que reduzca trabajo manual.",
    date: "2026-08-07",
    dateLabel: "7 de agosto de 2026",
    readingTime: "7 min de lectura",
    image: "img/scroll-section-pay.png",
    tags: ["automatizacion", "pedidos", "operaciones"],
  },
];

function shortRead(post) {
  return post.readingTime.replace(" de lectura", "");
}

function postCard(post) {
  const inBlog = window.location.pathname.includes("/blog/");
  const assetPrefix = inBlog ? "../" : "./";
  const postPrefix = inBlog ? "./posts/" : "./blog/posts/";
  const href = `${postPrefix}${post.slug}.html`;
  return `<a class="post-card" href="${href}">
    <div class="post-card__top">
      <span class="blog-tag">${post.category}</span>
      <span class="post-card__thumb"><img src="${assetPrefix}${post.image}" alt="" loading="lazy"></span>
    </div>
    <h3 class="post-card__title">${post.title}</h3>
    <p class="post-card__excerpt">${post.excerpt}</p>
    <div class="post-card__foot">
      <span class="blog-meta"><time datetime="${post.date}">${post.dateLabel}</time><span aria-hidden="true">·</span><span>${shortRead(post)}</span></span>
      <span class="post-card__arrow" aria-hidden="true">→</span>
    </div>
  </a>`;
}

function renderCards(container, posts) {
  if (container) container.innerHTML = posts.map(postCard).join("");
}

function homeFeaturedCard(post, assetPrefix, postPrefix) {
  const href = `${postPrefix}${post.slug}.html`;
  return `<article class="blog-featured">
    <div class="blog-featured__body">
      <span class="blog-tag">${post.category}</span>
      <h3 class="blog-featured__title"><a href="${href}">${post.title}</a></h3>
      <p class="blog-featured__excerpt">${post.excerpt}</p>
      <div class="blog-featured__foot">
        <span class="blog-meta"><time datetime="${post.date}">${post.dateLabel}</time><span aria-hidden="true">·</span><span>${shortRead(post)}</span></span>
        <a class="blog-link" href="${href}">Leer artículo <span aria-hidden="true">→</span></a>
      </div>
    </div>
    <a class="blog-featured__media" href="${href}" tabindex="-1" aria-hidden="true"><img src="${assetPrefix}${post.image}" alt="" loading="lazy"></a>
  </article>`;
}

function homeSideCard(post, assetPrefix, postPrefix) {
  const href = `${postPrefix}${post.slug}.html`;
  return `<a class="blog-side" href="${href}">
    <div class="blog-side__body">
      <span class="blog-tag">${post.category}</span>
      <h3 class="blog-side__title">${post.title}</h3>
      <span class="blog-meta"><time datetime="${post.date}">${post.dateLabel}</time><span aria-hidden="true">·</span><span>${shortRead(post)}</span></span>
    </div>
    <span class="blog-side__thumb"><img src="${assetPrefix}${post.image}" alt="" loading="lazy"></span>
  </a>`;
}

function renderHomeFeatured(container, posts) {
  if (!container) return;
  const inBlog = window.location.pathname.includes("/blog/");
  const assetPrefix = inBlog ? "../" : "./";
  const postPrefix = inBlog ? "./posts/" : "./blog/posts/";
  const [featured, ...rest] = posts;
  container.innerHTML =
    homeFeaturedCard(featured, assetPrefix, postPrefix) +
    `<div class="home-blog-sides">${rest.map((post) => homeSideCard(post, assetPrefix, postPrefix)).join("")}</div>`;
}

function initBlog() {
  renderHomeFeatured(document.querySelector("[data-featured-posts]"), BLOG_POSTS.slice(0, 3));
  const grid = document.querySelector("[data-post-grid]");
  if (!grid) return;
  const filters = document.querySelector("[data-blog-filters]");
  renderCards(grid, BLOG_POSTS);
  filters?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    filters.querySelectorAll("button").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    const category = button.dataset.category;
    renderCards(grid, category === "Todas" ? BLOG_POSTS : BLOG_POSTS.filter((post) => post.category === category));
  });
}

document.addEventListener("DOMContentLoaded", initBlog);
