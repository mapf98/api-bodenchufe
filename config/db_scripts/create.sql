CREATE TABLE EC_SETTING
(
    setting_id SERIAL,
    setting_payment_processor VARCHAR(100),
    setting_service_commission VARCHAR(50),
	PRIMARY KEY (setting_id)
);

CREATE TABLE EC_STATUS
(
    status_id SERIAL,
    status_name VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (status_id)
);

CREATE TABLE EC_ROL
(
    rol_id SERIAL,
    rol_name VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (rol_id)
);

CREATE TABLE EC_LANGUAGE
(
    language_id SERIAL,
    language_name VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY (language_id)
);

CREATE TABLE EC_OFFER
(
    offer_id SERIAL,
    offer_rate VARCHAR(10) NOT NULL UNIQUE,
    PRIMARY KEY (offer_id)
);

CREATE TABLE EC_PROVIDER
(
    provider_id SERIAL,
    provider_name VARCHAR(50) NOT NULL,
    provider_description VARCHAR(100) NOT NULL,
	fk_status_id INTEGER NOT NULL,
    PRIMARY KEY (provider_id),
	CONSTRAINT fk_provider_status_id FOREIGN KEY (fk_status_id) REFERENCES EC_STATUS (status_id)
);

CREATE TABLE EC_CATEGORY
(
    category_id SERIAL,
    category_name VARCHAR(30) NOT NULL UNIQUE,
    fk_category_id INTEGER,
    PRIMARY KEY (category_id),
    CONSTRAINT fk_category_category_id FOREIGN KEY (fk_category_id) REFERENCES EC_CATEGORY (category_id)
);

CREATE TABLE EC_PRODUCT
(
    product_id SERIAL,
    product_name VARCHAR(50) NOT NULL,
    product_photo VARCHAR(200) NOT NULL,
    product_description VARCHAR(200) NOT NULL,
    product_long FLOAT NOT NULL,
    product_height FLOAT NOT NULL,
    product_width FLOAT NOT NULL,
    fk_category_id INTEGER NOT NULL,
    PRIMARY KEY (product_id),
    CONSTRAINT fk_product_category_id FOREIGN KEY (fk_category_id) REFERENCES EC_CATEGORY (category_id)
);

CREATE TABLE EC_PRODUCT_PROVIDER
(
    product_provider_id SERIAL,
    product_provider_description VARCHAR(200),
    product_provider_price FLOAT NOT NULL,
    product_provider_available_quantity INTEGER NOT NULL,
    fk_provider_id INTEGER NOT NULL,
    fk_product_id INTEGER NOT NULL,
	fk_status_id INTEGER NOT NULL,
    fk_offer_id INTEGER,
    PRIMARY KEY (product_provider_id),
    CONSTRAINT fk_product_provider_offer_id FOREIGN KEY (fk_offer_id) REFERENCES EC_OFFER (offer_id),
    CONSTRAINT fk_product_provider_provider_id FOREIGN KEY (fk_provider_id) REFERENCES EC_PROVIDER (provider_id),
    CONSTRAINT fk_product_provider_product_id FOREIGN KEY (fk_product_id) REFERENCES EC_PRODUCT (product_id),
	CONSTRAINT fk_product_provider_status_id FOREIGN KEY (fk_status_id) REFERENCES EC_STATUS (status_id)
);

CREATE TABLE EC_USER
(
    user_id SERIAL,
    user_first_name VARCHAR(40) NOT NULL,
    user_first_lastname VARCHAR(40) NOT NULL,
    user_second_name VARCHAR(40),
    user_second_lastname VARCHAR(40),
    user_birthdate DATE,
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(50),
    user_photo VARCHAR(2000),
    fk_language_id INTEGER NOT NULL,
    fk_rol_id INTEGER NOT NULL,
    fk_status_id INTEGER NOT NULL,
    PRIMARY KEY (user_id),
    CONSTRAINT fk_user_language_id FOREIGN KEY (fk_language_id) REFERENCES EC_LANGUAGE (language_id),
    CONSTRAINT fk_user_rol_id FOREIGN KEY (fk_rol_id) REFERENCES EC_ROL (rol_id),
    CONSTRAINT fk_user_status_id FOREIGN KEY (fk_status_id) REFERENCES EC_STATUS (status_id)
);

