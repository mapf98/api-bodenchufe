/* STATUS */
INSERT INTO EC_STATUS (status_id, status_name) VALUES (1, 'selected');
INSERT INTO EC_STATUS (status_id, status_name) VALUES (2, 'unselected');
INSERT INTO EC_STATUS (status_id, status_name) VALUES (3, 'active');
INSERT INTO EC_STATUS (status_id, status_name) VALUES (4, 'inactive');
INSERT INTO EC_STATUS (status_id, status_name) VALUES (5, 'in progress');
INSERT INTO EC_STATUS (status_id, status_name) VALUES (6, 'paid');

/* ROL */
INSERT INTO EC_ROL (rol_name) VALUES ('administrator');
INSERT INTO EC_ROL (rol_name) VALUES ('user');

/* LANGUAGE */
INSERT INTO EC_LANGUAGE (language_name) VALUES ('spanish');
INSERT INTO EC_LANGUAGE (language_name) VALUES ('english');
INSERT INTO EC_LANGUAGE (language_name) VALUES ('portuguese');

/* OFFER */
INSERT INTO EC_OFFER (offer_rate) VALUES ('0%');
INSERT INTO EC_OFFER (offer_rate) VALUES ('10%');
INSERT INTO EC_OFFER (offer_rate) VALUES ('20%');
INSERT INTO EC_OFFER (offer_rate) VALUES ('30%');
INSERT INTO EC_OFFER (offer_rate) VALUES ('40%');
INSERT INTO EC_OFFER (offer_rate) VALUES ('50%');
INSERT INTO EC_OFFER (offer_rate) VALUES ('60%');
INSERT INTO EC_OFFER (offer_rate) VALUES ('70%');
INSERT INTO EC_OFFER (offer_rate) VALUES ('80%');
INSERT INTO EC_OFFER (offer_rate) VALUES ('90%');
INSERT INTO EC_OFFER (offer_rate) VALUES ('100%');

/* PROVIDER */
INSERT INTO EC_PROVIDER (provider_name, provider_description) VALUES ('Techno Fan','We are a technology provider');
INSERT INTO EC_PROVIDER (provider_name, provider_description) VALUES ('All You Want','We are a provider');
INSERT INTO EC_PROVIDER (provider_name, provider_description) VALUES ('Mix Pro','We are a provider');

/* CATEGORY */
INSERT INTO EC_CATEGORY (category_name) VALUES ('Technology');
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Cellphone',1);
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('TV',1);
INSERT INTO EC_CATEGORY (category_name, fk_category_id) VALUES ('Computer',1);

/* PRODUCT */
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('iPhone 11', 'foto', 'This is a cellphone', '10', '20', '10', 2);
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('Mac', 'foto', 'This is a computer by Apple', '10', '20', '10', 4);
INSERT INTO EC_PRODUCT (product_name, product_photo,product_description, product_long,
product_height, product_width, fk_category_id) VALUES ('Samsung Smart TV', 'foto', 'This is a 60" TV', '70', '100', '220', 3);

/* PRODUCT_PROVIDER */
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id) VALUES (null,990.99 , 10 , 1, 1, 1);
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id) VALUES (null,699.99 , 7 , 3, 3, 2);
INSERT INTO EC_PRODUCT_PROVIDER (product_provider_description, product_provider_price, product_provider_available_quantity, fk_provider_id,
fk_product_id, fk_offer_id) VALUES (null,2000 , 5 , 2, 2, 4);

/* USER */
INSERT INTO EC_USER (user_first_name, user_first_lastname, user_second_name, user_second_lastname, user_birthdate, user_email, user_password, user_photo, fk_language_id, fk_rol_id, fk_status_id) 
VALUES ('Diego', 'De Quintal', 'Alejandro', 'Nobrega', '1999-07-26', 'diego@ucab.com', 'test1234', 'foto', 1, 1, 3);
INSERT INTO EC_USER (user_first_name, user_first_lastname, user_second_name, user_second_lastname, user_birthdate, user_email, user_password, user_photo, fk_language_id, fk_rol_id, fk_status_id) 
VALUES ('Alexander', 'Fernandez',null ,null , '1999-07-07', 'alexader@ucab.com', 'test1234', 'foto', 2, 1, 3);
INSERT INTO EC_USER (user_first_name, user_first_lastname, user_second_name, user_second_lastname, user_birthdate, user_email, user_password, user_photo, fk_language_id, fk_rol_id, fk_status_id) 
VALUES ('Miguel', 'Peña',null ,null , '1998-04-03', 'miguel@ucab.com', 'test1234', 'foto', 3, 1, 3);

/* DELIVERY ADDRESS */
INSERT INTO EC_DELIVERY_ADDRESS (delivery_address_primary_line, delivery_address_secondary_line, delivery_address_city, delivery_address_state, delivery_address_zip_code, delivery_address_aditional_info, delivery_address_security_code, delivery_address_locker_code, fk_user_id) 
VALUES ('5724 176th Dr SE', null, 'Snohomish', 'WA', 98290, null, null, null, 1);
INSERT INTO EC_DELIVERY_ADDRESS (delivery_address_primary_line, delivery_address_secondary_line, delivery_address_city, delivery_address_state, delivery_address_zip_code, delivery_address_aditional_info, delivery_address_security_code, delivery_address_locker_code, fk_user_id) 
VALUES ('Po Box 1256', null ,'Medical Lake', 'WA', 99022, null, null, null, 2);
INSERT INTO EC_DELIVERY_ADDRESS (delivery_address_primary_line, delivery_address_secondary_line, delivery_address_city, delivery_address_state, delivery_address_zip_code, delivery_address_aditional_info, delivery_address_security_code, delivery_address_locker_code, fk_user_id) 
VALUES ('246 E Miller St', null ,'Newark', 'NY', 14513, null, null, null, 3);

/* ORDER */
INSERT INTO EC_ORDER (order_date, order_amount_dollars, order_weight, order_cryptocurrency_type, order_amount_cryptocurrency, fk_delivery_address_id, fk_status_id) 
VALUES ('2020-01-31', 2972.97, 40, 'BTC', 0.08, 1, 6);
 
/* COUPON */
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, fk_order_id, fk_user_id, fk_status_id) 
VALUES ('Super discount to you', '50%', null, 1, 3);
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, fk_order_id, fk_user_id, fk_status_id) 
VALUES ('Super discount to you', '30%', null, 2, 3);
INSERT INTO EC_COUPON (coupon_name, coupon_discount_rate, fk_order_id, fk_user_id, fk_status_id) 
VALUES ('Super discount to you', '40%', null, 3, 3);

/* PRODUCT_PROVIDER_ORDER */

INSERT INTO EC_PRODUCT_PROVIDER_ORDER (product_provider_order_quantity, fk_product_provider_id, fk_user_id, fk_order_id, fk_status_id) 
VALUES (3, 1, 1, 1, 6);
INSERT INTO EC_PRODUCT_PROVIDER_ORDER (product_provider_order_quantity, fk_product_provider_id, fk_user_id, fk_order_id, fk_status_id) 
VALUES (2, 2, 1, null, 1);
INSERT INTO EC_PRODUCT_PROVIDER_ORDER (product_provider_order_quantity, fk_product_provider_id, fk_user_id, fk_order_id, fk_status_id) 
VALUES (1, 3, 1, null, 1);

/* QUALIFICATION */
INSERT INTO EC_QUALIFICATION (qualification_commentary, qualification_stars, fk_product_provider_id, fk_user_id)
VALUES ('Great product', 5, 1, 1);