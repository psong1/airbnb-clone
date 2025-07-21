DROP DATABASE IF EXISTS airbnb_db;

CREATE DATABASE airbnb_db;
USE airbnb_db;

-- Create the listing table first!
CREATE TABLE listing (
  id INT AUTO_INCREMENT PRIMARY KEY,
  host_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  address VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  price_per_night DECIMAL(10,2)
);

-- Now create the images table
CREATE TABLE images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT NOT NULL,
  url VARCHAR(255) NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES listing(id) ON DELETE CASCADE
);

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS listing;
SET FOREIGN_KEY_CHECKS = 1;