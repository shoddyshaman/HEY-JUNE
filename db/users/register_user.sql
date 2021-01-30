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
    ${firstName}, 
    ${lastName},
    ${email},
    ${hash},
    ${address1},
    ${address2},
    ${city},
    ${state},
    ${zipCode}
)
returning user_id, first_name, last_name, email, address_1, address_2, city, state, zip_code;