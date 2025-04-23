import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1745413788329 implements MigrationInterface {
    name = 'Test1745413788329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "languages" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_7397752718d1c9eb873722ec9b2" UNIQUE ("code"), CONSTRAINT "UQ_9c0e155475f0aa782e4a6178969" UNIQUE ("name"), CONSTRAINT "PK_b517f827ca496b29f4d549c631d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurants" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "time_zone" character varying NOT NULL, CONSTRAINT "PK_e2133a72eb1cc8f588f7b503e68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "branches" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "time_zone" character varying NOT NULL, "location" character varying NOT NULL, "restaurant_id" integer, CONSTRAINT "PK_7f37d3b42defea97f1df0d19535" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "translations" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "language_code" character varying NOT NULL, "menu_id" integer, "menu_item_id" integer, CONSTRAINT "PK_aca248c72ae1fb2390f1bf4cd87" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_items" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "menu_id" integer, CONSTRAINT "PK_57e6188f929e5dc6919168620c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menus" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_main_menu" boolean NOT NULL, "restaurant_id" integer, "branch_id" integer, CONSTRAINT "PK_3fec3d93327f4538e0cbd4349c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurant_languages" ("restaurant_id" integer NOT NULL, "language_id" integer NOT NULL, CONSTRAINT "PK_1662e336620d128ecb6ee164aa7" PRIMARY KEY ("restaurant_id", "language_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a50ab0c06e736e3ca2cfae39c7" ON "restaurant_languages" ("restaurant_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2bdf832d82aa896bc8721cc959" ON "restaurant_languages" ("language_id") `);
        await queryRunner.query(`ALTER TABLE "branches" ADD CONSTRAINT "FK_1e384921d7d292c1705bff1a220" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "translations" ADD CONSTRAINT "FK_50ce9db609c6b5248ccd6faa3fa" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "translations" ADD CONSTRAINT "FK_2d73c326d6be40176f67a00ad82" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_items" ADD CONSTRAINT "FK_ba71edc684a901b4bc9d9228f42" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menus" ADD CONSTRAINT "FK_bcd4a935c967cc9c20e770d1e62" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menus" ADD CONSTRAINT "FK_17e3adf0912666eed69fc930a81" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant_languages" ADD CONSTRAINT "FK_a50ab0c06e736e3ca2cfae39c7d" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "restaurant_languages" ADD CONSTRAINT "FK_2bdf832d82aa896bc8721cc9594" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_languages" DROP CONSTRAINT "FK_2bdf832d82aa896bc8721cc9594"`);
        await queryRunner.query(`ALTER TABLE "restaurant_languages" DROP CONSTRAINT "FK_a50ab0c06e736e3ca2cfae39c7d"`);
        await queryRunner.query(`ALTER TABLE "menus" DROP CONSTRAINT "FK_17e3adf0912666eed69fc930a81"`);
        await queryRunner.query(`ALTER TABLE "menus" DROP CONSTRAINT "FK_bcd4a935c967cc9c20e770d1e62"`);
        await queryRunner.query(`ALTER TABLE "menu_items" DROP CONSTRAINT "FK_ba71edc684a901b4bc9d9228f42"`);
        await queryRunner.query(`ALTER TABLE "translations" DROP CONSTRAINT "FK_2d73c326d6be40176f67a00ad82"`);
        await queryRunner.query(`ALTER TABLE "translations" DROP CONSTRAINT "FK_50ce9db609c6b5248ccd6faa3fa"`);
        await queryRunner.query(`ALTER TABLE "branches" DROP CONSTRAINT "FK_1e384921d7d292c1705bff1a220"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2bdf832d82aa896bc8721cc959"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a50ab0c06e736e3ca2cfae39c7"`);
        await queryRunner.query(`DROP TABLE "restaurant_languages"`);
        await queryRunner.query(`DROP TABLE "menus"`);
        await queryRunner.query(`DROP TABLE "menu_items"`);
        await queryRunner.query(`DROP TABLE "translations"`);
        await queryRunner.query(`DROP TABLE "branches"`);
        await queryRunner.query(`DROP TABLE "restaurants"`);
        await queryRunner.query(`DROP TABLE "languages"`);
    }

}
