const client = require("@notionhq/client");
require("dotenv").config();

const notion = new client.Client({
  auth: process.env.SECRET,
});

const databaseId = process.env.DATABASE_ID;

module.exports = { addBlockChildren };

async function addBlockChildren(children) {
  try {
    const response = await notion.blocks.children.append({
      block_id: databaseId,
      children,
    });
    console.log(response);
  } catch (error) {
    console.error(error.body);
  }
}
