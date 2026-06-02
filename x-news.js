window.LUS_X_NEWS = {
  "updatedAt": "2026-06-02T03:51:21.602Z",
  "items": [
    {
      "time": "12:04",
      "title": "台風 西日本は明日にかけ大雨警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582651?source=rss",
      "publishedAt": "2026-06-02T03:04:13.000Z",
      "xQuery": "台風 西日本は明日にかけ大雨警戒"
    },
    {
      "time": "11:31",
      "title": "四国地方梅雨入り 早々に大雨警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582640?source=rss",
      "publishedAt": "2026-06-02T02:31:12.000Z",
      "xQuery": "四国地方梅雨入り 早々に大雨警戒"
    },
    {
      "time": "12:24",
      "title": "人材派遣大手5社 カルテル疑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582656?source=rss",
      "publishedAt": "2026-06-02T03:24:20.000Z",
      "xQuery": "人材派遣大手5社 カルテル疑い"
    },
    {
      "time": "11:41",
      "title": "為替 必要に応じて対応と財務相",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582645?source=rss",
      "publishedAt": "2026-06-02T02:41:45.000Z",
      "xQuery": "為替 必要に応じて対応と財務相"
    },
    {
      "time": "12:13",
      "title": "浜辺などに女性3人 いずれも死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582653?source=rss",
      "publishedAt": "2026-06-02T03:13:33.000Z",
      "xQuery": "浜辺などに女性3人 いずれも死亡"
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
