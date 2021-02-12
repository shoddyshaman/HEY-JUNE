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

drop table if exists invoices
create table invoices (
    invoice_id serial primary key,
    user_id int references hey_users(user_id),
    bag_id int references bag(bag_id),
    shipping_address_1 varchar(255),
    shipping_address_2 varchar(255),
    shipping_city varchar(55),
    shipping_state varchar(55),
    shipping_zip varchar(55),
    total numeric,
    created_date timestamp without time zone
);

create table invoice_item (
    invoice_item_id serial primary key,
    invoice_id int references invoices(invoice_id),
    product_id int references products(product_id),
    qty_ordered int,
    size varchar(55)
)



create table bag (
    bag_id serial primary key,
    user_id int references hey_users(user_id) on delete cascade
);

create table bag_item (
    bag_item_id serial primary key,
    bag_id int references bag(bag_id) on delete cascade,
    product_id int references products(product_id) on update cascade,
    quantity int,
    user_id int references hey_users(user_id) on delete cascade,
    size varchar(55),
    item_total numeric
);

alter table bag_item add constraint bag_item_uq unique (bag_id,product_id,size);
alter table bag_item add item_total numeric;
