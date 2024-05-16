import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddOrgIdToDocuments1715854582879 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'documents',
      new TableColumn({
        name: 'organizationId',
        type: 'int',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('documents', 'organization_id');
  }
}
