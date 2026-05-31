(function () {
  const source = "/static/interactive/gamecult-compound/repo-doc-tree.json";
  let treePromise = null;

  function loadTree() {
    if (!treePromise) {
      treePromise = fetch(source).then((response) => {
        if (!response.ok) throw new Error(`repo doc tree ${response.status}`);
        return response.json();
      });
    }
    return treePromise;
  }

  function element(name, className, text) {
    const node = document.createElement(name);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function renderDocumentList(documents, limit) {
    const list = element("ul", "gamecult-doc-tree-list");
    for (const doc of documents.slice(0, limit)) {
      const item = element("li");
      const link = element("a", "", doc.title || doc.path);
      link.href = doc.href;
      const meta = element("span", "gamecult-doc-tree-path", doc.path);
      item.append(link, meta);
      list.append(item);
    }
    if (documents.length > limit) {
      const item = element(
        "li",
        "gamecult-doc-tree-overflow",
        `...and ${documents.length - limit} more documents in this repo.`,
      );
      list.append(item);
    }
    return list;
  }

  function loadRepo(repo) {
    return fetch(repo.src).then((response) => {
      if (!response.ok) throw new Error(`${repo.name} docs ${response.status}`);
      return response.json();
    });
  }

  function renderRepo(repo) {
    const details = element("details", "gamecult-doc-tree-repo");
    const summary = element("summary");
    const body = element("div", "gamecult-doc-tree-repo-body");
    summary.append(
      element("strong", "", repo.name),
      element("span", "gamecult-doc-tree-count", `${repo.documentCount} docs`),
    );
    details.append(summary, body);
    details.addEventListener("toggle", () => {
      if (!details.open || body.dataset.loaded === "true") return;
      body.dataset.loaded = "true";
      body.append(element("p", "gamecult-doc-tree-loading", "Loading repository shelf..."));
      loadRepo(repo)
        .then((payload) => {
          body.replaceChildren(renderDocumentList(payload.documents || [], 42));
        })
        .catch((error) => {
          body.textContent = `Could not load ${repo.name}: ${error.message || error}`;
        });
    });
    return details;
  }

  function renderPitchAssets(tree) {
    const section = element("section", "gamecult-doc-tree-pitch");
    section.append(
      element("h3", "", tree.pitchAssets.title),
      element("p", "", tree.pitchAssets.description),
      renderDocumentList(tree.pitchAssets.documents, 24),
    );
    return section;
  }

  function renderTarget(target, tree) {
    if (target.dataset.gamecultDocTreeReady === "true") return;
    target.dataset.gamecultDocTreeReady = "true";
    target.replaceChildren();

    const header = element("header", "gamecult-doc-tree-header");
    header.append(
      element("h2", "", "Repository Swarm Documentation"),
      element(
        "p",
        "",
        `${tree.documentCount} documents across ${tree.repoCount} repositories. This is the generated substrate; the Persona routes are the friendly handles bolted to it.`,
      ),
    );

    const repos = element("div", "gamecult-doc-tree-repos");
    for (const repo of tree.repos) {
      repos.append(renderRepo(repo));
    }

    target.append(header, renderPitchAssets(tree), repos);
  }

  function hydrate() {
    const targets = document.querySelectorAll("[data-gamecult-doc-tree]");
    if (targets.length === 0) return;
    loadTree()
      .then((tree) => {
        targets.forEach((target) => renderTarget(target, tree));
      })
      .catch((error) => {
        targets.forEach((target) => {
          target.textContent = `Repository tree failed to load: ${error.message || error}`;
        });
      });
  }

  document.addEventListener("DOMContentLoaded", hydrate);
  document.addEventListener("nav", hydrate);
  new MutationObserver(hydrate).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
