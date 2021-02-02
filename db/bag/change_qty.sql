update bag_item
set quantity = $1 where user_id = $2 and product_id = $3;