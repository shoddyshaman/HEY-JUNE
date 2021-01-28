insert into invoices (
    user_id,
    billing_address_1,
    billing_address_2,
    billing_city,
    billing_state,
    billing_zip
) values (
    ${user_id},
    ${billing_address_1},
    ${billing_address_2},
    ${billing_city},
    ${billing_state},
    ${billing_zip}
) returning user_id,
    billing_address_1,
    billing_address_2,
    billing_city,
    billing_state,
    billing_zip;