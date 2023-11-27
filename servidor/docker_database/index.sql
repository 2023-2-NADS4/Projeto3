
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    cep VARCHAR(255),
    rua VARCHAR(255),
    bairro VARCHAR(255),
    uf CHAR(2),
    cidade VARCHAR(255),
    user_image VARCHAR(255),
    numero INT,
    type VARCHAR(15) NOT NULL DEFAULT 'Default',
    recommended VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE colors (
    name VARCHAR(20) PRIMARY KEY
);

INSERT INTO colors (name) VALUES ("Red");
INSERT INTO colors (name) VALUES ("Orange");
INSERT INTO colors (name) VALUES ("Yellow");
INSERT INTO colors (name) VALUES ("Green");
INSERT INTO colors (name) VALUES ("Blue");
INSERT INTO colors (name) VALUES ("Purple");
INSERT INTO colors (name) VALUES ("Pink");
INSERT INTO colors (name) VALUES ("Brown");
INSERT INTO colors (name) VALUES ("White");
INSERT INTO colors (name) VALUES ("Black");


CREATE TABLE tastes (
    name VARCHAR(20) PRIMARY KEY
);

INSERT INTO tastes (name) VALUES ("Sweety");
INSERT INTO tastes (name) VALUES ("Citric");
INSERT INTO tastes (name) VALUES ("Soury"); /*azedo*/
INSERT INTO tastes (name) VALUES ("Savory"); /*salgado*/
INSERT INTO tastes (name) VALUES ("Bitter"); /*amargo*/
INSERT INTO tastes (name) VALUES ("Spicy");
INSERT INTO tastes (name) VALUES ("Earthy");
INSERT INTO tastes (name) VALUES ("Grassy/Leafy");
INSERT INTO tastes (name) VALUES ("Nutty");



CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(400) NOT NULL,
    color VARCHAR(20) NOT NULL,
    taste VARCHAR(20) NOT NULL,
    url VARCHAR(255) NOT NULL,
    url_2 VARCHAR(255),
    url_3 VARCHAR(255),
    url_4 VARCHAR(255),
    url_5 VARCHAR(255),
    url_6 VARCHAR(255),
    url_7 VARCHAR(255),
    total_price DECIMAL(10, 2) NOT NULL,
    available_quantity DECIMAL(10, 2) NOT NULL,
    flexible_sell BIT NOT NULL, -- 0 or -- 1
    delivery BIT NOT NULL,
    boost BIT NOT NULL,
    size CHAR(1) NOT NULL, -- s -small  m - medium b - big  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (color) REFERENCES colors(name),
    FOREIGN KEY (taste) REFERENCES tastes(name)
);

CREATE INDEX idx_product_user ON products(user_id);


CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    rating INT NOT NULL,
    url VARCHAR(255),
    url_2 VARCHAR(255),
    url_3 VARCHAR(255),
    comment VARCHAR(255), -- Optional: If you want to allow users to leave comments with their ratings
    UNIQUE KEY unique_rating (user_id, product_id), -- Ensure one rating per product per user
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);




INSERT INTO users(
    name,
    email,
    password,
    cep,
    rua,
    bairro,
    uf,
    cidade,
    user_image
) VALUES (
    "Thiago Almeida",
    "agricultor@gmail.com",
    "Admin12345#",
    "000-00000",
    "Washington Street",
    "Washington St.",
    "NY",
    "New York",
    "https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png"
);

-- Query 1
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Emily Johnson', 'emily.johnson@email.com', 'hashed_password_here', '12345-6789', '123 Main St', 'Downtown', 'CA', 'Los Angeles', 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600');

-- Query 2
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Daniel White', 'daniel.white@email.com', 'hashed_password_here', '54321-9876', '456 Oak Ave', 'Suburbia', 'NY', 'New York', 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600');

-- Query 3
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Sophia Martinez', 'sophia.martinez@email.com', 'hashed_password_here', '98765-4321', '789 Elm St', 'Uptown', 'TX', 'Dallas', 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=600');

-- Query 4
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Jackson Taylor', 'jackson.taylor@email.com', 'hashed_password_here', '12345-6789', '123 Maple St', 'Suburbia', 'CA', 'Los Angeles', 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600');

