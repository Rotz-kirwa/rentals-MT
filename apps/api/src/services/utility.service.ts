import { prisma } from '@my-nyumba/database';
import { roundMoney } from '../utils/financial.js';

export class UtilityService {
  static async listUtilities() {
    let utilities = await prisma.utility.findMany();

    if (utilities.length === 0) {
      await prisma.utility.createMany({
        data: [
          { name: 'Water', billingType: 'METERED', unitName: 'm³', defaultRatePerUnit: 150.0 },
          { name: 'Electricity', billingType: 'METERED', unitName: 'kWh', defaultRatePerUnit: 28.0 },
          { name: 'Garbage', billingType: 'FIXED', unitName: 'month', defaultFixedCharge: 300.0 },
        ],
      });
      utilities = await prisma.utility.findMany();
    }

    return utilities;
  }

  static async listReadings(houseId?: string) {
    return prisma.utilityReading.findMany({
      where: houseId ? { houseId } : undefined,
      include: {
        house: { select: { houseNumber: true, property: { select: { name: true } } } },
        utility: true,
      },
      orderBy: { readingDate: 'desc' },
    });
  }

  static async recordReading(data: { houseId: string; utilityId: string; currentReading: number; readingDate: string; recordedBy?: string }) {
    const utility = await prisma.utility.findUnique({ where: { id: data.utilityId } });
    if (!utility) {
      const err: any = new Error('Specified utility does not exist.');
      err.statusCode = 404;
      err.code = 'NOT_FOUND';
      throw err;
    }

    const lastReading = await prisma.utilityReading.findFirst({
      where: { houseId: data.houseId, utilityId: data.utilityId },
      orderBy: { readingDate: 'desc' },
    });

    const previousReading = lastReading ? Number(lastReading.currentReading) : 0;
    if (data.currentReading < previousReading) {
      const err: any = new Error(`Current reading (${data.currentReading}) cannot be less than previous reading (${previousReading}).`);
      err.statusCode = 400;
      err.code = 'INVALID_READING';
      throw err;
    }

    const unitsUsed = roundMoney(data.currentReading - previousReading);
    const ratePerUnit = roundMoney(utility.defaultRatePerUnit);
    const totalCharge = roundMoney(unitsUsed * ratePerUnit);

    return prisma.utilityReading.create({
      data: {
        houseId: data.houseId,
        utilityId: data.utilityId,
        previousReading,
        currentReading: data.currentReading,
        unitsUsed,
        ratePerUnit,
        totalCharge,
        readingDate: new Date(data.readingDate),
        recordedBy: data.recordedBy || null,
      },
    });
  }
}
