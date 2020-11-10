INSERT INTO gem_user(
    username,
    password
)VALUES(
    $(username),
    ${hash}
);

SELECT username FROM gem_user
WHERE username = ${username};