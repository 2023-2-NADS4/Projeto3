let TOKEN = null;

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
    UpdateSliderUiAfterProductLiking(product_id);
    runLikeWarning();
  } else if (res.status == 417) {
    goToPlan();
  }
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
    UpdateSliderUiAfterAddingProductToCart(product_id);
    runCartMessage();
  } else if (res.status == 417) {
    goToPlan();
  }
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

  cardProductHTMLElement.children[1].classList.add("clicked");
  setTimeout(() => {
    cardProductHTMLElement.children[1].classList.remove("clicked");
    cardProductHTMLElement.children[1].style.background = "var(--main-color)";
  }, 60);
  cardProductHTMLElement.children[1].style.background = "var(--test)";
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
  horizontalCardProductHTMLElement.children[1].lastElementChild.children[1].classList.add(
    "clicked"
  );
  setTimeout(() => {
    horizontalCardProductHTMLElement.children[1].lastElementChild.children[1].classList.remove(
      "clicked"
    );
    horizontalCardProductHTMLElement.children[1].lastElementChild.children[1].style.background =
      "var(--main-color)";
  }, 60);
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

  cardProductHTMLElement.children[1].classList.add("clicked");
  setTimeout(() => {
    cardProductHTMLElement.children[1].classList.remove("clicked");
    cardProductHTMLElement.children[1].style.background = "white";
  }, 60);
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
  horizontalCardProductHTMLElement.children[1].lastElementChild.children[1].classList.add(
    "clicked"
  );
  setTimeout(() => {
    horizontalCardProductHTMLElement.children[1].lastElementChild.children[1].classList.remove(
      "clicked"
    );
    horizontalCardProductHTMLElement.children[1].lastElementChild.children[1].style.background =
      "white";
  }, 60);
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
  horizontal_recommended_add_to_cart_buttonHTML.classList.add("clicked");
  setTimeout(() => {
    horizontal_recommended_add_to_cart_buttonHTML.classList.remove("clicked");
    horizontal_recommended_add_to_cart_buttonHTML.style.background = "white";
  }, 90);
  horizontal_recommended_add_to_cart_buttonHTML.innerText = "Remove from Cart";
  horizontal_recommended_add_to_cart_buttonHTML.style.background =
    "var(--test)";
  horizontal_recommended_add_to_cart_buttonHTML.style.color =
    "var(--main-color)";
  horizontal_recommended_add_to_cart_buttonHTML.onclick = () => {
    removeFromCart(product_id);
  };

  const add_to_cart_buttonHTML = document.getElementById(
    `squared-product-cart-button-${product_id}`
  );
  add_to_cart_buttonHTML.classList.add("clicked");
  setTimeout(() => {
    add_to_cart_buttonHTML.classList.remove("clicked");
    add_to_cart_buttonHTML.style.background = "white";
  }, 90);

  add_to_cart_buttonHTML.innerText = "Remove from Cart";
  add_to_cart_buttonHTML.style.background = "var(--test)";
  add_to_cart_buttonHTML.style.color = "var(--main-color)";
  add_to_cart_buttonHTML.onclick = () => {
    removeFromCart(product_id);
  };
}
function UpdateSliderUiAfterRemovingProductToCart(product_id) {
  const horizontal_recommended_add_to_cart_buttonHTML = document.getElementById(
    `horizontal-recommended-product-cart-button-${product_id}`
  );
  horizontal_recommended_add_to_cart_buttonHTML.classList.add("clicked");
  setTimeout(() => {
    horizontal_recommended_add_to_cart_buttonHTML.classList.remove("clicked");
    horizontal_recommended_add_to_cart_buttonHTML.style.background =
      "var(--main-color)";
  }, 90);

  horizontal_recommended_add_to_cart_buttonHTML.innerText = "Add to Cart";
  horizontal_recommended_add_to_cart_buttonHTML.style.background =
    "var(--test)";
  horizontal_recommended_add_to_cart_buttonHTML.style.color = "white";
  horizontal_recommended_add_to_cart_buttonHTML.onclick = () => {
    addToCart(product_id);
  };

  const add_to_cart_buttonHTML = document.getElementById(
    `squared-product-cart-button-${product_id}`
  );
  add_to_cart_buttonHTML.classList.add("clicked");
  setTimeout(() => {
    add_to_cart_buttonHTML.classList.remove("clicked");
    add_to_cart_buttonHTML.style.background = "var(--main-color)";
  }, 90);
  add_to_cart_buttonHTML.innerText = "Add to Cart";
  add_to_cart_buttonHTML.style.background = "var(--test)";
  add_to_cart_buttonHTML.style.color = "white";
  add_to_cart_buttonHTML.onclick = () => {
    addToCart(product_id);
  };
}

