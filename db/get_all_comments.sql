SELECT r.*, u.username, u.profile_pic, u.id as comment_user_id FROM gem_rating r
JOIN gem_user u ON r.user_id = u.id
WHERE r.pin_id = ${id}
ORDER BY r.id ASC;