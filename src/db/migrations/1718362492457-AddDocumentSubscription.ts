import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddDocumentSubscription1718362492457
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'documentSubscriptions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'documentId',
            type: 'int',
          },
          {
            name: 'byEmail',
            type: 'boolean',
          },
          {
            name: 'bySMS',
            type: 'boolean',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'NOW()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('documentSubscriptions');
  }
}
