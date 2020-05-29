/* STATUS */
INSERT INTO EC_STATUS (status_name) VALUES ('ACTIVE');
INSERT INTO EC_STATUS (status_name) VALUES ('INACTIVE');
INSERT INTO EC_STATUS (status_name) VALUES ('SELECTED');
INSERT INTO EC_STATUS (status_name) VALUES ('UNSELECTED');
INSERT INTO EC_STATUS (status_name) VALUES ('PAID');
INSERT INTO EC_STATUS (status_name) VALUES ('IN PROCESS');
INSERT INTO EC_STATUS (status_name) VALUES ('REJECTED');
INSERT INTO EC_STATUS (status_name) VALUES ('AVAILABLE');
INSERT INTO EC_STATUS (status_name) VALUES ('UNAVAILABLE');

/*SETTING*/
INSERT INTO EC_SETTING (setting_payment_processor, setting_service_commission) VALUES('0.25$', '1.75%');

/* ROL */
INSERT INTO EC_ROL (rol_name) VALUES ('administrator');
INSERT INTO EC_ROL (rol_name) VALUES ('user');

/* LANGUAGE */
INSERT INTO EC_LANGUAGE (language_name) VALUES ('es-ve');
INSERT INTO EC_LANGUAGE (language_name) VALUES ('en-us');

/* OFFER */
INSERT INTO EC_OFFER (offer_rate) VALUES ('10%');
INSERT INTO EC_OFFER (offer_rate) VALUES ('20%');
INSERT INTO EC_OFFER (offer_rate) VALUES ('30%');
INSERT INTO EC_OFFER (offer_rate) VALUES ('40%');
INSERT INTO EC_OFFER (offer_rate) VALUES ('50%');
INSERT INTO EC_OFFER (offer_rate) VALUES ('60%');
INSERT INTO EC_OFFER (offer_rate) VALUES ('70%');

