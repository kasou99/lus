window.LUS_X_NEWS = {
  "updatedAt": "2026-11-27T10:35:50.164Z",
  "items": [
    {
      "time": "17:06",
      "title": "政府 防災の「国家戦略」を初策定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604199?source=rss",
      "publishedAt": "2026-11-27T08:06:09.000Z",
      "xQuery": "政府 防災の「国家戦略」を初策定"
    },
    {
      "time": "18:13",
      "title": "文科相の問責決議案 紙一重の否決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604218?source=rss",
      "publishedAt": "2026-11-27T09:13:14.000Z",
      "xQuery": "文科相の問責決議案 紙一重の否決"
    },
    {
      "time": "18:12",
      "title": "マイナアプリ 旧Ver.に脆弱性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604215?source=rss",
      "publishedAt": "2026-11-27T09:12:52.000Z",
      "xQuery": "マイナアプリ 旧Ver.に脆弱性"
    },
    {
      "time": "16:49",
      "title": "「負動産」有料引き取り広がる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604200?source=rss",
      "publishedAt": "2026-11-27T07:49:09.000Z",
      "xQuery": "「負動産」有料引き取り広がる"
    },
    {
      "time": "18:49",
      "title": "Suicaペンギンの銅像 春にも撤去",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604221?source=rss",
      "publishedAt": "2026-11-27T09:49:52.000Z",
      "xQuery": "Suicaペンギンの銅像 春にも撤去"
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
