insert into invoices (
    user_id,
    bag_id,
    shipping_address_1,
    shipping_address_2,
    shipping_city,
    shipping_state,
    shipping_zip,
    total,
    created_date
    )
    values (
    ${user_id},
    ${bag_id},
    ${address_1},
    ${address_2},
    ${city},
    ${state}, 
    ${zip_code},
    (select sum(item_total) from bag_item where bag_id = ${bag_id}),
    current_timestamp
    ) returning *


  
