import { retext } from "retext";
import retextReadability from "retext-readability";
import english from "retext-english";
import { reporter } from "vfile-reporter";
import retextProfanities from "retext-profanities";

/** HARD LEVEL TEXT */
const texts = [
  "In consideration of the complexities and nuances inherent in the subject matter, it becomes abundantly clear that without a comprehensive understanding, the probability of achieving satisfactory outcomes diminishes significantly.",
  "Climate change is one of the most pressing challenges of our time. Rising temperatures, unpredictable weather patterns, and sea-level rise threaten ecosystems, food security, and infrastructure. Human activities, such as burning fossil fuels and deforestation, have significantly contributed to these changes. While renewable energy sources like solar and wind offer a path forward, global cooperation and immediate action are essential to mitigating the most severe impacts of climate change. Understanding the science behind these changes and making informed decisions will be crucial for future generations.",
  "The sun is essential for life on Earth. It provides light and warmth, which are necessary for plants to grow. Without the sun, the planet would be too cold for most living things to survive. People have always depended on the sun for energy and even use solar panels to collect its power. The sun also helps us keep track of time, as we use its position in the sky to tell the time of day",
];

const text = texts[2];

/** MID LEVEL TEXT */

/** SIMPLE LEVEL TEXT */

const file = await retext()
  .use(english)
  .use(retextReadability)
  .use(retextProfanities)
  .process(text);

/**
 * POC result
 */
/** SHOWING THE RETEXT VALUE */
console.log("value", String(file));

/** GENERATING REPORT FOR */
console.error("report result:", reporter(file));
