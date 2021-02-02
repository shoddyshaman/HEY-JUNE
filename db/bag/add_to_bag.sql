insert into bag_item (
    bag_id,
    product_id,
    quantity,
    user_id
) values (
    (select bag_id from bag where user_id = $1),
    $2,
    $3,
    $1
) returning bag_id,product_id, quantity,user_id;
