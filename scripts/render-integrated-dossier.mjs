import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "docs", "gamecult_integrated_dossier.tex");
const outputPath = path.join(root, "GameCult", "Integrated-Dossier.md");

function readBraceArg(text, start) {
  while (text[start] && /\s/.test(text[start])) start += 1;
  if (text[start] !== "{") return null;
  let depth = 0;
  for (let index = start; index < text.length; index += 1) {
    if (text[index] === "\\" && text[index + 1]) {
      index += 1;
      continue;
    }
    if (text[index] === "{") depth += 1;
    if (text[index] === "}") depth -= 1;
    if (depth === 0) {
      return { value: text.slice(start + 1, index), end: index + 1 };
    }
  }
  return null;
}

function replaceCommand(text, command, argCount, replacer) {
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
    for (let i = 0; i < argCount; i += 1) {
      const arg = readBraceArg(text, next);
      if (!arg) break;
      args.push(arg.value);
      next = arg.end;
    }
    output += args.length === argCount ? replacer(args) : text.slice(index, next);
    cursor = next;
  }
  return output;
}

function splitCells(row) {
  const cells = [];
  let current = "";
  let depth = 0;
  for (let i = 0; i < row.length; i += 1) {
    const char = row[i];
    if (char === "\\" && row[i + 1]) {
      current += char + row[i + 1];
      i += 1;
      continue;
    }
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
    if (char === "&" && depth === 0) {
      cells.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  cells.push(current.trim());
  return cells.filter((cell) => cell.length > 0);
}

function stripInline(text) {
  let output = text;
  output = replaceCommand(output, "src", 2, ([label, url]) => {
    return `<sup><a href="${url}">${cleanInline(label)}</a></sup>`;
  });
  output = replaceCommand(output, "href", 2, ([url, label]) => `[${cleanInline(label)}](${url})`);
  output = replaceCommand(output, "term", 1, ([body]) => `<strong>${cleanInline(body)}</strong>`);
  output = replaceCommand(output, "textbf", 1, ([body]) => `<strong>${cleanInline(body)}</strong>`);
  output = replaceCommand(output, "textcolor", 2, ([, body]) => cleanInline(body));
  return cleanInline(output);
}

function cleanInline(text) {
  return text
    .replace(/\\LaTeX\{\}/g, "LaTeX")
    .replace(/\\textbackslash\{\}/g, "\\")
    .replace(/\\url\{([^}]+)\}/g, "$1")
    .replace(/\\_/g, "_")
    .replace(/\\%/g, "%")
    .replace(/\\\$/g, "&#36;")
    .replace(/\\&/g, "&")
    .replace(/\\rightarrow/g, "\\to")
    .replace(/\\pageref\*\{[^}]+\}/g, "")
    .replace(/\\[a-zA-Z]+\*?(?:\[[^\]]+\])?/g, "")
    .replace(/[{}]/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

function convertLongTables(text) {
  return text.replace(/\\begin\{longtable\}\{[^\n]*\}([\s\S]*?)\\end\{longtable\}/g, (_, body) => {
    const rows = body
      .replace(/\\(?:toprule|midrule|bottomrule)/g, "")
      .split(/\\\\/)
      .map((row) => row.trim())
      .filter((row) => row.length > 0);

    const renderedRows = rows
      .map((row, rowIndex) => {
        const cells = splitCells(row).map(stripInline);
        if (cells.length < 2) return "";
        const cellTag = rowIndex === 0 || row.includes("\\textbf") ? "th" : "td";
        return `<tr>${cells.map((cell) => `<${cellTag}>${cell}</${cellTag}>`).join("")}</tr>`;
      })
      .filter(Boolean)
      .join("\n");

    return `\n<table class="integrated-dossier-table">\n<tbody>\n${renderedRows}\n</tbody>\n</table>\n`;
  });
}

function convertDescription(text) {
  return text.replace(/\\begin\{description\}(?:\[[^\]]+\])?([\s\S]*?)\\end\{description\}/g, (_, body) => {
    const items = [...body.matchAll(/\\item\[([^\]]+)\]\s*([\s\S]*?)(?=\\item\[|$)/g)]
      .map((match) => {
        return `<dt>${stripInline(match[1])}</dt>\n<dd>${stripInline(match[2])}</dd>`;
      })
      .join("\n");
    return `\n<dl class="integrated-dossier-glossary">\n${items}\n</dl>\n`;
  });
}

function convertVerbatim(text) {
  return text.replace(/\\begin\{verbatim\}([\s\S]*?)\\end\{verbatim\}/g, (_, body) => {
    return `\n\`\`\`text\n${body.trim()}\n\`\`\`\n`;
  });
}

