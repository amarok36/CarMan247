CREATE TABLE IF NOT EXISTS transmissions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(20) NOT NULL
);

INSERT INTO transmissions (title)
VALUES
    ('механическая'),
    ('автомат'),
    ('роботизированная'),
    ('вариатор');