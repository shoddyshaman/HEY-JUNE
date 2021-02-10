select b.bag_item_id,h.first_name, h.last_name,p.product_id, p.product_name, p.price, p.product_img,p.category,p.description, b.quantity, b.size, b.bag_id
from bag_item b
join products p on p.product_id = b.product_id
join hey_users h on b.user_id = h.user_id
where h.user_id = $1
order by b.bag_item_id ;