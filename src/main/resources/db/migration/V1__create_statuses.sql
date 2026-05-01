CREATE TABLE IF NOT EXISTS statuses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(25) NOT NULL
    );

INSERT INTO statuses (title)
VALUES
    ('доступен'),
    ('арендован'),
    ('на ТО'),
    ('неисправен');