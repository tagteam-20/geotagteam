INSERT INTO gem_rating(
    user_id,
    pin_id,
    rating,
    comment
)VALUES(
    ${user_id},
    ${pin_id},
    ${rating},
    ${comment}
);

SELECT r.*, u.username, u.profile_pic, u.id as comment_user_id FROM gem_rating r
JOIN gem_user u ON r.user_id = u.id
WHERE r.pin_id = ${pin_id};