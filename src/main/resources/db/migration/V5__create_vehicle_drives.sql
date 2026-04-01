CREATE TABLE IF NOT EXISTS vehicle_drives (
    id SERIAL PRIMARY KEY,
    title VARCHAR(10) NOT NULL
);

INSERT INTO vehicle_drives (title)
VALUES
    ('передний'),
    ('задний'),
    ('полный');