import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class AddFiles1712305412661 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'files',
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
                    name: 'documentId',
                    type: 'varchar',
                },
                {
                    name: 'versionId',
                    type: 'int',
                },
                {
                  name: 'uploadDate',
                  type: 'timestamp',
                },
                {
                  name: 'viewNumber',
                  type: 'int',
                  isNullable: false,
                  default: 0
                },
                {
                  name: 'downloadNumber',
                  type: 'int',
                  isNullable: true,
                  default: 0,
                },
                {
                  name: 'dateEdit',
                  type: 'timestamp',
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
        await queryRunner.dropTable('files');
    }

}
