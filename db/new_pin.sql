INSERT INTO gem_pin(
    lat,
    long,
    img,
    description,
    title,
    author
)VALUES(
    ${lat},
    ${long},
    ${img},
    ${description},
    ${title},
    ${author}
) RETURNING id;