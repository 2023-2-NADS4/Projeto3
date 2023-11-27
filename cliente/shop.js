let TOKEN = null;

async function getMyUserInfo() {
  const token = window.localStorage.getItem("token");
  if (!token) {
    window.location.href = "/signin.html";
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
  } else if (res.status == 403) {
    window.location.href = "/a.html";
  }

  return null;
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
  }
  return null;
}
async function getMyCarts() {
  const res = await fetch("https://ggsrc.tech/gc", {
    method: "GET",
    headers: {
      Authorization: TOKEN,
    },
  });
  if (res.status == 200) {
    const { carts } = await res.json();
    return carts;
  }
  return null;
}

async function likeProduct(product_id) {
  const res = await fetch(`https://ggsrc.tech/lp?product_id=${product_id}`, {
    method: "GET",
    headers: {
      Authorization: TOKEN,
    },
  });
  if (res.status == 200) {
    console.log("liked");
    // return true;
  }
  UpdateSliderUiAfterProductLiking(product_id);
  runLikeWarning();
}

async function unlikeProduct(product_id) {
  const res = await fetch(`https://ggsrc.tech/up?product_id=${product_id}`, {
    method: "GET",
    headers: {
      Authorization: TOKEN,
    },
  });
  if (res.status == 200) {
    console.log("unliked");
  }
  console.log("ops");
  UpdateSliderUiAfterProductUnliking(product_id);
}

async function addToCart(product_id) {
  const res = await fetch(`https://ggsrc.tech/ac?product_id=${product_id}`, {
    method: "GET",
    headers: {
      Authorization: TOKEN,
    },
  });
  if (res.status == 200) {
  }
  UpdateSliderUiAfterAddingProductToCart(product_id);
  runCartMessage();
  const t = document.getElementById("total-itens-in-cart");
  t.innerText = Number(t.innerText) + 1;
}

async function removeFromCart(product_id) {
  const res = await fetch(`https://ggsrc.tech/rc?product_id=${product_id}`, {
    method: "GET",
    headers: {
      Authorization: TOKEN,
    },
  });
  if (res.status == 200) {
  }

  runCartMessage();
  UpdateSliderUiAfterRemovingProductToCart(product_id);
  const t = document.getElementById("total-itens-in-cart");
  t.innerText = Number(t.innerText) - 1;
}

function UpdateSliderUiAfterProductLiking(product_id) {
  //popular
  const cardProductHTMLElement = document.getElementById(
    `squared-product-${product_id}`
  );
  cardProductHTMLElement.children[1].style.background = "var(--main-color)";
  cardProductHTMLElement.children[1].innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-heart-fill" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
    </svg>
    `;
  cardProductHTMLElement.children[1].onclick = () => {
    unlikeProduct(product_id);
  };
  //recommended
  const horizontalCardProductHTMLElement = document.getElementById(
    `horizontal-recommended-product-${product_id}`
  );
  horizontalCardProductHTMLElement.children[1].lastElementChild.children[1].style.background =
    "var(--main-color)";
  horizontalCardProductHTMLElement.children[1].lastElementChild.children[1].innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-heart-fill" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
    </svg>
    `;
  horizontalCardProductHTMLElement.children[1].lastElementChild.children[1].onclick =
    () => {
      unlikeProduct(product_id);
    };
}

function UpdateSliderUiAfterProductUnliking(product_id) {
  const cardProductHTMLElement = document.getElementById(
    `squared-product-${product_id}`
  );
  console.log(cardProductHTMLElement);
  cardProductHTMLElement.children[1].style.background = "white";
  cardProductHTMLElement.children[1].innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="var(--main-color)" class="bi bi-heart" viewBox="0 0 16 16">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
    </svg>
    `;
  cardProductHTMLElement.children[1].onclick = () => {
    likeProduct(product_id);
  };
  //recomended
  const horizontalCardProductHTMLElement = document.getElementById(
    `horizontal-recommended-product-${product_id}`
  );
  horizontalCardProductHTMLElement.children[1].lastElementChild.children[1].style.background =
    "white";
  horizontalCardProductHTMLElement.children[1].lastElementChild.children[1].innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="var(--main-color)" class="bi bi-heart" viewBox="0 0 16 16">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
    </svg>
    `;
  horizontalCardProductHTMLElement.children[1].lastElementChild.children[1].onclick =
    () => {
      likeProduct(product_id);
    };
}

