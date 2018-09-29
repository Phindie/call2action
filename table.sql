create table users (
    id serial not null primary key,
    username text not null
);
create table stories(
    id serial not null primary key,
    users_id int not null,
    is_public boolean not null,
    content text not null,
    foreign key (users_id) references users(id)
);