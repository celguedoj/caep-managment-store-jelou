USE jeloudb;

INSERT INTO customers (name, email, phone)
VALUES
  ('Julian Alvarez', 'julian.alvarez@email.com', '3001234567'),
  ('Mariana Torres', 'mariana.torres@email.com', '3007654321'),
  ('Camilo Perez', 'camilo.perez@email.com', '3001112223'),
  ('Daniela Gomez', 'daniela.gomez@email.com', '3007654322'),
  ('Andres Ramirez', 'andres.ramirez@email.com', '3007654323'),
  ('Sofia Herrera', 'sofia.herrera@email.com', '3007654324'),
  ('Sebastian Lopez', 'sebastian.lopez@email.com', '3007654325');


INSERT INTO products (sku, name, price_cents, stock)
VALUES
  ('001', 'Camisa Polo', 85000, 20),
  ('002', 'Jean Vaqueros', 125000, 15),
  ('003', 'Zapatos Nike', 230000, 30),
  ('004', 'Camiseta Blanca', 50000, 50),
  ('005', 'Chaqueta Negra', 320000, 10),
  ('006', 'Pantalon Clasico', 140000, 12),
  ('007', 'Tenis Blancos Adidas', 180000, 25);