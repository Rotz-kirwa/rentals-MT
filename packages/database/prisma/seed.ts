import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding My Nyumba Database...');

  // 1. Create Default Super Admin
  const adminPasswordHash = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      fullName: 'System Administrator',
      phoneNumber: '0700000000',
      passwordHash: adminPasswordHash,
      role: 'SUPER_ADMIN',
    },
  });
  console.log(`✅ Admin account created: ${admin.email}`);

  // 2. Create Default Utilities Catalog
  const water = await prisma.utility.upsert({
    where: { id: '11111111-1111-1111-1111-111111111111' },
    update: {},
    create: {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Water',
      billingType: 'METERED',
      unitName: 'm³',
      defaultRatePerUnit: 150.0,
    },
  });

  const electricity = await prisma.utility.upsert({
    where: { id: '22222222-2222-2222-2222-222222222222' },
    update: {},
    create: {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Electricity',
      billingType: 'METERED',
      unitName: 'kWh',
      defaultRatePerUnit: 28.0,
    },
  });

  console.log('✅ Master Utilities created: Water, Electricity');

  // 3. Create Sample Property & Houses
  const property = await prisma.property.create({
    data: {
      name: 'Kilimani Heights Apartments',
      propertyType: 'Multi-Family Residential',
      location: 'Kilimani, Nairobi',
      managementFeePercentage: 10.0,
      houses: {
        create: [
          { houseNumber: 'A-01', houseType: '1BR', defaultRent: 25000, defaultDeposit: 25000, garbageFee: 500, status: 'OCCUPIED' },
          { houseNumber: 'A-02', houseType: '2BR', defaultRent: 40000, defaultDeposit: 40000, garbageFee: 500, status: 'VACANT' },
          { houseNumber: 'B-01', houseType: 'Bedsitter', defaultRent: 15000, defaultDeposit: 15000, garbageFee: 300, status: 'VACANT' },
        ],
      },
    },
    include: { houses: true },
  });

  console.log(`✅ Property created: ${property.name} with ${property.houses.length} units.`);

  // 4. Create Sample Tenant & Lease
  const occupiedHouse = property.houses.find((h) => h.houseNumber === 'A-01');
  if (occupiedHouse) {
    const tenant = await prisma.tenant.create({
      data: {
        fullName: 'Jane Wanjiku',
        phoneNumber: '0712345678',
        nationalId: '33445566',
        email: 'jane@example.com',
      },
    });

    const lease = await prisma.lease.create({
      data: {
        houseId: occupiedHouse.id,
        tenantId: tenant.id,
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-12-31'),
        monthlyRent: 25000,
        securityDeposit: 25000,
        rentDueDay: 5,
        status: 'ACTIVE',
      },
    });

    // Create Initial Invoice
    await prisma.invoice.create({
      data: {
        invoiceNumber: 'INV-202608-1001',
        leaseId: lease.id,
        tenantId: tenant.id,
        houseId: occupiedHouse.id,
        billingPeriodMonth: 8,
        billingPeriodYear: 2026,
        dueDate: new Date('2026-08-05'),
        subtotalAmount: 25500,
        totalAmount: 25500,
        paidAmount: 0,
        balance: 25500,
        status: 'UNPAID',
        items: {
          create: [
            { description: 'Base Rent (August 2026)', itemType: 'RENT', amount: 25000 },
            { description: 'Garbage Collection Fee', itemType: 'GARBAGE', amount: 500 },
          ],
        },
      },
    });

    console.log(`✅ Tenant ${tenant.fullName} assigned to Unit A-01 with initial invoice.`);
  }

  console.log('🎉 Seeding Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
