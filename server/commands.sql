CREATE TABLE IF NOT EXISTS plants ( 
	plant_id SERIAL PRIMARY KEY NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL default CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL default CURRENT_TIMESTAMP,
    plant_name TEXT UNIQUE NOT NULL,
    water_interval_days INT,
    last_water TIMESTAMP WITH TIME ZONE,
    water_deadline TIMESTAMP WITH TIME ZONE,
    nutr_interval_days INT,
    last_nutr TIMESTAMP WITH TIME ZONE,
    nutr_deadline TIMESTAMP WITH TIME ZONE,
    soil_interval_months INT,
    last_soil TIMESTAMP WITH TIME ZONE,
    soil_deadline TIMESTAMP WITH TIME ZONE,
    info TEXT
);

INSERT INTO plants (plant_name, water_interval_days, last_water, nutr_interval_days, last_nutr, soil_interval_months, last_soil, info)
VALUES ('Anopinpalli', 20, CURRENT_TIMESTAMP, 20, CURRENT_TIMESTAMP, 18, CURRENT_TIMESTAMP, 'Istahdahan vaan, anoppi...');

INSERT INTO plants (plant_name, water_interval_days, last_water, nutr_interval_days, last_nutr, soil_interval_months, last_soil, info)
VALUES ('Tyräkki', 14, CURRENT_TIMESTAMP, 24, CURRENT_TIMESTAMP, 32, CURRENT_TIMESTAMP, 'Upea katseenvangitsija.');

INSERT INTO plants (plant_name, water_interval_days, last_water, nutr_interval_days, last_nutr, soil_interval_months, last_soil, info)
VALUES ('Kultaköynnös', 4, CURRENT_TIMESTAMP, 8, CURRENT_TIMESTAMP, 12, CURRENT_TIMESTAMP, 'Kasvaa nopeasti, antaa pistokkaita.');

INSERT INTO plants (plant_name, water_interval_days, last_water, nutr_interval_days, last_nutr, soil_interval_months, last_soil, info)
VALUES ('Kodin onni', 2, CURRENT_TIMESTAMP, 10, CURRENT_TIMESTAMP, 20, CURRENT_TIMESTAMP, 'Kasteluksi riittää suihkuttelu.');

