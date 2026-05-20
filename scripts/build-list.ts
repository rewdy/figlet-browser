import fs from "node:fs";
import path from "node:path";
import figlet, { type FontName } from "figlet";
import cliNames from "./cli-names.json";
import chapGPTTags from "./tags.json";

type FontInfo = {
  name: FontName;
  height: number;
  tags: string[];
  cliName?: string;
};

async function processFiles() {
  const directoryPath = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "../src/assets/figlets",
  );
  let fontResults: FontInfo[] = [];
  const files = await fs.promises.readdir(directoryPath);
  for (const file of files) {
    const fontName = file.replace(".js", "");
    const importedFont = await import(path.join(directoryPath, file));
    await figlet.parseFont(fontName, importedFont.default);
    let displayText = "";
    await new Promise<void>((resolve, reject) => {
      figlet.text(
        "Hello, world",
        {
          font: fontName,
          horizontalLayout: "default",
          verticalLayout: "default",
          whitespaceBreak: true,
        },
        (error, result) => {
          if (error) {
            console.error(error);
            displayText = "An error occurred while rendering the text.";
            reject(error);
          } else if (result) {
            displayText = result;
            resolve();
          }
        },
      );
    });
    const height = displayText.split("\n").length;
    let tags = [];
    if (fontName in chapGPTTags) {
      tags = chapGPTTags[fontName];
      delete chapGPTTags[fontName];
    }
    if (tags.length === 0) {
      console.warn(`No tags found for ${fontName}`);
    }
    const fontItem: FontInfo = {
      name: fontName,
      height,
      tags,
    };
    if (fontName in cliNames) {
      fontItem.cliName = cliNames[fontName as keyof typeof cliNames];
    }
    fontResults.push(fontItem);
  }
  // Sort
  fontResults = fontResults.sort((a, b) => a.name.localeCompare(b.name));
  // Write
  await fs.writeFile(
    "src/hooks/fontList.json",
    JSON.stringify(fontResults, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing file", err);
      } else {
        console.log("Font list has been saved.");
      }
    },
  );

  const remaining = Object.keys(chapGPTTags);
  console.log("Remaining tags:", remaining, remaining.length);

  const withCli = fontResults.filter((f) => f.cliName).length;
  console.log(
    `cliName coverage: ${withCli}/${fontResults.length} fonts (${
      fontResults.length - withCli
    } not in figlet CLI)`,
  );
}

processFiles();
