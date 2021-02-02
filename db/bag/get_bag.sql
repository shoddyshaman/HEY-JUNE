select h.first_name, h.last_name, p.product_name, p.price, p.product_img,p.category,p.description, b.quantity
from bag_order b
join products p on p.product_id = b.product_id
join hey_users h on b.user_id = h.user_id
where h.user_id = $1;