-- Query 5
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Grace Brown', 'grace.brown@email.com', 'hashed_password_here', '54321-9876', '456 Pine Ave', 'Downtown', 'NY', 'New York', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 6
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Caleb Anderson', 'caleb.anderson@email.com', 'hashed_password_here', '98765-4321', '789 Cedar St', 'Uptown', 'TX', 'Dallas', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 7
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Natalie Wilson', 'natalie.wilson@email.com', 'hashed_password_here', '12345-6789', '123 Oak St', 'Downtown', 'CA', 'Los Angeles', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 8
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Owen Davis', 'owen.davis@email.com', 'hashed_password_here', '54321-9876', '456 Birch St', 'Suburbia', 'NY', 'New York', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 9
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Lily Thomas', 'lily.thomas@email.com', 'hashed_password_here', '98765-4321', '789 Redwood St', 'Uptown', 'TX', 'Dallas', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 10
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('William Harris', 'william.harris@email.com', 'hashed_password_here', '12345-6789', '123 Pine St', 'Downtown', 'CA', 'Los Angeles', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 11
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Zoey Miller', 'zoey.miller@email.com', 'hashed_password_here', '54321-9876', '456 Cedar St', 'Suburbia', 'NY', 'New York', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 12
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Henry Lewis', 'henry.lewis@email.com', 'hashed_password_here', '98765-4321', '789 Oak St', 'Uptown', 'TX', 'Dallas', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 13
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Olivia Moore', 'olivia.moore@email.com', 'hashed_password_here', '12345-6789', '123 Elm St', 'Downtown', 'CA', 'Los Angeles', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 14
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Ethan Parker', 'ethan.parker@email.com', 'hashed_password_here', '54321-9876', '456 Maple St', 'Suburbia', 'NY', 'New York', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 15
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Isabella Turner', 'isabella.turner@email.com', 'hashed_password_here', '98765-4321', '789 Oak Ave', 'Uptown', 'TX', 'Dallas', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 16
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Samuel Adams', 'samuel.adams@email.com', 'hashed_password_here', '12345-6789', '123 Cedar St', 'Downtown', 'CA', 'Los Angeles', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 17
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Ava Scott', 'ava.scott@email.com', 'hashed_password_here', '54321-9876', '456 Redwood St', 'Suburbia', 'NY', 'New York', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 18
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Benjamin Clark', 'benjamin.clark@email.com', 'hashed_password_here', '98765-4321', '789 Pine St', 'Uptown', 'TX', 'Dallas', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 19
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Ella Mitchell', 'ella.mitchell@email.com', 'hashed_password_here', '12345-6789', '123 Redwood Ave', 'Downtown', 'CA', 'Los Angeles', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 20
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Noah Wright', 'noah.wright@email.com', 'hashed_password_here', '54321-9876', '456 Birch Ave', 'Suburbia', 'NY', 'New York', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 21
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Sophie King', 'sophie.king@email.com', 'hashed_password_here', '12345-6789', '123 Oak Ave', 'Downtown', 'CA', 'Los Angeles', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 22
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Michael Green', 'michael.green@email.com', 'hashed_password_here', '54321-9876', '456 Elm Ave', 'Suburbia', 'NY', 'New York', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 23
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Emma Anderson', 'emma.anderson@email.com', 'hashed_password_here', '98765-4321', '789 Maple Ave', 'Uptown', 'TX', 'Dallas', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 24
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Liam Baker', 'liam.baker@email.com', 'hashed_password_here', '12345-6789', '123 Cedar Ave', 'Downtown', 'CA', 'Los Angeles', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 25
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Avery Roberts', 'avery.roberts@email.com', 'hashed_password_here', '54321-9876', '456 Oak St', 'Suburbia', 'NY', 'New York', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 26
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Noah Wright', 'noah.wright@email.com', 'hashed_password_here', '98765-4321', '789 Pine Ave', 'Uptown', 'TX', 'Dallas', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 27
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Olivia Johnson', 'olivia.johnson@email.com', 'hashed_password_here', '12345-6789', '123 Birch Ave', 'Downtown', 'CA', 'Los Angeles', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 28
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Ethan Martin', 'ethan.martin@email.com', 'hashed_password_here', '54321-9876', '456 Elm St', 'Suburbia', 'NY', 'New York', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 29
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Mia Clark', 'mia.clark@email.com', 'hashed_password_here', '98765-4321', '789 Cedar Ave', 'Uptown', 'TX', 'Dallas', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 30
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Lucas Hall', 'lucas.hall@email.com', 'hashed_password_here', '12345-6789', '123 Pine Ave', 'Downtown', 'CA', 'Los Angeles', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 31
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Ava Turner', 'ava.turner@email.com', 'hashed_password_here', '54321-9876', '456 Oak Ave', 'Suburbia', 'NY', 'New York', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 32
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('James Lee', 'james.lee@email.com', 'hashed_password_here', '98765-4321', '789 Maple St', 'Uptown', 'TX', 'Dallas', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 33
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Charlotte Baker', 'charlotte.baker@email.com', 'hashed_password_here', '12345-6789', '123 Redwood Ave', 'Downtown', 'CA', 'Los Angeles', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 34
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('William Davis', 'william.davis@email.com', 'hashed_password_here', '54321-9876', '456 Cedar St', 'Suburbia', 'NY', 'New York', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 35
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Grace Evans', 'grace.evans@email.com', 'hashed_password_here', '98765-4321', '789 Redwood St', 'Uptown', 'TX', 'Dallas', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 36
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Benjamin Foster', 'benjamin.foster@email.com', 'hashed_password_here', '12345-6789', '123 Elm Ave', 'Downtown', 'CA', 'Los Angeles', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 37
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Sophia Wood', 'sophia.wood@email.com', 'hashed_password_here', '54321-9876', '456 Pine St', 'Suburbia', 'NY', 'New York', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 38
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Liam Adams', 'liam.adams@email.com', 'hashed_password_here', '98765-4321', '789 Birch Ave', 'Uptown', 'TX', 'Dallas', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 39
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Ella Scott', 'ella.scott@email.com', 'hashed_password_here', '12345-6789', '123 Oak St', 'Downtown', 'CA', 'Los Angeles', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');

-- Query 40
INSERT INTO users (name, email, password, cep, rua, bairro, uf, cidade, user_image) 
VALUES ('Ethan Mitchell', 'ethan.mitchell@email.com', 'hashed_password_here', '54321-9876', '456 Maple Ave', 'Suburbia', 'NY', 'New York', 'https://product-images-bucket-54612498459.s3.sa-east-1.amazonaws.com/cow.png');







INSERT INTO ratings (user_id, product_id, rating, url, comment) 
VALUES (1, 1, 5,'https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg?auto=compress&cs=tinysrgb&w=600', 'This product is great!');

INSERT INTO ratings (user_id, product_id, rating, comment) 
VALUES (2, 1, 5, 'This product is great!');
INSERT INTO ratings (user_id, product_id, rating, comment) 
VALUES (3, 1, 5, 'This product is great!');
INSERT INTO ratings (user_id, product_id, rating, comment) 
VALUES (4, 1, 5, 'This product is great!');
INSERT INTO ratings (user_id, product_id, rating, comment) 
VALUES (5, 1, 5, 'This product is great!');
INSERT INTO ratings (user_id, product_id, rating, comment) 
VALUES (6, 1, 5, 'This product is great!');
INSERT INTO ratings (user_id, product_id, rating, comment) 
VALUES (7, 1, 5, 'This product is great!');
INSERT INTO ratings (user_id, product_id, rating, comment) 
VALUES (8, 1, 5, 'This product is great!');
INSERT INTO ratings (user_id, product_id, rating, comment) 
VALUES (9, 1, 5, 'This product is great!');


INSERT INTO ratings (user_id, product_id, rating, comment) 
VALUES (2, 1, 5, 'This product is great!');
INSERT INTO ratings (user_id, product_id, rating, comment) 
VALUES (3, 1, 5, 'This product is great!');
INSERT INTO ratings (user_id, product_id, rating, comment) 
VALUES (4, 1, 5, 'This product is great!');
INSERT INTO ratings (user_id, product_id, rating, comment) 
VALUES (5, 1, 5, 'This is a Fake Review!');






INSERT INTO products(
    user_id,
    name,
    description,
    color,
    taste,
    url,
    url_2,
    url_3,
    url_4,
    url_5,
    url_6,
    url_7,
    total_price,
    available_quantity,
    flexible_sell,
    delivery,
    size,
    boost
) VALUES(
    1,
    "Brocolis",
    "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.",
    "Green",
    "Savory",
    "https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg?auto=compress&cs=tinysrgb&w=600",
    7500,
    500,
    1,
    0,
    "M",
    0
);


-- gpt
INSERT INTO products(user_id,name,description,color,taste,url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES(1,"Oranges","Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.","Orange","Citric","https://images.pexels.com/photos/1937743/pexels-photo-1937743.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"M",
"https://images.pexels.com/photos/1937743/pexels-photo-1937743.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1937743/pexels-photo-1937743.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1937743/pexels-photo-1937743.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1937743/pexels-photo-1937743.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1937743/pexels-photo-1937743.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1937743/pexels-photo-1937743.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Apples", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Red", "Sweety", "https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"M",
"https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Bananas", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Yellow", "Sweety", "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"M",
"https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Carrots", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Orange", "Earthy", "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"M",
"https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Spinach", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Green", "Grassy/Leafy", "https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/05/spinach-1296x728-header.jpg?w=1155&h=1528",7500,500,1,0,0,"M",
"https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/05/spinach-1296x728-header.jpg?w=1155&h=1528",
"https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/05/spinach-1296x728-header.jpg?w=1155&h=1528",
"https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/05/spinach-1296x728-header.jpg?w=1155&h=1528",
"https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/05/spinach-1296x728-header.jpg?w=1155&h=1528",
"https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/05/spinach-1296x728-header.jpg?w=1155&h=1528",
"https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/05/spinach-1296x728-header.jpg?w=1155&h=1528"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Blueberries", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Blue", "Sweety", "https://images.pexels.com/photos/131054/pexels-photo-131054.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"S",
"https://images.pexels.com/photos/131054/pexels-photo-131054.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/131054/pexels-photo-131054.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/131054/pexels-photo-131054.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/131054/pexels-photo-131054.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/131054/pexels-photo-131054.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/131054/pexels-photo-131054.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Grapes", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Purple", "Sweety", "https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"S",
"https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Cherries", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Red", "Sweety", "https://images.pexels.com/photos/966416/pexels-photo-966416.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"S",
"https://images.pexels.com/photos/966416/pexels-photo-966416.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/966416/pexels-photo-966416.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/966416/pexels-photo-966416.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/966416/pexels-photo-966416.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/966416/pexels-photo-966416.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/966416/pexels-photo-966416.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Lemons", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Yellow", "Citric", "https://images.pexels.com/photos/1414122/pexels-photo-1414122.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"S",
"https://images.pexels.com/photos/1414122/pexels-photo-1414122.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1414122/pexels-photo-1414122.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1414122/pexels-photo-1414122.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1414122/pexels-photo-1414122.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1414122/pexels-photo-1414122.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1414122/pexels-photo-1414122.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Cucumbers", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Green", "Savory", "https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"M",
"https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Eggplants", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Purple", "Savory", "https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"M",
"https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg?auto=compress&cs=tinysrgb&w=600"
);



-- TEN MORE



INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Strawberries", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Red", "Sweety", "https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"S",
"https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Pineapples", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Yellow", "Sweety", "https://images.pexels.com/photos/2469772/pexels-photo-2469772.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"B",
"https://images.pexels.com/photos/2469772/pexels-photo-2469772.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/2469772/pexels-photo-2469772.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/2469772/pexels-photo-2469772.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/2469772/pexels-photo-2469772.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/2469772/pexels-photo-2469772.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/2469772/pexels-photo-2469772.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Broccoli", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Green", "Nutty", "https://images.pexels.com/photos/161514/brocoli-vegetables-salad-green-161514.jpeg?auto=compress&cs=tinysrgb&w=600",5000,,
"https://images.pexels.com/photos/161514/brocoli-vegetables-salad-green-161514.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/161514/brocoli-vegetables-salad-green-161514.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/161514/brocoli-vegetables-salad-green-161514.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/161514/brocoli-vegetables-salad-green-161514.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/161514/brocoli-vegetables-salad-green-161514.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/161514/brocoli-vegetables-salad-green-161514.jpeg?auto=compress&cs=tinysrgb&w=600"
450,1,0,0,"M");

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Couve", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Green", "Earthy", "https://images.pexels.com/photos/51372/kale-vegetables-brassica-oleracea-var-sabellica-l-51372.jpeg?auto=compress&cs=tinysrgb&w=600",4000,200,1,0,0,"M"
"https://images.pexels.com/photos/51372/kale-vegetables-brassica-oleracea-var-sabellica-l-51372.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/51372/kale-vegetables-brassica-oleracea-var-sabellica-l-51372.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/51372/kale-vegetables-brassica-oleracea-var-sabellica-l-51372.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/51372/kale-vegetables-brassica-oleracea-var-sabellica-l-51372.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/51372/kale-vegetables-brassica-oleracea-var-sabellica-l-51372.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/51372/kale-vegetables-brassica-oleracea-var-sabellica-l-51372.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Raspberries", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Red", "Sweety", "https://images.pexels.com/photos/52536/raspberry-fruits-fresh-red-52536.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"S",
"https://images.pexels.com/photos/52536/raspberry-fruits-fresh-red-52536.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/52536/raspberry-fruits-fresh-red-52536.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/52536/raspberry-fruits-fresh-red-52536.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/52536/raspberry-fruits-fresh-red-52536.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/52536/raspberry-fruits-fresh-red-52536.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/52536/raspberry-fruits-fresh-red-52536.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Mangoes", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Orange", "Sweety", "https://images.pexels.com/photos/39303/mango-tropical-fruit-juicy-sweet-39303.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"M",
"https://images.pexels.com/photos/39303/mango-tropical-fruit-juicy-sweet-39303.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/39303/mango-tropical-fruit-juicy-sweet-39303.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/39303/mango-tropical-fruit-juicy-sweet-39303.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/39303/mango-tropical-fruit-juicy-sweet-39303.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/39303/mango-tropical-fruit-juicy-sweet-39303.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/39303/mango-tropical-fruit-juicy-sweet-39303.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Asparagus", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Green", "Earthy", "https://images.pexels.com/photos/351679/pexels-photo-351679.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"M",
"https://images.pexels.com/photos/351679/pexels-photo-351679.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/351679/pexels-photo-351679.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/351679/pexels-photo-351679.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/351679/pexels-photo-351679.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/351679/pexels-photo-351679.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/351679/pexels-photo-351679.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Asparagus", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Green", "Grassy/Leafy", "https://images.pexels.com/photos/42165/pexels-photo-42165.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"M",
"https://images.pexels.com/photos/42165/pexels-photo-42165.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/42165/pexels-photo-42165.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/42165/pexels-photo-42165.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/42165/pexels-photo-42165.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/42165/pexels-photo-42165.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/42165/pexels-photo-42165.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Pessego", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Orange", "Sweety", "https://images.pexels.com/photos/1268122/pexels-photo-1268122.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"S",
"https://images.pexels.com/photos/1268122/pexels-photo-1268122.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1268122/pexels-photo-1268122.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1268122/pexels-photo-1268122.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1268122/pexels-photo-1268122.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1268122/pexels-photo-1268122.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1268122/pexels-photo-1268122.jpeg?auto=compress&cs=tinysrgb&w=600"
);
INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Pessegos", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Orange", "Sweety", "https://images.pexels.com/photos/2253534/pexels-photo-2253534.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"S",
"https://images.pexels.com/photos/2253534/pexels-photo-2253534.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/2253534/pexels-photo-2253534.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/2253534/pexels-photo-2253534.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/2253534/pexels-photo-2253534.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/2253534/pexels-photo-2253534.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/2253534/pexels-photo-2253534.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Blackberries", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Black", "Sweety", "https://images.pexels.com/photos/892808/pexels-photo-892808.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"S",
"https://images.pexels.com/photos/892808/pexels-photo-892808.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/892808/pexels-photo-892808.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/892808/pexels-photo-892808.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/892808/pexels-photo-892808.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/892808/pexels-photo-892808.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/892808/pexels-photo-892808.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Abobrinha", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Green", "Savory", "https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"B",
"https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg?auto=compress&cs=tinysrgb&w=600"
);



