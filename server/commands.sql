CREATE TABLE IF NOT EXISTS plants ( 
	plant_id SERIAL PRIMARY KEY NOT NULL,
    insert_date TIMESTAMP NOT NULL default CURRENT_TIMESTAMP,
    last_edit_date TIMESTAMP NOT NULL default CURRENT_TIMESTAMP,
    name TEXT UNIQUE NOT NULL,
    water_interval_days INT,
    last_water TIMESTAMP,
    water_deadline TIMESTAMP,
    nutr_interval_days INT,
    last_nutr TIMESTAMP,
    nutr_deadline TIMESTAMP,
    soil_interval_months INT,
    last_soil TIMESTAMP,
    soil_deadline TIMESTAMP,
    info TEXT
);

INSERT INTO plants (name, water_interval_days, last_water, nutr_interval_days, last_nutr, soil_interval_months, last_soil, info)
VALUES ('Anopinpalli', 20, CURRENT_TIMESTAMP, 20, CURRENT_TIMESTAMP, 18, CURRENT_TIMESTAMP, 'Istahdahan vaan, anoppi...');

INSERT INTO plants (name, water_interval_days, last_water, nutr_interval_days, last_nutr, soil_interval_months, last_soil, info)
VALUES ('Tyräkki', 14, CURRENT_TIMESTAMP, 24, CURRENT_TIMESTAMP, 32, CURRENT_TIMESTAMP, 'Upea katseenvangitsija.');

INSERT INTO plants (name, water_interval_days, last_water, nutr_interval_days, last_nutr, soil_interval_months, last_soil, info)
VALUES ('Kultaköynnös', 4, CURRENT_TIMESTAMP, 8, CURRENT_TIMESTAMP, 12, CURRENT_TIMESTAMP, 'Kasvaa nopeasti, antaa pistokkaita.');

INSERT INTO plants (name, water_interval_days, last_water, nutr_interval_days, last_nutr, soil_interval_months, last_soil, info)
VALUES ('Kodin onni', 2, CURRENT_TIMESTAMP, 10, CURRENT_TIMESTAMP, 20, CURRENT_TIMESTAMP, 'Kasteluksi riittää suihkuttelu.');

