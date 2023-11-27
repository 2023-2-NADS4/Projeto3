let TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjk1NTE4NDA0LCJleHAiOjE2OTU1MjIwMDR9.eaueyAXHWjcm78JsB2hYed37t3c3eT_wyf-D5Eh9hQM";

let GLOBAL_CART_PRODUCTS = [];
let MY_LIKES = [];

function goToAnotherPage() {
  const comingFromRoute = getParameterByName("coming_from_route");
  document.getElementById("cart-main").style.animation =
    "disappearGoingToBottom 0.15s ease-in-out forwards";

  setTimeout(() => {
    if (comingFromRoute === "main") {
      window.location.href = `/${comingFromRoute}.html?loading=0`;
    } else {
      window.location.href = `/${comingFromRoute}.html?coming_from_route=cart`;
    }
  }, 150);
}

function getParameterByName(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

async function getMyCarts() {
  const res = await fetch("https://ggsrc.tech/gpid", {
    method: "GET",
    headers: {
      Authorization: TOKEN,
    },
  });
  if (res.status == 200) {
    const { carts } = await res.json();
    GLOBAL_CART_PRODUCTS = carts;
  } else if (res.status == 403) {
    window.location.href = `/signin.html?coming_from_route=cart`;
  }
  return null;
}

async function removeFromCart(product_id) {
  const res = await fetch(`https://ggsrc.tech/rc?product_id=${product_id}`, {
    method: "GET",
    headers: {
      Authorization: TOKEN,
    },
  });
  if (res.status == 200) {
    GLOBAL_CART_PRODUCTS = GLOBAL_CART_PRODUCTS.filter((item) => {
      return item.id.toString() != product_id.toString();
    });
    console.log(GLOBAL_CART_PRODUCTS);
    if (GLOBAL_CART_PRODUCTS.length == 0) {
      displaybox();
    }
  }

  UpdateSliderUiAfterRemovingProductToCart(product_id);
}

function UpdateSliderUiAfterRemovingProductToCart(product_id) {
  const p = document.getElementById(
    `horizontal-recommended-product-${product_id}`
  );
  if (GLOBAL_CART_PRODUCTS.length == 0) {
    p.remove();
    return;
  }
  const pb = document.getElementById(
    `horizontal-recommended-product-cart-button-${product_id}`
  );
  pb.classList.add("clicked");
  setTimeout(() => {
    pb.classList.remove("clicked");
    pb.style.background = "var(--main-color)";
  }, 90);
  pb.style.background = "var(--test)";
  pb.style.color = "white";
  p.style.opacity = "0%";
  setTimeout(() => {
    p.remove();
  }, 290);
}

function createHorizontalProductElement(product) {
  const productDiv = document.createElement("div");
  productDiv.className = "f";
  productDiv.id = `horizontal-recommended-product-${product.id}`;
  productDiv.style =
    "width: 100%; height: fit-content; position: relative; box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.17); transition: 0.3s ease-in-out; opacity: 100%;";

  const flexible =
    product.flexible_sell.data[0] == 1
      ? `
    <div class="fsz-08 fw-6" style="position: absolute; top: 0px; left: -5px; transform: rotate(-12deg); background: var(--main-color); color: white; padding: 0 8px 0 8px; border-radius: 4px;" onclick="window.location.href = 'flexible.html'">Flexivel</div>
    `
      : ``;

  const frete =
    product.delivery.data[0] == 0
      ? `
    <p class="fsz-07 f f-cntr"  style="color: #808080; gap: 8px; text-decoration: line-through; text-decoration-color: red;">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#808080" class="bi bi-truck" viewBox="0 0 16 16">
    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
    </svg> 
    Entrega
    </p>
    `
      : `
    <p class="fsz-07 f f-cntr"  style="color: #808080; gap: 8px;">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#808080" class="bi bi-truck" viewBox="0 0 16 16">
    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
    </svg> 
    Entrega
    </p>
    `;

  const productButton = `
        <button class="cart-animation" id="horizontal-recommended-product-cart-button-${product.id}" onClick="removeFromCart(${product.id})" style="background-color: white; padding: 4px 18px 4px 18px; border-radius: 0; border: 1px solid var(--main-color); color: var(--main-color);
        width: 100%; font-weight: 500; transition: transform 0.15s ease; 
        ">Remove from Cart</button>
    `;

  productDiv.innerHTML = `
    <img style="width: 150px; height: 160px; min-width: 150px;" src="${
      product.url
    }" alt="${product.name}" onclick="goToProduct(${product.id})">


    <div class="f f-col" style="align-items: flex-start; justify-content: start; padding: 4px 8px 4px 8px; gap: 8px; width: 100%;">
        <div class="f f-col" onclick="goToProduct(${product.id})">
        <p class="fsz-11 fw-5 f f-cntr clr-white" style="color: gray;">${
          product.name
        }</p>
        </div>
        <div class="f f-cntr" style="">
        <div class="f" style="gap: 4px; align-items: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="var(--sec-color)" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="var(--sec-color)" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="var(--sec-color)" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="var(--sec-color)" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="var(--sec-color)" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
        </div>

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
    
 
        ${frete}
 

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

function fitIntoCartUI(cart_productHTML) {
  const parentHTML = document.getElementById("cart-products-container");
  parentHTML.appendChild(cart_productHTML);
}

async function getMyLikes() {
  const res = await fetch("https://ggsrc.tech/gl", {
    method: "GET",
    headers: {
      Authorization: TOKEN,
    },
  });
  if (res.status == 200) {
    const { likes } = await res.json();
    return likes;
  } else if (res.status == 403) {
    window.location.href = `/signin.html?coming_from_route=cart`;
  }
}

const main = async () => {
  await runUserActivitiesAndUpdateHeaderAndSidebar();
  closeSidebar()

  MY_LIKES = await getMyLikes();
  await getMyCarts();

  if (GLOBAL_CART_PRODUCTS.length == 0) {
    displaybox();
  } else {
    GLOBAL_CART_PRODUCTS.forEach((product) => {
      const product_liked = MY_LIKES?.includes(product.id.toString());
      product.have_i_liked = product_liked;
      const cart_productHTML = createHorizontalProductElement(product);
      fitIntoCartUI(cart_productHTML);
    });
  }

  // const backButton = document.getElementById("back-route-button")
  // backButton.addEventListener('click', goToAnotherPage)
};
main();

function searchFriends() {
  const v = document.getElementById("sidebar-friends-input").value;
  if (!v || v.trim() == "") return;
  window.location.href = `searchuser.html?search=${v.trim()}`;
}
async function getMyMessages() {
  const res = await fetch("https://ggsrc.tech/gmm", {
    method: "GET",
    headers: {
      Authorization: TOKEN,
    },
  });
  if (res.status == 200) {
    const { messages_count } = await res.json();
    return messages_count;
  }
  return null;
}
function logout() {
  window.localStorage.removeItem("token");
  window.location.href = "a.html";
}
async function fitUserInfo(name, url) {
  const img = "https://cdn-icons-png.flaticon.com/512/21/21104.png";
  const userimage = document.getElementById("user-image");
  userimage.src = url ? url : img;
  userimage.addEventListener("click", goToProfile);
  const n = name.split(" ");
  const na = document.getElementById("name-acro");
  na.onclick = () => (window.location.href = "profile.html");
  const sun = document.getElementById("sidebar-user-name");
  document.getElementById("sidebar-logo-and-name-container").onclick = () =>
    (window.location.href = "profile.html");
  sun.innerText = name;
  if (n[1]) {
    na.innerText = n[0][0] + n[1][0];
  } else {
    na.innerText = n[0][0] + n[0][1];
  }
  const messages_count = await getMyMessages();
  if (messages_count) {
    const smce = document.getElementById("sidebar-messages-count-element");
    smce.style.display = "unset";
    smce.innerText = messages_count;
  }
}
function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.left = "-100%";
  sidebar.setAttribute("isopen", "false");
}
function openSidebar() {
  console.log("toggle");
  const sidebar = document.getElementById("sidebar");
  sidebar.style.left = "0";
  sidebar.setAttribute("isopen", "true");
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
async function runUserActivitiesAndUpdateHeaderAndSidebar() {
  const user = await getMyUserInfo();
  fitUserInfo(user.name, user.url);
  document.getElementById("hamburguer").addEventListener("click", openSidebar);
  document
    .getElementById("close-sidebar-button")
    .addEventListener("click", closeSidebar);
  document
    .getElementById("search-friends-button")
    .addEventListener("click", goTosearchFriends);
  const myForm = document.getElementById("sidebar-user-form");
  myForm.addEventListener("submit", (e) => goTosearchFriends(e));
}

function displaybox() {
  document.getElementById("box").style.display = "unset";
}

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
