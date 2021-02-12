insert into invoice_item (
    invoice_id,
    product_id,
    qty_ordered,
    size
) values (
    ${invoice_id},
    ${product_id},
    ${quantity},
    ${size}
) returning *