// import { document } from 'src/store/apps/document';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  DocumentResponseListDto,
  DocumentResponseDto,
} from './dto/document-response.dto';
import { EmptyResponseDto } from 'src/modules/common/types/empty-response.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { OrganizationMemberGuard } from '../organization-member.guard';
import { PermissionsGuard } from 'src/modules/authz/permissions.guard';
import { CheckPermissions } from 'src/modules/authz/permissions.decorator';
import { PermissionAction, PermissionSubject } from 'src/db/entities';
import { AuthenticatedRequest } from 'src/modules/common/types/authenticated-request';
import { CreateDocumentRequestDto } from './dto/create-document-request.dto.ts';
import { UpdateDocumentRequestDto } from './dto/update-document-request.dto';

@Controller('documents')
@UseGuards(JwtAuthGuard, OrganizationMemberGuard)
@ApiBearerAuth('accessToken')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  // @UseGuards(PermissionsGuard)
  // @CheckPermissions([PermissionAction.READ, PermissionSubject.INVOICE])
  @ApiOperation({
    tags: ['Organization Document'],
    operationId: 'Get document list for organization',
    summary: 'Get document list for organization',
    description: 'Get document list for organization',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DocumentResponseListDto,
  })
  async findAll(
    @Param('organizationId', ParseIntPipe) organizationId: number,
  ): Promise<DocumentResponseListDto> {
    return await this.documentsService.findAll(organizationId);
  }

  @Get(':id')
  // @UseGuards(PermissionsGuard)
  // @CheckPermissions([PermissionAction.READ, PermissionSubject.INVOICE])
  @ApiOperation({
    tags: ['Organization Document'],
    operationId: 'Get document by ID for an org',
    summary: 'Get document by ID for an org',
    description: 'Get document by ID for an org',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DocumentResponseDto,
  })
  async findOne(
    @Param('organizationId', ParseIntPipe) organizationId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DocumentResponseDto> {
    return new DocumentResponseDto(
      await this.documentsService.findOne(organizationId, id),
    );
  }

  @Post()
  // @UseGuards(PermissionsGuard)
  // @CheckPermissions([PermissionAction.CREATE, PermissionSubject.INVOICE])
  @ApiOperation({
    tags: ['Organization Document'],
    operationId: 'Create Documents for an organization',
    summary: 'Create Documents for an organization',
    description: 'Create Documents for an organization',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DocumentResponseListDto,
  })
  async save(
    @Param('organizationId', ParseIntPipe) organizationId: number,
    @Body() request: CreateDocumentRequestDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<DocumentResponseDto> {
    const document = await this.documentsService.create(
      organizationId,
      request,
      req.user.id,
    );
    return new DocumentResponseDto(document);
  }

  @Patch('/:id')
  // @UseGuards(PermissionsGuard)
  // @CheckPermissions([PermissionAction.UPDATE, PermissionSubject.INVOICE])
  @ApiOperation({
    tags: ['Organization Document'],
    operationId: 'Update an document for an organization',
    summary: 'Update an document for an organization',
    description: 'Update an document for an organization',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DocumentResponseDto,
  })
  async update(
    @Param('organizationId', ParseIntPipe) organizationId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() req: UpdateDocumentRequestDto,
  ): Promise<DocumentResponseDto> {
    const invoice = await this.documentsService.update(organizationId, id, req);
    return new DocumentResponseDto(invoice);
  }
}
