SELECT  
    p.img, 
    p.title,
    p.id
FROM gem_favorite f 
JOIN gem_pin p ON p.id = f.pin_id
JOIN gem_user u ON u.id = p.author
WHERE f.user_id = ${id};