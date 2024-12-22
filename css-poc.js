/**
 * This POC ensures reading internal, inline and external CSS from node server which will be helping us to giving color/design suggestion and detecting color combination issue
 */

import { JSDOM } from "jsdom";
import CSSOM from "cssom";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chroma from "chroma-js";
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
  ).map((element) => {
    const styles = element.getAttribute("style");
    const borderColorMatch = styles.match(/border-color:\s*([^;]+)/i);
    const bgColorMatch = styles.match(/background-color:\s*([^;]+)/i);
    const colorMatch = styles.match(/(^|\s)color:\s*([^;]+)/i);
    return {
      element: element.outerHTML,
      styles: element.getAttribute("style"),
      borderColor: borderColorMatch ? borderColorMatch[1].trim() : null,
      color: colorMatch ? colorMatch[1].trim() : null,
      bgColor: bgColorMatch ? bgColorMatch[1].trim() : null,
    };
  });

  /** EXTRACTING INTERNAL CSS */
  const internalStyles = Array.from(
    dom.window.document.querySelectorAll("style")
  ).map((styleTag) => styleTag.textContent);

  const processedCSS = processCSSFromArray(internalStyles);

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
  console.log("Internal Styles:", processedCSS);
  console.log(
    "External Styles:",
    processExternalCSS(externalStyles)
  );
});

// const baseColor = '#9a00fa';
// const palette = chroma.scale([baseColor, 'white']).mode('lab').colors(10);

// console.log('PALETTE:',palette.slice(2, 8));

/** internal css process  */
function processCSSFromArray(cssArray) {
  const result = [];

  cssArray.forEach((cssString) => {
    const rules = cssString.match(/([^{}]+)\s*\{\s*([^}]+)\}/g);

    if (rules) {
      rules.forEach((rule) => {
        const [_, selector, declarations] = rule.match(
          /([^{}]+)\s*\{\s*([^}]+)\}/
        );

        const styles = {};
        declarations.split(";").forEach((declaration) => {
          const [property, value] = declaration
            .split(":")
            .map((item) => item.trim());

          // Process `border-color` to extract only the color code
          if (property === "border") {
            const colorMatch = value.match(
              /#[0-9a-fA-F]{3,6}|\b(rgba?|hsla?)\([^)]*\)/
            );
            if (colorMatch) {
              styles[property] = colorMatch[0];
            }
          }

          if (["color", "background-color"].includes(property)) {
            styles[property] = value;
          }
        });

        if (Object.keys(styles).length > 0) {
          result.push({ selector: selector.trim(), styles });
        }
      });
    }
  });

  return result;
}

/**
 * external css process
 */
const processExternalCSS = (externalStyles) => {
  const result = [];

  externalStyles.forEach((styleData) => {
    styleData.rules.forEach((rule) => {
      if (rule.selectorText && rule.style) {
        const styles = {};

        // Extract relevant properties
        for (let i = 0; i < rule.style.length; i++) {
          const property = rule.style[i];
          let value = rule.style[property];

          // For `border-color`, extract only the color code
          if (property === "border") {
            const colorMatch = value.match(
              /#[0-9a-fA-F]{3,6}|\b(rgba?|hsla?)\([^)]*\)/
            );
            if (colorMatch) {
              value = colorMatch[0];
            } else {
              continue; // Skip if no valid color is found
            }
          }

          // Include relevant styles only
          if (
            ["color", "background-color"].includes(property)
          ) {
            styles[property] = value;
          }
        }

        // Add to result if styles are not empty
        if (Object.keys(styles).length > 0) {
          result.push({
            selector: rule.selectorText,
            styles,
          });
        }
      }
    });
  });

  return result;
};
