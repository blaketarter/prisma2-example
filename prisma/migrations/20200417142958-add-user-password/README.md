# Migration `20200417142958-add-user-password`

This migration has been generated at 4/17/2020, 2:29:58 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_User" (
    "email" TEXT NOT NULL  ,
    "id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false ,
    "name" TEXT   ,
    "password" TEXT NOT NULL  
) 

INSERT INTO "quaint"."new_User" ("email", "id", "isAdmin", "name") SELECT "email", "id", "isAdmin", "name" FROM "quaint"."User"

DROP TABLE "quaint"."User";

ALTER TABLE "quaint"."new_User" RENAME TO "User";

CREATE UNIQUE INDEX "quaint"."User.email" ON "User"("email")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200417105114-add-content-to-post..20200417142958-add-user-password
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
@@ -15,8 +15,9 @@
   name     String?
   email    String    @unique
   posts    Post[]
   profile  Profile?
+  password String
   isAdmin  Boolean   @default(false)
 }
 model Profile {
```


