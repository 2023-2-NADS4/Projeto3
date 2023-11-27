require("dotenv/config");

const https = require("node:https");
const fs = require("node:fs");
const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const { createClient } = require("redis");
const db = require("./mysql");

const app = express(); // singleton app instance

// SSL CERTIFICATE
// TODO: DELEGATE IT TO NGINX
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/ggsrc.tech/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/ggsrc.tech/fullchain.pem"),
};


// SETTING THE GLOBAL OPTIONS FOR SERVER
const ALLOWED_ORIGIN = "https://ggsrc.site";
app.use(cors({ origin: ALLOWED_ORIGIN, credentials: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  next();
});
app.use(express.json());

// GOOGLE OAUTH CREDENTIALS
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);


// Redis
const client = createClient({
  host: "localhost", // Redis server host
  port: 6379, // Redis server port
});

client.connect();
client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on("error", (err) => {
  console.error("Redis client error:", err);
});


client.get("mykey", (err, reply) => {
  if (err) throw err;
  console.log("Get:", reply);
});

async function set(key, value, exp, save_if_does_not_exist) {
  await client.set(key, value, {
    EX: exp,
    NX: save_if_does_not_exist,
  });
}

async function get(key) {
  const found = await client.get(key);
  if (found) return JSON.parse(found);
  return null;
}

async function del(key) {
  await client.del(key);
}
// Redis

const {
  decodeAccessToken,
  generateAccessToken,
  generateRefreshToken,
  isRefreshTokenValid,
  verifyAccessToken,
} = require("./Utils");








const server = https.createServer(options, app);

app.get("/is_server_up", (req, res) => {
  res.send("up");
});

app.post("/l", handleLogin);
app.post("/rf", handleRegistrationFirstStep);
app.get("/rs", handleRegistrationSecondStep);
app.post("/cp", protection, createProduct);
app.get("/gurl", protection, getS3PreSignedUrl);
app.get("/gt", protection, getMostPopularProducts);
app.get("/gtrp", getTenRandomProducts);
app.get("/dmp", protection, deleteProduct);
app.get("/gui", protection, getUserNameAndPicture);
app.get("/gupiwefp", protection, getUserPrivateInfoWithEmailForProfile);
app.post("/ump", protection, updateProfile);
app.get("/lp", protection, likeProduct);
app.get("/up", protection, unlikeProduct);
app.get("/gl", protection, getMyLikes);
app.get("/ac", protection, addToCart);
app.get("/rc", protection, removeFromCart);
app.get("/gc", protection, getMyCarts);
app.get("/gpid", protection, getProductsInfoByArrayOfIds); // max length = 20 for cart
app.get("/gpidul", protection, getProductsInfoByArrayOfIdsForLike); // max length = 20 for cart
app.get("/gmp", protection, getMyProducts);
app.post("/giids", protection, getUsersImagesByTheirIds);
app.get("/gusers", protection, getUsersBySearching);
app.get("/gsp", protection, getSingleProductInfo);
app.get("/gtsp", protection, getThreeSimilarProducts);
app.post("/gpraac", protection, getAverageRatingsForProducts);
// app.post("/ir", protection, insertRating);
app.get("/gpr", protection, getTenProductRatings);
app.get("/gr", protection, getRecommended);
app.get("/gfiltered", protection, getFiltered);
app.get("/gmm", protection, getMyMessages);
app.get("/gupi", protection, getUserPublicInfo);

const { encrypt, decrypt } = require("./hashtest");
require("dotenv/config");

const { HASH } = require("./hashTest2");
const { sendEmail } = require("./mail");
const { getPreSignedUrl, doesObjectExistInS3 } = require("./aws_s3");

async function protection(request, response, next) {
  try {
    const access_token = request.header("Authorization");
    const is_token_valid = verifyAccessToken(access_token);
    if (!is_token_valid) throw new Error("Unauthorized");
    const decoded = decodeAccessToken(access_token);
    if (!decoded) throw new Error("Unauthorized");
    response.locals.id = decoded.id;
    return next();
  } catch (err) {
    response.status(403).json({ error: 1, message: err.message }).end();
  }
}

