CREATE TABLE gem_user(
    id SERIAL PRIMARY KEY,
    username VARCHAR(35),
    password TEXT,
    profile_pic TEXT
);

CREATE TABLE gem_pin(
    id SERIAL PRIMARY KEY,
    Y DECIMAL,
    X DECIMAL,
    img TEXT,
    description VARCHAR(250),
    title VARCHAR(35),
    author INTEGER REFERENCES gem_user(id) ON DELETE CASCADE
);

CREATE TABLE gem_rating(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES gem_user(id) ON DELETE CASCADE,
    pin_id INTEGER REFERENCES gem_pin(id) ON DELETE CASCADE,
    rating VARCHAR(1),
    comment VARCHAR(250)
);

CREATE TABLE gem_favorite(
    user_id INTEGER REFERENCES gem_user(id) ON DELETE CASCADE,
    pin_id INTEGER REFERENCES gem_pin(id) ON DELETE CASCADE
);