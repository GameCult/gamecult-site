import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dossierRoot = path.join(root, "docs", "portfolio-dossier");
const outputPath = path.join(root, "GameCult", "Portfolio-Dossier.md");

const figureMap = {
  "figures/moonshot-trajectory.pdf": "/static/interactive/portfolio-pitch/figures/moonshot-trajectory.svg",
  "figures/value-orbit-map.pdf": "/static/interactive/portfolio-pitch/figures/value-orbit-map.svg",
  "figures/patronage-furnace.pdf": "/static/interactive/portfolio-pitch/figures/patronage-furnace.svg",
  "figures/surface-web-stack.pdf": "/static/interactive/portfolio-pitch/figures/surface-web-stack.svg",
};

function readTex(relativePath) {
  return fs.readFileSync(path.join(dossierRoot, `${relativePath}.tex`), "utf8");
}

function expandInputs(tex, currentDir = "") {
  return tex.replace(/\\input\{([^}]+)\}/g, (_, inputPath) => {
    if (inputPath === "preamble") return "";
    if (inputPath === "figures/surface-web-stack") return "\n\\SurfaceWebStack\n";
    if (inputPath === "figures/value-furnace") return "\n\\ValueFurnace\n";
    const relative = path.normalize(path.join(currentDir, inputPath)).replace(/\\/g, "/");
    const file = path.join(dossierRoot, `${relative}.tex`);
    if (!fs.existsSync(file)) return "";
    return `\n${expandInputs(fs.readFileSync(file, "utf8"), path.dirname(relative))}\n`;
  });
}

function readBraceArg(text, start) {
  while (text[start] && /\s/.test(text[start])) start += 1;
  if (text[start] !== "{") return null;
  let depth = 0;
  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    if (char === "\\" && text[index + 1]) {
      index += 1;
      continue;
    }
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
    if (depth === 0) {
      return {
        value: text.slice(start + 1, index),
        end: index + 1,
      };
    }
  }
  return null;
}

function replaceCommand(text, command, replacer) {
  let output = "";
  let cursor = 0;
  const token = `\\${command}`;
  while (cursor < text.length) {
    const index = text.indexOf(token, cursor);
    if (index === -1) {
      output += text.slice(cursor);
      break;
    }

    output += text.slice(cursor, index);
    let next = index + token.length;
    const args = [];
    while (true) {
      const arg = readBraceArg(text, next);
      if (!arg) break;
      args.push(arg.value);
      next = arg.end;
    }
    output += replacer(args);
    cursor = next;
  }
  return output;
}

function stripInline(tex) {
  return tex
    .replace(/\\textbf\{([^{}]+)\}/g, "**$1**")
    .replace(/\\texttt\{([^{}]+)\}/g, "`$1`")
    .replace(/\\color\{[^}]+\}/g, "")
    .replace(/\\Large/g, "")
    .replace(/\\\\\[[^\]]*\]/g, "\n")
    .replace(/\\\\/g, "\n")
    .replace(/\\_/g, "_")
    .replace(/\\%/g, "%")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

function callout(label, body, kind = "orange") {
  return `<aside class="portfolio-dossier-callout ${kind}">\n<strong>${label}</strong>\n\n${stripInline(body)}\n</aside>`;
}

function projectionTable(rows) {
  const body = rows
    .map(([label, value]) => `<tr><th>${label}</th><td>${stripInline(value)}</td></tr>`)
    .join("\n");
  return `<table class="portfolio-dossier-table">\n<tbody>\n${body}\n</tbody>\n</table>`;
}

function figure(src, caption) {
  const image = figureMap[src] || src;
  return `<figure class="portfolio-dossier-figure">\n<img src="${image}" alt="${stripInline(caption)}" />\n<figcaption>${stripInline(caption)}</figcaption>\n</figure>`;
}

function convertSpecialBlocks(tex) {
  return tex
    .replace(
      /\\begin\{center\}\s*\\fcolorbox\{voidorange\}\{voidpanel\}\{\\parbox\{[^}]+\}\{\\color\{voidtext\}\\Large\s*([\s\S]*?)\}\}\s*\\end\{center\}/g,
      (_, body) => callout("Public spell", body, "orange"),
    )
    .replace(
      /\\begin\{center\}\s*\\fcolorbox\{voidorange\}\{voidpanel\}\{\\parbox\{[^}]+\}\{\\color\{voidtext\}\s*([\s\S]*?)\}\}\s*\\end\{center\}/g,
      (_, body) => callout("Pipeline", body, "orange"),
    )
    .replace(
      /\\begin\{center\}\s*\\fcolorbox\{voidblue\}\{voidpanel\}\{\\parbox\{[^}]+\}\{\\color\{voidtext\}\s*([\s\S]*?)\}\}\s*\\end\{center\}/g,
      (_, body) => callout("Surface contract", body, "blue"),
    );
}

