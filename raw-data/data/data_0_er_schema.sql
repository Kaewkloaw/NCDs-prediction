-- ER -> SQL DDL (SQLite / MySQL friendly types; ปรับ datatype ตาม DB ที่ใช้)

CREATE TABLE IF NOT EXISTS devices (
    serial_no VARCHAR(128) PRIMARY KEY,
    device_name VARCHAR(256),
    model VARCHAR(128),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS date_dim (
    date_id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_date DATE UNIQUE,
    year INTEGER,
    month INTEGER,
    day INTEGER,
    weekday INTEGER
);

-- activ (activity) table
CREATE TABLE IF NOT EXISTS activ (
    activ_id INTEGER PRIMARY KEY AUTOINCREMENT,
    serial_no VARCHAR(128) NOT NULL,
    measure_datetime DATETIME,
    battery_level FLOAT,
    calorie FLOAT,
    device VARCHAR(256),
    step INTEGER,
    temperature FLOAT,
    sleep_hour INTEGER,
    sleep_minute INTEGER,
    sleep_state VARCHAR(64),
    date_id INTEGER, -- FK to date_dim for faster joins (populate from measure_datetime)
    FOREIGN KEY (serial_no) REFERENCES devices(serial_no),
    FOREIGN KEY (date_id) REFERENCES date_dim(date_id)
);

-- exist table (presence / existence)
CREATE TABLE IF NOT EXISTS exist (
    exist_id INTEGER PRIMARY KEY AUTOINCREMENT,
    serial_no VARCHAR(128),
    measure_datetime DATETIME,
    device VARCHAR(256),
    exist_flag BOOLEAN,
    date_id INTEGER,
    FOREIGN KEY (serial_no) REFERENCES devices(serial_no),
    FOREIGN KEY (date_id) REFERENCES date_dim(date_id)
);

-- sphy (sphygmomanometer / blood pressure) table
CREATE TABLE IF NOT EXISTS sphy (
    sphy_id INTEGER PRIMARY KEY AUTOINCREMENT,
    serial_no VARCHAR(128) NOT NULL,
    measure_datetime DATETIME,
    battery_level FLOAT,
    device VARCHAR(256),
    systolic_pressure FLOAT,
    diastolic_pressure FLOAT,
    mean_arterial_pressure FLOAT,
    pulse_rate FLOAT,
    irregular_pulse_flag BOOLEAN,
    pulse_rate_range_flag BOOLEAN,
    date_id INTEGER,
    FOREIGN KEY (serial_no) REFERENCES devices(serial_no),
    FOREIGN KEY (date_id) REFERENCES date_dim(date_id)
);

-- temp table (temperature)
CREATE TABLE IF NOT EXISTS temp (
    temp_id INTEGER PRIMARY KEY AUTOINCREMENT,
    serial_no VARCHAR(128) NOT NULL,
    measure_datetime DATETIME,
    battery_level FLOAT,
    device VARCHAR(256),
    temperature FLOAT,
    date_id INTEGER,
    FOREIGN KEY (serial_no) REFERENCES devices(serial_no),
    FOREIGN KEY (date_id) REFERENCES date_dim(date_id)
);

-- weight / body composition table
CREATE TABLE IF NOT EXISTS weight (
    weight_id INTEGER PRIMARY KEY AUTOINCREMENT,
    serial_no VARCHAR(128),
    measure_datetime DATETIME,
    weight FLOAT,
    bmi FLOAT,
    body_fat_percentage FLOAT,
    skeletal_muscle_percentage FLOAT,
    visceral_fat_level FLOAT,
    basal_metabolism FLOAT,
    body_age INTEGER,
    battery_level FLOAT,
    device VARCHAR(256),
    date_id INTEGER,
    FOREIGN KEY (serial_no) REFERENCES devices(serial_no),
    FOREIGN KEY (date_id) REFERENCES date_dim(date_id)
);

-- generic / other table for miscellaneous columns
CREATE TABLE IF NOT EXISTS other (
    other_id INTEGER PRIMARY KEY AUTOINCREMENT,
    serial_no VARCHAR(128),
    measure_datetime DATETIME,
    raw_json TEXT, -- store unknown / messy columns as JSON/text
    date_id INTEGER,
    FOREIGN KEY (serial_no) REFERENCES devices(serial_no),
    FOREIGN KEY (date_id) REFERENCES date_dim(date_id)
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_activ_serial_date ON activ(serial_no, date_id);
CREATE INDEX IF NOT EXISTS idx_sphy_serial_date  ON sphy(serial_no, date_id);
CREATE INDEX IF NOT EXISTS idx_temp_serial_date  ON temp(serial_no, date_id);
CREATE INDEX IF NOT EXISTS idx_weight_serial_date ON weight(serial_no, date_id);
CREATE INDEX IF NOT EXISTS idx_exist_serial_date  ON exist(serial_no, date_id);

-- Notes:
-- 1) date_id intended to be filled by ETL: date_id = SELECT date_id FROM date_dim WHERE full_date = DATE(measure_datetime)
-- 2) ปรับความยาว VARCHAR และชนิดข้อมูลตามฐานข้อมูลจริง (Postgres / MySQL / SQLite)
-- 3) หากต้องการ PK เป็น (serial_no, measure_datetime) แทน autoinc id ให้แก้ PRIMARY KEY ตามต้องการ