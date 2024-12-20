import { JSDOM } from "jsdom";
import CSSOM from "cssom";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlFilePath = path.join(__dirname, "index.html");

fs.readFile(htmlFilePath, "utf-8", async (err, htmlContent) => {
  if (err) {
    console.error("Error reading HTML file:", err);
    return;
  }

  /** PARSE THE HTML CONTENT USING JSDOM */
  const dom = new JSDOM(htmlContent);

  /** EXTRACTING INLINE CSS */
  const inlineStyles = Array.from(
    dom.window.document.querySelectorAll("[style]")
  ).map((element) => ({
    element: element.outerHTML,
    styles: element.getAttribute("style"),
  }));

  /** EXTRACTING INTERNAL CSS */
  const internalStyles = Array.from(
    dom.window.document.querySelectorAll("style")
  ).map((styleTag) => styleTag.textContent);

  /** EXTRACTING EXTERNAL CSS */

  const externalLinks = Array.from(
    dom.window.document.querySelectorAll('link[rel="stylesheet"]')
  ).map((linkTag) => linkTag.getAttribute("href"));

  let externalStyles = [];
  for (const link of externalLinks) {
    let cssRules = [];
    // Local file (resolve the full path)
    const localFilePath = path.join(__dirname, link);
    const localCSS = fs.readFileSync(localFilePath, "utf-8");
    const parsedLocalCSS = CSSOM.parse(localCSS); // Correct way to parse local CSS
    cssRules = parsedLocalCSS.cssRules;
    externalStyles.push({ url: link, rules: Array.from(cssRules) });
  }

  /**
   * POC result: This POC will help us to understand the current design. Our goal is to measure color code and some basic css rules which is important for user accessability
   */
  console.log("Inline Styles:", inlineStyles);
  console.log("Internal Styles:", internalStyles);
  console.log("External Styles:", externalStyles[0].rules);
});
