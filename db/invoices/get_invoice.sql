select ii.* , p.product_name, p.price, p.product_img, i.*, h.first_name, h.last_name,h.email from invoice_item ii 
left join invoices i on i.invoice_id = ii.invoice_id
left join products p on p.product_id = ii.product_id
left join hey_users h on h.user_id = i.user_id
where i.invoice_id = ${invoice_id};



