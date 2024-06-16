import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class UniqueUserDocumentSub1718446849200 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'documentSubscriptions',
      new TableIndex({
        name: 'IDX_user_document',
        columnNames: ['userId', 'documentId'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('documentSubscriptions', 'IDX_user_document');
  }
}
