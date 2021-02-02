insert into bag (
    user_id
) values (
    ${user_id}
)
returning *;