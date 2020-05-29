# Migration `20200505152617-create-db`

This migration has been generated at 5/5/2020, 3:26:17 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."User" (
"email" TEXT NOT NULL  ,"id" TEXT NOT NULL  ,"isAdmin" BOOLEAN NOT NULL DEFAULT false ,"name" TEXT   ,"password" TEXT NOT NULL  ,
    PRIMARY KEY ("id"))

CREATE TABLE "quaint"."Profile" (
"bio" TEXT NOT NULL  ,"id" TEXT NOT NULL  ,"userId" TEXT NOT NULL  ,
    PRIMARY KEY ("id"),FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE TABLE "quaint"."Post" (
"authorId" TEXT NOT NULL  ,"content" TEXT NOT NULL DEFAULT '' ,"id" TEXT NOT NULL  ,"published" BOOLEAN NOT NULL DEFAULT false ,"title" TEXT NOT NULL  ,
    PRIMARY KEY ("id"),FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE UNIQUE INDEX "quaint"."User.email" ON "User"("email")

CREATE UNIQUE INDEX "quaint"."Profile_userId" ON "Profile"("userId")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200505152617-create-db
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,37 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id       String    @id @default(cuid())
+  name     String?
+  email    String    @unique
+  posts    Post[]
+  profile  Profile?
+  password String
+  isAdmin  Boolean   @default(false)
+}
+
+model Profile {
+  id     String    @id @default(cuid())
+  bio    String
+  user   User      @relation(fields: [userId], references: [id])
+  userId String
+}
+
+model Post {
+  id         String   @id @default(cuid())
+  title      String
+  content    String   @default("")
+  published  Boolean  @default(false)
+  author     User     @relation(fields: [authorId], references: [id])
+  authorId   String
+}
```


