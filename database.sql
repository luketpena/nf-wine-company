CREATE TABLE country (
	"id" SERIAL PRIMARY KEY,
  "name" VARCHAR,
	"country_code" VARCHAR,
	"favorite" BOOLEAN DEFAULT FALSE
);

CREATE TABLE region (
	"id" SERIAL PRIMARY KEY,
  "name" VARCHAR,
	"country_id" INT REFERENCES "country"
);

CREATE TABLE subregion (
	"id" SERIAL PRIMARY KEY,
  "name" VARCHAR,
	"region_id" INT REFERENCES "region"
	
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR UNIQUE NOT NULL,
    "password" VARCHAR NOT NULL,
    "email" VARCHAR,
    "access" VARCHAR NOT NULL
);

CREATE TABLE "requests" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR NOT NULL,
	"email" VARCHAR NOT NULL,
	"company" VARCHAR
);

CREATE TABLE "producers" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
	"description" varChar,
	"country_id" INT REFERENCES "country",
	"region_id" INT REFERENCES "region",
  "subregion_id" INT REFERENCES "subregion",
	"website_url" VARCHAR
);

CREATE TABLE "suppliers" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
	"description" VARCHAR,
	"website_url" VARCHAR
);

CREATE TABLE "events" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
	"description" VARCHAR,
  "location" VARCHAR,
	"date" DATE,
	"time" TIME,
	"price" DECIMAL(6,2),
  "link_url" VARCHAR,
  "link_text" VARCHAR,
  "trade" BOOLEAN
);