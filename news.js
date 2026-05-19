const compactNewsStyle = document.createElement("style");
compactNewsStyle.textContent = `
  .news-panel { padding: 10px !important; }
  .news-head { margin-bottom: 6px !important; }
  .news-head h2 { font-size: 17px !important; }
  .news-grid.headline-mode { gap: 6px !important; grid-template-columns: 1.35fr 1fr 1fr 1fr !important; }
  .headline-card { gap: 3px !important; padding: 7px !important; min-height: 0 !important; }
  .headline-card.subsidy-card { grid-column: span 2 !important; }
  .headline-card h3 { font-size: 12px !important; line-height: 1.1 !important; }
  .headline-top { gap: 5px !important; }
  .headline-top span { padding: 2px 5px !important; font-size: 9px !important; line-height: 1.05 !important; }
  .headline-top a { font-size: 10px !important; line-height: 1.05 !important; }
  .headline-updated { font-size: 9px !important; line-height: 1.05 !important; }
  .headline-item { grid-template-columns: 36px minmax(0, 1fr) !important; gap: 5px !important; padding: 3px 0 !important; }
  .headline-time { font-size: 9px !important; line-height: 1.1 !important; }
  .headline-title { font-size: 10.5px !important; line-height: 1.18 !important; }
  .main-news .headline-title { font-size: 10.8px !important; }
  .headline-source { margin-top: 0 !important; font-size: 8.5px !important; line-height: 1.05 !important; }
  .headline-loading, .headline-error { font-size: 10.5px !important; padding-top: 5px !important; }
  @media (max-width: 1120px) {
    .news-grid.headline-mode { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
    .headline-card.subsidy-card { grid-column: span 2 !important; }
  }
  @media (max-width: 760px) {
    .news-panel { padding: 9px !important; }
    .news-grid.headline-mode { grid-template-columns: 1fr !important; }
    .headline-card.subsidy-card { grid-column: auto !important; }
    .headline-item { grid-template-columns: 36px minmax(0, 1fr) !important; }
    .headline-title { font-size: 10.8px !important; }
  }
`;
document.head.appendChild(compactNewsStyle);

const newsConfig = [
  {
    target: "machineHeadlines",
    updated: "machineUpdated",
    search: "machineNewsSearch",
    limit: 4,
    query: "工作機械 OR NC旋盤 OR マシニングセンタ OR 設備保全 OR 制御盤 OR サーボモータ when:1d"
  },
  {
    target: "worldHeadlines",
    updated: "worldUpdated",
    search: "worldNewsSearch",
    limit: 3,
    query: "世界情勢 製造業 サプライチェーン 半導体 物流 エネルギー when:1d"
  },
  {
    target: "economyHeadlines",
    updated: "economyUpdated",
    search: "economyNewsSearch",
    limit: 3,
    query: "製造業 景況感 設備投資 円相場 金利 中小企業 when:1d"
  },
  {
    target: "localHeadlines",
    updated: "localUpdated",
    search: "localNewsSearch",
    regional: true,
    limit: 3,
    query: "製造業 工場 設備 交通 経済 when:1d"
  },
  {
    target: "subsidyHeadlines",
    updated: "subsidyUpdated",
    search: "subsidyNewsSearch",
    limit: 4,
    query: "福山市 広島県 補助金 助成金 中小企業 設備投資 省力化 ものづくり when:30d"
  }
];

const newsRegionSelect = document.querySelector("#newsRegionSelect");
const googleNewsBase = "https://news.google.com/search?q=";

function newsSearchUrl(query) {
  return `${googleNewsBase}${encodeURIComponent(query)}&hl=ja&gl=JP&ceid=JP:ja`;
}

function escapeNews(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function formatUpdated(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "更新時刻未取得";
  return `更新 ${new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date)}`;
}

function renderNewsGroup(config, items, updatedAt) {
  const box = document.querySelector(`#${config.target}`);
  const updated = document.querySelector(`#${config.updated}`);
  const search = document.querySelector(`#${config.search}`);
  if (!box) return;

  const query = config.regional && newsRegionSelect
    ? `${newsRegionSelect.value} ${config.query}`
    : config.query;

  if (search) search.href = newsSearchUrl(query);
  if (updated) updated.textContent = formatUpdated(updatedAt);

  if (!items || !items.length) {
    box.innerHTML = `<p class="headline-error">見出しを取得できませんでした。もっと見るから確認してください。</p>`;
    return;
  }

  box.innerHTML = items.slice(0, config.limit || 3).map((item) => `
    <a class="headline-item" href="${escapeNews(item.url || newsSearchUrl(query))}" target="_blank" rel="noopener">
      <span class="headline-time">${escapeNews(item.time || "速報")}</span>
      <span>
        <strong class="headline-title">${escapeNews(item.title)}</strong>
        <span class="headline-source">${escapeNews(item.source || "ニュース")}</span>
      </span>
    </a>
  `).join("");
}

async function loadNewsJson() {
  try {
    const response = await fetch(`news.json?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("news.json response error");
    const data = await response.json();
    newsConfig.forEach((config) => renderNewsGroup(config, data.groups?.[config.target] || [], data.updatedAt));
  } catch (error) {
    newsConfig.forEach((config) => renderNewsGroup(config, [], ""));
  }
}

if (newsRegionSelect) {
  newsRegionSelect.addEventListener("change", loadNewsJson);
}

loadNewsJson();
