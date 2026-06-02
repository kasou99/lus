window.LUS_X_NEWS = {
  "updatedAt": "2026-06-02T23:40:27.020Z",
  "items": [
    {
      "time": "08:36",
      "title": "危険迫る 古座川に氾濫特別警報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582738?source=rss",
      "publishedAt": "2026-06-02T23:36:23.000Z",
      "xQuery": "危険迫る 古座川に氾濫特別警報"
    },
    {
      "time": "08:06",
      "title": "台風6号 各地の河川水位情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582736?source=rss",
      "publishedAt": "2026-06-02T23:06:25.000Z",
      "xQuery": "台風6号 各地の河川水位情報"
    },
    {
      "time": "07:22",
      "title": "台風6号 東海や関東で大雨ピーク",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582731?source=rss",
      "publishedAt": "2026-06-02T22:22:22.000Z",
      "xQuery": "台風6号 東海や関東で大雨ピーク"
    },
    {
      "time": "08:03",
      "title": "台風6号の影響は 現地のSNS投稿",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582735?source=rss",
      "publishedAt": "2026-06-02T23:03:08.000Z",
      "xQuery": "台風6号の影響は 現地のSNS投稿"
    },
    {
      "time": "08:00",
      "title": "日銀 1%への追加利上げを本格検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582734?source=rss",
      "publishedAt": "2026-06-02T23:00:37.000Z",
      "xQuery": "日銀 1%への追加利上げを本格検討"
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
