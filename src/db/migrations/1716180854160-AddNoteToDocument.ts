import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNoteToDocument1716180854160 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'documents',
      new TableColumn({
        name: 'note',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('documents', 'note');
  }
}
