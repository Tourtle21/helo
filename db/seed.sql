create table users (
    id serial primary key,
    username varchar(100),
    password varchar(20),
    profile_pic text
);

create table posts (
    id serial primary key,
    title varchar(45),
    img text,
    content text,
    author_id integer references users(id)
);

alter table users alter column password type text;

insert into users (
    username, password, profile_pic
) values (
    'blockbeard', 'kliden', 'http://tny.im/mrd'
)

insert into posts (
    title, img, content, author_id
) values (
    'Shark Attack', 'http://tny.im/mre', 'Shark attacks bird and grows wings in the process!', 1
)

insert into posts (
    title, img, content, author_id
) values (
    'Flying Shark', 'http://tny.im/mrf', 'Shark flies over the ocean and attacks fish from above.', 1
)