import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty({ description: 'The name of the document', required: false })
  @IsOptional()
  @IsString()
  name?: string;
}
