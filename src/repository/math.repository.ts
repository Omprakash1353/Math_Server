import { $Enums, Operation } from "@prisma/client";
import { prisma } from "../utils/prisma.js";

export class OperationRepository {
  async getAllOperations(): Promise<Operation[]> {
    return await prisma.operation.findMany({});
  }

  async getOperationById(id: number): Promise<Operation | null> {
    return await prisma.operation.findUnique({
      where: { id },
    });
  }

  async createOperation(
    type: $Enums.OperationType,
    input: object,
    result: number
  ): Promise<Operation> {
    return await prisma.operation.create({
      data: {
        type,
        input: JSON.stringify(input),
        result,
      },
    });
  }

  async updateOperation(
    id: number,
    type: $Enums.OperationType,
    input: object,
    result: number
  ): Promise<Operation> {
    return await prisma.operation.update({
      where: { id },
      data: {
        type,
        input: JSON.stringify(input),
        result,
      },
    });
  }

  async deleteOperation(id: number): Promise<Operation> {
    return prisma.operation.delete({ where: { id } });
  }
}
