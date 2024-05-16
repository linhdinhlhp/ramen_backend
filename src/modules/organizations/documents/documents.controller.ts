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
import { DocumentResponseListDto } from './dto/document-response.dto';
import { EmptyResponseDto } from 'src/modules/common/types/empty-response.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { OrganizationMemberGuard } from '../organization-member.guard';
import { PermissionsGuard } from 'src/modules/authz/permissions.guard';
import { CheckPermissions } from 'src/modules/authz/permissions.decorator';
import { PermissionAction, PermissionSubject } from 'src/db/entities';
import { AuthenticatedRequest } from 'src/modules/common/types/authenticated-request';

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
}
