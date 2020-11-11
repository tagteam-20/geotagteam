INSERT INTO gem_pin(
    Y,
    X,
    img,
    description,
    title,
    author
)VALUES(
    ${y},
    ${x},
    ${img},
    ${description},
    ${title},
    ${author}
) RETURNING id;