function UpdateSliderUiAfterAddingProductToCart(product_id) {
  // const squaredProductHTML = document.getElementById(`squared-product-${product_id}`)
  // squaredProductHTML.style.background = 'var(--main-color)'
  const horizontal_recommended_add_to_cart_buttonHTML = document.getElementById(
    `horizontal-recommended-product-cart-button-${product_id}`
  );
  horizontal_recommended_add_to_cart_buttonHTML.innerText = "Remove";
  horizontal_recommended_add_to_cart_buttonHTML.style.background = "white";
  horizontal_recommended_add_to_cart_buttonHTML.style.color =
    "var(--main-color)";
  horizontal_recommended_add_to_cart_buttonHTML.onclick = () => {
    removeFromCart(product_id);
  };

  const add_to_cart_buttonHTML = document.getElementById(
    `squared-product-cart-button-${product_id}`
  );
  add_to_cart_buttonHTML.innerText = "Remove";
  add_to_cart_buttonHTML.style.background = "white";
  add_to_cart_buttonHTML.style.color = "var(--main-color)";
  add_to_cart_buttonHTML.onclick = () => {
    removeFromCart(product_id);
  };
}
function UpdateSliderUiAfterRemovingProductToCart(product_id) {
  const horizontal_recommended_add_to_cart_buttonHTML = document.getElementById(
    `horizontal-recommended-product-cart-button-${product_id}`
  );
  horizontal_recommended_add_to_cart_buttonHTML.innerText = "Add to Cart";
  horizontal_recommended_add_to_cart_buttonHTML.style.background =
    "var(--main-color)";
  horizontal_recommended_add_to_cart_buttonHTML.style.color = "white";
  horizontal_recommended_add_to_cart_buttonHTML.onclick = () => {
    addToCart(product_id);
  };

  const add_to_cart_buttonHTML = document.getElementById(
    `squared-product-cart-button-${product_id}`
  );
  add_to_cart_buttonHTML.innerText = "Add to Cart";
  add_to_cart_buttonHTML.style.background = "var(--main-color)";
  add_to_cart_buttonHTML.style.color = "white";
  add_to_cart_buttonHTML.onclick = () => {
    addToCart(product_id);
  };
}

