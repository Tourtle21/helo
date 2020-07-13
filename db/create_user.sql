insert into users (
    username, password, profile_pic
) values (
    ${username}, ${hash}, 'http://tny.im/mrd'
)
returning *;