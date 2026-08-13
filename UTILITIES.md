# Utilities

Utilities are integrated into the existing My Nyumba project and existing database.

- Water: metered, configurable cost per m³.
- Electricity: metered, configurable cost per kWh.
- Garbage: fixed monthly charge, editable.
- More utilities can be added without changing the houses table.
- Each property can override the default utility rate.
- Meter readings belong to a house/unit and calculate usage from previous/current readings.
- Utility charges can be linked to an existing invoice through `utility_charges.invoice_id`.

Run `database/migrations/002_utilities_existing_schema.sql` on the existing database. Do not create a new database.
