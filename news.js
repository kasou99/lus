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
  .field-map-panel { grid-column: 1 / -1; border: 1px solid var(--line); border-radius: 8px; background: var(--panel); box-shadow: 0 18px 45px rgba(15, 28, 36, 0.08); padding: 12px; }
  .field-map-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 8px; }
  .field-map-head h2 { margin: 0; font-size: 18px; line-height: 1.15; }
  .field-map-controls { display: grid; grid-template-columns: minmax(160px, 1fr) auto; gap: 8px; margin-bottom: 8px; }
  .field-map-controls input { min-height: 36px; padding: 7px 9px; }
  .field-map-controls button { min-height: 36px; padding: 0 10px; background: #26343c; }
  .map-shortcuts { display: grid; grid-template-columns: repeat(10, minmax(82px, 1fr)); gap: 6px; }
  .map-shortcuts a { border: 1px solid var(--line); border-radius: 6px; background: var(--panel-2); color: var(--accent); padding: 7px 6px; font-size: 11px; font-weight: 900; line-height: 1.2; text-align: center; text-decoration: none; }
  .map-shortcuts a:hover { border-color: var(--accent); background: #eaf7f7; }
  .field-map-status { margin: 6px 0 0; color: var(--muted); font-size: 11px; font-weight: 800; line-height: 1.35; }
  @media (max-width: 1120px) {
    .news-grid.headline-mode { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
    .headline-card.subsidy-card { grid-column: span 2 !important; }
    .map-shortcuts { grid-template-columns: repeat(5, minmax(82px, 1fr)); }
  }
  @media (max-width: 760px) {
    .news-panel { padding: 9px !important; }
    .news-grid.headline-mode { grid-template-columns: 1fr !important; }
    .headline-card.subsidy-card { grid-column: auto !important; }
    .headline-item { grid-template-columns: 36px minmax(0, 1fr) !important; }
    .headline-title { font-size: 10.8px !important; }
    .field-map-head { align-items: flex-start; flex-direction: column; }
    .field-map-controls { grid-template-columns: 1fr; }
    .map-shortcuts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
`;
document.head.appendChild(compactNewsStyle);

const newsConfig = [
  { target: "machineHeadlines", updated: "machineUpdated", search: "machineNewsSearch", limit: 4, query: "工作機械 OR NC旋盤 OR マシニングセンタ OR 設備保全 OR 制御盤 OR サーボモータ when:1d" },
  { target: "worldHeadlines", updated: "worldUpdated", search: "worldNewsSearch", limit: 3, query: "世界情勢 製造業 サプライチェーン 半導体 物流 エネルギー when:1d" },
  { target: "economyHeadlines", updated: "economyUpdated", search: "economyNewsSearch", limit: 3, query: "製造業 景況感 設備投資 円相場 金利 中小企業 when:1d" },
  { target: "localHeadlines", updated: "localUpdated", search: "localNewsSearch", regional: true, limit: 3, query: "製造業 工場 設備 交通 経済 when:1d" },
  { target: "subsidyHeadlines", updated: "subsidyUpdated", search: "subsidyNewsSearch", limit: 4, query: "福山市 広島県 補助金 助成金 中小企業 設備投資 省力化 ものづくり when:30d" }
];

const newsRegionSelect = document.querySelector("#newsRegionSelect");
const googleNewsBase = "https://news.google.com/search?q=";

function newsSearchUrl(query) {
  return `${googleNewsBase}${encodeURIComponent(query)}&hl=ja&gl=JP&ceid=JP:ja`;
}

function escapeNews(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function formatUpdated(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "更新時刻未取得";
  return `更新 ${new Intl.DateTimeFormat("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(date)}`;
}

function renderNewsGroup(config, items, updatedAt) {
  const box = document.querySelector(`#${config.target}`);
  const updated = document.querySelector(`#${config.updated}`);
  const search = document.querySelector(`#${config.search}`);
  if (!box) return;

  const query = config.regional && newsRegionSelect ? `${newsRegionSelect.value} ${config.query}` : config.query;
  if (search) search.href = newsSearchUrl(query);
  if (updated) updated.textContent = formatUpdated(updatedAt);

  if (!items || !items.length) {
    box.innerHTML = `<p class="headline-error">見出しを取得できませんでした。もっと見るから確認してください。</p>`;
    return;
  }

  box.innerHTML = items.slice(0, config.limit || 3).map((item) => `
    <a class="headline-item" href="${escapeNews(item.url || newsSearchUrl(query))}" target="_blank" rel="noopener">
      <span class="headline-time">${escapeNews(item.time || "速報")}</span>
      <span><strong class="headline-title">${escapeNews(item.title)}</strong><span class="headline-source">${escapeNews(item.source || "ニュース")}</span></span>
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

if (newsRegionSelect) newsRegionSelect.addEventListener("change", loadNewsJson);
loadNewsJson();

const mapKeywords = [
  "ホームセンター",
  "ねじ屋",
  "工具店",
  "工具商",
  "金物屋",
  "電材屋",
  "ベアリング",
  "油圧ホース",
  "溶接材料",
  "建機レンタル"
];

const mapState = { coords: null };

function currentMapArea() {
  const manual = document.querySelector("#mapAreaInput")?.value.trim();
  if (manual) return manual;
  const selectedWeather = document.querySelector("#locationSelect option:checked")?.textContent;
  return selectedWeather || "福山市 常石";
}

function mapUrl(keyword) {
  const query = mapState.coords
    ? `${keyword} near ${mapState.coords.lat},${mapState.coords.lon}`
    : `${currentMapArea()} ${keyword}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function renderMapLinks() {
  const box = document.querySelector("#mapShortcuts");
  if (!box) return;
  box.innerHTML = mapKeywords.map((keyword) => `<a href="${mapUrl(keyword)}" target="_blank" rel="noopener">${keyword}</a>`).join("");
}

function injectFieldMap() {
  if (document.querySelector("#fieldMapPanel")) return;
  const newsPanel = document.querySelector(".news-panel");
  if (!newsPanel) return;

  const panel = document.createElement("section");
  panel.className = "field-map-panel";
  panel.id = "fieldMapPanel";
  panel.innerHTML = `
    <div class="field-map-head">
      <div><p class="eyebrow">出張先</p><h2>近くの資材・工具マップ</h2></div>
      <p class="field-map-status" id="mapStatus">地域名または現在地からGoogle Mapsを開きます。</p>
    </div>
    <div class="field-map-controls">
      <input id="mapAreaInput" type="text" placeholder="例: 広島県福山市 / 倉敷市水島 / 現場住所">
      <button type="button" id="useCurrentLocation">現在地を使う</button>
    </div>
    <div class="map-shortcuts" id="mapShortcuts"></div>
  `;
  newsPanel.insertAdjacentElement("afterend", panel);

  document.querySelector("#mapAreaInput")?.addEventListener("input", () => {
    mapState.coords = null;
    renderMapLinks();
  });
  document.querySelector("#useCurrentLocation")?.addEventListener("click", () => {
    const status = document.querySelector("#mapStatus");
    if (!navigator.geolocation) {
      if (status) status.textContent = "このブラウザでは現在地が使えません。地域名で検索してください。";
      return;
    }
    if (status) status.textContent = "現在地を取得中です...";
    navigator.geolocation.getCurrentPosition((position) => {
      mapState.coords = {
        lat: position.coords.latitude.toFixed(6),
        lon: position.coords.longitude.toFixed(6)
      };
      if (status) status.textContent = "現在地から検索します。";
      renderMapLinks();
    }, () => {
      if (status) status.textContent = "現在地を取得できませんでした。地域名で検索してください。";
    }, { enableHighAccuracy: true, timeout: 8000 });
  });
  document.querySelector("#locationSelect")?.addEventListener("change", renderMapLinks);
  renderMapLinks();
}

function installAutoScheduleSync() {
  if (window.__lusAutoSyncInstalled) return;
  window.__lusAutoSyncInstalled = true;
  let pulling = false;
  let timer = 0;
  const originalSaveEvents = window.saveEvents;
  const originalPull = window.pullEventsFromSheet;

  if (typeof originalSaveEvents === "function") {
    window.saveEvents = function autoSyncingSaveEvents(...args) {
      const result = originalSaveEvents.apply(this, args);
      if (!pulling && localStorage.getItem("lus-sync-url")) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (typeof window.pushEventsToSheet === "function") window.pushEventsToSheet();
        }, 900);
      }
      return result;
    };
  }

  if (typeof originalPull === "function") {
    window.pullEventsFromSheet = async function autoSyncingPull(...args) {
      pulling = true;
      try {
        return await originalPull.apply(this, args);
      } finally {
        pulling = false;
      }
    };
  }

  if (localStorage.getItem("lus-sync-url") && typeof window.pullEventsFromSheet === "function") {
    setTimeout(() => window.pullEventsFromSheet(), 800);
  }
}

injectFieldMap();
installAutoScheduleSync();