async function getTwentyProducts() {
  const res = await fetch("https://ggsrc.tech/gt", {
    method: "GET",
    headers: {
      Authorization: TOKEN,
    },
  });
  if (res.status == 200) {
    const data = await res.json();
    return data;
  }
  return null;
}
async function getTwnetyRatings(productsids) {
  console.log(productsids);
  const res = await fetch("https://ggsrc.tech/gpraac", {
    method: "POST",
    body: JSON.stringify({ ids: productsids }),
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
  });
  if (res.status == 200) {
    const { ratings } = await res.json();
    console.log(ratings);
    return ratings;
  }
  return null;
}

let GLOBAL_PRODUCTS = [];
let MY_LIKES = [];
let MY_CARTS = [];

function goTosearchFriends(e) {
  if (e) e.preventDefault();
  const v = document.getElementById("sidebar-friends-input").value;
  if (!v || v.trim() == "") return;
  const pathAndQuery = window.location.pathname + window.location.search;
  window.localStorage.setItem("before-search-users", pathAndQuery);
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
  const userimage = document.getElementById("user-image");
  userimage.src = url;

  userimage.onerror = function () {
    console.log("Image failed to load");
  };
  userimage.addEventListener("click", goToProfile);
  const n = name.split(" ");
  const na = document.getElementById("name-acro");
  na.onclick = () => (window.location.href = "profile.html");
  const sun = document.getElementById("sidebar-user-name");
  document.getElementById("sidebar-logo-and-name-container").onclick = () =>
    (window.location.href = "profile.html");
  sun.innerText = name;
  console.log(n);
  if (n[1]) {
    na.innerText = n[0][0] + n[1][0];
  } else {
    na.innerText = n[0][0];
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

const main = async () => {
  await runUserActivitiesAndUpdateHeaderAndSidebar();
  closeSidebar()
  MY_LIKES = await getMyLikes();
  MY_CARTS = await getMyCarts();
  GLOBAL_PRODUCTS = await getTwentyProducts();
  const ids = GLOBAL_PRODUCTS.map((p) => {
    return p.id;
  });
  const r = await getTwnetyRatings(ids);
  console.log(r);
  fitIntoPopularProducts(r);
  fitIntoRecommendedProducts();
};

main();

function fitIntoPopularProducts(rs) {
  const parentHTML = document.getElementById("product-slider-parent");
  GLOBAL_PRODUCTS.forEach((product, i) => {
    // #TODO: Improve performance: Perform only one loop in the bigger array checking both lists inside of it instead of two loops.
    const product_liked = MY_LIKES?.includes(product.id.toString());
    const is_product_in_cart = MY_CARTS?.includes(product.id.toString());

    // product.created_at = `${product.created_at.substring(8, 10)}/${product.created_at.substring(5, 7)}/${product.created_at.substring(0, 4)}`

    rs.forEach((r) => {
      if (r.product_id == product.id) {
        product.rating = Number(r.average.substring(0, 1));
      }
    });

    product.have_i_liked = product_liked;
    product.is_product_in_cart = is_product_in_cart;
    const productHTML = createSquaredProductElement(product);
    parentHTML.append(productHTML);
  });
}

function fitIntoRecommendedProducts() {
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

  const heartSVG = product.have_i_liked
    ? `
        <div onClick="unlikeProduct(${product.id})" class="like-animation" style="border-radius: 50%; width: 40px; height: 40px;background-color: var(--main-color); box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.17); display: flex; align-items: center; justify-content: center; position: absolute; top: -15px; right: 5px; transition: transform 0.15s ease;">

        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-heart-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
      </svg>

    </div>
    `
    : `
        <div onClick="likeProduct(${product.id})"  class="like-animation" style="border-radius: 50%; width: 40px; height: 40px;  background-color: white; box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.17); display: flex; align-items: center; justify-content: center; position: absolute; top: -15px; right: 5px; transition: transform 0.15s ease;">

        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="var(--main-color)" class="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
        </svg>
    </div>
        `;

  const productButton = product.is_product_in_cart
    ? `
        <button class="cart-animation" id="horizontal-recommended-product-cart-button-${product.id}" onClick="removeFromCart(${product.id})" style="background-color: white; padding: 4px 18px 4px 18px; border-radius: 0; border: 1px solid var(--main-color); color: var(--main-color);
        width: 100%; font-weight: 500; transition: transform 0.15s ease;
        ">Remove from Cart</button>
    `
    : `
    <button class="cart-animation" id="horizontal-recommended-product-cart-button-${product.id}" onClick="addToCart(${product.id})" style="background-color: var(--main-color); padding: 4px 18px 4px 18px; border-radius: 0; border: 1px solid var(--main-color);
    width: 100%; color: white; font-weight: 500; transition: transform 0.15s ease;
    ">Add to Cart</button>
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
     
     ${heartSVG}
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

function createSquaredProductElement(product) {
  const productDiv = document.createElement("div");
  //190px
  productDiv.style =
    "width: 190px; height: fit-content;position: relative; padding: 0; ";
  productDiv.id = `squared-product-${product.id}`;

  const flexible =
    product.flexible_sell.data[0] == 1
      ? `
    <div class="fsz-08 fw-6" style="position: absolute; top: 0px; left: -5px; transform: rotate(-12deg); background: var(--main-color); color: white; padding: 0 8px 0 8px; border-radius: 4px;" onclick="window.location.href = 'flexible.html'">Flexivel</div>
    `
      : ``;

  const stars = handlestarcreation(product.rating);

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

  const heartSVG = product.have_i_liked
    ? `
        <div onClick="unlikeProduct(${product.id})" class="like-animation" style="border-radius: 50%; width: 40px; height: 40px; position: absolute; top: 150px; right: 5px; background-color: var(--main-color); box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.17);
        display: flex; align-items: center; justify-content: center; transition: transform 0.3s ease;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-heart-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
      </svg>
    </div>
    `
    : `
        <div onClick="likeProduct(${product.id})"  class="like-animation" style="border-radius: 50%; width: 40px; height: 40px; position: absolute; top: 150px; right: 5px; background-color: white; box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.17); display: flex; align-items: center; justify-content: center; transition: transform 0.15s ease;">

        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="var(--main-color)" class="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
        </svg>
    </div>
        `;

  //TODO: improve it, create only one element
  const productButton = product.is_product_in_cart
    ? `
        <button class="cart-animation" id="squared-product-cart-button-${product.id}" onClick="removeFromCart(${product.id})" style="background-color: white; padding: 4px 18px 4px 18px; border-radius: 0; border: 1px solid var(--main-color); color: var(--main-color); 
        font-weight: 500; width: 100%;
        transition: transform 0.15s ease;">Remove from Cart</button>
    `
    : `
    <button class="cart-animation" id="squared-product-cart-button-${product.id}" onClick="addToCart(${product.id})" style="background-color: var(--main-color); padding: 4px 18px 4px 18px; border-radius: 0; border: 1px solid var(--main-color); width: 100%; color: white; font-weight: 500; transition: transform 0.15s ease;"
    >Add to Cart</button>
        `;

  //180px
  productDiv.innerHTML = `
   

    <img style="width: 100%; height: 180px; " src="${product.url}" alt="${
    product.name
  }"
    onclick="goToProduct(${product.id})"
    >
 
        ${heartSVG}
        ${flexible}

    <div class="f f-col" style="align-items: flex-start; justify-content: start; padding: 4px 2px 4px 2px; gap: 8px;">
        <div class="f f-cntr" style="">
        <div class="f" style="gap: 4px; align-items: center;" onclick="goToProduct(${
          product.id
        })">
            ${stars}
        </div>
   
    </div>
    <div class="f f-col" style="width: 100%;" onclick="goToProduct(${
      product.id
    })">
        <p class="fsz-11 fw-5 f f-cntr clr-white" style="color: gray;">${
          product.name
        }</p>
       
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
        <div class="f" style="align-items: center; justify-content: space-between; width: 100%;">
        ${productButton}
    </div>
    </div>
    `;
  return productDiv;
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
  const pathAndQuery = window.location.pathname + window.location.search;
  window.localStorage.setItem("before-product", pathAndQuery);
  window.location.href = `product.html?id=${id}`;
}

function goToProfile() {
  const pathAndQuery = window.location.pathname + window.location.search;
  window.localStorage.setItem("before-profile", pathAndQuery);
  window.location.href = "profile.html";
}
function goToPlan() {
  const pathAndQuery = window.location.pathname + window.location.search;
  window.localStorage.setItem("before-plan", pathAndQuery);
  window.location.href = "plan.html";
}
