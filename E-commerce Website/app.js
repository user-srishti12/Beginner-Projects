const products = [
  {id:1,name:"Nova Headphones",category:"Electronics",price:2499,emoji:"🎧",rating:4.8},
  {id:2,name:"Smart Watch X",category:"Electronics",price:3299,emoji:"⌚",rating:4.6},
  {id:3,name:"Urban Backpack",category:"Fashion",price:1599,emoji:"🎒",rating:4.7},
  {id:4,name:"Classic Sneakers",category:"Fashion",price:2199,emoji:"👟",rating:4.5},
  {id:5,name:"Desk Lamp Pro",category:"Home",price:999,emoji:"💡",rating:4.4},
  {id:6,name:"Ceramic Mug Set",category:"Home",price:699,emoji:"☕",rating:4.7},
  {id:7,name:"Mechanical Keyboard",category:"Electronics",price:4499,emoji:"⌨️",rating:4.9},
  {id:8,name:"Minimal Wallet",category:"Fashion",price:799,emoji:"👛",rating:4.3}
];

let cart = JSON.parse(localStorage.getItem("shopsphere-cart") || "[]");
const app = document.getElementById("app");

const money = n => "₹" + n.toLocaleString("en-IN");

function productCard(p){
  return `<article class="card">
    <div class="product-img">${p.emoji}</div>
    <div class="card-body">
      <p class="muted">${p.category}</p>
      <h3>${p.name}</h3>
      <p>⭐ ${p.rating}</p>
      <div class="price">${money(p.price)}</div>
      <button class="primary" onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  </article>`;
}

function renderHome(){
  app.innerHTML = `<section class="hero">
    <div><p class="muted">MODERN E-COMMERCE EXPERIENCE</p>
      <h1>Everything you need, in one simple catalog.</h1>
      <p>Explore a responsive product store with client-side routing, filtering, cart persistence and modular JavaScript architecture.</p>
      <a class="primary" href="#/products" style="display:inline-block;text-decoration:none">Explore Products</a>
    </div>
    <div class="hero-card">🛍️</div>
  </section>
  <div class="section-title"><h2>Featured Products</h2><a href="#/products">View all →</a></div>
  <section class="grid">${products.slice(0,4).map(productCard).join("")}</section>`;
}

function renderProducts(){
  app.innerHTML = `<div class="section-title"><h1>Product Catalog</h1></div>
    <div class="filters">
      <input id="search" placeholder="Search products...">
      <select id="category"><option value="all">All categories</option><option>Electronics</option><option>Fashion</option><option>Home</option></select>
    </div>
    <section id="productGrid" class="grid"></section>`;
  const update = () => {
    const q = document.getElementById("search").value.toLowerCase();
    const cat = document.getElementById("category").value;
    const result = products.filter(p => (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) && (cat==="all" || p.category===cat));
    document.getElementById("productGrid").innerHTML = result.length ? result.map(productCard).join("") : `<div class="empty">No products found.</div>`;
  };
  document.getElementById("search").addEventListener("input", update);
  document.getElementById("category").addEventListener("change", update);
  update();
}

function renderAbout(){
  app.innerHTML = `<section class="about">
    <h1>About ShopSphere</h1><br>
    <p>ShopSphere is a capstone e-commerce product catalog designed around modular frontend architecture.</p>
    <p><strong>Implemented:</strong> responsive UI, client-side routing, reusable product cards, search/filtering, cart state, localStorage persistence and lightweight assets.</p>
    <p><strong>Deployment:</strong> this static application can be deployed directly to Vercel, Netlify or Render.</p>
  </section>`;
}

function addToCart(id){
  const product = products.find(p=>p.id===id);
  cart.push(product);
  saveCart();
  alert(`${product.name} added to cart!`);
}
function saveCart(){
  localStorage.setItem("shopsphere-cart",JSON.stringify(cart));
  document.getElementById("cartCount").textContent=cart.length;
}
function openCart(){
  document.querySelector(".overlay").classList.add("show");
  document.querySelector(".cart-panel").classList.add("open");
  const items=document.getElementById("cartItems");
  items.innerHTML=cart.length ? cart.map((p,i)=>`<div class="cart-item"><span>${p.emoji} ${p.name}</span><strong>${money(p.price)} <button onclick="removeFromCart(${i})">×</button></strong></div>`).join("") : `<div class="empty">Your cart is empty.</div>`;
  document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0));
}
function removeFromCart(i){cart.splice(i,1);saveCart();openCart();}
function closeCart(){document.querySelector(".overlay").classList.remove("show");document.querySelector(".cart-panel").classList.remove("open");}

function router(){
  const path=location.hash.slice(1)||"/";
  if(path==="/products") renderProducts();
  else if(path==="/about") renderAbout();
  else renderHome();
}
document.getElementById("cartButton").addEventListener("click",openCart);
document.querySelector(".overlay").addEventListener("click",closeCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
window.addEventListener("hashchange",router);
saveCart(); router();