/* PROVIDER */
INSERT INTO EC_PROVIDER (provider_name, provider_description, fk_status_id) VALUES ('Techno Fan','We are a technology provider', (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PROVIDER (provider_name, provider_description, fk_status_id) VALUES ('All You Want','We are a provider', (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PROVIDER (provider_name, provider_description, fk_status_id) VALUES ('Mix Pro','We are a provider', (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PROVIDER (provider_name, provider_description, fk_status_id) VALUES ('Zara','We are a clothes provider', (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PROVIDER (provider_name, provider_description, fk_status_id) VALUES ('Pull Bear','We are a clothes provider', (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PROVIDER (provider_name, provider_description, fk_status_id) VALUES ('Corp Tum','We are a thing', (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));



/* CATEGORY */
INSERT INTO EC_CATEGORY (category_name) VALUES ('Technology');
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Cellphone', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Technology'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('TV', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Technology'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Computer', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Technology'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Android', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Cellphone'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Dell', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Computer'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Asus', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Computer'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Apple', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Computer'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Xiomi', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Android'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Huawei', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Android'));;
INSERT INTO EC_CATEGORY (category_name) VALUES ('Clothes');
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Shirt', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Clothes'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Pant', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Clothes'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Dress', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Clothes'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Shoes', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Clothes'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Nike', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Shoes'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Adidas', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Shoes'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Puma', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Shoes'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Gucchi', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Dress'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Supreme', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Shirt'));;
INSERT INTO EC_CATEGORY (category_name) VALUES ('Home');
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Backyard', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Home'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Garden', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Home'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Kitchen', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Home'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Fridge', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Kitchen'));
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Microwave', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Kitchen'));

/* PRODUCT */
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('Huawei P30', 'https://firebasestorage.googleapis.com/v0/b/bodenchufe-client.appspot.com/o/images%2Fproducts%2F1%2Fp30_1.jpg?alt=media&token=5b2b5aa2-30dd-4f4a-a2e9-8f109beccc1c', 'Processor: HUAWEI Kirin 980 Octa-core Processor Camera: 40Mp + 8MP Battery:3650mAh', '0.76', '14.91', '7.14', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Huawei'));
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('Xiomi Readme Note 8', 'https://firebasestorage.googleapis.com/v0/b/bodenchufe-client.appspot.com/o/images%2Fproducts%2F2%2Frmn8_2.jpg?alt=media&token=50c910d4-9448-49dd-8518-628e58a68180', 'Processor: Octa-core Camera: 48Mp + 8MP + 2 Battery: Non-removable Li-Po 4000 mAh battery + Fast battery charging 18W', '0.84', '15.83', '7.53', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Xiomi'));
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('Macbook pro 2019', 'https://firebasestorage.googleapis.com/v0/b/bodenchufe-client.appspot.com/o/images%2Fproducts%2F3%2Fmac3.jpg?alt=media&token=3dcaa878-8bbc-406b-9a7e-bec5d2ddbd32', 'Processor: quad-core 8th-gen Intel Core i5 processor Camera: 48Mp + 8MP + 2 Battery Life: 9 hours', '1.55', '24.07', '34.93 ', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Apple'));
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('43" J5290 Full HD Smart TV 2019', 'https://firebasestorage.googleapis.com/v0/b/bodenchufe-client.appspot.com/o/images%2Fproducts%2F4%2Ftv1.jpg?alt=media&token=ddc9ba94-779c-411a-9210-5a22c30f365f', 'Resolution: 1,920 x 1,080', '14.3', '128.2', '74.5', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'TV'));
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('Asus Vivobook S15', 'https://firebasestorage.googleapis.com/v0/b/bodenchufe-client.appspot.com/o/images%2Fproducts%2F5%2Fasus3.jpg?alt=media&token=ee7b0012-9577-4f4b-9a60-aadb337e0cbd', 'CPU: 1.8GHz Intel Core i7-8565U (quad-core, 8MB cache, up to 4.6GHz) Graphics: Intel UHD Graphics 620 Storage: 512GB solid-state drive', '1.8', '35.7', '23', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Asus'));
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('Adidas x17', 'https://firebasestorage.googleapis.com/v0/b/bodenchufe-client.appspot.com/o/images%2Fproducts%2F6%2Fx171.jpg?alt=media&token=3f851e3d-13a6-446f-986b-061950aa6c53', ' synthetic Soccer shoes', '10.16', '33', '15.24', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Adidas'));
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('Nike Hypervenom', 'https://firebasestorage.googleapis.com/v0/b/bodenchufe-client.appspot.com/o/images%2Fproducts%2F7%2Fnike1.jpg?alt=media&token=8e2ca9e4-29c8-4b61-b32b-384a6d4d87fe', 'Soccer shoes pro', '10', '33.5', '15.3', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Nike'));
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('LM89SXD LG', 'https://firebasestorage.googleapis.com/v0/b/bodenchufe-client.appspot.com/o/images%2Fproducts%2F8%2Ffridge1.jpg?alt=media&token=fab35d65-35af-4789-8e90-8fb8a759b1ae', 'Hyper fridge Door in Door Compresor linear inverter', '90.8', '178.5', '93', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Fridge'));
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('Pala de jardinería', 'https://firebasestorage.googleapis.com/v0/b/bodenchufe-client.appspot.com/o/images%2Fproducts%2F9%2Fpala3.jpg?alt=media&token=0b574a6f-0c19-44c1-a5d1-4150136b1d7c', 'Execelente pala para jardinería, ideal para trabajos de jardin', '7', '100', '50', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Garden'));
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('Supreme Shirt', 'https://firebasestorage.googleapis.com/v0/b/bodenchufe-client.appspot.com/o/images%2Fproducts%2F10%2Fsupreme1.jpg?alt=media&token=83166cb7-5c8e-4543-bff7-a3e8847cce27', 'Rich shirt', '5', '65', '98', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Supreme'));



/* PRODUCT_PROVIDER */
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,499 , 10 , 1, 1, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='40%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,1299 , 7 , 3, 3, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='10%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,140 , 5 , 2, 2, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='20%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null, 652, 50, 1, 4, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='50%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null, 154, 50, 1, 2, null, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null, 599, 50, 1, 4, null, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,582 , 70, 5, 1, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='10%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,148.5 , 41 , 6, 2, null, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,1380 , 1 , 4, 3, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='50%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,550, 2 , 3, 4, null, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,700 , 30 , 2, 5, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='70%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,96.55 , 69 , 1, 6, null, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,65.33 , 99 , 2, 7, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='10%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,795.22 , 75, 3, 8, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='40%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,780 , 12 , 4, 9, null, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,50.99 , 98 , 5, 10, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='90%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