-- TEN MORE



INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Toranja", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Pink", "Citric", "https://images.pexels.com/photos/209549/pexels-photo-209549.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"M",
"https://images.pexels.com/photos/209549/pexels-photo-209549.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/209549/pexels-photo-209549.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/209549/pexels-photo-209549.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/209549/pexels-photo-209549.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/209549/pexels-photo-209549.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/209549/pexels-photo-209549.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Pera", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Green", "Sweety", "https://images.pexels.com/photos/568471/pexels-photo-568471.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"S",
"https://images.pexels.com/photos/568471/pexels-photo-568471.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/568471/pexels-photo-568471.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/568471/pexels-photo-568471.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/568471/pexels-photo-568471.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/568471/pexels-photo-568471.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/568471/pexels-photo-568471.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Cantaloupes", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Orange", "Sweety", "https://images.pexels.com/photos/1327734/pexels-photo-1327734.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"B",
"https://images.pexels.com/photos/1327734/pexels-photo-1327734.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1327734/pexels-photo-1327734.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1327734/pexels-photo-1327734.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1327734/pexels-photo-1327734.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1327734/pexels-photo-1327734.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1327734/pexels-photo-1327734.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Alcachofra", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Green", "Savory", "https://images.pexels.com/photos/5273463/pexels-photo-5273463.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"M",
"https://images.pexels.com/photos/5273463/pexels-photo-5273463.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/5273463/pexels-photo-5273463.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/5273463/pexels-photo-5273463.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/5273463/pexels-photo-5273463.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/5273463/pexels-photo-5273463.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/5273463/pexels-photo-5273463.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Kiwi", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Green", "Citric", "https://images.pexels.com/photos/867349/pexels-photo-867349.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"S",
"https://images.pexels.com/photos/867349/pexels-photo-867349.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/867349/pexels-photo-867349.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/867349/pexels-photo-867349.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/867349/pexels-photo-867349.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/867349/pexels-photo-867349.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/867349/pexels-photo-867349.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Cauliflower", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "White", "Earthy", "https://images.pexels.com/photos/6316515/pexels-photo-6316515.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"M",
"https://images.pexels.com/photos/6316515/pexels-photo-6316515.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/6316515/pexels-photo-6316515.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/6316515/pexels-photo-6316515.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/6316515/pexels-photo-6316515.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/6316515/pexels-photo-6316515.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/6316515/pexels-photo-6316515.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Roma", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Red", "Sweety", "https://images.pexels.com/photos/65256/pomegranate-open-cores-fruit-fruit-logistica-65256.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"S",
"https://images.pexels.com/photos/65256/pomegranate-open-cores-fruit-fruit-logistica-65256.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/65256/pomegranate-open-cores-fruit-fruit-logistica-65256.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/65256/pomegranate-open-cores-fruit-fruit-logistica-65256.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/65256/pomegranate-open-cores-fruit-fruit-logistica-65256.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/65256/pomegranate-open-cores-fruit-fruit-logistica-65256.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/65256/pomegranate-open-cores-fruit-fruit-logistica-65256.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Brussels Sprouts", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Green", "Earthy", "https://images.pexels.com/photos/41171/brussels-sprouts-sprouts-cabbage-grocery-41171.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"S",
"https://images.pexels.com/photos/41171/brussels-sprouts-sprouts-cabbage-grocery-41171.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/41171/brussels-sprouts-sprouts-cabbage-grocery-41171.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/41171/brussels-sprouts-sprouts-cabbage-grocery-41171.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/41171/brussels-sprouts-sprouts-cabbage-grocery-41171.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/41171/brussels-sprouts-sprouts-cabbage-grocery-41171.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/41171/brussels-sprouts-sprouts-cabbage-grocery-41171.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Ameixa", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Purple", "Sweety", "https://images.pexels.com/photos/248440/pexels-photo-248440.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"S",
"ttps://images.pexels.com/photos/248440/pexels-photo-248440.jpeg?auto=compress&cs=tinysrgb&w=600",
"ttps://images.pexels.com/photos/248440/pexels-photo-248440.jpeg?auto=compress&cs=tinysrgb&w=600",
"ttps://images.pexels.com/photos/248440/pexels-photo-248440.jpeg?auto=compress&cs=tinysrgb&w=600",
"ttps://images.pexels.com/photos/248440/pexels-photo-248440.jpeg?auto=compress&cs=tinysrgb&w=600",
"ttps://images.pexels.com/photos/248440/pexels-photo-248440.jpeg?auto=compress&cs=tinysrgb&w=600",
"ttps://images.pexels.com/photos/248440/pexels-photo-248440.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Repolho", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Green", "Earthy", "https://images.pexels.com/photos/2518893/pexels-photo-2518893.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"B",
"https://images.pexels.com/photos/2518893/pexels-photo-2518893.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/2518893/pexels-photo-2518893.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/2518893/pexels-photo-2518893.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/2518893/pexels-photo-2518893.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/2518893/pexels-photo-2518893.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/2518893/pexels-photo-2518893.jpeg?auto=compress&cs=tinysrgb&w=600"
);



