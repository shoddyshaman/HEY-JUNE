insert into products (
    product_name,
    price,
    product_img,
    category,
    description
) values (
    ${productName},
    ${price},
    ${productImage},
    ${category},
    ${description}
) returning * ;