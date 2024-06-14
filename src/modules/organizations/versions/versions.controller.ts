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
} from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { EmptyResponseDto } from 'src/modules/common/types/empty-response.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { OrganizationMemberGuard } from '../organization-member.guard';

import { AuthenticatedRequest } from 'src/modules/common/types/authenticated-request';
import { VersionsService } from './versions.service';
import {
  VersionResponseDto,
  VersionResponseListDto,
} from './dto/version-response.dto';
import { CreateVersionRequestDto } from './dto/create-version-request.dto.ts';
import { UpdateVerionRequestDto } from './dto/update-version-request.dto';

@Controller('versions')
@UseGuards(JwtAuthGuard, OrganizationMemberGuard)
@ApiBearerAuth('accessToken')
export class VersionsController {
  constructor(private readonly versionsService: VersionsService) {}

  @Get(':documentId')
  // @UseGuards(PermissionsGuard)
  // @CheckPermissions([PermissionAction.READ, PermissionSubject.INVOICE])
  @ApiOperation({
    tags: ['Document Version'],
    operationId: 'Get version list for document',
    summary: 'Get version list for document',
    description: 'Get version list for document',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: VersionResponseListDto,
  })
  async findAll(
    @Param('organizationId', ParseIntPipe) organizationId: number,
    @Param('documentId') documentId: string,
  ): Promise<VersionResponseListDto> {
    return await this.versionsService.findAll(documentId);
  }

  @Get(':documentId/:id')
  // @UseGuards(PermissionsGuard)
  // @CheckPermissions([PermissionAction.READ, PermissionSubject.INVOICE])
  @ApiOperation({
    tags: ['Document Version'],
    operationId: 'Get version by id for document',
    summary: 'Get version by id for document',
    description: 'Get version id for document',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: VersionResponseDto,
  })
  async findOne(
    @Param('organizationId', ParseIntPipe) organizationId: number,
    @Param('documentId') documentId: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<VersionResponseDto> {
    return new VersionResponseDto(
      await this.versionsService.findOne(documentId, id),
    );
  }

  @Post(':documentId')
  // @UseGuards(PermissionsGuard)
  // @CheckPermissions([PermissionAction.CREATE, PermissionSubject.INVOICE])
  @ApiOperation({
    tags: ['Document Version'],
    operationId: 'Create Documents for an organization',
    summary: 'Create Documents for an organization',
    description: 'Create Documents for an organization',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: VersionResponseListDto,
  })
  async save(
    @Param('organizationId', ParseIntPipe) organizationId: number,
    @Param('documentId') documentId: string,
    @Body() request: CreateVersionRequestDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<VersionResponseDto> {
    const version = await this.versionsService.create(
      organizationId,
      documentId,
      request,
    );
    // console.log(version);
    return new VersionResponseDto(version);
  }

  @Patch(':documentId/:id')
  // @UseGuards(PermissionsGuard)
  // @CheckPermissions([PermissionAction.UPDATE, PermissionSubject.INVOICE])
  @ApiOperation({
    tags: ['Document Version'],
    operationId: 'Update an document for an organization',
    summary: 'Update an document for an organization',
    description: 'Update an document for an organization',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: VersionResponseDto,
  })
  async update(
    @Param('organizationId', ParseIntPipe) organizationId: number,
    @Param('documentId') documentId: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() req: UpdateVerionRequestDto,
  ): Promise<VersionResponseDto> {
    const version = await this.versionsService.update(
      organizationId,
      documentId,
      id,
      req,
    );
    return new VersionResponseDto(version);
  }

  @Delete('/:id')
  // @UseGuards(PermissionsGuard)
  // @CheckPermissions([PermissionAction.DELETE, PermissionSubject.INVOICE])
  @ApiOperation({
    tags: ['Document Version'],
    operationId: 'Delete a document for an organization',
    summary: 'Delete a document for an organization',
    description: 'Delete a document for an organization',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: EmptyResponseDto,
  })
  async delete(
    // @Param('organizationId', ParseIntPipe) organizationId: number,
    @Param('documentId') documentId: number | string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EmptyResponseDto> {
    await this.versionsService.delete(id);
    return new EmptyResponseDto();
  }
}
