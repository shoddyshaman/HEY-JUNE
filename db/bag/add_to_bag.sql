insert into bag_item (
    bag_id,
    product_id,
    quantity,
    user_id,
    size,
    item_total
) values (
    (select bag_id from bag where user_id = ${user_id}),
    ${product_id},
    ${quantity},
    ${user_id},
    ${size},
    (select (${quantity} * p.price) from products p
    where p.product_id = ${product_id}
    ))
    on conflict (bag_id, product_id,size) 
    do update set quantity = excluded.quantity + ${quantity}
    returning bag_item_id,bag_id,product_id, quantity,user_id,size;
