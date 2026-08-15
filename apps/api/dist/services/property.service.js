"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyService = void 0;
const database_1 = require("@my-nyumba/database");
const financial_js_1 = require("../utils/financial.js");
class PropertyService {
    static async listProperties() {
        return database_1.prisma.property.findMany({
            include: {
                landlord: { select: { id: true, fullName: true, phoneNumber: true } },
                _count: { select: { houses: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    static async createProperty(data) {
        return database_1.prisma.property.create({
            data: {
                name: data.name,
                propertyType: data.propertyType,
                location: data.location,
                address: data.address,
                managementFeePercentage: data.managementFeePercentage ?? 10.0,
                landlordId: data.landlordId,
            },
        });
    }
    static async getPropertyById(id) {
        const property = await database_1.prisma.property.findUnique({
            where: { id },
            include: {
                landlord: true,
                houses: { orderBy: { houseNumber: 'asc' } },
                propertyUtilities: { include: { utility: true } },
            },
        });
        if (!property) {
            const err = new Error(`Property with ID ${id} does not exist.`);
            err.statusCode = 404;
            err.code = 'NOT_FOUND';
            throw err;
        }
        return property;
    }
    static async listHouses(propertyId, status) {
        const where = {};
        if (propertyId)
            where.propertyId = propertyId;
        if (status)
            where.status = status;
        return database_1.prisma.house.findMany({
            where,
            include: {
                property: { select: { id: true, name: true, location: true } },
                leases: {
                    where: { status: 'ACTIVE' },
                    include: { tenant: { select: { id: true, fullName: true, phoneNumber: true } } },
                },
            },
            orderBy: { houseNumber: 'asc' },
        });
    }
    static async createHouse(data) {
        const existing = await database_1.prisma.house.findFirst({
            where: { propertyId: data.propertyId, houseNumber: data.houseNumber },
        });
        if (existing) {
            const err = new Error(`House number ${data.houseNumber} already exists in this property.`);
            err.statusCode = 400;
            err.code = 'DUPLICATE_HOUSE';
            throw err;
        }
        return database_1.prisma.house.create({
            data: {
                propertyId: data.propertyId,
                houseNumber: data.houseNumber,
                houseType: data.houseType,
                defaultRent: (0, financial_js_1.roundMoney)(data.defaultRent),
                defaultDeposit: (0, financial_js_1.roundMoney)(data.defaultDeposit),
                garbageFee: (0, financial_js_1.roundMoney)(data.garbageFee ?? 0),
            },
        });
    }
}
exports.PropertyService = PropertyService;
