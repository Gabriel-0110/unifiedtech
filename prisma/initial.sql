-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationToken" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetExpiry" TIMESTAMP(3),
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "refreshToken" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "projectType" TEXT NOT NULL,
    "budget" TEXT,
    "message" TEXT NOT NULL,
    "newsletter" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "source" TEXT,
    "medium" TEXT,
    "campaign" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletters" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "source" TEXT,
    "tags" TEXT,
    "confirmationToken" TEXT,
    "confirmedAt" TIMESTAMP(3),
    "unsubscribedAt" TIMESTAMP(3),
    "unsubscribeToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "authorId" TEXT NOT NULL,
    "category" TEXT,
    "tags" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "readTime" INTEGER,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "stage" TEXT NOT NULL DEFAULT 'NEW',
    "assignedTo" TEXT,
    "notes" TEXT,
    "nextFollowUp" TIMESTAMP(3),
    "closedAt" TIMESTAMP(3),
    "closeReason" TEXT,
    "estimatedValue" DOUBLE PRECISION,
    "actualValue" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uploads" (
    "id" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "uploadType" TEXT NOT NULL DEFAULT 'DOCUMENT',
    "associatedId" TEXT,
    "associatedType" TEXT,
    "metadata" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "uploads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "event" TEXT NOT NULL,
    "page" TEXT,
    "data" TEXT,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "referer" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meetings" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "meetingType" TEXT NOT NULL,
    "attendeeEmail" TEXT NOT NULL,
    "attendeeName" TEXT NOT NULL,
    "attendeePhone" TEXT,
    "notes" TEXT,
    "meetingUrl" TEXT,
    "reminderSent" BOOLEAN NOT NULL DEFAULT false,
    "cancelledAt" TIMESTAMP(3),
    "cancelReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meetings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "config" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'string',
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_emailVerificationToken_key" ON "users"("emailVerificationToken");

-- CreateIndex
CREATE UNIQUE INDEX "users_passwordResetToken_key" ON "users"("passwordResetToken");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_refreshToken_key" ON "sessions"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "newsletters_email_key" ON "newsletters"("email");

-- CreateIndex
CREATE UNIQUE INDEX "newsletters_confirmationToken_key" ON "newsletters"("confirmationToken");

-- CreateIndex
CREATE UNIQUE INDEX "newsletters_unsubscribeToken_key" ON "newsletters"("unsubscribeToken");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "leads_contactId_key" ON "leads"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "uploads_fileName_key" ON "uploads"("fileName");

-- CreateIndex
CREATE UNIQUE INDEX "config_key_key" ON "config"("key");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analytics" ADD CONSTRAINT "analytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

