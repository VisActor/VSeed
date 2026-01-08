import { Injectable } from '@nestjs/common';
import { Prisma, Document } from '@prisma/client';
import { PrismaService } from '../app/prisma.service';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.DocumentCreateInput): Promise<Document> {
    return this.prisma.document.create({
      data,
    });
  }

  async findAll(): Promise<Document[]> {
    return this.prisma.document.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Document | null> {
    return this.prisma.document.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: Prisma.DocumentUpdateInput,
  ): Promise<Document> {
    return this.prisma.document.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Document> {
    return this.prisma.document.delete({
      where: { id },
    });
  }
}