async function getUserPublicInfo(request, response) {
  try {
    const { id } = request.query;
    const isiderr = validateUserOrPId(id);
    if (isiderr) throw new Error("Invalid ID");

    const user = await db.getUserPublicInfo(Number(id));
    response.status(200).json({ user: user });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
}

async function createProduct(request, response) {
  try {
    const {
      server_file_names,
      name,
      description,
      total_price,
      available_quantity,
      size,
      color,
      taste,
      flexible_sell,
      delivery,
      boost,
    } = request.body;
    const id = response.locals.id;
    const puserslength = await db.findProductsFromUser(id);
    if (puserslength >= 2) {
      return response.status(417).end();
    }
    const exists = await doesObjectExistInS3(server_file_names);
    if (!exists) throw new Error("object does not exists in s3 bucket");
    const url_names = server_file_names.map((file_name) => {
      return `${process.env.AWS_S3_BUCKET_URL}/${file_name}`; //bucket url
    });
    const inserted = await db.insertProduct({
      name,
      description,
      total_price,
      available_quantity,
      size,
      color,
      taste,
      flexible_sell,
      delivery,
      boost,
      user_id: response.locals.id,
      category_ids: [1, 2, 3],
      url_names,
    });
    if (!inserted) throw new Error("Excession during Insertion");
    response.status(200).end();
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
}
async function deleteProduct(request, response) {
  try {
    const { p_id } = request.query;
    const id = response.locals.id;

    const isuiderr = validateUserOrPId(id);
    if (isuiderr) throw new Error("Invalid ID");

    const ispiderr = validateUserOrPId(p_id);
    if (ispiderr) throw new Error("Invalid ID");

    const deleted = await db.deleteUserProduct(id, p_id);
    if (!deleted) throw new Error("Excession during query.");
    response.status(200).end();
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
}

async function getS3PreSignedUrl(request, response) {
  try {
    const { contentType, urls_number } = request.query;
    if (urls_number > 7) throw new Error("Maximum of 7 urls");
    if (contentType != "jpg" && contentType != "jpeg" && contentType != "png")
      throw new Error("error sanitazing format");
    const urls = getPreSignedUrl(contentType, urls_number || 1);
    if (urls.length == 0) throw new Error("error generating pre signed url");
    response.status(200).json({ urls: urls });
  } catch (err) {
    response.status(400).json({ error: err });
  }
}

async function getMostPopularProducts(request, response) {
  try {
    const products = await db.getTwentyProducts();
    response.setHeader("Cache-Control", "public, max-age=60");
    response.status(200).json(products);
  } catch (err) {
    response.status(400).send("error: " + err);
  }
}

async function getRecommended(request, response) {
  const id = response.locals.id;
  const isuiderr = validateUserOrPId(id);
  if (isuiderr) throw new Error("Invalid ID");

  const { recommended } = await db.getRecommended(id);
  if (!recommended) {
    return response.status(200).json({ products: [] });
  }
  const arrayOfNumbers = recommended.split(",").map(Number);
  const products = await db.getProductsByIndexesArray(arrayOfNumbers);
  response.status(200).json({ products: products, order: arrayOfNumbers });
}

async function getFiltered(request, response) {
  try {
    let { pf, pt, entrega, flex, amount, color, search, pack } = request.query; //search
    if (search) search = search.toLowerCase();
    const products = await db.getFilteredProducts(
      pf,
      pt,
      entrega,
      flex,
      amount,
      color,
      search,
      pack
    );

    response.status(200).json({ products: products });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
}

async function getMyProducts(request, response) {
  try {
    const id = response.locals.id;
    const isuiderr = validateUserOrPId(id);
    if (isuiderr) throw new Error("Invalid ID");

    const products = await db.getProductsOfUserId(id);
    response.status(200).json({ products: products });
  } catch (err) {
    response.status(400).json({ error: err });
  }
}

async function updateProfile(request, response) {
  try {
    const id = response.locals.id;
    const isuiderr = validateUserOrPId(id);
    if (isuiderr) throw new Error("Invalid ID");

    let { name, user_image } = request.body;
    const isnameerror = validateName(name);
    if (isnameerror) throw new Error("Invalid name.");

    if (user_image) {
      //validate user image (length)
      const exists = await doesObjectExistInS3([user_image]);
      if (!exists) throw new Error("object does not exists in s3 bucket");
      user_image = `${process.env.AWS_S3_BUCKET_URL}/${user_image}`;
    }
    const updated = await db.updateUser(id, name, user_image);
    if (!updated) throw new Error("Unexpected error during updating query");
    response.status(200).end();
  } catch (err) {
    response.status(400).json({ error: err });
  }
}

async function getTenRandomProducts(request, response) {
  try {
    const products = await db.getTenRandomProducts();
    response.setHeader("Cache-Control", "public, max-age=60");
    response.status(200).json(products);
  } catch (err) {
    response.status(400).json({ error: "error: " + err });
  }
}

async function getProductsInfoByArrayOfIds(request, response) {
  try {
    const user_id = response.locals.id;
    const isuiderr = validateUserOrPId(user_id);
    if (isuiderr) throw new Error("Invalid ID");

    const END = await client.hKeys(`user:${user_id}:carts`);
    if (END.length == 0) {
      return response.status(200).json({ carts: [] });
    }
    const numberArray = END.map((str) => parseInt(str));
    const products = await db.getProductsByIndexesArray(numberArray);
    response.status(200).json({ carts: products });
  } catch (err) {
    response.status(400).json({ error: err });
  }
}

async function getProductsInfoByArrayOfIdsForLike(request, response) {
  try {
    const user_id = response.locals.id;
    const isuiderr = validateUserOrPId(user_id);
    if (isuiderr) throw new Error("Invalid ID");

    const END = await client.hKeys(`user:${user_id}:likes`);
    if (END.length == 0) {
      return response.status(200).json({ likes: [] });
    }
    const numberArray = END.map((str) => parseInt(str));
    const products = await db.getProductsByIndexesArray(numberArray);
    response.status(200).json({ likes: products });
  } catch (err) {
    response.status(400).json({ error: err });
  }
}

async function getUserNameAndPicture(request, response) {
  try {
    const user_id = response.locals.id;
    const isuiderr = validateUserOrPId(user_id);
    if (isuiderr) throw new Error("Invalid ID");

    const user = await db.getUserNameAndUrlById(user_id);
    if (!user) throw new Error("user Not found");

    response.setHeader("Cache-Control", "public, max-age=60");
    response.status(200).json({ name: user.name, url: user.user_image });
  } catch (err) {
    response.status(400).json({ error: err });
  }
}

async function getUserPrivateInfoWithEmailForProfile(request, response) {
  try {
    const { name, user_image, email } = await db.getUserPrivateInfo(
      response.locals.id
    );
    response.setHeader("Cache-Control", "public, max-age=60");
    response.status(200).json({ name, url: user_image, email: email });
  } catch (err) {
    response.status(400).send("error: " + err);
  }
}

async function getUsersImagesByTheirIds(request, response) {
  try {
    const { ids } = request.body;

    const areidserr = validateArrayOfIds(ids);
    if (areidserr) throw new Error("Invalid IDs");

    const pictures = await db.getUsersImagesByTheirIds(ids);
    response.status(200).json({ pictures: pictures });
  } catch (err) {
    response.status(400).json({ error: err });
  }
}
let MAX_PRODUCTS_LIKED = 10;
async function likeProduct(request, response) {
  try {
    const user_id = response.locals.id;
    const { product_id } = request.query;

    const isuiderr = validateUserOrPId(user_id);
    if (isuiderr) throw new Error("Invalid ID");

    const ispiderr = validateUserOrPId(product_id);
    if (ispiderr) throw new Error("Invalid ID");

    const likedCount = await client.hLen(`user:${user_id}:likes`);

    // Check if the user can add more products
    if (likedCount < MAX_PRODUCTS_LIKED) {
      const END = await client.hSet(
        `user:${user_id}:likes`,
        product_id,
        Date.now()
      );
    } else {
      return response.status(417).end();
    }
    response.status(200).end();
  } catch (err) {
    response.status(400).json({ error: err });
  }
}

async function unlikeProduct(request, response) {
  try {
    const user_id = response.locals.id;
    const { product_id } = request.query;

    const isuiderr = validateUserOrPId(user_id);
    if (isuiderr) throw new Error("Invalid ID");

    const ispiderr = validateUserOrPId(product_id);
    if (ispiderr) throw new Error("Invalid ID");

    const END = await client.hDel(`user:${user_id}:likes`, product_id);

    // if (END == 1) return response.status(200).end()
    // response.status(400).end()
    return response.status(200).end();
  } catch (err) {
    response.status(400).json({ error: err });
  }
}

async function getMyLikes(request, response) {
  try {
    const user_id = response.locals.id;

    const isuiderr = validateUserOrPId(user_id);
    if (isuiderr) throw new Error("Invalid ID");

    const END = await client.hKeys(`user:${user_id}:likes`);

    response.status(200).json({ likes: END });
  } catch (err) {
    response.status(400).json({ error: err });
  }
}

let MAX_PRODUCTS_IN_CART = 5;
async function addToCart(request, response) {
  try {
    const user_id = response.locals.id;

    const isuiderr = validateUserOrPId(user_id);
    if (isuiderr) throw new Error("Invalid ID");

    const { product_id } = request.query;

    const ispiderr = validateUserOrPId(product_id);
    if (ispiderr) throw new Error("Invalid ID");

    const cartCount = await client.hLen(`user:${user_id}:carts`);

    if (cartCount < MAX_PRODUCTS_IN_CART) {
      const END = await client.hSet(
        `user:${user_id}:carts`,
        product_id,
        Date.now()
      );
    } else {
      return response.status(417).end();
    }

    response.status(200).end();
  } catch (err) {
    response.status(400).json({ error: err });
  }
}
async function removeFromCart(request, response) {
  try {
    const user_id = response.locals.id;
    const isuiderr = validateUserOrPId(user_id);
    if (isuiderr) throw new Error("Invalid ID");

    const { product_id } = request.query;

    const ispiderr = validateUserOrPId(product_id);
    if (ispiderr) throw new Error("Invalid ID");

    const END = await client.hDel(`user:${user_id}:carts`, product_id);

    // if (END == 1) return response.status(200).end()
    // response.status(400).end()
    response.status(200).end();
  } catch (err) {
    response.status(400).json({ error: err });
  }
}
async function getMyCarts(request, response) {
  try {
    const user_id = response.locals.id;
    const isuiderr = validateUserOrPId(user_id);
    if (isuiderr) throw new Error("Invalid ID");

    const END = await client.hKeys(`user:${user_id}:carts`);

    response.status(200).json({ carts: END });
  } catch (err) {
    response.status(400).json({ error: err });
  }
}

async function getUsersBySearching(request, response) {
  try {
    const { search, pack } = request.query;

    const issearcherr = validateSearchingStrings(search);
    if (issearcherr) throw new Error("Invalid Search Query");
    const ispackerr = validatePackForDatabaseQueries(pack);
    if (ispackerr) throw new Error("Invalid Pack");

    const users = await db.findTenUsersWhereSearchIs(search, Number(pack));
    response.setHeader("Cache-Control", "public, max-age=60");
    response.status(200).json({ users: users });
  } catch (err) {
    response.status(400).json({ error: err?.message });
  }
}

async function getSingleProductInfo(request, response) {
  try {
    const { p_id } = request.query;
    const ispiderr = validateUserOrPId(p_id);
    if (ispiderr) throw new Error("Invalid ID");

    const product = await db.findProductById(Number(p_id));
    response.setHeader("Cache-Control", "public, max-age=60");
    response.status(200).json({ product: product });
  } catch (err) {
    response.status(400).json({ error: err?.message });
  }
}
async function getThreeSimilarProducts(request, response) {
  try {
    const { p_id, color } = request.query;
    const ispiderr = validateUserOrPId(p_id);
    if (ispiderr) throw new Error("Invalid ID");

    const iscolorerr = validateColor(color);
    if (iscolorerr) throw new Error("Invalid Color");

    const products = await db.getThreeProductsByColor(p_id, color);
    response.setHeader("Cache-Control", "public, max-age=180");
    response.status(200).json({ products: products });
  } catch (err) {
    response.status(400).json({ error: err?.message });
  }
}
async function getTenProductRatings(request, response) {
  try {
    const { p_id } = request.query;
    const ispiderr = validateUserOrPId(p_id);
    if (ispiderr) throw new Error("Invalid ID");

    const ratings = await db.getTenRatings(Number(p_id));
    response.setHeader("Cache-Control", "public, max-age=60");
    response.status(200).json({ ratings: ratings });
  } catch (err) {
    response.status(400).json({ error: err?.message });
  }
}

async function getAverageRatingsForProducts(request, response) {
  try {
    const { ids } = request.body;
    const areidserr = validateArrayOfIds(ids);
    if (areidserr) throw new Error("Invalid IDs");

    const ratings = await db.getAverageRatingsForProducts(ids);

    response.setHeader("Cache-Control", "public, max-age=180");
    response.status(200).json({ ratings: ratings });
  } catch (err) {
    response.status(400).json({ error: err?.message });
  }
}

async function getMyMessages(request, response) {
  try {
    const user_id = response.locals.id;

    const isuiderr = validateUserOrPId(user_id);
    if (isuiderr) throw new Error("Invalid ID");

    const count = stored.reduce((c, el) => {
      if (el?.receiver_id == user_id) {
        return c + 1;
      }
      return c;
    }, 0);
    response.status(200).json({ messages_count: count });
  } catch (err) {
    response.status(400).json({ error: err });
  }
}

async function handleLogin(request, response) {
  try {
    const { email, password } = request.body;
    const isemailerror = validateEmail(email);
    if (isemailerror) throw new Error("Invalid Email");
    const ispasserror = validatePassword(password);
    if (ispasserror) throw new Error("Invalid Password");

    const foundUser = await db.findUserWhereEmailAndNotGoogle(
      email.toLowerCase()
    );
    if (!foundUser) throw new Error("User does not exist");

    if (foundUser.type != "Default") {
      throw new Error(
        "The email related to this account belongs to an OAuth user."
      );
    }

    if (foundUser.password != HASH(password))
      throw new Error("Passwords does not match");

    const access_token = generateAccessToken({ id: foundUser.id });
    response.status(200).json({ token: access_token }).end();
  } catch (err) {
    response.status(400).json({ error: err?.message });
  }
}

const {
  validateEmail,
  validatePassword,
  clearMessages,
  validateArrayOfIds,
  validateColor,
  validateGoogleOAuthCode,
  validatePackForDatabaseQueries,
  validateSearchingStrings,
  validateUserOrPId,
} = require("./joi");


async function handleRegistrationFirstStep(request, response) {
  try {
    const { name, email, password } = request.body;
    const isnameerror = validateName(name);
    if (isnameerror) throw new Error("Invalid name or bad formatted");

    const isemailerror = validateEmail(email);
    if (isemailerror) throw new Error("Invalid email or bad formatted");

    const ispasserror = validatePassword(password);
    if (ispasserror)
      throw new Error(
        "Invalid Password. It must Contain at least Uppercase, Lowercase and Symbol."
      );

    const userData = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    };

    const foundUser = await db.findUserWhereEmailAndNotGoogle(
      email.toLowerCase()
    );
    if (foundUser)
      throw new Error("User associated with this email already exists");

    const foundEmail = await get(userData.email);
    if (foundEmail)
      throw new Error(
        "You have received an email in a recent time. wait 3 minutes for another one or verify the existing one"
      );

    const enc = encrypt(userData.email);
    userData.password = HASH(userData.password);

    // email: name, email, password, enc (encemail)
    await set(userData.email, JSON.stringify({ ...userData, enc }), 180);

    const message = `https://ggsrc.site/accountcreated.html?email=${userData.email}&email_code=${enc}`;

    const sent = await sendEmail(userData.email, message);
    if (!sent)
      throw new Error(
        "Unexpected error while Requesting From Email API. Try again later on."
      );

    response.status(200).end();
  } catch (err) {
    response.status(400).json({ error: err?.message });
  }
}

async function handleRegistrationSecondStep(request, response) {
  try {
    const { email_code, email } = request.query;

    const isemailerror = validateEmail(email);
    if (isemailerror) throw new Error("Invalid email or bad formatted");

    const found_user = await get(email);

    if (!found_user?.email)
      throw new Error(
        "Email is not on verification step, has been expired (3minutes) or has been activated."
      );

    const decrypted_email = decrypt(email_code);
    if (decrypted_email !== email)
      throw new Error("email does not match signature");

    await del(email);
    delete found_user.enc;

    found_user.user_image =
      "https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png";
    const inserted = await db.insertUser(found_user);
    if (!inserted) {
      await set(found_user.email, JSON.stringify(found_user), 60 * 3); // 3 Minutes
      throw new Error("error during insertion");
    }

    response.status(200).end();
  } catch (err) {
    console.log(err);
    response.status(400).json({ error: err.message });
  }
}



app.get("/auth/google/callback", async (req, res) => {
  try {
    const authCode = req.query.code;
    const isauthcodeerror = validateGoogleOAuthCode(authCode);
    if (isauthcodeerror) throw new Error("Invalid oAuth code.");

    const data = await oauth2Client.getToken(authCode);

    await oauth2Client.setCredentials({
      access_token: data.tokens.access_token,
    });
    const oauth2 = await google.oauth2({ version: "v2", auth: oauth2Client });

    // Fetch user information
    const res2 = await oauth2.userinfo.get(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    const found_user = await db.findUserByEmail(res2.data.email);

    if (!found_user) {
      const { name, email, picture } = res2.data;
      const inserted_id = await db.insertGoogleUser(name, email, picture);
      const access_token = generateAccessToken({ id: inserted_id, name: name });
      return res.status(200).json({ token: access_token }).end();
    } else {
      if (found_user.type == "Default") {
        return res.status(409).json({
          error:
            "An Account already exists with that email and is not associated with OAuth Google",
        });
      } else {
        const access_token = generateAccessToken({
          id: found_user.id,
          name: found_user.name,
        });
        return res.status(200).json({ token: access_token }).end();
      }
    }
  } catch (error) {
    res.status(404).json({ error: `Invalid google credentials ${error}` });
  }
});

server.listen(process.env.PORT || 443, () => {
  console.log("listening");
});


module.exports = {
  server,
};
