import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateDocumentDto {
  @ApiProperty({ description: 'The name of the document', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description:
      'The initial data of the document (Buffer, Hex String, or Base64)',
    required: false,
    type: 'string', // Swagger implies string input
    format: 'binary',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null) return value as undefined | null;
    // Allow Buffer, array, or string (hex/base64)

    return Buffer.from(value);
  })
  data?: Buffer;
}
