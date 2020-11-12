DO
$do$
BEGIN
    DELETE FROM gem_favorite
        WHERE user_id = ${user_id}
        AND pin_id = ${pin_id};
    IF NOT FOUND THEN
        INSERT INTO gem_favorite(user_id,pin_id)
            VALUES(${user_id},${pin_id});
    END IF;
END
$do$;