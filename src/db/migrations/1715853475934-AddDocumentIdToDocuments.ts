import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDocumentIdToDocuments1715853475934
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'documents',
      new TableColumn({
        name: 'document_id',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('documents', 'document_id');
  }
}
