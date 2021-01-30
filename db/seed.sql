create table hey_users (
    user_id serial primary key,
    first_name varchar(55),
    last_name varchar(55),
    email varchar(155),
    password varchar(255),
    address_1 varchar(255),
    address_2 varchar(255),
    city varchar(55),
    state varchar(55),
    zip_code varchar(55)
);

create table products (
    product_id serial primary key,
    product_name varchar(55),
    price numeric,
    product_img text,
    category varchar(55),
    description varchar(255),
);

create table invoices (
    invoice_id serial primary key,
    user_id int references hey_users(user_id) on delete cascade,
    billing_address_1 varchar(255),
    billing_address_2 varchar(255),
    billing_city varchar(55),
    billing_state varchar(55),
    billing_zip varchar(55),
    billing_date timestamp
);

create table bag (
    bag_id serial primary key,
    user_id int references hey_users(user_id) on delete cascade
);

create table bag_order (
    bag_order_id serial primary key,
    bag_id int references bag(bag_id) on delete cascade,
    product_id int references products(product_id) on update cascade,
    quantity int,
    user_id int references hey_users(user_id) on delete cascade
);
