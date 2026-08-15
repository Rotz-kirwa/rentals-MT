import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding My Nyumba Enterprise Database...');

  // Clean existing tables in order
  await prisma.auditLog.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.maintenanceTicket.deleteMany();
  await prisma.mpesaTransaction.deleteMany();
  await prisma.receipt.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.invoiceItem.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.utilityReading.deleteMany();
  await prisma.propertyUtility.deleteMany();
  await prisma.lease.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.house.deleteMany();
  await prisma.property.deleteMany();
  await prisma.landlord.deleteMany();
  await prisma.utility.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Core System Users
  const adminPassword = await bcrypt.hash('admin123', 12);
  const managerPassword = await bcrypt.hash('manager123', 12);
  const financePassword = await bcrypt.hash('finance123', 12);
  const caretakerPassword = await bcrypt.hash('caretaker123', 12);
  const tenantPassword = await bcrypt.hash('tenant123', 12);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      fullName: 'System Administrator',
      phoneNumber: '0700000000',
      passwordHash: adminPassword,
      role: 'SUPER_ADMIN',
    },
  });

  const manager = await prisma.user.create({
    data: {
      email: 'manager@example.com',
      fullName: 'Patrick Kilonzo (Property Manager)',
      phoneNumber: '0711111111',
      passwordHash: managerPassword,
      role: 'PROPERTY_MANAGER',
    },
  });

  const financeOfficer = await prisma.user.create({
    data: {
      email: 'finance@example.com',
      fullName: 'Sarah Cherono (Finance Head)',
      phoneNumber: '0722222222',
      passwordHash: financePassword,
      role: 'FINANCE_OFFICER',
    },
  });

  const caretaker = await prisma.user.create({
    data: {
      email: 'caretaker@example.com',
      fullName: 'Joseph Omwamba (Caretaker)',
      phoneNumber: '0733333333',
      passwordHash: caretakerPassword,
      role: 'CARETAKER',
    },
  });

  console.log('✅ Staff Accounts Created (Super Admin, Manager, Finance, Caretaker)');

  // 2. Create Landlords
  const landlord1 = await prisma.landlord.create({
    data: {
      fullName: 'Samuel Mwangi',
      email: 'samuel.mwangi@example.com',
      phoneNumber: '0721998877',
      bankName: 'KCB Bank',
      bankAccountNumber: '1102938475',
      mpesaPaybillPhone: '0721998877',
    },
  });

  const landlord2 = await prisma.landlord.create({
    data: {
      fullName: 'Beatrice Nduta',
      email: 'beatrice.nduta@example.com',
      phoneNumber: '0733887766',
      bankName: 'NCBA Bank',
      bankAccountNumber: '654987321',
      mpesaPaybillPhone: '0733887766',
    },
  });

  const landlord3 = await prisma.landlord.create({
    data: {
      fullName: 'Kipchumba Bett',
      email: 'bett@example.com',
      phoneNumber: '0788112233',
      bankName: 'Equity Bank',
      bankAccountNumber: '011029384756',
      mpesaPaybillPhone: '0788112233',
    },
  });

  console.log('✅ Landlords Created: Samuel Mwangi, Beatrice Nduta, Kipchumba Bett');

  // 3. Create Utilities Catalog
  const water = await prisma.utility.create({
    data: {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Water',
      billingType: 'METERED',
      unitName: 'm³',
      defaultRatePerUnit: 150.0,
    },
  });

  const electricity = await prisma.utility.create({
    data: {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Electricity',
      billingType: 'METERED',
      unitName: 'kWh',
      defaultRatePerUnit: 28.0,
    },
  });

  console.log('✅ Master Utilities Created: Water, Electricity');

  // 4. Properties & Units Setup
  const prop1 = await prisma.property.create({
    data: {
      name: 'Kilimani Heights Apartments',
      propertyType: 'Multi-Family Residential',
      location: 'Kilimani, Nairobi',
      address: 'Kindaruma Road, Block B',
      landlordId: landlord1.id,
      managementFeePercentage: 8.5,
      houses: {
        create: [
          { houseNumber: 'A-101', houseType: '1BR Apartment', defaultRent: 35000, defaultDeposit: 35000, garbageFee: 600, status: 'OCCUPIED' },
          { houseNumber: 'A-102', houseType: '2BR Master Ensuite', defaultRent: 50000, defaultDeposit: 50000, garbageFee: 600, status: 'OCCUPIED' },
          { houseNumber: 'A-103', houseType: '2BR Master Ensuite', defaultRent: 52000, defaultDeposit: 52000, garbageFee: 600, status: 'OCCUPIED' },
          { houseNumber: 'A-104', houseType: '3BR Luxury Suite', defaultRent: 75000, defaultDeposit: 75000, garbageFee: 800, status: 'VACANT' },
          { houseNumber: 'B-201', houseType: '1BR Apartment', defaultRent: 35000, defaultDeposit: 35000, garbageFee: 600, status: 'OCCUPIED' },
          { houseNumber: 'B-202', houseType: '2BR Master Ensuite', defaultRent: 50000, defaultDeposit: 50000, garbageFee: 600, status: 'MAINTENANCE' },
          { houseNumber: 'B-203', houseType: 'Studio / Bedsitter', defaultRent: 22000, defaultDeposit: 22000, garbageFee: 400, status: 'VACANT' },
        ],
      },
    },
    include: { houses: true },
  });

  const prop2 = await prisma.property.create({
    data: {
      name: 'Westlands Executive Suites',
      propertyType: 'Mixed Commercial & Residential',
      location: 'Westlands, Nairobi',
      address: 'Muthangari Drive',
      landlordId: landlord2.id,
      managementFeePercentage: 10.0,
      houses: {
        create: [
          { houseNumber: 'W-01', houseType: 'Commercial Office Suite', defaultRent: 120000, defaultDeposit: 120000, garbageFee: 1500, status: 'OCCUPIED' },
          { houseNumber: 'W-02', houseType: '2BR Executive Flat', defaultRent: 65000, defaultDeposit: 65000, garbageFee: 800, status: 'OCCUPIED' },
          { houseNumber: 'W-03', houseType: '3BR Penthouse', defaultRent: 110000, defaultDeposit: 110000, garbageFee: 1000, status: 'OCCUPIED' },
          { houseNumber: 'W-04', houseType: '1BR Furnished Unit', defaultRent: 48000, defaultDeposit: 48000, garbageFee: 600, status: 'VACANT' },
        ],
      },
    },
    include: { houses: true },
  });

  const prop3 = await prisma.property.create({
    data: {
      name: 'Parklands View Plaza',
      propertyType: 'Multi-Family Residential',
      location: 'Parklands, Nairobi',
      address: '3rd Parklands Avenue',
      landlordId: landlord1.id,
      managementFeePercentage: 9.0,
      houses: {
        create: [
          { houseNumber: 'PV-10', houseType: '2BR Standard', defaultRent: 42000, defaultDeposit: 42000, garbageFee: 500, status: 'OCCUPIED' },
          { houseNumber: 'PV-11', houseType: '2BR Standard', defaultRent: 42000, defaultDeposit: 42000, garbageFee: 500, status: 'OCCUPIED' },
          { houseNumber: 'PV-12', houseType: '3BR Family Unit', defaultRent: 60000, defaultDeposit: 60000, garbageFee: 700, status: 'VACANT' },
        ],
      },
    },
    include: { houses: true },
  });

  const prop4 = await prisma.property.create({
    data: {
      name: 'Karen Villa Estate',
      propertyType: 'Gated Townhouse Estate',
      location: 'Karen, Nairobi',
      address: 'Dagoretti Road, Gate 4',
      landlordId: landlord3.id,
      managementFeePercentage: 7.5,
      houses: {
        create: [
          { houseNumber: 'KV-01', houseType: '4BR Villa + DSQ', defaultRent: 180000, defaultDeposit: 180000, garbageFee: 2000, status: 'OCCUPIED' },
          { houseNumber: 'KV-02', houseType: '4BR Villa + DSQ', defaultRent: 180000, defaultDeposit: 180000, garbageFee: 2000, status: 'OCCUPIED' },
        ],
      },
    },
    include: { houses: true },
  });

  console.log('✅ 4 Properties & 16 Houses Provisioned across Nairobi');

  // 5. Create Tenants & Leases & Financial Records
  const tenant1User = await prisma.user.create({
    data: {
      email: 'jane@example.com',
      fullName: 'Jane Wanjiku',
      phoneNumber: '0712345678',
      passwordHash: tenantPassword,
      role: 'TENANT',
    },
  });

  const tenant1 = await prisma.tenant.create({
    data: {
      userId: tenant1User.id,
      fullName: 'Jane Wanjiku',
      email: 'jane@example.com',
      phoneNumber: '0712345678',
      nationalId: '33445566',
      emergencyContactName: 'Peter Wanjiku (Brother)',
      emergencyContactPhone: '0722001122',
    },
  });

  const tenant2 = await prisma.tenant.create({
    data: {
      fullName: 'David Ochieng',
      email: 'david.ochieng@example.com',
      phoneNumber: '0723456789',
      nationalId: '29881122',
      emergencyContactName: 'Grace Ochieng (Spouse)',
      emergencyContactPhone: '0733990011',
    },
  });

  const tenant3 = await prisma.tenant.create({
    data: {
      fullName: 'Grace Kamau',
      email: 'grace.kamau@example.com',
      phoneNumber: '0734567890',
      nationalId: '31224455',
      emergencyContactName: 'John Kamau (Father)',
      emergencyContactPhone: '0711882233',
    },
  });

  const tenant4 = await prisma.tenant.create({
    data: {
      fullName: 'Brian Kiprop',
      email: 'brian.kiprop@example.com',
      phoneNumber: '0745678901',
      nationalId: '34556677',
      emergencyContactName: 'Anita Kiprop (Sister)',
      emergencyContactPhone: '0722334455',
    },
  });

  const tenant5 = await prisma.tenant.create({
    data: {
      fullName: 'Mercy Mutua',
      email: 'mercy.mutua@example.com',
      phoneNumber: '0756789012',
      nationalId: '28990011',
      emergencyContactName: 'Kevin Mutua (Spouse)',
      emergencyContactPhone: '0733445566',
    },
  });

  const tenant6 = await prisma.tenant.create({
    data: {
      fullName: 'Aisha Mohamed',
      email: 'aisha.mohamed@example.com',
      phoneNumber: '0767890123',
      nationalId: '36778899',
      emergencyContactName: 'Fatuma Mohamed (Mother)',
      emergencyContactPhone: '0711556677',
    },
  });

  console.log('✅ Resident Profiles Created: Jane Wanjiku, David Ochieng, Grace Kamau, Brian Kiprop, Mercy Mutua, Aisha Mohamed');

  // Assign Leases & Generate Financial Invoices/Payments
  const houseA101 = prop1.houses.find((h) => h.houseNumber === 'A-101')!;
  const houseA102 = prop1.houses.find((h) => h.houseNumber === 'A-102')!;
  const houseA103 = prop1.houses.find((h) => h.houseNumber === 'A-103')!;
  const houseW01 = prop2.houses.find((h) => h.houseNumber === 'W-01')!;
  const houseW02 = prop2.houses.find((h) => h.houseNumber === 'W-02')!;
  const houseKV01 = prop4.houses.find((h) => h.houseNumber === 'KV-01')!;

  // Lease 1: Jane Wanjiku (Kilimani A-101) - PAID
  const lease1 = await prisma.lease.create({
    data: {
      houseId: houseA101.id,
      tenantId: tenant1.id,
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-12-31'),
      monthlyRent: 35000,
      securityDeposit: 35000,
      rentDueDay: 5,
      status: 'ACTIVE',
    },
  });

  const inv1 = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-202608-001',
      leaseId: lease1.id,
      tenantId: tenant1.id,
      houseId: houseA101.id,
      billingPeriodMonth: 8,
      billingPeriodYear: 2026,
      dueDate: new Date('2026-08-05'),
      subtotalAmount: 35600,
      totalAmount: 35600,
      paidAmount: 35600,
      balance: 0,
      status: 'PAID',
      items: {
        create: [
          { description: 'Base Rent (August 2026)', itemType: 'RENT', amount: 35000 },
          { description: 'Garbage Collection Fee', itemType: 'GARBAGE', amount: 600 },
        ],
      },
    },
  });

  const pay1 = await prisma.payment.create({
    data: {
      paymentNumber: 'PAY-202608-001',
      invoiceId: inv1.id,
      tenantId: tenant1.id,
      amountPaid: 35600,
      paymentDate: new Date('2026-08-03'),
      method: 'MPESA',
      transactionReference: 'QHJ82KLA91',
      notes: 'M-Pesa STK Push Payment via 0712345678',
      receipt: {
        create: {
          receiptNumber: 'RCT-202608-001',
          issuedAt: new Date('2026-08-03'),
        },
      },
    },
  });

  await prisma.mpesaTransaction.create({
    data: {
      checkoutRequestId: 'ws_CO_178679001',
      mpesaReceiptNumber: 'QHJ82KLA91',
      phoneNumber: '0712345678',
      amount: 35600,
      status: 'PROCESSED',
      rawPayload: { ResultCode: 0, ResultDesc: 'The service request is processed successfully.' },
    },
  });

  // Lease 2: David Ochieng (Kilimani A-102) - OVERDUE ARREARS
  const lease2 = await prisma.lease.create({
    data: {
      houseId: houseA102.id,
      tenantId: tenant2.id,
      startDate: new Date('2025-09-01'),
      endDate: new Date('2026-08-31'),
      monthlyRent: 50000,
      securityDeposit: 50000,
      rentDueDay: 5,
      status: 'ACTIVE',
    },
  });

  await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-202608-002',
      leaseId: lease2.id,
      tenantId: tenant2.id,
      houseId: houseA102.id,
      billingPeriodMonth: 8,
      billingPeriodYear: 2026,
      dueDate: new Date('2026-08-05'),
      subtotalAmount: 50600,
      totalAmount: 50600,
      paidAmount: 15000,
      balance: 35600,
      status: 'OVERDUE',
      items: {
        create: [
          { description: 'Base Rent (August 2026)', itemType: 'RENT', amount: 50000 },
          { description: 'Garbage Collection Fee', itemType: 'GARBAGE', amount: 600 },
        ],
      },
    },
  });

  // Lease 3: Grace Kamau (Kilimani A-103) - UNPAID
  const lease3 = await prisma.lease.create({
    data: {
      houseId: houseA103.id,
      tenantId: tenant3.id,
      startDate: new Date('2026-02-01'),
      endDate: new Date('2027-01-31'),
      monthlyRent: 52000,
      securityDeposit: 52000,
      rentDueDay: 5,
      status: 'ACTIVE',
    },
  });

  await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-202608-003',
      leaseId: lease3.id,
      tenantId: tenant3.id,
      houseId: houseA103.id,
      billingPeriodMonth: 8,
      billingPeriodYear: 2026,
      dueDate: new Date('2026-08-05'),
      subtotalAmount: 52600,
      totalAmount: 52600,
      paidAmount: 0,
      balance: 52600,
      status: 'UNPAID',
      items: {
        create: [
          { description: 'Base Rent (August 2026)', itemType: 'RENT', amount: 52000 },
          { description: 'Garbage Collection Fee', itemType: 'GARBAGE', amount: 600 },
        ],
      },
    },
  });

  // Lease 4: Commercial Unit Westlands W-01 (Brian Kiprop)
  const lease4 = await prisma.lease.create({
    data: {
      houseId: houseW01.id,
      tenantId: tenant4.id,
      startDate: new Date('2025-06-01'),
      endDate: new Date('2026-08-30'), // Expiring soon!
      monthlyRent: 120000,
      securityDeposit: 120000,
      rentDueDay: 1,
      status: 'ACTIVE',
    },
  });

  await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-202608-004',
      leaseId: lease4.id,
      tenantId: tenant4.id,
      houseId: houseW01.id,
      billingPeriodMonth: 8,
      billingPeriodYear: 2026,
      dueDate: new Date('2026-08-01'),
      subtotalAmount: 121500,
      totalAmount: 121500,
      paidAmount: 121500,
      balance: 0,
      status: 'PAID',
      items: {
        create: [
          { description: 'Commercial Suite Rent (August 2026)', itemType: 'RENT', amount: 120000 },
          { description: 'Commercial Garbage & Waste Charge', itemType: 'GARBAGE', amount: 1500 },
        ],
      },
    },
  });

  // Lease 5: Karen Villa KV-01 (Mercy Mutua)
  const lease5 = await prisma.lease.create({
    data: {
      houseId: houseKV01.id,
      tenantId: tenant5.id,
      startDate: new Date('2026-03-01'),
      endDate: new Date('2027-02-28'),
      monthlyRent: 180000,
      securityDeposit: 180000,
      rentDueDay: 5,
      status: 'ACTIVE',
    },
  });

  await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-202608-005',
      leaseId: lease5.id,
      tenantId: tenant5.id,
      houseId: houseKV01.id,
      billingPeriodMonth: 8,
      billingPeriodYear: 2026,
      dueDate: new Date('2026-08-05'),
      subtotalAmount: 182000,
      totalAmount: 182000,
      paidAmount: 182000,
      balance: 0,
      status: 'PAID',
      items: {
        create: [
          { description: 'Villa Base Rent (August 2026)', itemType: 'RENT', amount: 180000 },
          { description: 'Estate Garbage & Security Service Fee', itemType: 'GARBAGE', amount: 2000 },
        ],
      },
    },
  });

  console.log('✅ Leases & Billing Invoices Seeded (Paid, Unpaid, Overdue, Expiring Soon)');

  // 6. Maintenance Work Orders
  await prisma.maintenanceTicket.create({
    data: {
      houseId: houseA102.id,
      tenantId: tenant2.id,
      title: 'Water Pipe Leakage in Master Bathroom',
      description: 'The hot water pipe under the master vanity is leaking heavily onto floor tiles.',
      priority: 'EMERGENCY',
      status: 'IN_PROGRESS',
      costEstimate: 12000,
      createdAt: new Date('2026-08-14T09:30:00Z'),
    },
  });

  await prisma.maintenanceTicket.create({
    data: {
      houseId: prop1.houses.find((h) => h.houseNumber === 'B-202')!.id,
      title: 'Kitchen Cabinet Refurbishment & Repainting',
      description: 'Replacing swollen wood panels and applying moisture-resistant white gloss paint.',
      priority: 'MEDIUM',
      status: 'PENDING',
      costEstimate: 25000,
      createdAt: new Date('2026-08-12T14:15:00Z'),
    },
  });

  await prisma.maintenanceTicket.create({
    data: {
      houseId: houseW01.id,
      tenantId: tenant4.id,
      title: 'HVAC Air Conditioner Inspection',
      description: 'Annual servicing for central AC unit in commercial suite W-01.',
      priority: 'LOW',
      status: 'COMPLETED',
      costEstimate: 8500,
      createdAt: new Date('2026-08-08T10:00:00Z'),
    },
  });

  console.log('✅ Maintenance Work Orders Seeded');

  // 7. Property Operating Expenses
  await prisma.expense.create({
    data: {
      propertyId: prop1.id,
      title: 'Borehole Water Pump Servicing',
      category: 'Repairs & Maintenance',
      amount: 14500,
      expenseDate: new Date('2026-08-08'),
      vendorName: 'Nairobi Water Tech Services',
    },
  });

  await prisma.expense.create({
    data: {
      propertyId: prop1.id,
      title: 'Security Guard Monthly Contract',
      category: 'Security',
      amount: 45000,
      expenseDate: new Date('2026-08-01'),
      vendorName: 'KK Security Ltd',
    },
  });

  await prisma.expense.create({
    data: {
      propertyId: prop2.id,
      title: 'Commercial Generator Diesel Refill',
      category: 'Utilities',
      amount: 28000,
      expenseDate: new Date('2026-08-05'),
      vendorName: 'TotalEnergies Westlands',
    },
  });

  console.log('✅ Property Operating Expenses Seeded');

  // 8. Utility Meter Readings
  await prisma.utilityReading.create({
    data: {
      houseId: houseA101.id,
      utilityId: water.id,
      previousReading: 124.5,
      currentReading: 138.2,
      unitsUsed: 13.7,
      ratePerUnit: 150,
      totalCharge: 2055,
      readingDate: new Date('2026-07-31'),
      isBilled: true,
      recordedBy: caretaker.id,
    },
  });

  await prisma.utilityReading.create({
    data: {
      houseId: houseA102.id,
      utilityId: water.id,
      previousReading: 210.0,
      currentReading: 228.4,
      unitsUsed: 18.4,
      ratePerUnit: 150,
      totalCharge: 2760,
      readingDate: new Date('2026-07-31'),
      isBilled: true,
      recordedBy: caretaker.id,
    },
  });

  console.log('✅ Utility Readings Seeded');

  console.log('🎉 Enterprise Seeding Complete! Real-World Nairobi Dataset Ready.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
