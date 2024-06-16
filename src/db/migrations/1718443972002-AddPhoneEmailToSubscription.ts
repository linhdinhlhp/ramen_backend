import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPhoneEmailToSubscription1718443972002
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('documentSubscriptions', [
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'email',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('documentSubscriptions', 'phone');
    await queryRunner.dropColumn('documentSubscriptions', 'email');
  }
}
