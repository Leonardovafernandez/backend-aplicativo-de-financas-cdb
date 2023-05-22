create database clube_do_bug_financas;

create table users (
	id  serial primary key,
	name text not null,
	email text not null,
	password text not null,
	cpf text,
	phone text
)

create table client (
  id serial primary key,
  name text not null,
  email text not null,
  cpf text not null,
  phone text not null,
  defaulter boolean default false,
  address text,
  complement text,
  zip_code text,
  neighborhood text,
  city text,
  state text
)

create table charge (
  id serial primary key,
  value text not null,
  due_date text not null,
  paid_out boolean default false,
  client_id int references client(id)
)