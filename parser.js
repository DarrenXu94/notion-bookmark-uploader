const BMParser = require("bookmark-parser");

const { addBlockChildren } = require("./index");

const valsToAdd = [];

BMParser.readFromHTMLFile("./bookmarks_31_08_2021.html").then((res) => {
  const bookmarks = res.Bookmarks.children[0].children;

  for (let folder of bookmarks) {
    console.log(folder.name);
    const folderTitleBlock = {
      object: "block",
      type: "heading_2",
      heading_2: {
        text: [
          {
            type: "text",
            text: {
              content: folder.name,
            },
          },
        ],
      },
    };
    valsToAdd.push(folderTitleBlock);

    // Loop through children

    for (let link of folder.children) {
      const paragraphBlock = {
        object: "block",
        type: "paragraph",
        paragraph: {
          text: [
            {
              type: "text",
              text: {
                content: link.name,
                link: {
                  url: link.url,
                },
              },
            },
          ],
        },
      };
      valsToAdd.push(paragraphBlock);
    }
  }
  addBlockChildren(valsToAdd);
});
