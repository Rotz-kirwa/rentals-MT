"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityService = void 0;
const database_1 = require("@my-nyumba/database");
const financial_js_1 = require("../utils/financial.js");
class UtilityService {
    static async listUtilities() {
        let utilities = await database_1.prisma.utility.findMany();
        if (utilities.length === 0) {
            await database_1.prisma.utility.createMany({
                data: [
                    { name: 'Water', billingType: 'METERED', unitName: 'm³', defaultRatePerUnit: 150.0 },
                    { name: 'Electricity', billingType: 'METERED', unitName: 'kWh', defaultRatePerUnit: 28.0 },
                    { name: 'Garbage', billingType: 'FIXED', unitName: 'month', defaultFixedCharge: 300.0 },
                ],
            });
            utilities = await database_1.prisma.utility.findMany();
        }
        return utilities;
    }
    static async listReadings(houseId) {
        return database_1.prisma.utilityReading.findMany({
            where: houseId ? { houseId } : undefined,
            include: {
                house: { select: { houseNumber: true, property: { select: { name: true } } } },
                utility: true,
            },
            orderBy: { readingDate: 'desc' },
        });
    }
    static async recordReading(data) {
        const utility = await database_1.prisma.utility.findUnique({ where: { id: data.utilityId } });
        if (!utility) {
            const err = new Error('Specified utility does not exist.');
            err.statusCode = 404;
            err.code = 'NOT_FOUND';
            throw err;
        }
        const lastReading = await database_1.prisma.utilityReading.findFirst({
            where: { houseId: data.houseId, utilityId: data.utilityId },
            orderBy: { readingDate: 'desc' },
        });
        const previousReading = lastReading ? Number(lastReading.currentReading) : 0;
        if (data.currentReading < previousReading) {
            const err = new Error(`Current reading (${data.currentReading}) cannot be less than previous reading (${previousReading}).`);
            err.statusCode = 400;
            err.code = 'INVALID_READING';
            throw err;
        }
        const unitsUsed = (0, financial_js_1.roundMoney)(data.currentReading - previousReading);
        const ratePerUnit = (0, financial_js_1.roundMoney)(utility.defaultRatePerUnit);
        const totalCharge = (0, financial_js_1.roundMoney)(unitsUsed * ratePerUnit);
        return database_1.prisma.utilityReading.create({
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
exports.UtilityService = UtilityService;