function logout() {
  window.localStorage.removeItem("token");
  window.location.href = "a.html";
}
function fitUserInfo(name, url) {
  const img = "https://cdn-icons-png.flaticon.com/512/21/21104.png";
  document.getElementById("name-field").innerText = `Olá, ${
    name.split(" ")[0]
  }!`;
  document.getElementById("user-image").src = url ? url : img;
  document.getElementById("sidebar-user-image").src = url ? url : img;
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

async function getRecommended() {
  const res = await fetch("https://ggsrc.tech/gr", {
    method: "GET",
    headers: {
      Authorization: TOKEN,
    },
  });
  if (res.status == 200) {
    const { products, order } = await res.json();
    return { products, order };
  }
  return null;
}

let GLOBAL_PRODUCTS = [];
let MY_LIKES = [];
let MY_CARTS = [];

function getParameterByName(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

const main = async () => {
  const loading_screen = getParameterByName("loading");
  if (loading_screen == "0") {
    document.getElementById("loading-screen").remove();
    document.getElementById("main-scrolled").style.animation =
      "slideToTop 0.25s ease-in-out forwards";
  }

  const user = await getMyUserInfo();
  fitUserInfo(user.name, user.url);
  document.getElementById("hamburguer").addEventListener("click", openSidebar);
  document
    .getElementById("close-sidebar-button")
    .addEventListener("click", closeSidebar);

  console.log(user);
  MY_LIKES = await getMyLikes();
  MY_CARTS = await getMyCarts();

  const { products, order } = await getRecommended();
  if (products?.length > 0) {
    console.log(order);
    console.log(products);
    // GLOBAL_PRODUCTS = products;

    GLOBAL_PRODUCTS = products.sort((a, b) => {
      const aIndex = order.indexOf(a.id);
      const bIndex = order.indexOf(b.id);

      // Compare the indices to determine the sorting order
      return aIndex - bIndex;
    });
  }
  console.log(GLOBAL_PRODUCTS);

  fitIntoRecommendedProducts();
  //  document.getElementById('loading-screen').remove();
  document.getElementById("main-scrolled").style.animation =
    "slideToTop 0.25s ease-in-out forwards";
};

main();

function fitIntoRecommendedProducts(products) {
  const parentHTML = document.getElementById("recommended-products-container");
  GLOBAL_PRODUCTS.forEach((product) => {
    const product_liked = MY_LIKES?.includes(product.id.toString());
    console.log(product_liked);
    console.log(product.id);

    product.have_i_liked = product_liked;

    const productHTML = createHorizontalProductElement(product);
    parentHTML.append(productHTML);
  });
}

function createHorizontalProductElement(product) {
  const productDiv = document.createElement("div");
  productDiv.className = "f";
  productDiv.id = `horizontal-recommended-product-${product.id}`;
  productDiv.style =
    "width: 100%; height: fit-content; overflow: hidden; position: relative; box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.17);";

  const heartSVG = product.have_i_liked
    ? `
        <div onClick="unlikeProduct(${product.id})" class="f f-cntr" style="border-radius: 50%; width: 40px; height: 40px;background-color: var(--main-color); box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.17);">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-heart-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
      </svg>
    </div>
    `
    : `
        <div onClick="likeProduct(${product.id})"  class="f f-cntr" style="border-radius: 50%; width: 40px; height: 40px;  background-color: white; box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.17);">

        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="var(--main-color)" class="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
        </svg>
    </div>
        `;

  const productButton = product.is_product_in_cart
    ? `
        <button id="horizontal-recommended-product-cart-button-${product.id}" onClick="removeFromCart(${product.id})" class="clr-white fw-6" style="background-color: white; padding: 4px 18px 4px 18px; border-radius: 20px; border: 1px solid var(--main-color); color: var(--main-color);">Remove</button>
    `
    : `
    <button id="horizontal-recommended-product-cart-button-${product.id}" onClick="addToCart(${product.id})" class="clr-white fw-6" style="background-color: var(--main-color); padding: 4px 18px 4px 18px; border-radius: 20px; border: 1px solid var(--main-color);">Add to Cart</button>
        `;

  productDiv.innerHTML = `
    <img style="width: 150px; height: 160px; min-width: 150px;" src="${product.url}" alt="${product.name}">

    
    <div class="f f-col" style="align-items: flex-start; justify-content: start; padding: 4px 8px 4px 8px; gap: 8px; width: 100%;">
        <div class="f f-col">
            <p class="fsz-12 fw-6 f f-cntr " style="color: #b0b0b0;">${product.name}</p>
            <p class="fsz-08 f f-cntr" style="color: #b0b0b0;">Vegetarian</p>
        </div>
        <div class="f f-cntr" style="">
        <div class="f" style="gap: 4px; align-items: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#01d449" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#01d449" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#01d449" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#01d449" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#01d449" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
        </div>

    </div>
    
    <div>

        <p class="fsz-10 fw-6 f f-cntr" style="color: #b0b0b0">59R$</p>
    </div>
   
    <div class="f" style="align-items: baseline; justify-content: space-between; width: 100%;">


     ${productButton}

        ${heartSVG}

     
    </div>

 

    </div>

    `;
  return productDiv;
}

let prevScrollPos = document.getElementById("main-scrolled").scrollTop;
let last_down = 0;

function hideHeader(e) {
  let currentScrollPos = document.getElementById("main-scrolled").scrollTop;
  console.log(currentScrollPos);

  if (prevScrollPos < currentScrollPos && currentScrollPos > 30) {
    //scroll down
    document.getElementById("header").style.top = "-60px"; // Adjust this value to hide the header
    last_down = 1;
    // document.getElementById("footer").style.bottom = "0";
  } else if (prevScrollPos > currentScrollPos) {
    // document.getElementById("footer").style.bottom = "-70px"; // Adjust this value to hide the header
    document.getElementById("header").style.top = "0";
    last_down = 0;
    // setTimeout(() => {
    //     if (last_down == 0 && currentScrollPos > 30) document.getElementById("header").style.top = "-60px";
    // }, 3500);
  }

  prevScrollPos = currentScrollPos;
}

let like_warning_showing = 0;
function runLikeWarning() {
  if (like_warning_showing == 1) return;
  like_warning_showing = 1;
  const warning = document.getElementById("like-warning");
  warning.style.top = "25px";
  setTimeout(() => {
    warning.style.top = "-80px";
    like_warning_showing = 0;
  }, 2650);
}
let cart_message_showing = 0;
function runCartMessage() {
  if (cart_message_showing == 1) return;
  cart_message_showing = 1;
  const warning = document.getElementById("cart-warning");
  warning.style.top = "25px";
  setTimeout(() => {
    warning.style.top = "-80px";
    cart_message_showing = 0;
  }, 2650);
}

function goToProduct(id) {
  window.location.href = `product.html?id=${id}&coming_from_route=main`;
}
