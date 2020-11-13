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

SELECT * FROM gem_rating
WHERE pin_id = ${pin_id};