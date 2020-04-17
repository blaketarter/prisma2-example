# Migration `20200417094252-create-db`

This migration has been generated at 4/17/2020, 9:42:52 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "quaint"."User" (
    "email" TEXT NOT NULL  ,
    "id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
    "name" TEXT   
) 

CREATE TABLE "quaint"."Profile" (
    "bio" TEXT NOT NULL  ,
    "id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL  ,FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
) 

CREATE TABLE "quaint"."Post" (
    "authorId" INTEGER NOT NULL  ,
    "id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
    "published" BOOLEAN NOT NULL DEFAULT false ,
    "title" TEXT NOT NULL  ,FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
) 

CREATE UNIQUE INDEX "quaint"."User.email" ON "User"("email")

CREATE UNIQUE INDEX "quaint"."Profile_userId" ON "Profile"("userId")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200417094252-create-db
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,34 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "sqlite"
+  url      = "file:./dev.db"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id       Int       @id @default(autoincrement())
+  name     String?
+  email    String    @unique
+  posts    Post[]
+  profile  Profile?
+}
+
+model Profile {
+  id     Int    @id @default(autoincrement())
+  bio    String
+  user   User @relation(fields: [userId], references: [id])
+  userId Int
+}
+
+model Post {
+  id         Int      @id @default(autoincrement())
+  title      String
+  published  Boolean  @default(false)
+  author     User @relation(fields: [authorId], references: [id])
+  authorId   Int
+}
```


