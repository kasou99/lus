window.LUS_X_NEWS = {
  "updatedAt": "2026-07-14T03:09:43.701Z",
  "items": [
    {
      "time": "09:32",
      "title": "米大統領 海峡「通航料」20%要求",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587857?source=rss",
      "publishedAt": "2026-07-14T00:32:39.000Z",
      "xQuery": "米大統領 海峡「通航料」20%要求"
    },
    {
      "time": "10:52",
      "title": "防災庁設置へ 個人の行動変容課題",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587862?source=rss",
      "publishedAt": "2026-07-14T01:52:37.000Z",
      "xQuery": "防災庁設置へ 個人の行動変容課題"
    },
    {
      "time": "11:17",
      "title": "路上に血を流した男性 犯人逃走",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587864?source=rss",
      "publishedAt": "2026-07-14T02:17:19.000Z",
      "xQuery": "路上に血を流した男性 犯人逃走"
    },
    {
      "time": "11:44",
      "title": "道頓堀死亡火災 タバコの不始末か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587871?source=rss",
      "publishedAt": "2026-07-14T02:44:44.000Z",
      "xQuery": "道頓堀死亡火災 タバコの不始末か"
    },
    {
      "time": "11:49",
      "title": "海水浴で不明の高校生 遺体で発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587873?source=rss",
      "publishedAt": "2026-07-14T02:49:40.000Z",
      "xQuery": "海水浴で不明の高校生 遺体で発見"
    }
  ]
};

(function renderLusXNews() {
  const data = window.LUS_X_NEWS || { items: [] };

  function escapeX(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => {
      if (char === "&") return "&amp;";
      if (char === "<") return "&lt;";
      if (char === ">") return "&gt;";
      if (char === '"') return "&quot;";
      return "&#039;";
    });
  }

  function xSearchUrl(item) {
    const query = item.xQuery || item.originalTitle || item.title || "";
    return "https://x.com/search?q=" + encodeURIComponent(query + " lang:ja") + "&src=typed_query&f=live";
  }

  function render() {
    const grid = document.querySelector(".news-grid.headline-mode");
    if (!grid) return false;

    let card = document.querySelector("#xTrendCard");
    if (!card) {
      card = document.createElement("article");
      card.className = "headline-card x-trend-card";
      card.id = "xTrendCard";
      grid.prepend(card);
    }

    const items = (data.items || []).slice(0, 5);
    card.innerHTML = `
      <div class="headline-top"><h3>Xで追う人気ニュースTop5</h3><span>新着順</span></div>
      <div id="xTrendHeadlines">
        ${items.length ? items.map((item) => `
          <a class="headline-item" href="${xSearchUrl(item)}" target="_blank" rel="noopener">
            <span class="headline-time">${escapeX(item.time || "速報")}</span>
            <span><strong class="headline-title">${escapeX(item.title)}</strong><span class="headline-source">${item.translated ? "自動翻訳 / " : ""}Xの新着投稿を開く / ${escapeX(item.source || "ニュース")}</span></span>
          </a>
        `).join("") : `<p class="headline-error">Xで追う見出しを準備中です。</p>`}
      </div>
    `;
    return true;
  }

  function scheduleRender() {
    let count = 0;
    const tick = () => {
      render();
      count += 1;
      if (count < 10) setTimeout(tick, 450);
    };
    tick();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleRender);
  } else {
    scheduleRender();
  }

  document.addEventListener("change", (event) => {
    if (event.target && event.target.id === "newsRegionSelect") setTimeout(render, 700);
  });
})();
