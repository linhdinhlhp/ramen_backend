import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddVersions1717739203294 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'versions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment', // auto increment
          },
          {
            name: 'versionId',
            type: 'varchar',
          },
          {
            name: 'versionName',
            type: 'varchar',
          },
          {
            name: 'documentId',
            type: 'varchar',
          },
          {
            name: 'url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'downloadNumber',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'created_by',
            type: 'varchar',
          },
          {
            name: 'note',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'NOW()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('versions');
  }
}
