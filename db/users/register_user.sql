insert into hey_users (
    first_name, 
    last_name,
    email,
    password,
    address_1,
    address_2,
    city,
    state,
    zip_code
) values (
    ${first_name}, 
    ${last_name},
    ${email},
    ${hash},
    ${address_1},
    ${address_2},
    ${city},
    ${state},
    ${zip_code}
)
returning first_name, last_name, email, address1, address2, city, state, zip_code;