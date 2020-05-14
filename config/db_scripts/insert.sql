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
INSERT INTO EC_LANGUAGE (language_name) VALUES ('Spanish');
INSERT INTO EC_LANGUAGE (language_name) VALUES ('English');

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
INSERT INTO EC_PROVIDER (provider_name, provider_description, fk_status_id) VALUES ('Zara','We are a clothes provider', (SELECT status_id FROM EC_STATUS WHERE status_name = 'INACTIVE'));
INSERT INTO EC_PROVIDER (provider_name, provider_description, fk_status_id) VALUES ('Pull Bear','We are a clothes provider', (SELECT status_id FROM EC_STATUS WHERE status_name = 'INACTIVE'));
INSERT INTO EC_PROVIDER (provider_name, provider_description, fk_status_id) VALUES ('Corp Tum','We are a thing', (SELECT status_id FROM EC_STATUS WHERE status_name = 'INACTIVE'));


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
product_height, product_width, fk_category_id) VALUES ('P30', 'foto', 'This is a cellphone', '10', '20', '10', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Huawei'));
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('Xiomi Readme Note 8', 'foto', 'This is a cellphone', '10', '20', '10', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Xiomi'));
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('Mac', 'foto', 'This is a computer by Apple', '10', '20', '10', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Apple'));
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('Samsung Smart TV', 'foto', 'This is a 60" TV', '70', '100', '220', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'TV'));
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('Asus Mass', 'foto', 'This is a 60" TV', '70', '100', '220', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Asus'));
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('Adidas A30', 'foto', 'Soccer shoes', '10', '10', '30', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Adidas'));
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('Nike mercurial', 'foto', 'Soccer shoes pro', '10', '15', '10', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Nike'));
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('LG 350LPP', 'foto', 'Fridge K3 hyper', '50', '90', '70', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Fridge'));
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('Garden keys', 'foto', 'Garden full top', '70', '100', '220', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Garden'));
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('Supreme Shirt', 'foto', 'Rich shirt', '10', '10', '5', (SELECT category_id FROM EC_CATEGORY WHERE category_name = 'Supreme'));



/* PRODUCT_PROVIDER */
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,990.99 , 10 , 1, 1, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='40%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,699.99 , 7 , 3, 3, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='10%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,2000 , 5 , 2, 2, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='20%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null, 200, 50, 1, 4, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='50%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null, 200, 50, 1, 2, null, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null, 200, 50, 1, 4, null, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,2500.56 , 70, 5, 1, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='10%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'INACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,400.99 , 41 , 6, 2, null, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,390.10 , 1 , 4, 3, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='50%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'INACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,550, 2 , 3, 4, null, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,100 , 30 , 2, 5, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='70%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,99.99 , 69 , 1, 6, null, (SELECT status_id FROM EC_STATUS WHERE status_name = 'INACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,7520 , 99 , 2, 7, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='10%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,999.89 , 75, 3, 8, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='40%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,780 , 66 , 4, 9, null, (SELECT status_id FROM EC_STATUS WHERE status_name = 'INACTIVE'));
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id, fk_status_id) VALUES (null,50.99 , 98 , 5, 10, (SELECT offer_id FROM EC_OFFER WHERE offer_rate='90%'), (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));

/* USER */
INSERT INTO EC_USER (user_first_name, user_first_lastname, user_second_name, user_second_lastname, user_birthdate, user_email, user_password, user_photo, fk_language_id, fk_rol_id, fk_status_id) 
VALUES ('Diego', 'De Quintal', 'Alejandro', 'Nobrega', '1999-07-26', 'diego@ucab.com', 'user1234', 'foto', 1, 1, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_USER (user_first_name, user_first_lastname, user_second_name, user_second_lastname, user_birthdate, user_email, user_password, user_photo, fk_language_id, fk_rol_id, fk_status_id) 
VALUES ('Alexander', 'Fernandez',null ,null , '1999-07-07', 'alexander@ucab.com', 'user1234', 'foto', 2, 1,  (SELECT status_id FROM EC_STATUS WHERE status_name = 'INACTIVE'));
INSERT INTO EC_USER (user_first_name, user_first_lastname, user_second_name, user_second_lastname, user_birthdate, user_email, user_password, user_photo, fk_language_id, fk_rol_id, fk_status_id) 
VALUES ('Miguel', 'Peña',null ,null , '1998-04-03', 'miguel@ucab.com', 'user1234', 'foto', 2, 1,  (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_USER (user_first_name, user_first_lastname, user_second_name, user_second_lastname, user_birthdate, user_email, user_password, user_photo, fk_language_id, fk_rol_id, fk_status_id) 
VALUES ('Alba', 'Sánchez', 'Sofía', 'Silvestre', '1999-01-31', 'albita@gmail.com', 'admin1234', 'foto', 2, 2, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_USER (user_first_name, user_first_lastname, user_second_name, user_second_lastname, user_birthdate, user_email, user_password, user_photo, fk_language_id, fk_rol_id, fk_status_id) 
VALUES ('Carolina', 'Patiño', null, null, '1999-07-07', 'carolina@ucab.com', 'admin1234', 'foto', 1, 2, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_USER (user_first_name, user_first_lastname, user_second_name, user_second_lastname, user_birthdate, user_email, user_password, user_photo, fk_language_id, fk_rol_id, fk_status_id) 
VALUES ('Vanessa', 'Apellido', 'Alejandra', null, '1998-04-03', 'vanessa@ucab.com', 'admin1234', 'foto', 2, 2, (SELECT status_id FROM EC_STATUS WHERE status_name = 'INACTIVE'));
INSERT INTO EC_USER (user_first_name, user_first_lastname, user_second_name, user_second_lastname, user_birthdate, user_email, user_password, user_photo, fk_language_id, fk_rol_id, fk_status_id) 
VALUES ('Rafael', 'Méndez', null, null, '1999-01-31', 'rafa@gmail.com', 'admin1234', 'foto', 2, 2, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_USER (user_first_name, user_first_lastname, user_second_name, user_second_lastname, user_birthdate, user_email, user_password, user_photo, fk_language_id, fk_rol_id, fk_status_id) 
VALUES ('Gabriel', 'Ram', null, null, '1999-07-07', 'gabriel@ucab.com', 'admin1234', 'foto', 1, 2, (SELECT status_id FROM EC_STATUS WHERE status_name = 'INACTIVE'));
INSERT INTO EC_USER (user_first_name, user_first_lastname, user_second_name, user_second_lastname, user_birthdate, user_email, user_password, user_photo, fk_language_id, fk_rol_id, fk_status_id) 
VALUES ('Christian', 'Neira', null, null, '1998-04-03', 'christian@ucab.com', 'admin1234', 'foto', 2, 1, (SELECT status_id FROM EC_STATUS WHERE status_name = 'INACTIVE'));


/* DELIVERY ADDRESS */
INSERT INTO EC_DELIVERY_ADDRESS (delivery_address_primary_line, delivery_address_secondary_line, delivery_address_city, delivery_address_state, delivery_address_zip_code, delivery_address_aditional_info, delivery_address_security_code, delivery_address_locker_code, fk_user_id, fk_status_id) 
VALUES ('5724 176th Dr SE', null, 'Snohomish', 'WA', 98290, null, null, null, 1,  (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_DELIVERY_ADDRESS (delivery_address_primary_line, delivery_address_secondary_line, delivery_address_city, delivery_address_state, delivery_address_zip_code, delivery_address_aditional_info, delivery_address_security_code, delivery_address_locker_code, fk_user_id, fk_status_id) 
VALUES ('Po Box 1256', null ,'Medical Lake', 'WA', 99022, null, null, null, 2,  (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_DELIVERY_ADDRESS (delivery_address_primary_line, delivery_address_secondary_line, delivery_address_city, delivery_address_state, delivery_address_zip_code, delivery_address_aditional_info, delivery_address_security_code, delivery_address_locker_code, fk_user_id, fk_status_id) 
VALUES ('246 E Miller St', null ,'Newark', 'NY', 14513, null, null, null, 3, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_DELIVERY_ADDRESS (delivery_address_primary_line, delivery_address_secondary_line, delivery_address_city, delivery_address_state, delivery_address_zip_code, delivery_address_aditional_info, delivery_address_security_code, delivery_address_locker_code, fk_user_id, fk_status_id) 
VALUES ('246 E Miller St', null ,'Newark', 'NY', 14513, null, null, null, 3, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_DELIVERY_ADDRESS (delivery_address_primary_line, delivery_address_secondary_line, delivery_address_city, delivery_address_state, delivery_address_zip_code, delivery_address_aditional_info, delivery_address_security_code, delivery_address_locker_code, fk_user_id, fk_status_id) 
VALUES ('5724 176th Dr SE', null, 'Snohomish', 'WA', 98290, null, null, null, 1,  (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_DELIVERY_ADDRESS (delivery_address_primary_line, delivery_address_secondary_line, delivery_address_city, delivery_address_state, delivery_address_zip_code, delivery_address_aditional_info, delivery_address_security_code, delivery_address_locker_code, fk_user_id, fk_status_id) 
VALUES ('Po Box 1256', null ,'Medical Lake', 'WA', 99022, null, null, null, 2,  (SELECT status_id FROM EC_STATUS WHERE status_name = 'INACTIVE'));
INSERT INTO EC_DELIVERY_ADDRESS (delivery_address_primary_line, delivery_address_secondary_line, delivery_address_city, delivery_address_state, delivery_address_zip_code, delivery_address_aditional_info, delivery_address_security_code, delivery_address_locker_code, fk_user_id, fk_status_id) 
VALUES ('246 E Miller St', null ,'Newark', 'NY', 14513, null, null, null, 3, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_DELIVERY_ADDRESS (delivery_address_primary_line, delivery_address_secondary_line, delivery_address_city, delivery_address_state, delivery_address_zip_code, delivery_address_aditional_info, delivery_address_security_code, delivery_address_locker_code, fk_user_id, fk_status_id) 
VALUES ('5724 176th Dr SE', null, 'Snohomish', 'WA', 98290, null, null, null, 4,  (SELECT status_id FROM EC_STATUS WHERE status_name = 'INACTIVE'));
INSERT INTO EC_DELIVERY_ADDRESS (delivery_address_primary_line, delivery_address_secondary_line, delivery_address_city, delivery_address_state, delivery_address_zip_code, delivery_address_aditional_info, delivery_address_security_code, delivery_address_locker_code, fk_user_id, fk_status_id) 
VALUES ('Po Box 1256', null ,'Medical Lake', 'WA', 99022, null, null, null, 5,  (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_DELIVERY_ADDRESS (delivery_address_primary_line, delivery_address_secondary_line, delivery_address_city, delivery_address_state, delivery_address_zip_code, delivery_address_aditional_info, delivery_address_security_code, delivery_address_locker_code, fk_user_id, fk_status_id) 
VALUES ('246 E Miller St', null ,'Newark', 'NY', 14513, null, null, null, 6, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));
INSERT INTO EC_DELIVERY_ADDRESS (delivery_address_primary_line, delivery_address_secondary_line, delivery_address_city, delivery_address_state, delivery_address_zip_code, delivery_address_aditional_info, delivery_address_security_code, delivery_address_locker_code, fk_user_id, fk_status_id) 
VALUES ('5724 176th Dr SE', null, 'Snohomish', 'WA', 98290, null, null, null, 7,  (SELECT status_id FROM EC_STATUS WHERE status_name = 'INACTIVE'));
INSERT INTO EC_DELIVERY_ADDRESS (delivery_address_primary_line, delivery_address_secondary_line, delivery_address_city, delivery_address_state, delivery_address_zip_code, delivery_address_aditional_info, delivery_address_security_code, delivery_address_locker_code, fk_user_id, fk_status_id) 
VALUES ('Po Box 1256', null ,'Medical Lake', 'WA', 99022, null, null, null, 8,  (SELECT status_id FROM EC_STATUS WHERE status_name = 'INACTIVE'));
INSERT INTO EC_DELIVERY_ADDRESS (delivery_address_primary_line, delivery_address_secondary_line, delivery_address_city, delivery_address_state, delivery_address_zip_code, delivery_address_aditional_info, delivery_address_security_code, delivery_address_locker_code, fk_user_id, fk_status_id) 
VALUES ('246 E Miller St', null ,'Newark', 'NY', 14513, null, null, null, 9, (SELECT status_id FROM EC_STATUS WHERE status_name = 'ACTIVE'));

/* COUPON */
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('Summer discount', '50%', 100, 200, 1, (SELECT status_id FROM EC_STATUS WHERE status_name = 'AVAILABLE'));
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('BODEnchufe leal', '30%', 200, 350, 2, (SELECT status_id FROM EC_STATUS WHERE status_name = 'AVAILABLE'));
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('Una escopeta para matar una mosca', '40%', 300, 450, 3, (SELECT status_id FROM EC_STATUS WHERE status_name = 'AVAILABLE'));
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('Summer discount', '50%', 100, 200, 4, (SELECT status_id FROM EC_STATUS WHERE status_name = 'UNAVAILABLE'));
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('BODEnchufe leal', '30%', 200, 350, 7, (SELECT status_id FROM EC_STATUS WHERE status_name = 'UNAVAILABLE'));
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('Una escopeta para matar una mosca', '40%', 300, 450, 8, (SELECT status_id FROM EC_STATUS WHERE status_name = 'AVAILABLE'));
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('BODEnchufe leal', '30%', 200, 350, 3, (SELECT status_id FROM EC_STATUS WHERE status_name = 'AVAILABLE'));
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('Una escopeta para matar una mosca', '40%', 300, 450, 5, (SELECT status_id FROM EC_STATUS WHERE status_name = 'AVAILABLE'));
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('BODEnchufe leal', '30%', 200, 350, 3, (SELECT status_id FROM EC_STATUS WHERE status_name = 'AVAILABLE'));
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('Una escopeta para matar una mosca', '40%', 300, 450, 5, (SELECT status_id FROM EC_STATUS WHERE status_name = 'AVAILABLE'));
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('Welcome coupon', '15%', 100, 300, 1, (SELECT status_id FROM EC_STATUS WHERE status_name = 'AVAILABLE'));
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('Welcome coupon', '15%', 100, 300, 2, (SELECT status_id FROM EC_STATUS WHERE status_name = 'AVAILABLE'));
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('Welcome coupon', '15%', 100, 300, 3, (SELECT status_id FROM EC_STATUS WHERE status_name = 'UNAVAILABLE'));
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('Welcome coupon', '15%', 100, 300, 4, (SELECT status_id FROM EC_STATUS WHERE status_name = 'AVAILABLE'));
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('Welcome coupon', '15%', 100, 300, 5, (SELECT status_id FROM EC_STATUS WHERE status_name = 'UNAVAILABLE'));
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('Welcome coupon', '15%', 100, 300, 6, (SELECT status_id FROM EC_STATUS WHERE status_name = 'AVAILABLE'));
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('Welcome coupon', '15%', 100, 300, 7, (SELECT status_id FROM EC_STATUS WHERE status_name = 'UNAVAILABLE'));
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('Welcome coupon', '15%', 100, 300, 8, (SELECT status_id FROM EC_STATUS WHERE status_name = 'AVAILABLE'));
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, coupon_min_use, coupon_max_use, fk_user_id, fk_status_id) 
VALUES ('Welcome coupon', '15%', 100, 300, 9, (SELECT status_id FROM EC_STATUS WHERE status_name = 'UNAVAILABLE'));



/* ORDER */
INSERT INTO EC_ORDER (order_date, order_amount_dollars, order_weight, fk_delivery_address_id, fk_status_id, fk_coupon_id) 
VALUES ('2020-01-31', 3772.97, 40, 1, (SELECT status_id FROM EC_STATUS WHERE status_name = 'PAID'), null);
INSERT INTO EC_ORDER (order_date, order_amount_dollars, order_weight, fk_delivery_address_id, fk_status_id, fk_coupon_id) 
VALUES ('2020-03-31', 3399.98, 40, 1, (SELECT status_id FROM EC_STATUS WHERE status_name = 'PAID'), null);
INSERT INTO EC_ORDER (order_date, order_amount_dollars, order_weight, fk_delivery_address_id, fk_status_id, fk_coupon_id) 
VALUES ('2020-01-31', 32699.97, 40, 1, (SELECT status_id FROM EC_STATUS WHERE status_name = 'PAID'), null);
INSERT INTO EC_ORDER (order_date, order_amount_dollars, order_weight, fk_delivery_address_id, fk_status_id, fk_coupon_id) 
VALUES ('2020-03-31', 33990.98, 40, 1, (SELECT status_id FROM EC_STATUS WHERE status_name = 'PAID'), null);


/* PRODUCT_PROVIDER_ORDER */

INSERT INTO EC_PRODUCT_PROVIDER_ORDER (product_provider_order_quantity, fk_product_provider_id, fk_user_id, fk_order_id, fk_status_id) 
VALUES (3, 1, 1, 1, (SELECT status_id FROM EC_STATUS WHERE status_name = 'PAID'));
INSERT INTO EC_PRODUCT_PROVIDER_ORDER (product_provider_order_quantity, fk_product_provider_id, fk_user_id, fk_order_id, fk_status_id) 
VALUES (4, 5, 1, 1, (SELECT status_id FROM EC_STATUS WHERE status_name = 'PAID'));
INSERT INTO EC_PRODUCT_PROVIDER_ORDER (product_provider_order_quantity, fk_product_provider_id, fk_user_id, fk_order_id, fk_status_id) 
VALUES (2, 2, 1, 2, (SELECT status_id FROM EC_STATUS WHERE status_name = 'PAID'));
INSERT INTO EC_PRODUCT_PROVIDER_ORDER (product_provider_order_quantity, fk_product_provider_id, fk_user_id, fk_order_id, fk_status_id) 
VALUES (1, 3, 1, 2, (SELECT status_id FROM EC_STATUS WHERE status_name = 'PAID'));
INSERT INTO EC_PRODUCT_PROVIDER_ORDER (product_provider_order_quantity, fk_product_provider_id, fk_user_id, fk_order_id, fk_status_id) 
VALUES (3, 2, 2, 3, (SELECT status_id FROM EC_STATUS WHERE status_name = 'PAID'));
INSERT INTO EC_PRODUCT_PROVIDER_ORDER (product_provider_order_quantity, fk_product_provider_id, fk_user_id, fk_order_id, fk_status_id) 
VALUES (2, 3, 2, 3, (SELECT status_id FROM EC_STATUS WHERE status_name = 'PAID'));
INSERT INTO EC_PRODUCT_PROVIDER_ORDER (product_provider_order_quantity, fk_product_provider_id, fk_user_id, fk_order_id, fk_status_id) 
VALUES (4, 2, 3, 4, (SELECT status_id FROM EC_STATUS WHERE status_name = 'PAID'));
INSERT INTO EC_PRODUCT_PROVIDER_ORDER (product_provider_order_quantity, fk_product_provider_id, fk_user_id, fk_order_id, fk_status_id) 
VALUES (5, 3, 3, 4, (SELECT status_id FROM EC_STATUS WHERE status_name = 'PAID'));


/* QUALIFICATION */
INSERT INTO EC_QUALIFICATION (qualification_commentary, qualification_stars, fk_product_provider_id, fk_user_id)
VALUES ('Great product', 5, 1, 1);
INSERT INTO EC_QUALIFICATION (qualification_commentary, qualification_stars, fk_product_provider_id, fk_user_id)
VALUES ('Nice', 4, 1, 1);
INSERT INTO EC_QUALIFICATION (qualification_commentary, qualification_stars, fk_product_provider_id, fk_user_id)
VALUES ('Fine, ok', 2, 1, 1);
