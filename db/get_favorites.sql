SELECT DISTINCT
    p.img, 
    p.title,
    p.id
FROM gem_pin p
LEFT JOIN gem_favorite f ON p.id = f.pin_id
JOIN gem_user u ON u.id = p.author
WHERE p.author = ${id} OR f.user_id = ${id};