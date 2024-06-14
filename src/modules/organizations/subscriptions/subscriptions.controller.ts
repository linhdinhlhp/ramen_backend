import { SubscriptionsResponseDto } from './dto/subscription-response.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { OrganizationMemberGuard } from '../organization-member.guard';
import { AuthenticatedRequest } from 'src/modules/common/types/authenticated-request';

import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsResponseListDto } from './dto/subscription-response.dto';
import { CreateSubscriptionsRequestDto } from './dto/create-subscription-request.dto';

@Controller('subcriptions')
@UseGuards(JwtAuthGuard, OrganizationMemberGuard)
@ApiBearerAuth('accessToken')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get(':documentId')
  // @UseGuards(PermissionsGuard)
  // @CheckPermissions([PermissionAction.READ, PermissionSubject.INVOICE])
  @ApiOperation({
    tags: ['Organization Document Subscription'],
    operationId: 'Get all subs by a document for an org',
    summary: 'Get all subs by a document for an org',
    description: 'Get all subs by a document for an org',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SubscriptionsResponseListDto,
  })
  async findAll(
    // @Param('organizationId', ParseIntPipe) organizationId: number,
    @Param('documentId', ParseIntPipe) documentId: number,
  ): Promise<SubscriptionsResponseListDto> {
    return await this.subscriptionsService.findAll(documentId);
  }

  @Post(':documentId')
  // @UseGuards(PermissionsGuard)
  // @CheckPermissions([PermissionAction.CREATE, PermissionSubject.INVOICE])
  @ApiOperation({
    tags: ['Organization Document Subscription'],
    operationId: 'Create a sub of a document for an org',
    summary: 'Create a sub of a document for an org',
    description: 'Create a sub of a document for an org',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SubscriptionsResponseListDto,
  })
  async save(
    @Param('organizationId', ParseIntPipe) organizationId: number,
    @Param('documentId', ParseIntPipe) documentId: number,
    @Body() request: CreateSubscriptionsRequestDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<SubscriptionsResponseDto> {
    const sub = await this.subscriptionsService.create(
      organizationId,
      documentId,
      request,
      req.user.id,
    );
    return new SubscriptionsResponseDto(sub);
  }
}
