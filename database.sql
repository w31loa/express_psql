
create TABLE position(
    id SERIAL PRIMARY KEY,
    position_name VARCHAR(255),
    clock_rate INTEGER,
    hourly_rate INTEGER
);


create TABLE workshop(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    workers_amount INTEGER
);

create TABLE worker(
    id SERIAL PRIMARY KEY,
    surname VARCHAR(255),
    firstname  VARCHAR(255),
    patronymic VARCHAR(255),
    position_id INTEGER,
    workshop_id INTEGER,
    FOREIGN KEY (position_id) REFERENCES position(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (workshop_id) REFERENCES workshop(id) ON DELETE CASCADE ON UPDATE CASCADE
);

create TABLE teapot(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    volume INTEGER,
    power INTEGER,
    material VARCHAR(255),
    date DATE
);

create TABLE detail(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    teapot_id INTEGER,
    workshop_id INTEGER,
    FOREIGN KEY (teapot_id) REFERENCES teapot(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (workshop_id) REFERENCES workshop(id) ON DELETE CASCADE ON UPDATE CASCADE
);


	