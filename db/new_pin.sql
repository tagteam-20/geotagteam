INSERT INTO gem_pin(
    lat,
    lng,
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