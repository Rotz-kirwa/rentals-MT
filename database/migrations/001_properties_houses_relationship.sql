-- Apply to the EXISTING My Nyumba database only.
-- This is a migration, NOT a new database/schema.
-- If the existing tables already contain these columns, skip the corresponding statements.

ALTER TABLE properties
  ADD COLUMN number_of_units INT UNSIGNED NULL,
  ADD COLUMN location VARCHAR(255) NULL,
  ADD COLUMN address VARCHAR(255) NULL,
  ADD COLUMN property_type VARCHAR(100) NULL,
  ADD COLUMN description TEXT NULL;

ALTER TABLE houses
  ADD COLUMN property_id INT UNSIGNED NULL,
  ADD COLUMN house_number VARCHAR(50) NULL,
  ADD COLUMN house_type VARCHAR(100) NULL,
  ADD COLUMN status VARCHAR(50) NULL;

ALTER TABLE houses
  ADD INDEX idx_houses_property_id (property_id);

ALTER TABLE houses
  ADD CONSTRAINT fk_houses_property
  FOREIGN KEY (property_id) REFERENCES properties(id)
  ON UPDATE CASCADE ON DELETE SET NULL;
