let TOKEN = null;
let GLOBAL_LIKE_PRODUCTS = [];
let MY_LIKES = [];

function UpdateSliderUiAfterProductUnliking(product_id) {
  const p = document.getElementById(
    `horizontal-recommended-product-${product_id}`
  );
  if (GLOBAL_LIKE_PRODUCTS.length == 0) {
    p.remove();
    return;
  }
  const pb = document.getElementById(
    `horizontal-recommended-product-like-button-${product_id}`
  );
  pb.classList.add("clicked");
  setTimeout(() => {
    pb.classList.remove("clicked");
    pb.style.background = "white";
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
    "width: 100%; height: fit-content; position: relative; box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.17);";

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

  const heartSVG = `
        <div id="horizontal-recommended-product-like-button-${product.id}" onClick="unlikeProduct(${product.id})" class="like-animation" style="border-radius: 50%; width: 40px; height: 40px;background-color: var(--main-color); box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.17); display: flex; align-items: center; justify-content: center; position: absolute; top: -15px; right: 5px; transition: transform 0.15s ease;">

        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-heart-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
      </svg>

    </div>
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


     
     ${heartSVG}
     ${flexible}
   

     
    </div>

 

    </div>

    `;
  return productDiv;
}

// function createHorizontalProductElement(product) {
//     const productDiv = document.createElement("div");
//     productDiv.className = 'f'
//     productDiv.id = `horizontal-recommended-product-${product.id}`
//     productDiv.style = "width: 100%; height: fit-content; position: relative; box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.17);";

//     const flexible = product.flexible_sell.data[0] == 1 ? `
//     <div class="fsz-08 fw-6" style="position: absolute; top: 0px; left: -5px; transform: rotate(-12deg); background: var(--main-color); color: white; padding: 0 8px 0 8px; border-radius: 4px;" onclick="window.location.href = 'flexible.html'">Flexivel</div>
//     ` : ``

//     console.log(product.name)
//     console.log(product.delivery.data[0])

//     const frete = product.delivery.data[0] == 0 ? `
//     <p class="fsz-07 f f-cntr"  style="color: #808080; gap: 8px; text-decoration: line-through; text-decoration-color: red;">
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#808080" class="bi bi-truck" viewBox="0 0 16 16">
//     <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
//     </svg>
//     Entrega
//     </p>
//     ` : `
//     <p class="fsz-07 f f-cntr"  style="color: #808080; gap: 8px;">
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#808080" class="bi bi-truck" viewBox="0 0 16 16">
//     <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
//     </svg>
//     Entrega
//     </p>
//     `

//     const heartSVG = product.have_i_liked ? `
//         <div onClick="unlikeProduct(${product.id})" class="like-animation" style="border-radius: 50%; width: 40px; height: 40px;background-color: var(--main-color); box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.17); display: flex; align-items: center; justify-content: center; position: absolute; top: -15px; right: 5px; transition: transform 0.15s ease;">

//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-heart-fill" viewBox="0 0 16 16">
//         <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
//       </svg>

//     </div>
//     ` :
//         `
//         <div onClick="likeProduct(${product.id})"  class="like-animation" style="border-radius: 50%; width: 40px; height: 40px;  background-color: white; box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.17); display: flex; align-items: center; justify-content: center; position: absolute; top: -15px; right: 5px; transition: transform 0.15s ease;">

//         <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="var(--main-color)" class="bi bi-heart" viewBox="0 0 16 16">
//             <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
//         </svg>
//     </div>
//         `

//         const productButton = product.is_product_in_cart ? `
//         <button class="cart-animation" id="horizontal-recommended-product-cart-button-${product.id}" onClick="removeFromCart(${product.id})" style="background-color: white; padding: 4px 18px 4px 18px; border-radius: 0; border: 1px solid var(--main-color); color: var(--main-color);
//         width: 100%; font-weight: 500; transition: transform 0.15s ease;
//         ">Remove from Cart</button>
//     ` :
//     `
//     <button class="cart-animation" id="horizontal-recommended-product-cart-button-${product.id}" onClick="addToCart(${product.id})" style="background-color: var(--main-color); padding: 4px 18px 4px 18px; border-radius: 0; border: 1px solid var(--main-color);
//     width: 100%; color: white; font-weight: 500; transition: transform 0.15s ease;
//     ">Add to Cart</button>
//         `

//     productDiv.innerHTML = `
//     <img style="width: 150px; height: 160px; min-width: 150px;" src="${product.url}" alt="${product.name}" onclick="goToProduct(${product.id})">

//     <div class="f f-col" style="align-items: flex-start; justify-content: start; padding: 4px 8px 4px 8px; gap: 8px; width: 100%;">
//         <div class="f f-col" onclick="goToProduct(${product.id})">
//         <p class="fsz-11 fw-5 f f-cntr clr-white" style="color: gray;">${product.name}</p>
//         </div>
//         <div class="f f-cntr" style="">
//         <div class="f" style="gap: 4px; align-items: center;">
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="var(--sec-color)" class="bi bi-star-fill" viewBox="0 0 16 16">
//                 <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
//             </svg>
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="var(--sec-color)" class="bi bi-star-fill" viewBox="0 0 16 16">
//                 <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
//             </svg>
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="var(--sec-color)" class="bi bi-star-fill" viewBox="0 0 16 16">
//                 <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
//                 </svg>
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="var(--sec-color)" class="bi bi-star-fill" viewBox="0 0 16 16">
//                 <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
//             </svg>
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="var(--sec-color)" class="bi bi-star-fill" viewBox="0 0 16 16">
//                 <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
//             </svg>
//         </div>

//     </div>

//     <div style="width: 100%;">

//     <div class="f f-col" style="width: 100%;" onclick="goToProduct(${product.id})">

//     <p class="fsz-09 fw-4 f f-cntr clr-white"  style="color: #808080; gap: 8px;">
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#808080" class="bi bi-cash" viewBox="0 0 16 16">
//     <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
//     <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
//   </svg>
//     ${product.total_price}</p>

//     <p class="fsz-08 f f-cntr"  style="color: #808080; gap: 8px;">
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#808080" class="bi bi-box-seam" viewBox="0 0 16 16">
//     <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
//   </svg>
//     ${product.available_quantity.split('.')[0]} Kg</p>

//         ${frete}

//     </div>
//     </div>

//     <div class="f" style="align-items: baseline; justify-content: space-between; width: 100%;">

//      ${heartSVG}
//      ${flexible}

//     </div>

//     </div>

//     `
//     return productDiv;
// }

// function createHorizontalProductElement(product) {

//     const productDiv = document.createElement("div");
//     productDiv.className = 'f'
//     productDiv.id = `horizontal-recommended-product-${product.id}`
//     productDiv.style = "width: 100%; height: fit-content; overflow: hidden; position: relative;";

//     const heartSVG = `
//         <div onClick="unlikeProduct(${product.id})" class="f f-cntr" style="border-radius: 50%; width: 40px; height: 40px;background-color: var(--main-color); box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.17);">
//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-heart-fill" viewBox="0 0 16 16">
//         <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
//       </svg>
//     </div>
//     `

//     productDiv.innerHTML = `

//     <img style="width: 120px; height: 130px;" src="${product.url}" alt="${product.name}">

//     <div class="f f-col" style="align-items: flex-start; justify-content: start; padding: 4px 8px 4px 8px; gap: 8px; width: 100%; height: fit-content;">
//         <div class="f f-col">
//         <div class="f f-cntr"  style="position: absolute; right: 0; top: 0; height: 100%; background: var(--main-color); width: 40px;"  onClick="removeFromCart(${product.id})">
//             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" class="bi bi-trash" viewBox="0 0 16 16">
//             <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
//             <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
//         </svg>
//         </div>

//             <p class="fsz-12 fw-6 f f-cntr " style="color: #b0b0b0;">${product.name}</p>
//             <p class="fsz-08 f f-cntr" style="color: #b0b0b0;">Vegetarian</p>
//         </div>
//         <div class="f f-cntr" style="">
//         <div class="f" style="gap: 4px; align-items: center;">
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="var(--main-color)" class="bi bi-star-fill" viewBox="0 0 16 16">
//                 <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
//             </svg>
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="var(--main-color)" class="bi bi-star-fill" viewBox="0 0 16 16">
//                 <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
//             </svg>
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="var(--main-color)" class="bi bi-star-fill" viewBox="0 0 16 16">
//                 <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
//                 </svg>
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="var(--main-color)" class="bi bi-star-fill" viewBox="0 0 16 16">
//                 <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
//             </svg>
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="var(--main-color)" class="bi bi-star-fill" viewBox="0 0 16 16">
//                 <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
//             </svg>
//         </div>

//     </div>

//     <div>

//         <p class="fsz-11 fw-4 f f-cntr" style="color: #b0b0b0">59R$</p>
//     </div>

//     <div class="f" style="align-items: baseline; justify-content: space-between; width: 100%;">
//     </div>
//     </div>

//     `
//     return productDiv;
// }

async function unlikeProduct(product_id) {
  const res = await fetch(`https://ggsrc.tech/up?product_id=${product_id}`, {
    method: "GET",
    headers: {
      Authorization: TOKEN,
    },
  });
  if (res.status == 200) {
    GLOBAL_LIKE_PRODUCTS = GLOBAL_LIKE_PRODUCTS.filter((item) => {
      return item.id.toString() != product_id.toString();
    });
    console.log(GLOBAL_LIKE_PRODUCTS);
    if (GLOBAL_LIKE_PRODUCTS.length == 0) {
      displaybox();
    }
  }
  console.log("ops");
  UpdateSliderUiAfterProductUnliking(product_id);
}

function fitIntoCartUI(cart_productHTML) {
  const parentHTML = document.getElementById("cart-products-container");
  parentHTML.appendChild(cart_productHTML);
}
async function getMyLikes() {
  const res = await fetch("https://ggsrc.tech/gpidul", {
    method: "GET",
    headers: {
      Authorization: TOKEN,
    },
  });
  if (res.status == 200) {
    const { likes } = await res.json();
    GLOBAL_LIKE_PRODUCTS = likes;
    return likes;
  } else if (res.status == 403) {
    window.location.href = `/signin.html?coming_from_route=cart`;
  }
}
function displayProducts() {
  GLOBAL_LIKE_PRODUCTS.forEach((product) => {
    const cart_productHTML = createHorizontalProductElement(product);
    fitIntoCartUI(cart_productHTML);
  });
}
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

const main = async () => {

  await runUserActivitiesAndUpdateHeaderAndSidebar();
  closeSidebar()
  closeSidebar()
  await getMyLikes();
  if (GLOBAL_LIKE_PRODUCTS.length == 0) displaybox();
  else displayProducts();
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
