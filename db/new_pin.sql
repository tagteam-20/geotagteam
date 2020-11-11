INSERT INTO gem_pin(
    lat,
    long,
    img,
    description,
    title,
    author
)VALUES(
    ${lat},
    ${lng},
    ${img},
    ${description},
    ${title},
    ${author}
) RETURNING id;