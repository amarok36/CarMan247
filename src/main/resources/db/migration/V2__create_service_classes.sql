CREATE TABLE IF NOT EXISTS service_classes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(10) NOT NULL
);

INSERT INTO service_classes (title)
VALUES
    ('эконом'),
    ('комфорт'),
    ('бизнес'),
    ('премиум');