"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyService = void 0;
const database_1 = require("@my-nyumba/database");
const financial_js_1 = require("../utils/financial.js");
class PropertyService {
    static async listProperties() {
        const properties = await database_1.prisma.property.findMany({
            include: {
                landlord: { select: { id: true, fullName: true, phoneNumber: true } },
                houses: {
                    include: {
                        leases: { where: { status: 'ACTIVE' } },
                        invoices: { where: { status: { not: 'VOID' } } },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return properties.map((prop) => {
            const totalUnits = prop.houses.length;
            const occupiedUnits = prop.houses.filter((h) => h.status === 'OCCUPIED').length;
            const vacantUnits = prop.houses.filter((h) => h.status === 'VACANT').length;
            const maintenanceUnits = prop.houses.filter((h) => h.status === 'MAINTENANCE').length;
            const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
            let monthlyRevenue = 0;
            let totalArrears = 0;
            prop.houses.forEach((house) => {
                house.invoices.forEach((inv) => {
                    monthlyRevenue += Number(inv.paidAmount);
                    totalArrears += Number(inv.balance);
                });
            });
            return {
                id: prop.id,
                name: prop.name,
                propertyType: prop.propertyType,
                location: prop.location,
                address: prop.address,
                managementFeePercentage: Number(prop.managementFeePercentage),
                landlord: prop.landlord,
                stats: {
                    totalUnits,
                    occupiedUnits,
                    vacantUnits,
                    maintenanceUnits,
                    occupancyRate,
                    monthlyRevenue: (0, financial_js_1.roundMoney)(monthlyRevenue),
                    totalArrears: (0, financial_js_1.roundMoney)(totalArrears),
                },
            };
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
                houses: {
                    include: {
                        leases: {
                            where: { status: 'ACTIVE' },
                            include: { tenant: { select: { id: true, fullName: true, phoneNumber: true, email: true } } },
                        },
                        maintenanceTickets: { where: { status: { in: ['PENDING', 'IN_PROGRESS'] } } },
                        utilityReadings: { take: 1, orderBy: { readingDate: 'desc' } },
                    },
                    orderBy: { houseNumber: 'asc' },
                },
                propertyUtilities: { include: { utility: true } },
                expenses: { take: 5, orderBy: { expenseDate: 'desc' } },
            },
        });
        if (!property) {
            const err = new Error(`Property with ID ${id} does not exist.`);
            err.statusCode = 404;
            err.code = 'NOT_FOUND';
            throw err;
        }
        const totalUnits = property.houses.length;
        const occupiedUnits = property.houses.filter((h) => h.status === 'OCCUPIED').length;
        const vacantUnits = property.houses.filter((h) => h.status === 'VACANT').length;
        const maintenanceUnits = property.houses.filter((h) => h.status === 'MAINTENANCE').length;
        const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
        return {
            ...property,
            stats: {
                totalUnits,
                occupiedUnits,
                vacantUnits,
                maintenanceUnits,
                occupancyRate,
            },
        };
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
                    include: { tenant: { select: { id: true, fullName: true, phoneNumber: true, email: true } } },
                },
                maintenanceTickets: { where: { status: { in: ['PENDING', 'IN_PROGRESS'] } } },
                utilityReadings: { take: 2, orderBy: { readingDate: 'desc' } },
                invoices: { take: 5, orderBy: { dueDate: 'desc' } },
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
