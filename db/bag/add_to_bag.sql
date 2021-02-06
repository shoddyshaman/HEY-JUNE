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
) returning bag_id,product_id, quantity,user_id,size;
