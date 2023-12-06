CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

CREATE TABLE users(
   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
   email citext NOT NULL,
   public_key text NOT NULL
);

create table
  groups (   
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text,
    slug citext,
    user_id uuid,
    public_key text NOT NULL,
    created_at timestamp, 
    updated_at timestamp,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
  );

