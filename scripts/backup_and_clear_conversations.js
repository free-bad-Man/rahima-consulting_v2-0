#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const outDir = path.resolve(process.cwd(), "backups");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const outFile = path.join(outDir, `conversations_backup_${ts}.json`);
  console.log("Exporting conversations to", outFile);

  const conversations = await prisma.conversation.findMany({
    include: { messages: true },
  });
  fs.writeFileSync(outFile, JSON.stringify(conversations, null, 2), "utf-8");
  console.log("Exported", conversations.length, "conversations.");

  console.log("Deleting conversation messages...");
  await prisma.conversationMessage.deleteMany({});
  console.log("Deleting conversations...");
  await prisma.conversation.deleteMany({});
  console.log("Conversation tables cleared.");

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("Error:", e);
  prisma.$disconnect().finally(() => process.exit(1));
});


