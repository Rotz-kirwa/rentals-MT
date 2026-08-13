-- My Nyumba: Utilities migration
-- Run against the EXISTING My Nyumba database only.
-- This does NOT create a new database or replace existing tables.
CREATE TABLE IF NOT EXISTS utilities (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 billing_type ENUM('metered','fixed') NOT NULL DEFAULT 'fixed',
 unit_name VARCHAR(50) NULL,
 cost_per_unit DECIMAL(12,2) NOT NULL DEFAULT 0.00,
 standard_charge DECIMAL(12,2) NOT NULL DEFAULT 0.00,
 description TEXT NULL,
 status ENUM('active','inactive') NOT NULL DEFAULT 'active',
 created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS property_utilities (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 property_id INT UNSIGNED NOT NULL,
 utility_id INT UNSIGNED NOT NULL,
 cost_per_unit DECIMAL(12,2) NOT NULL DEFAULT 0.00,
 fixed_charge DECIMAL(12,2) NOT NULL DEFAULT 0.00,
 status ENUM('active','inactive') NOT NULL DEFAULT 'active',
 created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 UNIQUE KEY uq_property_utility (property_id,utility_id),
 CONSTRAINT fk_property_utilities_property FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT fk_property_utilities_utility FOREIGN KEY(utility_id) REFERENCES utilities(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS utility_readings (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 house_id INT UNSIGNED NOT NULL,
 utility_id INT UNSIGNED NOT NULL,
 previous_reading DECIMAL(14,3) NOT NULL DEFAULT 0.000,
 current_reading DECIMAL(14,3) NOT NULL DEFAULT 0.000,
 units_used DECIMAL(14,3) NOT NULL DEFAULT 0.000,
 rate_per_unit DECIMAL(12,2) NOT NULL DEFAULT 0.00,
 charge_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
 reading_date DATE NOT NULL,
 recorded_by INT UNSIGNED NULL,
 notes TEXT NULL,
 created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 CONSTRAINT fk_utility_readings_house FOREIGN KEY(house_id) REFERENCES houses(id) ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT fk_utility_readings_utility FOREIGN KEY(utility_id) REFERENCES utilities(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS utility_charges (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 house_id INT UNSIGNED NOT NULL,
 utility_id INT UNSIGNED NOT NULL,
 invoice_id INT UNSIGNED NULL,
 reading_id BIGINT UNSIGNED NULL,
 billing_period_start DATE NOT NULL,
 billing_period_end DATE NOT NULL,
 quantity DECIMAL(14,3) NOT NULL DEFAULT 0.000,
 rate DECIMAL(12,2) NOT NULL DEFAULT 0.00,
 amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
 charge_type ENUM('metered','fixed','manual') NOT NULL DEFAULT 'fixed',
 status ENUM('unbilled','invoiced','paid','void') NOT NULL DEFAULT 'unbilled',
 created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 CONSTRAINT fk_utility_charges_house FOREIGN KEY(house_id) REFERENCES houses(id) ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT fk_utility_charges_utility FOREIGN KEY(utility_id) REFERENCES utilities(id) ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT fk_utility_charges_reading FOREIGN KEY(reading_id) REFERENCES utility_readings(id) ON DELETE SET NULL ON UPDATE CASCADE,
 INDEX idx_utility_charges_invoice(invoice_id)
);
INSERT INTO utilities(name,billing_type,unit_name,cost_per_unit,standard_charge,description)
SELECT 'Water','metered','m³',100.00,0.00,'Water billed by meter usage' WHERE NOT EXISTS(SELECT 1 FROM utilities WHERE name='Water');
INSERT INTO utilities(name,billing_type,unit_name,cost_per_unit,standard_charge,description)
SELECT 'Electricity','metered','kWh',30.00,0.00,'Electricity billed by meter usage' WHERE NOT EXISTS(SELECT 1 FROM utilities WHERE name='Electricity');
INSERT INTO utilities(name,billing_type,unit_name,cost_per_unit,standard_charge,description)
SELECT 'Garbage','fixed','Month',0.00,500.00,'Standard monthly garbage charge' WHERE NOT EXISTS(SELECT 1 FROM utilities WHERE name='Garbage');
