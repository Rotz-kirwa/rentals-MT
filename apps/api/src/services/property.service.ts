import { prisma } from '@my-nyumba/database';
import { roundMoney } from '../utils/financial.js';

export class PropertyService {
  static async listProperties() {
    return prisma.property.findMany({
      include: {
        landlord: { select: { id: true, fullName: true, phoneNumber: true } },
        _count: { select: { houses: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async createProperty(data: { name: string; propertyType: string; location: string; address?: string; managementFeePercentage?: number; landlordId?: string }) {
    return prisma.property.create({
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

  static async getPropertyById(id: string) {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        landlord: true,
        houses: { orderBy: { houseNumber: 'asc' } },
        propertyUtilities: { include: { utility: true } },
      },
    });

    if (!property) {
      const err: any = new Error(`Property with ID ${id} does not exist.`);
      err.statusCode = 404;
      err.code = 'NOT_FOUND';
      throw err;
    }

    return property;
  }

  static async listHouses(propertyId?: string, status?: string) {
    const where: any = {};
    if (propertyId) where.propertyId = propertyId;
    if (status) where.status = status;

    return prisma.house.findMany({
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

  static async createHouse(data: { propertyId: string; houseNumber: string; houseType: string; defaultRent: number; defaultDeposit: number; garbageFee?: number }) {
    const existing = await prisma.house.findFirst({
      where: { propertyId: data.propertyId, houseNumber: data.houseNumber },
    });

    if (existing) {
      const err: any = new Error(`House number ${data.houseNumber} already exists in this property.`);
      err.statusCode = 400;
      err.code = 'DUPLICATE_HOUSE';
      throw err;
    }

    return prisma.house.create({
      data: {
        propertyId: data.propertyId,
        houseNumber: data.houseNumber,
        houseType: data.houseType,
        defaultRent: roundMoney(data.defaultRent),
        defaultDeposit: roundMoney(data.defaultDeposit),
        garbageFee: roundMoney(data.garbageFee ?? 0),
      },
    });
  }
}
