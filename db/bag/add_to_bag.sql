insert into bag_item (
    bag_id,
    product_id,
    quantity,
    user_id,
    size
) values (
    (select bag_id from bag where user_id = $3),
    $1,
    $2,
    $3,
    $4
) on conflict (bag_id, product_id,size) 
do update set quantity = excluded.quantity + $2
returning bag_item_id,bag_id,product_id, quantity,user_id,size;
