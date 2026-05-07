/*
  Warnings:

  - The values [Admin,SuperAdmin,Student] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Attendance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Course` table. All the data in the column will be lost.
  - The primary key for the `Mark` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `marks` on the `Mark` table. All the data in the column will be lost.
  - You are about to drop the column `remarks` on the `Mark` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `Student` table. All the data in the column will be lost.
  - The `status` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `fullName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Fee` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentId,date]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Mark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Mark` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'GRADUATED', 'DROPPED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AttendanceStatus" ADD VALUE 'LATE';
ALTER TYPE "AttendanceStatus" ADD VALUE 'EXCUSED';

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'TEACHER');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'TEACHER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Fee" DROP CONSTRAINT "Fee_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Mark" DROP CONSTRAINT "Mark_studentId_fkey";

-- DropIndex
DROP INDEX "Attendance_date_idx";

-- AlterTable
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Attendance_id_seq";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "createdAt",
ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Mark" DROP CONSTRAINT "Mark_pkey",
DROP COLUMN "marks",
DROP COLUMN "remarks",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "maxScore" DOUBLE PRECISION NOT NULL DEFAULT 100,
ADD COLUMN     "score" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "term" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Mark_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Mark_id_seq";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "dob",
DROP COLUMN "gender",
DROP COLUMN "phone",
DROP COLUMN "profileImage",
DROP COLUMN "semester",
ADD COLUMN     "phoneNumber" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "StudentStatus" NOT NULL DEFAULT 'ACTIVE',
ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "fullName",
DROP COLUMN "profileImage",
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'TEACHER';

-- DropTable
DROP TABLE "Fee";

-- DropEnum
DROP TYPE "FeeStatus";

-- DropEnum
DROP TYPE "Status";

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_studentId_date_key" ON "Attendance"("studentId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_key" ON "Course"("code");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mark" ADD CONSTRAINT "Mark_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
