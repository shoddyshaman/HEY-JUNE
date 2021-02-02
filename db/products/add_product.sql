insert into products (
    product_name,
    price,
    product_img,
    category,
    description
) values (
    ${product_name},
    ${price},
    ${product_img},
    ${category},
    ${description}
) returning * ;