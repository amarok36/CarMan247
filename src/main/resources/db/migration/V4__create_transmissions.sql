CREATE TABLE IF NOT EXISTS transmissions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(10) NOT NULL
);

INSERT INTO transmissions (title)
VALUES
    ('передний'),
    ('задний'),
    ('полный');