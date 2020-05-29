# Migration `20200512102734-add-id-alias`

This migration has been generated at 5/12/2020, 10:27:34 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200505165538-remove-default-updated-at..20200512102734-add-id-alias
--- datamodel.dml
+++ datamodel.dml
@@ -1,18 +1,20 @@
 // This is your Prisma schema file,
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
+type ID = String @id @default(cuid())
+
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
 }
 model User {
-  id       String    @id @default(cuid())
+  id       ID
   name     String?
   email    String    @unique
   posts    Post[]
   profile  Profile?
@@ -23,9 +25,9 @@
   updatedAt  DateTime @updatedAt
 }
 model Profile {
-  id     String    @id @default(cuid())
+  id     ID
   bio    String
   user   User      @relation(fields: [userId], references: [id])
   userId String
@@ -33,9 +35,9 @@
   updatedAt  DateTime @updatedAt
 }
 model Post {
-  id         String   @id @default(cuid())
+  id         ID
   title      String
   content    String   @default("")
   published  Boolean  @default(false)
   author     User     @relation(fields: [authorId], references: [id])
```


