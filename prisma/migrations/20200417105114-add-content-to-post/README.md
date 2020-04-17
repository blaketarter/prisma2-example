# Migration `20200417105114-add-content-to-post`

This migration has been generated at 4/17/2020, 10:51:14 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_Post" (
    "authorId" INTEGER NOT NULL  ,
    "content" TEXT NOT NULL DEFAULT '' ,
    "id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
    "published" BOOLEAN NOT NULL DEFAULT false ,
    "title" TEXT NOT NULL  ,FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
) 

INSERT INTO "quaint"."new_Post" ("authorId", "id", "published", "title") SELECT "authorId", "id", "published", "title" FROM "quaint"."Post"

DROP TABLE "quaint"."Post";

ALTER TABLE "quaint"."new_Post" RENAME TO "Post";

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200417094714-add-is-admin-to-user..20200417105114-add-content-to-post
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
@@ -28,8 +28,9 @@
 model Post {
   id         Int      @id @default(autoincrement())
   title      String
+  content    String   @default("")
   published  Boolean  @default(false)
   author     User     @relation(fields: [authorId], references: [id])
   authorId   Int
 }
```


