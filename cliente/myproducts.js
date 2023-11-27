let TOKEN = null;
let GLOBAL_PRODUCTS = [];

function fitIntoCartUI(cart_productHTML) {
  const parentHTML = document.getElementById("cart-products-container");
  parentHTML.appendChild(cart_productHTML);
}

function displayProducts() {
  GLOBAL_PRODUCTS.forEach((product) => {
    const cart_productHTML = createHorizontalProductElement(product);
    fitIntoCartUI(cart_productHTML);
  });
}

async function fitUserInfo(name, url) {
  const userimage = document.getElementById("user-image");
  userimage.src = url;
  userimage.addEventListener("click", goToProfile);
}

async function getMyUserInfo() {
  const token = window.localStorage.getItem("token");
  if (!token) {
    window.location.href = "/a.html";
    return;
  }
  TOKEN = token;
  const res = await fetch("https://ggsrc.tech/gui", {
    method: "GET",
    headers: {
      Authorization: TOKEN,
    },
  });
  if (res.status == 200) {
    const { name, url } = await res.json();
    return { name, url };
  } else {
    window.localStorage.removeItem("token");
    window.location.href = "/a.html";
  }
}

async function deleteProduct(id) {
  const res = await fetch(`https://ggsrc.tech/dmp?p_id=${id}`, {
    method: "GET",
    headers: {
      Authorization: TOKEN,
    },
  });
  if (res.status == 200) {
    window.location.reload();
  } else {
    const { error } = await res.json();
    alert(error);
  }
}
async function getMyProducts() {
  const res = await fetch("https://ggsrc.tech/gmp", {
    method: "GET",
    headers: {
      Authorization: TOKEN,
    },
  });
  if (res.status == 200) {
    const { products } = await res.json();
    GLOBAL_PRODUCTS.push(...products);
  } else {
    const d = await res.json();
    console.log(d);
  }
}
async function runUserActivitiesAndUpdateHeaderAndSidebar() {
  const user = await getMyUserInfo();
  fitUserInfo(user.name, user.url);
}
function displaybox() {
  document.getElementById("box").style.display = "unset";
}

const main = async () => {
  await runUserActivitiesAndUpdateHeaderAndSidebar();
  await getMyProducts();

  if (GLOBAL_PRODUCTS.length == 0) displaybox();
  else displayProducts();
  handleBackButton();
};

main();

function goToProfile() {
  const pathAndQuery = window.location.pathname + window.location.search;
  window.localStorage.setItem("before-profile", pathAndQuery);
  window.location.href = "profile.html";
}
function goToProduct(id) {
  const pathAndQuery = window.location.pathname + window.location.search;
  window.localStorage.setItem("before-product", pathAndQuery);
  window.location.href = `product.html?id=${id}`;
}

function goTosearchFriends(e) {
  if (e) e.preventDefault();
  const v = document.getElementById("sidebar-friends-input").value;
  if (!v || v.trim() == "") return;
  const pathAndQuery = window.location.pathname + window.location.search;
  window.localStorage.setItem("before-search-users", pathAndQuery);
  window.location.href = `searchuser.html?search=${v.trim()}`;
}

function createHorizontalProductElement(product) {
  const stars = handlestarcreation(product.rating);

  const productDiv = document.createElement("div");
  productDiv.className = "f";
  productDiv.id = `horizontal-recommended-product-${product.id}`;
  productDiv.style =
    "width: 100%; height: fit-content; position: relative; box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.17);";

  const flexible =
    product.flexible_sell.data[0] == 1
      ? `
    <div class="fsz-08 fw-6" style="position: absolute; top: 0px; left: -5px; transform: rotate(-12deg); background: var(--main-color); color: white; padding: 0 8px 0 8px; border-radius: 4px;" onclick="window.location.href = 'flexible.html'">Flexivel</div>
    `
      : ``;

  const fretediv = document.createElement("div");
  fretediv.style = product.delivery.data[0] == 1 ? "" : "display: none;";
  fretediv.innerHTML = `<p>teste</p>`;
  const frete =
    product.delivery.data[0] == 0
      ? `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#808080" class="bi bi-truck" viewBox="0 0 16 16">
    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
  </svg> 
    Entrega
    `
      : ``;

  const productButton = `
        <button class="cart-animation" id="horizontal-recommended-product-cart-button-${product.id}" onClick="deleteProduct(${product.id})" style="background-color: var(--sec-color); padding: 4px 18px 4px 18px; border-radius: 0; border: 1px solid var(--sec-color); color: white;
        width: 100%; font-weight: 500; transition: transform 0.15s ease;
        ">Unpublish Product</button>
    `;

  productDiv.innerHTML = `
    <img style="width: 185px; height: 185px; min-width: 150px;" src="${
      product.url
    }" alt="${product.name}" onclick="goToProduct(${product.id})">


    <div class="f f-col" style="align-items: flex-start; justify-content: start; padding: 4px 8px 4px 8px; gap: 8px; width: 100%;">
        <div class="f f-col" onclick="goToProduct(${product.id})">
        <p class="fsz-11 fw-5 f f-cntr clr-white" style="color: gray;">${
          product.name
        }</p>
        </div>
   
        <div class="f" style="gap: 4px; align-items: center;">
            ${stars}
        </div>


    
    <div style="width: 100%;">

    <div class="f f-col" style="width: 100%;" onclick="goToProduct(${
      product.id
    })">
    
   
    <p class="fsz-09 fw-4 f f-cntr clr-white"  style="color: #808080; gap: 8px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#808080" class="bi bi-cash" viewBox="0 0 16 16">
    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
    <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
  </svg>
    ${product.total_price}</p>

    
    <p class="fsz-08 f f-cntr"  style="color: #808080; gap: 8px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#808080" class="bi bi-box-seam" viewBox="0 0 16 16">
    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
  </svg>
    ${product.available_quantity.split(".")[0]} Kg</p>
    
    <p class="fsz-07 f f-cntr"  style="color: #808080; gap: 8px; text-decoration: line-through; text-decoration-color: red;">
        ${frete}
    </p>

         <p class="fsz-07 fw-4 f f-cntr clr-white"  style="color: #808080; gap: 8px;">
    
        ${product.created_at}</p>

    </div>
    </div>
   
    <div class="f" style="align-items: baseline; justify-content: space-between; width: 100%;">


     ${productButton}
     

     ${flexible}
   

     
    </div>

 

    </div>

    `;
  return productDiv;
}

function handlestarcreation(r) {
  let stars = [];
  for (let i = 0; i <= 5; i++) {
    let s = document.createElement("span");
    if (i < r) {
      s.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="var(--sec-color)" class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
            `;
    } else {
      s.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="var(--sec-color)" class="bi bi-star" viewBox="0 0 16 16">
  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
</svg>
            `;
    }
    stars.push(s);
  }

  return `${stars[0].outerHTML} ${stars[1].outerHTML} ${stars[2].outerHTML} ${stars[3].outerHTML} ${stars[4].outerHTML}`;
}

function handleBackButton() {
  const backbtn = document.getElementById("go-back-button");
  backbtn.addEventListener("click", () => {
    const r = window.localStorage.getItem("before-my-products");
    if (r) {
      window.localStorage.removeItem("before-my-products");
      window.location.href = r;
    } else {
      window.history.back();
    }
  });
}