CREATE TABLE EC_DELIVERY_ADDRESS
(
    delivery_address_id SERIAL,
    delivery_address_primary_line VARCHAR(300) NOT NULL,
    delivery_address_secondary_line VARCHAR(300),
    delivery_address_city VARCHAR (300) NOT NULL,
    delivery_address_state VARCHAR(300) NOT NULL,
    delivery_address_zip_code INTEGER NOT NULL,
    delivery_address_aditional_info VARCHAR(300),
    delivery_address_security_code VARCHAR(30),
    delivery_address_locker_code VARCHAR(30),
    fk_user_id INTEGER NOT NULL,
    fk_status_id INTEGER NOT NULL,
    PRIMARY KEY (delivery_address_id),
    CONSTRAINT fk_delivery_address_user_id FOREIGN KEY (fk_user_id) REFERENCES EC_USER (user_id),
    CONSTRAINT fk_delivery_address_status_id FOREIGN KEY (fk_status_id) REFERENCES EC_STATUS (status_id)

);

CREATE TABLE EC_COUPON
(
    coupon_id SERIAL,
    coupon_name VARCHAR(50) NOT NULL,
    coupon_discount_rate VARCHAR(10) NOT NULL,
    coupon_min_use INTEGER NOT NULL,
    coupon_max_use INTEGER NOT NULL,
    fk_status_id INTEGER NOT NULL,
    fk_user_id INTEGER,
    PRIMARY KEY (coupon_id),
    CONSTRAINT fk_coupon_status_id FOREIGN KEY (fk_status_id) REFERENCES EC_STATUS (status_id),
    CONSTRAINT fk_coupon_user_id FOREIGN KEY (fk_user_id) REFERENCES EC_USER (user_id)
);

CREATE TABLE EC_ORDER
(
    order_id SERIAL,
    order_date DATE NOT NULL,
    order_amount_dollars FLOAT NOT NULL,
    order_weight FLOAT NOT NULL,
    fk_delivery_address_id INTEGER NOT NULL,
    fk_status_id INTEGER NOT NULL,
	fk_coupon_id INTEGER,
    PRIMARY KEY (order_id),
    CONSTRAINT fk_order_delivery_address_id FOREIGN KEY (fk_delivery_address_id) REFERENCES EC_DELIVERY_ADDRESS (delivery_address_id),
    CONSTRAINT fk_order_status_id FOREIGN KEY (fk_status_id) REFERENCES EC_STATUS (status_id),
	CONSTRAINT fk_order_coupon_id FOREIGN KEY (fk_coupon_id) REFERENCES EC_COUPON (coupon_id)
);

CREATE TABLE EC_PRODUCT_PROVIDER_ORDER
(
    product_provider_order_id SERIAL,
    product_provider_order_quantity INTEGER NOT NULL,
    fk_product_provider_id INTEGER NOT NULL,
    fk_user_id INTEGER NOT NULL,
    fk_order_id INTEGER,
    fk_status_id INTEGER NOT NULL,
    PRIMARY KEY (product_provider_order_id),
    CONSTRAINT fk_product_provider_order_product_provider_id FOREIGN KEY (fk_product_provider_id) REFERENCES EC_PRODUCT_PROVIDER (product_provider_id),
    CONSTRAINT fk_product_provider_order_user_id FOREIGN KEY (fk_user_id) REFERENCES EC_USER (user_id),
    CONSTRAINT fk_product_provider_order_order_id FOREIGN KEY (fk_order_id) REFERENCES EC_ORDER (order_id),
    CONSTRAINT fk_product_provider_order_status_id FOREIGN KEY (fk_status_id) REFERENCES EC_STATUS (status_id)
);

CREATE TABLE EC_QUALIFICATION
(
    qualification_id SERIAL,
    qualification_commentary VARCHAR(500) NOT NULL,
    qualification_stars INTEGER NOT NULL,
    fk_product_provider_id INTEGER NOT NULL,
    fk_user_id INTEGER NOT NULL,
    PRIMARY KEY (qualification_id),
    CONSTRAINT fk_qualification_product_provider_id FOREIGN KEY (fk_product_provider_id) REFERENCES EC_PRODUCT_PROVIDER (product_provider_id),
    CONSTRAINT fk_qualification_user_id FOREIGN KEY (fk_user_id) REFERENCES EC_USER (user_id)
);