-- TEN MORE



INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Mushrooms", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "White", "Earthy", "https://images.pexels.com/photos/36438/mushrooms-brown-mushrooms-cook-eat.jpg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"S",
"https://images.pexels.com/photos/36438/mushrooms-brown-mushrooms-cook-eat.jpg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/36438/mushrooms-brown-mushrooms-cook-eat.jpg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/36438/mushrooms-brown-mushrooms-cook-eat.jpg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/36438/mushrooms-brown-mushrooms-cook-eat.jpg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/36438/mushrooms-brown-mushrooms-cook-eat.jpg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/36438/mushrooms-brown-mushrooms-cook-eat.jpg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Avocados", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Green", "Savory", "https://images.pexels.com/photos/142890/pexels-photo-142890.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"B",
"https://images.pexels.com/photos/142890/pexels-photo-142890.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/142890/pexels-photo-142890.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/142890/pexels-photo-142890.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/142890/pexels-photo-142890.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/142890/pexels-photo-142890.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/142890/pexels-photo-142890.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Watermelons", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Green", "Sweety", "https://images.pexels.com/photos/1398655/pexels-photo-1398655.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"B",
"https://images.pexels.com/photos/1398655/pexels-photo-1398655.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1398655/pexels-photo-1398655.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1398655/pexels-photo-1398655.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1398655/pexels-photo-1398655.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1398655/pexels-photo-1398655.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1398655/pexels-photo-1398655.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Batata Doce", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Orange", "Sweety", "https://images.pexels.com/photos/4110466/pexels-photo-4110466.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"M",
"https://images.pexels.com/photos/4110466/pexels-photo-4110466.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/4110466/pexels-photo-4110466.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/4110466/pexels-photo-4110466.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/4110466/pexels-photo-4110466.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/4110466/pexels-photo-4110466.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/4110466/pexels-photo-4110466.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Alface", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Green", "Grassy/Leafy", "https://images.pexels.com/photos/1352199/pexels-photo-1352199.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"B",
"https://images.pexels.com/photos/1352199/pexels-photo-1352199.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1352199/pexels-photo-1352199.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1352199/pexels-photo-1352199.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1352199/pexels-photo-1352199.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1352199/pexels-photo-1352199.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1352199/pexels-photo-1352199.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Tomate", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Red", "Savory", "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"M",
"https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Rabanete", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Red", "Savory", "https://images.pexels.com/photos/4198042/pexels-photo-4198042.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"M",
"https://images.pexels.com/photos/4198042/pexels-photo-4198042.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/4198042/pexels-photo-4198042.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/4198042/pexels-photo-4198042.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/4198042/pexels-photo-4198042.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/4198042/pexels-photo-4198042.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/4198042/pexels-photo-4198042.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Cranberries", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Red", "Soury", "https://images.pexels.com/photos/1122868/pexels-photo-1122868.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"S",
"https://images.pexels.com/photos/1122868/pexels-photo-1122868.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1122868/pexels-photo-1122868.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1122868/pexels-photo-1122868.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1122868/pexels-photo-1122868.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1122868/pexels-photo-1122868.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1122868/pexels-photo-1122868.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Mexerica", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Orange", "Citric", "https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"M",
"https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg?auto=compress&cs=tinysrgb&w=600"
);

INSERT INTO products(user_id, name, description, color, taste, url,total_price,available_quantity,flexible_sell,delivery,boost,size,
url_2, url_3, url_4, url_5, url_6, url_7
) VALUES (1, "Milho", "Pure organic goodness for your well-being. Embrace a healthier and more sustainable lifestyle while indulging in the natural goodness of our product.", "Yellow", "Sweety", "https://images.pexels.com/photos/1459331/pexels-photo-1459331.jpeg?auto=compress&cs=tinysrgb&w=600",7500,500,1,0,0,"M",
"https://images.pexels.com/photos/1459331/pexels-photo-1459331.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1459331/pexels-photo-1459331.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1459331/pexels-photo-1459331.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1459331/pexels-photo-1459331.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1459331/pexels-photo-1459331.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1459331/pexels-photo-1459331.jpeg?auto=compress&cs=tinysrgb&w=600"
);