function convertTex(tex) {
  let body = tex.slice(tex.indexOf("\\chapter*{Executive Summary}"));
  body = body.replace(/\\end\{document\}[\s\S]*$/, "");
  body = convertVerbatim(body);
  body = convertLongTables(body);
  body = convertDescription(body);
  body = replaceCommand(body, "noteBox", 1, ([content]) => {
    return `\n<aside class="integrated-dossier-note">\n${stripInline(content)}\n</aside>\n`;
  });
  body = replaceCommand(body, "src", 2, ([label, url]) => {
    return `<sup><a href="${url}">${cleanInline(label)}</a></sup>`;
  });
  body = replaceCommand(body, "href", 2, ([url, label]) => `[${cleanInline(label)}](${url})`);
  body = replaceCommand(body, "term", 1, ([content]) => `<strong>${cleanInline(content)}</strong>`);
  body = replaceCommand(body, "textbf", 1, ([content]) => `<strong>${cleanInline(content)}</strong>`);
  body = replaceCommand(body, "textcolor", 2, ([, content]) => cleanInline(content));

  return body
    .replace(/\\chapter\*\{([^}]+)\}/g, "\n## $1\n")
    .replace(/\\chapter\{([^}]+)\}/g, "\n## $1\n")
    .replace(/\\section\*\{([^}]+)\}/g, "\n### $1\n")
    .replace(/\\section\{([^}]+)\}/g, "\n### $1\n")
    .replace(/\\subsection\{([^}]+)\}/g, "\n#### $1\n")
    .replace(/\\addcontentsline\{[^}]+\}\{[^}]+\}\{[^}]+\}/g, "")
    .replace(/\\appendix/g, "\n## Appendix\n")
    .replace(/\\begin\{itemize\}|\\end\{itemize\}/g, "")
    .replace(/\\begin\{enumerate\}(?:\[[^\]]+\])?|\\end\{enumerate\}/g, "")
    .replace(/^\s*\\item\s+/gm, "- ")
    .replace(/\\hypersetup\{[^}]+\}/g, "")
    .replace(/\\pagenumbering\{[^}]+\}/g, "")
    .replace(/\\clearpage|\\tableofcontents|\\listoftables/g, "")
    .replace(/\\noindent|\\centering|\\vfill|\\vspace\*?\{[^}]+\}/g, "")
    .replace(/\\begin\{[^}]+\}(?:\[[^\]]+\])?|\\end\{[^}]+\}/g, "")
    .replace(/\\LaTeX\{\}/g, "LaTeX")
    .replace(/\\_/g, "_")
    .replace(/\\%/g, "%")
    .replace(/\\\$/g, "&#36;")
    .replace(/\\rightarrow/g, "\\to")
    .replace(/\\\\/g, "<br />")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const source = fs.readFileSync(sourcePath, "utf8");
const body = convertTex(source);
const generatedAt = new Date().toISOString().slice(0, 10);

const page = `---
title: Integrated Investment Dossier
description: "GameCult / Epiphany / Bifrost integrated diligence memo, product thesis, risk map, and staged proof plan."
enableToc: true
cssclasses:
  - integrated-dossier-page
---

<section class="integrated-dossier-hero">
  <p class="integrated-dossier-kicker">GameCult / Epiphany / Bifrost</p>
  <h1>Integrated Investment Dossier</h1>
  <p>Diligence memo, product thesis, risk map, and staged proof plan for serious readers who need the machine without the fireworks.</p>
  <dl>
    <div><dt>Prepared for</dt><dd>Internal venture partner discussion</dd></div>
    <div><dt>Prepared on</dt><dd>May 30, 2026</dd></div>
    <div><dt>Status</dt><dd>Discussion draft, not legal or tax advice</dd></div>
    <div><dt>Source</dt><dd><code>docs/gamecult_integrated_dossier.tex</code></dd></div>
  </dl>
  <p class="integrated-dossier-source">Generated on ${generatedAt}.</p>
</section>

<aside class="integrated-dossier-note integrated-dossier-lead">
<strong>Core thesis.</strong> GameCult is an early, founder-led attempt to turn agent-assisted work into an inspectable production system. Epiphany addresses persistent agent context and execution; CultMesh addresses typed distributed state; Bifrost addresses work intake, governance, receipts, credit, and eventual reward flows. The investable question is not whether the vision is large. It is whether this stack can repeatedly produce accepted external work with lower coordination cost than a conventional team, agency, or enterprise workflow platform.
</aside>

${body}
`;

fs.writeFileSync(outputPath, page, "utf8");
console.log(`Wrote ${path.relative(root, outputPath)}`);
