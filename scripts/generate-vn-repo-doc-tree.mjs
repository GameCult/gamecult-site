import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const projectsRoot = process.env.GAMECULT_PROJECTS_ROOT
  ? path.resolve(process.env.GAMECULT_PROJECTS_ROOT)
  : path.resolve(repoRoot, "..");
const outputPath = path.join(
  repoRoot,
  "GameCult",
  "static",
  "interactive",
  "gamecult-compound",
  "repo-doc-tree.json",
);
const shardRoot = path.join(path.dirname(outputPath), "repo-doc-tree");

const documentExtensions = new Set([".md", ".mdx", ".rst", ".tex"]);
const textDocumentNames = new Set([
  "agents.txt",
  "authors.txt",
  "changes.txt",
  "changelog.txt",
  "copying.txt",
  "credits.txt",
  "license.txt",
  "readme.txt",
]);
const ignoredDirectories = new Set([
  ".git",
  ".pytest_cache",
  ".quartz-build",
  ".npm-cache",
  ".tools",
  "bin",
  "build",
  "dist",
  "node_modules",
  "obj",
  "out",
  "quartz-site",
  "target",
  "venv",
]);

function isIgnoredPath(relativePath) {
  return relativePath
    .split(/[\\/]+/)
    .some((part) => ignoredDirectories.has(part) || part.startsWith(".cache"));
}

function titleFromPath(filePath) {
  const parsed = path.parse(filePath);
  const raw = parsed.name === "README" ? path.basename(path.dirname(filePath)) : parsed.name;
  return raw
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function publicHref(repoName, relativePath) {
  if (repoName === "gamecult-site" && relativePath.startsWith("GameCult/")) {
    const withoutRoot = relativePath
      .replace(/^GameCult\//, "")
      .replace(/\.(md|mdx)$/i, "");
    const slug = withoutRoot.replace(/(^|\/)index$/i, "");
    return `/${slug}`;
  }
  return `https://github.com/GameCult/${encodeURIComponent(repoName)}/blob/main/${relativePath
    .split(path.sep)
    .join("/")}`;
}

function collectDocuments(repoPath, repoName) {
  const documents = [];
  const stack = [repoPath];

  while (stack.length > 0) {
    const current = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch (error) {
      if (error?.code === "EPERM" || error?.code === "EACCES") {
        const relativeCurrent = path.relative(repoPath, current).split(path.sep).join("/") || ".";
        console.warn(
          `Skipping unreadable directory in ${repoName}: ${relativeCurrent} (${error.code})`,
        );
        continue;
      }
      throw error;
    }
    for (const entry of entries) {
      const absolute = path.join(current, entry.name);
      const relative = path.relative(repoPath, absolute).split(path.sep).join("/");
      if (isIgnoredPath(relative)) continue;

      if (entry.isDirectory()) {
        stack.push(absolute);
        continue;
      }

      const extension = path.extname(entry.name).toLowerCase();
      const isTextDocument =
        extension === ".txt" && textDocumentNames.has(entry.name.toLowerCase());
      if (!entry.isFile() || (!documentExtensions.has(extension) && !isTextDocument)) {
        continue;
      }

      documents.push({
        id: `${repoName}:${relative}`,
        title: titleFromPath(relative),
        path: relative,
        href: publicHref(repoName, relative),
        extension: path.extname(entry.name).slice(1).toLowerCase(),
      });
    }
  }

  documents.sort((left, right) => left.path.localeCompare(right.path));
  return documents;
}

function buildPitchAssets(repos) {
  const site = repos.find((repo) => repo.name === "gamecult-site");
  const pitchDocs = site?.documents.filter((doc) =>
    doc.path.startsWith("docs/portfolio-dossier/") ||
    doc.path.startsWith("GameCult/Pitch.") ||
    doc.path.includes("portfolio-pitch"),
  );
  const figureRoot = path.join(
    repoRoot,
    "GameCult",
    "static",
    "interactive",
    "portfolio-pitch",
    "figures",
  );
  const figureDocs = fs.existsSync(figureRoot)
    ? fs
        .readdirSync(figureRoot, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith(".svg"))
        .map((entry) => {
          const relative = `GameCult/static/interactive/portfolio-pitch/figures/${entry.name}`;
          return {
            id: `gamecult-site:${relative}`,
            title: titleFromPath(entry.name),
            path: relative,
            href: `/static/interactive/portfolio-pitch/figures/${entry.name}`,
            extension: "svg",
          };
        })
    : [];

  return {
    title: "Pitch Mode Assets",
    description:
      "Whitepaper, TeX dossier, SVG moonshot graphics, and Sai pitch routes that characters can pull in when they start selling their corner of the machine.",
    documents: [...(pitchDocs || []), ...figureDocs].sort((left, right) =>
      left.path.localeCompare(right.path),
    ),
  };
}

function slugifyRepoName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const repos = fs
  .readdirSync(projectsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => ({
    name: entry.name,
    path: path.join(projectsRoot, entry.name),
  }))
  .filter((repo) => fs.existsSync(path.join(repo.path, ".git")))
  .sort((left, right) => left.name.localeCompare(right.name))
  .map((repo) => ({
    name: repo.name,
    documentCount: 0,
    documents: collectDocuments(repo.path, repo.name),
  }))
  .filter((repo) => repo.documents.length > 0)
  .map((repo) => ({
    ...repo,
    documentCount: repo.documents.length,
  }));

const documentCount = repos.reduce((sum, repo) => sum + repo.documentCount, 0);
const pitchAssets = buildPitchAssets(repos);
fs.mkdirSync(shardRoot, { recursive: true });
for (const entry of fs.readdirSync(shardRoot)) {
  if (entry.endsWith(".json")) fs.unlinkSync(path.join(shardRoot, entry));
}
for (const repo of repos) {
  const shardName = `${slugifyRepoName(repo.name)}.json`;
  fs.writeFileSync(
    path.join(shardRoot, shardName),
    `${JSON.stringify(
      {
        schema: "gamecult.vn.repoDocTree.repo.v1",
        repo: repo.name,
        documentCount: repo.documentCount,
        documents: repo.documents,
      },
      null,
      2,
    )}\n`,
  );
  repo.src = `/static/interactive/gamecult-compound/repo-doc-tree/${shardName}`;
  delete repo.documents;
}

const payload = {
  schema: "gamecult.vn.repoDocTree.v1",
  sourceRoot: projectsRoot,
  repoCount: repos.length,
  documentCount,
  repos,
  pitchAssets,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(
  `Wrote ${documentCount} documents from ${repos.length} repos to ${path.relative(repoRoot, outputPath)} plus ${repos.length} repo shards`,
);
