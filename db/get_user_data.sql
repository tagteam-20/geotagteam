SELECT 
    username,
    profile_pic,
    (
        SELECT COUNT(*) FROM gem_favorite 
        WHERE user_id = ${id}
    ) as favorite_count
FROM gem_user
WHERE id = ${id};