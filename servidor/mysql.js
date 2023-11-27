const mysql = require('mysql2/promise');

class Database {
  constructor() {
    this.connection = null;
    this.connect();
  }

  async connect() {
    try {
      this.connection = await mysql.createConnection({
        host: process.env.MYSQL_DATABASE_HOST,
        user: process.env.MYSQL_DATABASE_USER,
        password: process.env.MYSQL_DATABASE_PASSWORD,
        database: process.env.MYSQL_DATABASE_DATABASE,
      });
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection failed:', error.message);
      setTimeout(() => this.connect(), 4000);
    }
  }

  async query(sql, values) {
    if (!this.connection) {
      throw new Error('Database connection is not initialized');
    }

    try {
      const [rows, fields] = await this.connection.query(sql, values);
      return rows;
    } catch (error) {
      console.error('Database query failed:', error.message);
      // Handle the query error as needed
      throw error;
    }
  }

  async getTwentyProducts() {
    
    // const query = "SELECT * FROM products WHERE color = 'Green' LIMIT 20";
    const query = "SELECT * FROM products WHERE color = 'Green' LIMIT 20";
    try {
      const [rows, fields] = await this.connection.execute(query);
  
      if (rows.length === 0) {
        return null; // No user found with the given email
      }
      return rows; // Assuming email is unique
    } catch (error) {
      throw error;
    }
  }

  async getProductsOfUserId(id) {
    
    // const query = "SELECT * FROM products WHERE color = 'Green' LIMIT 20";
    const query = "SELECT * FROM products WHERE user_id = ?";
    try {
      const [rows, fields] = await this.connection.execute(query, [id]);
      return rows; // Assuming email is unique
    } catch (error) {
      throw error;
    }
  }


  async getTenRandomProducts() {
    const query = `SELECT * 
      FROM products
      ORDER BY RAND()
      LIMIT 10;
    `;
    try {
      const [rows, fields] = await this.connection.execute(query);
  
      if (rows.length === 0) {
        return null; // No user found with the given email
      }
      return rows; // Assuming email is unique
    } catch (error) {
      throw error;
    }
  }

  async getProductsByIndexesArray(productIds) {
    try{
      const sql = `SELECT * FROM products WHERE id IN (?)`;
      
      const placeholders = productIds.map(() => '?').join(', ');

// Concatenate the placeholders into the SQL query
const modifiedSql = sql.replace('?', placeholders);

      const [rows, fields] = await this.connection.execute(modifiedSql, productIds);
  
    return rows;
  } catch (error) {
    throw error;
  }
  }

  async getFilteredProducts(pf, pt, entrega, flex, val, color, search, pack) {

    let sql = "SELECT * FROM products WHERE 1=1"; // Start with a true condition
const params = [];

if (entrega) {
  console.log('tem entrega')
  sql += " AND delivery = ?";
  params.push(entrega);
}

if (pf) {
  sql += " AND total_price >= ?";
  params.push(pf);
}

if (pt) {
  sql += " AND total_price <= ?";
  params.push(pt);
}
if (flex) {
  sql += " AND flexible_sell = ?";
  params.push(flex);
}
if (val) {
  sql += " AND available_quantity >= ?";
  params.push(val);
}
if (color) {
  sql += " AND color = ?";
  params.push(color);
}
if (search) {
  let s = '%' + search + '%'
  sql += " AND LOWER(name) LIKE ?";
  params.push(s);
}
    try{
      const offset = (pack - 1) * 20;
      sql += " LIMIT 20 OFFSET ?";  
      params.push(offset)

      const [rows, fields] = await this.connection.execute(sql, params);
    
    return rows;
  } catch (error) {
    console.log(error)
      throw error;
  }
  }

  async updateUser(id, name, user_image) {
    console.log(id)
    console.log(name)
    console.log(user_image)

    let sql = 'UPDATE users SET';

    const vs = [];
    
    if (name) {
      sql += ' name = ?';
      vs.push(name)
    }
    if (user_image) {
      if (name) sql += ', '
      sql += ' user_image = ?'
      vs.push(user_image)
    }

    vs.push(id)

    sql += ' WHERE id = ?;';
    console.log(sql)
    try{

      const [rows, fields] = await this.connection.execute(sql, vs);
    
    return true;
  } catch (error) {
    console.log(error)
      throw error;
      return null;
  }
  }


    async findProductById(product_id) {
      try {
    
        const query = `
        SELECT
        p.id AS product_id,
        p.name AS product_name,
        p.description,
        p.color,
        p.url,
        p.url_2,
        p.url_3,
        p.url_4,
        p.url_5,
        p.url_6,
        p.url_7,
        p.total_price,
        p.available_quantity,
        p.flexible_sell,
        p.delivery,
        p.created_at,
        u.id AS user_id,
        u.name AS user_name,
        u.user_image,
        u.created_at
      FROM products p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?;
          `;

   
        


        const [rows, fields] = await this.connection.execute(query, [product_id]);

      return rows[0]
  } catch (error) {
    throw error;
  }
  }

