const BLOG_POSTS = [
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

function postCard(post) {
  const inBlog = window.location.pathname.includes("/blog/");
  const assetPrefix = inBlog ? "../" : "./";
  const postPrefix = inBlog ? "./posts/" : "./blog/posts/";
  return `<article class="blog-card">
    <a href="${postPrefix}${post.slug}.html"><img class="blog-card-image" src="${assetPrefix}${post.image}" alt="${post.title}" loading="lazy"></a>
    <div class="blog-card-body">
      <span class="blog-card-category">${post.category}</span>
      <h3><a href="${postPrefix}${post.slug}.html">${post.title}</a></h3>
      <p class="blog-card-excerpt">${post.excerpt}</p>
      <div class="blog-card-meta"><time datetime="${post.date}">${post.dateLabel}</time><span aria-hidden="true">·</span><span>${post.readingTime}</span></div>
      <a class="blog-card-link" href="${postPrefix}${post.slug}.html">Leer artículo <span aria-hidden="true">→</span></a>
    </div>
  </article>`;
}

function renderCards(container, posts) {
  if (container) container.innerHTML = posts.map(postCard).join("");
}

function homeFeaturedCard(post, assetPrefix, postPrefix) {
  const href = `${postPrefix}${post.slug}.html`;
  return `<article class="blog-card blog-card--featured">
    <a class="blog-card-media" href="${href}" tabindex="-1" aria-hidden="true"><img class="blog-card-image" src="${assetPrefix}${post.image}" alt="" loading="lazy"></a>
    <div class="blog-card-body">
      <span class="blog-card-category">${post.category}</span>
      <h3><a href="${href}">${post.title}</a></h3>
      <p class="blog-card-excerpt">${post.excerpt}</p>
      <div class="blog-card-meta"><time datetime="${post.date}">${post.dateLabel}</time><span aria-hidden="true">·</span><span>${post.readingTime}</span></div>
      <a class="blog-card-link" href="${href}">Leer artículo <span aria-hidden="true">→</span></a>
    </div>
  </article>`;
}

function homeSideCard(post, assetPrefix, postPrefix) {
  const href = `${postPrefix}${post.slug}.html`;
  return `<article class="blog-card blog-card--side">
    <a class="blog-card-media" href="${href}" tabindex="-1" aria-hidden="true"><img class="blog-card-image" src="${assetPrefix}${post.image}" alt="" loading="lazy"></a>
    <div class="blog-card-body">
      <span class="blog-card-category">${post.category}</span>
      <h3><a href="${href}">${post.title}</a></h3>
      <div class="blog-card-meta"><time datetime="${post.date}">${post.dateLabel}</time><span aria-hidden="true">·</span><span>${post.readingTime}</span></div>
      <a class="blog-card-link" href="${href}">Leer artículo <span aria-hidden="true">→</span></a>
    </div>
  </article>`;
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
