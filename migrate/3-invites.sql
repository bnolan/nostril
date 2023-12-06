create table
  invites (   
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    code citext unique,
    sender_id uuid,
    payload text NOT NULL,
    created_at timestamp, 
    expires_at timestamp,
    CONSTRAINT fk_sender FOREIGN KEY(sender_id) REFERENCES users(id)
  );

