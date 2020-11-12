SELECT 
    p.lat, 
    p.lng, 
    p.img, 
    p.description, 
    p.title,
    p.author as author_id, 
    u.username as author_username, 
    u.profile_pic as author_profile_pic
FROM gem_favorite f 
JOIN gem_pin p ON p.id = f.pin_id
JOIN gem_user u ON u.id = p.author
WHERE f.user_id = ${id};