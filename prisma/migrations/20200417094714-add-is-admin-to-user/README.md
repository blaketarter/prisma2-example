# Migration `20200417094714-add-is-admin-to-user`

This migration has been generated at 4/17/2020, 9:47:14 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_User" (
    "email" TEXT NOT NULL  ,
    "id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false ,
    "name" TEXT   
) 

INSERT INTO "quaint"."new_User" ("email", "id", "name") SELECT "email", "id", "name" FROM "quaint"."User"

DROP TABLE "quaint"."User";

ALTER TABLE "quaint"."new_User" RENAME TO "User";

CREATE UNIQUE INDEX "quaint"."User.email" ON "User"("email")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200417094252-create-db..20200417094714-add-is-admin-to-user
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:./dev.db"
 }
 generator client {
   provider = "prisma-client-js"
@@ -15,20 +15,21 @@
   name     String?
   email    String    @unique
   posts    Post[]
   profile  Profile?
+  isAdmin  Boolean   @default(false)
 }
 model Profile {
   id     Int    @id @default(autoincrement())
   bio    String
-  user   User @relation(fields: [userId], references: [id])
+  user   User   @relation(fields: [userId], references: [id])
   userId Int
 }
 model Post {
   id         Int      @id @default(autoincrement())
   title      String
   published  Boolean  @default(false)
-  author     User @relation(fields: [authorId], references: [id])
+  author     User     @relation(fields: [authorId], references: [id])
   authorId   Int
 }
```


