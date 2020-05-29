# Migration `20200505165457-add-timestamps`

This migration has been generated at 5/5/2020, 4:54:57 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_User" (
"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,"email" TEXT NOT NULL  ,"id" TEXT NOT NULL  ,"isAdmin" BOOLEAN NOT NULL DEFAULT false ,"name" TEXT   ,"password" TEXT NOT NULL  ,"updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    PRIMARY KEY ("id"))

INSERT INTO "quaint"."new_User" ("email", "id", "isAdmin", "name", "password") SELECT "email", "id", "isAdmin", "name", "password" FROM "quaint"."User"

PRAGMA foreign_keys=off;
DROP TABLE "quaint"."User";;
PRAGMA foreign_keys=on

ALTER TABLE "quaint"."new_User" RENAME TO "User";

CREATE UNIQUE INDEX "quaint"."User.email" ON "User"("email")

CREATE TABLE "quaint"."new_Profile" (
"bio" TEXT NOT NULL  ,"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,"id" TEXT NOT NULL  ,"updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,"userId" TEXT NOT NULL  ,
    PRIMARY KEY ("id"),FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE)

INSERT INTO "quaint"."new_Profile" ("bio", "id", "userId") SELECT "bio", "id", "userId" FROM "quaint"."Profile"

PRAGMA foreign_keys=off;
DROP TABLE "quaint"."Profile";;
PRAGMA foreign_keys=on

ALTER TABLE "quaint"."new_Profile" RENAME TO "Profile";

CREATE UNIQUE INDEX "quaint"."Profile_userId" ON "Profile"("userId")

CREATE TABLE "quaint"."new_Post" (
"authorId" TEXT NOT NULL  ,"content" TEXT NOT NULL DEFAULT '' ,"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,"id" TEXT NOT NULL  ,"published" BOOLEAN NOT NULL DEFAULT false ,"title" TEXT NOT NULL  ,"updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    PRIMARY KEY ("id"),FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE)

INSERT INTO "quaint"."new_Post" ("authorId", "content", "id", "published", "title") SELECT "authorId", "content", "id", "published", "title" FROM "quaint"."Post"

PRAGMA foreign_keys=off;
DROP TABLE "quaint"."Post";;
PRAGMA foreign_keys=on

ALTER TABLE "quaint"."new_Post" RENAME TO "Post";

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200505152617-create-db..20200505165457-add-timestamps
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -17,15 +17,21 @@
   posts    Post[]
   profile  Profile?
   password String
   isAdmin  Boolean   @default(false)
+  
+  createdAt  DateTime @default(now())
+  updatedAt  DateTime @updatedAt @default(now())
 }
 model Profile {
   id     String    @id @default(cuid())
   bio    String
   user   User      @relation(fields: [userId], references: [id])
   userId String
+
+  createdAt  DateTime @default(now())
+  updatedAt  DateTime @updatedAt @default(now())
 }
 model Post {
   id         String   @id @default(cuid())
@@ -33,5 +39,8 @@
   content    String   @default("")
   published  Boolean  @default(false)
   author     User     @relation(fields: [authorId], references: [id])
   authorId   String
+  
+  createdAt  DateTime @default(now())
+  updatedAt  DateTime @updatedAt @default(now())
 }
```


