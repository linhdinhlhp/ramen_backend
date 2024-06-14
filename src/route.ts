import { Routes } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { OrganizationUsersModule } from './modules/organizations/users/users.module';
import { OrganizationDocumentsModule } from './modules/organizations/documents/documents.module';
import { OrganizationRolesModule } from './modules/organizations/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { OrganizationInvoicesModule } from './modules/organizations/invoices/invoices.module';
import { DocumentVersionsModule } from './modules/organizations/versions/versions.module';
import { SendSMSModule } from './modules/organizations/sendSMS/sendSMS.module';
import { OrganizationDocumentSubscriptionsModule } from './modules/organizations/subscriptions/subscriptions.module';

export const routes: Routes = [
  // Internal APIs
  {
    path: '/internal/api/v1',
    module: OrganizationsModule,
    children: [
      {
        path: 'organizations/:organizationId',
        module: OrganizationUsersModule,
      },
      {
        path: 'organizations/:organizationId',
        module: OrganizationRolesModule,
      },
      {
        path: 'organizations/:organizationId',
        module: OrganizationDocumentsModule,
      },
      {
        path: 'organizations/:organizationId',
        module: OrganizationInvoicesModule,
      },
      {
        path: 'organizations/:organizationId',
        module: DocumentVersionsModule,
      },
      {
        path: 'organizations/:organizationId',
        module: SendSMSModule,
      },
      {
        path: 'organizations/:organizationId',
        module: OrganizationDocumentSubscriptionsModule,
      },
    ],
  },

  {
    path: '/internal/api/v1',
    module: AuthModule,
  },
  {
    path: '/internal/api/v1',
    module: PermissionsModule,
  },
];