function convertFigureTables(tex) {
  return tex
    .replace(
      /\\SurfaceWebStack/g,
      `<section class="portfolio-dossier-card">\n<h4>Eve Surface-Web Stack</h4>\n${projectionTable([
        ["Provider", "Owns state, permissions, commands, and acceptance."],
        ["CultUI Tree", "Declares semantic controls, bindings, layout intent, and provenance."],
        ["Eve", "Projects one surface contract into web, desktop, mobile, game UI, and overlays."],
        ["Renderer", "Chooses native affordances without stealing authority from the provider."],
      ])}\n</section>`,
    )
    .replace(
      /\\ValueFurnace/g,
      `<section class="portfolio-dossier-card">\n<h4>Value Furnace</h4>\n${projectionTable([
        ["Input", "Patronage, game spend, verified work, support, and risk."],
        ["Normalization", "Project-local rules turn events into effective points."],
        ["Governance", "Log-power voting keeps power legible without pretending all support is equal."],
        ["Output", "Priority, reward pressure, credit, receipts, and scoped voting weight."],
      ])}\n</section>`,
    );
}

function convertTexToMarkdown(tex) {
  let text = tex
    .replace(/\\documentclass[\s\S]*?\\begin\{document\}/, "")
    .replace(/\\PortfolioTitlePage/g, "")
    .replace(/\\tableofcontents/g, "")
    .replace(/\\clearpage/g, "")
    .replace(/\\appendix/g, "\n## Appendix\n")
    .replace(/\\end\{document\}/g, "");

  text = convertFigureTables(convertSpecialBlocks(text));

  text = replaceCommand(text, "ProjectHeader", ([name, domain, thesis, room]) => {
    return `\n## ${stripInline(name)}\n\n<section class="portfolio-dossier-project-meta">\n${projectionTable([
      ["Domain", domain],
      ["Thesis", thesis],
      ["Homepage Room", room],
    ])}\n</section>\n`;
  });
  text = replaceCommand(text, "ProjectionBand", ([base, sharp, mythic, failure]) => {
    return `\n<section class="portfolio-dossier-card projection-band">\n<h4>Projection Band</h4>\n${projectionTable([
      ["Base Case", base],
      ["Sharp Case", sharp],
      ["Mythic Case", mythic],
      ["Failure Mode", failure],
    ])}\n</section>\n`;
  });
  text = replaceCommand(text, "ValueLadder", ([survival, product, platform, worldWeb]) => {
    return `\n<section class="portfolio-dossier-card value-ladder">\n<h4>Value Projection Ladder</h4>\n${projectionTable([
      ["Survival", survival],
      ["Product", product],
      ["Platform", platform],
      ["World-Web", worldWeb],
    ])}\n</section>\n`;
  });
  text = replaceCommand(text, "MoonGraphic", ([, src, caption]) => `\n${figure(src, caption)}\n`);
  text = replaceCommand(text, "Verdict", ([body]) => `\n${callout("Void says", body, "orange")}\n`);
  text = replaceCommand(text, "Term", ([body]) => `<span class="portfolio-term">${stripInline(body)}</span>`);
  text = replaceCommand(text, "Signal", ([body]) => `<span class="portfolio-signal">${stripInline(body)}</span>`);

  text = text
    .replace(/\\chapter\{([^}]+)\}/g, "\n## $1\n")
    .replace(/\\section\{([^}]+)\}/g, "\n### $1\n")
    .replace(/\\subsection\{([^}]+)\}/g, "\n#### $1\n")
    .replace(/\\begin\{itemize\}/g, "")
    .replace(/\\end\{itemize\}/g, "")
    .replace(/^\s*\\item\s+/gm, "- ")
    .replace(/\\begin\{center\}|\\end\{center\}/g, "")
    .replace(/\\begin\{tabularx\}[\s\S]*?\\end\{tabularx\}/g, "")
    .replace(/\\begin\{figure\}[\s\S]*?\\end\{figure\}/g, "")
    .replace(/\\noindent/g, "")
    .replace(/\\vspace\{[^}]+\}/g, "")
    .replace(/\\href\{([^}]+)\}\{([^}]+)\}/g, "[$2]($1)")
    .replace(/\\\[/g, () => "$$")
    .replace(/\\\]/g, () => "$$")
    .replace(/\\rightarrow/g, "\\to")
    .replace(/\\max/g, "\\max")
    .replace(/\\_/g, "_")
    .replace(/\\%/g, "%")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return text;
}

const expanded = expandInputs(readTex("main"));
const body = convertTexToMarkdown(expanded);
const generatedAt = new Date().toISOString().slice(0, 10);

const page = `---
title: Portfolio Dossier
description: "GameCult's over-the-top TeX portfolio dossier rendered as a dark-mode web page with Montserrat and Ubuntu branding."
enableToc: true
cssclasses:
  - portfolio-dossier-page
---

<section class="portfolio-dossier-hero">
  <p class="portfolio-dossier-kicker">GameCult / Void Dossier</p>
  <h1>Portfolio Dossier</h1>
  <p>Eve, Bifrost, CultMesh, Sai, and the surface-web portfolio. Same TeX source, rendered for humans who would rather not receive a white PDF brick to the face.</p>
  <div class="portfolio-dossier-actions">
    <a href="/static/interactive/portfolio-pitch/figures/moonshot-trajectory.svg">Moonshot graphic</a>
    <a href="/Pitch">Play the VN pitch</a>
    <a href="https://github.com/GameCult">GameCult GitHub</a>
  </div>
  <p class="portfolio-dossier-source">Generated from <code>docs/portfolio-dossier/main.tex</code> on ${generatedAt}.</p>
</section>

${body}
`;

fs.writeFileSync(outputPath, page, "utf8");
console.log(`Wrote ${path.relative(root, outputPath)}`);
