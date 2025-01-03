/*
  Warnings:

  - You are about to drop the column `answer_description` on the `Answers` table. All the data in the column will be lost.
  - You are about to drop the column `answered_user_id` on the `Answers` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `QuestionComments` table. All the data in the column will be lost.
  - You are about to drop the column `comment_user_id` on the `QuestionComments` table. All the data in the column will be lost.
  - You are about to drop the column `questionsId` on the `QuestionComments` table. All the data in the column will be lost.
  - You are about to drop the column `questionsId` on the `QuestionImageLinks` table. All the data in the column will be lost.
  - You are about to drop the `Answer_Image_Links` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Insightful` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `QuestionComments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `QuestionComments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `QuestionComments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `QuestionImageLinks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `QuestionImageLinks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urgency` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer_Image_Links" DROP CONSTRAINT "Answer_Image_Links_answersId_fkey";

-- DropForeignKey
ALTER TABLE "Insightful" DROP CONSTRAINT "Insightful_questionsId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionComments" DROP CONSTRAINT "QuestionComments_questionsId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionImageLinks" DROP CONSTRAINT "QuestionImageLinks_questionsId_fkey";

-- AlterTable
ALTER TABLE "Answers" DROP COLUMN "answer_description",
DROP COLUMN "answered_user_id",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "college" TEXT,
ADD COLUMN     "media" TEXT[],
ADD COLUMN     "mediaUrl" TEXT,
ADD COLUMN     "shares" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "specialization" TEXT;

-- AlterTable
ALTER TABLE "QuestionComments" DROP COLUMN "comment",
DROP COLUMN "comment_user_id",
DROP COLUMN "questionsId",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "questionId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "QuestionImageLinks" DROP COLUMN "questionsId",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "questionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "dislikes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shares" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "urgency" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "college" TEXT,
ADD COLUMN     "specialization" TEXT;

-- DropTable
DROP TABLE "Answer_Image_Links";

-- DropTable
DROP TABLE "Insightful";

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionComments" ADD CONSTRAINT "QuestionComments_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionComments" ADD CONSTRAINT "QuestionComments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionImageLinks" ADD CONSTRAINT "QuestionImageLinks_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
