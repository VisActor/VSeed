import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentEntity } from './entities/document.entity';

@ApiTags('document')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new document' })
  @ApiResponse({ status: 201, type: DocumentEntity })
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentService.create({
      name: createDocumentDto.name,
      data: (createDocumentDto.data as Buffer<ArrayBuffer>) || Buffer.from([]),
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all documents' })
  @ApiResponse({ status: 200, type: [DocumentEntity] })
  findAll() {
    return this.documentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a document by id' })
  @ApiResponse({ status: 200, type: DocumentEntity })
  async findOne(@Param('id') id: string) {
    const document = await this.documentService.findOne(id);
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a document' })
  @ApiResponse({ status: 200, type: DocumentEntity })
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    const { data, ...rest } = updateDocumentDto;

    const updateInput: any = { ...rest };
    if (data !== undefined && data !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updateInput.data = (data as Buffer<ArrayBuffer>) || Buffer.from([]);
    }

    return this.documentService.update(id, updateInput);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a document' })
  @ApiResponse({ status: 200, type: DocumentEntity })
  remove(@Param('id') id: string) {
    return this.documentService.remove(id);
  }
}
