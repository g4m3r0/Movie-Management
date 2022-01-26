create or replace procedure initialize()
language plpgsql
as $$
begin
	-- > TABLES
  	-- >> DROP TABLES
      -- >>> TABLE mm_role
      if exists(select * from pg_tables where tablename = 'mm_role')
      	then drop table mm_role;
      end if;
      -- <<< DROP TABLE mm_role
      
      -- >>> DROP TABLE mm_genre_relation
      if exists(select * from pg_tables where tablename = 'mm_genre_relation') then
        drop table mm_genre_relation;
      end if;
      -- <<< DROP TABLE mm_genre_relation
      
      -- >>> DROP TABLE mm_ratin
      if exists(select * from pg_tables where tablename = 'mm_rating') then
        drop table mm_genre_relation;
      end if;
      -- <<< DROP TABLE mm_rating

      -- >>> DROP TABLE mm_movie
      if exists(select * from pg_tables where tablename = 'mm_movie') then
        drop table mm_movie;
      end if;
      -- <<< DROP TABLE mm_movie

      -- >>> DROP TABLE mm_person
      if exists(select * from pg_tables where tablename = 'mm_person') then
        drop table mm_person;
      end if;
      -- <<< DROP TABLE mm_person

      -- >>> DROP TABLE mm_user
      if exists(select * from pg_tables where tablename = 'mm_user') then
        drop table mm_user;
      end if;
      -- <<< DROP TABLE mm_user
      
      -- >>> DROP TABLE mm_genre
      if exists(select * from pg_tables where tablename = 'mm_genre') then
        drop table mm_genre;
      end if;
      -- <<< DROP TABLE mm_genre
    -- << DROP TABLES
    
    -- >> CREATE TABLES
    	-- >>> CREATE TABLE mm_movie
    	create table mm_movie (
        id serial primary key,
        parent_movie int,
        title varchar,
        release_year int,
        required_age int,
        production_country varchar,
        unique(title, release_year)
      );
      -- <<< CREATE TABLE mm_movie
    	
      -- >>> CREATE TABLE mm_person
      create table mm_person (
        id serial primary key,
        last_name varchar,
        first_name varchar,
        birthday date,
        sex int,
        cv varchar
      );
      -- <<< CREATE TABLE mm_person
      
      -- >>> CREATE TABLE mm_user
      create table mm_user (
        id serial primary key,
        last_name varchar,
        first_name varchar,
        birthday date,
        sex int,
        email varchar
      );
      -- <<< CREATE TABLE mm_user
      
    	-- >>> CREATE TABLE mm_role
      create table mm_role (
        id serial primary key,
        person_id int,
        movie_id int,
        role_type varchar,
        constraint fk_mm_person
        	foreign key(person_id)
        		references mm_person(id)
      );
      -- <<< CREATE TABLE mm_role
      
      -- >>> CREATE TABLE mm_genre
      create table mm_genre (
        id serial primary key,
				genre_name varchar
      );
      -- <<< CREATE TABLE mm_genre
      
      -- >>> CREATE TABLE mm_genre_relation
      create table mm_genre_relation (
        id serial primary key,
				movie_id int,
        genre_id int,
        constraint fk_mm_movie_genre
        	foreign key(movie_id) references mm_movie(id),
        	foreign key(genre_id) references mm_genre(id)
      );
      -- <<< CREATE TABLE mm_genre_relation
      
      -- >>> CREATE TABLE mm_rating
      create table mm_rating (
        id serial primary key,
				user_id int,
        genre_id int,
        constraint fk_mm_user_genre
        	foreign key(user_id) references mm_user(id),
        	foreign key(genre_id) references mm_genre(id)
      );
      -- <<< CREATE TABLE mm_rating
    -- << CREATE TABLES
  -- < TABLES
  
  -- > FUNCTIONS
  
  -- < FUNCTIONS
  
  -- > TRIGGERS
  
  -- < TRIGGERS
end; $$;

call initialize();