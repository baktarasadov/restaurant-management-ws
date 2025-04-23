import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllTable1736874227030 implements MigrationInterface {
    name = 'CreateAllTable1736874227030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`languages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_7397752718d1c9eb873722ec9b\` (\`code\`), UNIQUE INDEX \`IDX_9c0e155475f0aa782e4a617896\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`restaurants\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`time_zone\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`branches\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`time_zone\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`restaurant_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`menus\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_main_menu\` tinyint NOT NULL, \`restaurant_id\` int NULL, \`branch_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`menu_items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`menu_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`restaurant_languages\` (\`restaurant_id\` int NOT NULL, \`language_id\` int NOT NULL, INDEX \`IDX_a50ab0c06e736e3ca2cfae39c7\` (\`restaurant_id\`), INDEX \`IDX_2bdf832d82aa896bc8721cc959\` (\`language_id\`), PRIMARY KEY (\`restaurant_id\`, \`language_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`branches\` ADD CONSTRAINT \`FK_1e384921d7d292c1705bff1a220\` FOREIGN KEY (\`restaurant_id\`) REFERENCES \`restaurants\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD CONSTRAINT \`FK_bcd4a935c967cc9c20e770d1e62\` FOREIGN KEY (\`restaurant_id\`) REFERENCES \`restaurants\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD CONSTRAINT \`FK_17e3adf0912666eed69fc930a81\` FOREIGN KEY (\`branch_id\`) REFERENCES \`branches\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu_items\` ADD CONSTRAINT \`FK_ba71edc684a901b4bc9d9228f42\` FOREIGN KEY (\`menu_id\`) REFERENCES \`menus\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`restaurant_languages\` ADD CONSTRAINT \`FK_a50ab0c06e736e3ca2cfae39c7d\` FOREIGN KEY (\`restaurant_id\`) REFERENCES \`restaurants\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`restaurant_languages\` ADD CONSTRAINT \`FK_2bdf832d82aa896bc8721cc9594\` FOREIGN KEY (\`language_id\`) REFERENCES \`languages\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurant_languages\` DROP FOREIGN KEY \`FK_2bdf832d82aa896bc8721cc9594\``);
        await queryRunner.query(`ALTER TABLE \`restaurant_languages\` DROP FOREIGN KEY \`FK_a50ab0c06e736e3ca2cfae39c7d\``);
        await queryRunner.query(`ALTER TABLE \`menu_items\` DROP FOREIGN KEY \`FK_ba71edc684a901b4bc9d9228f42\``);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP FOREIGN KEY \`FK_17e3adf0912666eed69fc930a81\``);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP FOREIGN KEY \`FK_bcd4a935c967cc9c20e770d1e62\``);
        await queryRunner.query(`ALTER TABLE \`branches\` DROP FOREIGN KEY \`FK_1e384921d7d292c1705bff1a220\``);
        await queryRunner.query(`DROP INDEX \`IDX_2bdf832d82aa896bc8721cc959\` ON \`restaurant_languages\``);
        await queryRunner.query(`DROP INDEX \`IDX_a50ab0c06e736e3ca2cfae39c7\` ON \`restaurant_languages\``);
        await queryRunner.query(`DROP TABLE \`restaurant_languages\``);
        await queryRunner.query(`DROP TABLE \`menu_items\``);
        await queryRunner.query(`DROP TABLE \`menus\``);
        await queryRunner.query(`DROP TABLE \`branches\``);
        await queryRunner.query(`DROP TABLE \`restaurants\``);
        await queryRunner.query(`DROP INDEX \`IDX_9c0e155475f0aa782e4a617896\` ON \`languages\``);
        await queryRunner.query(`DROP INDEX \`IDX_7397752718d1c9eb873722ec9b\` ON \`languages\``);
        await queryRunner.query(`DROP TABLE \`languages\``);
    }

}
