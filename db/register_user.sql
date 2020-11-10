INSERT INTO gem_user(
    username,
    password,
    profile_pic
)VALUES(
    $(username),
    ${hash},
    ${profile_pic}
);

SELECT username FROM gem_user
WHERE username = ${username};