const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        {
          name: "Famous People",
        },
        {
          name: "Movies & TV",
        },
        {
          name: "Animals",
        },
        {
          name: "Philosophy",
        },
        {
          name: "Scientists",
        },
        {
          name: "Games",
        },
        {
          name: "Musicians",
        },
        {
          name: "Anime",
        },
      ],
    });
  } catch (error) {
    console.log("Error seedingdefault categories", error);
  } finally {
    await db.$disconnect();
  }
}

main();