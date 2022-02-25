create database chat_message;
create extension pgcrypto;


drop table if exists users cascade;
drop table if exists messages cascade;


create table users (
    user_id serial not null primary key,
    fullname varchar(64) not null,
    username varchar(32) not null unique,
    password varchar(128) not null,
    avatar_img text,
    user_created_at timestamptz default current_timestamp
);


create table messages (
    message_id serial not null primary key,
    send_userId int not null references users(user_id),
    received_userId int not null references users(user_id),
    send_message varchar(9000) not null,
    file_type varchar(100) not null,
    message_created_at timestamptz default current_timestamp
);




