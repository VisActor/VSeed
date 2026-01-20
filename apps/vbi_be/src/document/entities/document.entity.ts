import { Document } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import type { Bytes } from '@prisma/client/runtime/client';

export class DocumentEntity implements Document {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: false, nullable: true })
  name: string | null;

  @ApiProperty()
  data: Bytes;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