  async getTenRatings(product_id) {
    const query = `
      SELECT
      r.user_id,
      r.rating,
      r.url,
      r.url_2,
      r.url_3,
      r.comment,
      u.name AS user_name,
      u.user_image
      FROM ratings r
      INNER JOIN users u ON r.user_id = u.id
      WHERE r.product_id = ?;
    `
    try {
      // const offset = (pack - 1) * 10;

      const [rows, fields] = await this.connection.execute(query, [product_id]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getUsersImagesByTheirIds(ids) {
    try{
      const sql = `SELECT id, user_image FROM users WHERE id IN (?)`;
      
      const placeholders = ids.map(() => '?').join(', ');


      const modifiedSql = sql.replace('?', placeholders);

      const [rows, fields] = await this.connection.execute(modifiedSql, ids);
      // const rows = await this.connection.execute(sql, productIds);
      console.log(rows)
    return rows;
  } catch (error) {
    throw error;
  }
  }

  async getUserPublicInfo(id) {
    const query = 'SELECT id, name, user_image FROM users WHERE id = ?;'
    try {
      const [rows, fields] = await this.connection.execute(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
  
  async deleteUserProduct(u_id, p_id) {
    const query = 'DELETE FROM products WHERE user_id = ? AND id = ?;'
    try {
      const [rows, fields] = await this.connection.execute(query, [u_id, p_id]);
      return true;
    } catch (error) {
      return null
      throw error;
    }
  }

  async findTenUsersWhereSearchIs(search, pack) {
    const query = 'SELECT id, name, user_image FROM users WHERE LOWER(name) LIKE ? LIMIT 20 OFFSET ?;'
    try {
      const offset = (pack - 1) * 20;

      const [rows, fields] = await this.connection.execute(query, [`%${search}%`, offset]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async findUserWhereEmailAndNotGoogle(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    try {
      const [rows, fields] = await this.connection.execute(query, [email]);
      return rows[0]; // Assuming email is unique
    } catch (error) {
      throw error;
    }
  }

  async getUserNameAndUrlById(id) {
    const query = 'SELECT name, user_image FROM users WHERE id = ?';
    try {
      const [rows, fields] = await this.connection.execute(query, [id]);
  
      if (rows.length === 0) {
        return null; // No user found with the given email
      }
  
      return rows[0]; // Assuming email is unique
    } catch (error) {
      throw error;
    }
  }
  async getUserPrivateInfo(id) {
    const query = 'SELECT name, user_image, email FROM users WHERE id = ?';
    try {
      const [rows, fields] = await this.connection.execute(query, [id]);
  
      if (rows.length === 0) {
        return null; // No user found with the given email
      }
  
      return rows[0]; // Assuming email is unique
    } catch (error) {
      throw error;
    }
  }

  


  async findUserWhereAndEmailAndPasswordMatchs(email,password) {
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    try {
      const [rows, fields] = await this.connection.execute(query, [email, password]);
  
      if (rows.length === 0) {
        return null; // No user found with the given email
      }
  
      return rows[0]; // Assuming email is unique
    } catch (error) {
      throw error;
    }
  }
  async insertUser(user) {
    const query = 'INSERT INTO users ( name, email, password, user_image ) VALUES (?,?,?, ?)';
    const values = [  user.name, user.email, user.password, user.user_image];

    try {
      const result = await this.connection.execute(query, values);
      console.log(result)
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }

  async insertUserIfDoNotExist(user) {
    const query = 'INSERT INTO users ( name, email, password, cep, rua, bairro, uf, cidade ) VALUES (?,?,?,?,?,?,?,?)';
    const values = [  user.name, user.email, user.password, user.cep, user.rua, user.bairro, user.uf, user.cidade];

    try {
      const result = await this.connection.execute(query, values);
      console.log(result)
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }

  async insertGoogleUser(name, email, picture) {
    const query = 'INSERT INTO users (name, email, user_image, type) VALUES (?,?,?,?)';
    const values = [  name, email, picture, 'google'];
    console.log(values)
    try {
      const [result] = await this.connection.execute(query, values);
      return result.insertId;
    } catch (error) {
      throw error;
      return false;
    }
  }

  async findUserByEmail(email) {
    console.log(email)
    const query = "SELECT * FROM users WHERE email = ?";

    try {
      const [rows, fields] = await this.connection.execute(query, [email]);
      console.log(rows)
      return rows[0];
    } catch (error) {
      throw error;
      return null;
    }
  }

  // const productData = {
  //   user_id: 1, // Replace with the actual user ID
  //   name: 'Product Name',
  //   description: 'Product Description',
  //   category_id: 2, // Replace with the actual category ID
  // };

  async insertRating(user_id, product_id, rating, comment) {
    try {
      const q = "INSERT INTO ratings (user_id, product_id, rating, comment) VALUES (?,?,?,?);"
      const [rows, fields] = await this.connection.execute(q, [user_id, product_id, rating, comment]);
      return true;
    } catch (error) {
      console.error(error.message);
      throw error;
      return null;
    }
  }

  async findProductsFromUser(user_id) {
    try {
      const q = "SELECT id from products where user_id = ?"
      const [rows, fields] = await this.connection.execute(q, [user_id]);
      return rows.length;
    } catch (error) {
      console.error(error.message);
      throw error;
      return null;
    }
  }

  async insertProduct(productData) {
  

    try {
      await this.connection.beginTransaction(); // Start a transaction

      const [result] = await this.connection.execute(
        'INSERT INTO products (user_id, name, description, color, taste, url, url_2, url_3, url_4, url_5, url_6, url_7, total_price, available_quantity, flexible_sell, delivery, boost, size) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [productData.user_id, productData.name, productData.description, productData.color, productData.taste,
          productData.url_names[0],
          productData.url_names[1] || '',
          productData.url_names[2] || '',
          productData.url_names[3] || '',
          productData.url_names[4] || '',
          productData.url_names[5] || '',
          productData.url_names[6] || '',
          productData.total_price,
          productData.available_quantity,
          productData.flexible_sell,
          productData.delivery,
          productData.boost,
          productData.size,
          
        ]
      );
  
      const productId = result.insertId; // Get the ID of the newly inserted product

  
      await this.connection.commit(); // Commit the transaction
      console.log('Product inserted successfully with ID:', productId);
      return true;
    } catch (error) {
      await this.connection.rollback(); // Rollback the transaction in case of an error
      console.error('Error inserting product:', error);
      return null;
    } finally {
      return true;
    }
  }



  async getAverageRatingsForProducts(productIds) {
    try {
      const placeholders = productIds.map(() => '?').join(',');
      const q = `SELECT product_id, COUNT(rating) AS count, AVG(rating) AS average FROM ratings WHERE product_id IN (${placeholders}) GROUP BY product_id`
      const [rows, fields] = await this.connection.execute(q, productIds);
      return rows;
    } catch (error) {
      console.error('Error getting average ratings:', error.message);
      throw error;
    }
  }

  async getThreeProductsByColor(id, color) {
    const query = "SELECT * FROM products WHERE color = ? AND id != ? LIMIT 3";
    try {
      const [rows, fields] = await this.connection.execute(query, [color, id]);
      return rows;
    } catch (err) {
      throw err;
    }
  }


  async getRecommended(id) {
    const query = "SELECT recommended FROM users WHERE id = ?";
    try {
      const [rows, fields] = await this.connection.execute(query, [id]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
   
  
  // MODEL
  async getTwentyUsers() {
    
    const query = "SELECT * FROM users WHERE email = 'guilhermegavioli.xp@gmail.com' OR email = 'xiiguilhermeiix@gmail.com' LIMIT 20";
    try {
      const [rows, fields] = await this.connection?.execute(query);
  
      if (rows.length === 0) {
        return null; // No user found with the given email
      }
      return rows; // Assuming email is unique
    } catch (error) {
      console.log(error)
    }
  }

  async getAllProducts() {
    
    const query = "SELECT id, color, taste FROM products";
    try {
      const [rows, fields] = await this.connection.execute(query);
  
      if (rows.length === 0) {
        return null; // No user found with the given email
      }
      return rows; // Assuming email is unique
    } catch (error) {
      throw error;
    }
  }

  async getUserLikedProducts(like_array) { // SAME AS GET PRODUCTS BY INDEX ARRAY
    
    const query = `SELECT * FROM products WHERE id IN (?)`;
    
    const placeholders = productIds.map(() => '?').join(', ');
    
    // Concatenate the placeholders into the SQL query
    const modifiedSql = sql.replace('?', placeholders);
    
    try {
      const [rows, fields] = await this.connection.execute(modifiedSql, like_array);
      
      if (rows.length === 0) {
        return null; // No user found with the given email
      }
      return rows; // Assuming email is unique
    } catch (error) {
      throw error;
    }
  }
  
  async getSingleRandomProductForTest() { 
    const query = `SELECT * FROM products
    ORDER BY RAND()
    LIMIT 1;`
    const [rows, fields] = await this.connection.execute(query);
    return rows[0];
  }

  async storeUsersRecommendation(id, recommendation) {
    try { 
      const query = `UPDATE users SET recommended = ? WHERE id = ?;`
      const [rows, fields] = await this.connection.execute(query, [recommendation, id]);
      return true
    } catch (err) {
      console.log(err)
      return false;
    }
  }
  
  
}

const db = new Database();
module.exports = db;


