INSERT INTO users(id,name,email,password) VALUES
(1,'Sajal','sajalmondal@gmail.com','{{password}}'),
(2,'Emon','emon@gmail.com','{{password}}') ON CONFLICT (email) DO NOTHING;