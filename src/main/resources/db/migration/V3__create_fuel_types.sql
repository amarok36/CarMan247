CREATE TABLE IF NOT EXISTS fuel_types (
    id SERIAL PRIMARY KEY,
    title VARCHAR(10) NOT NULL
);

INSERT INTO fuel_types (title)
VALUES
    ('бензин'),
    ('дизель'),
    ('газ'),
    ('электро');