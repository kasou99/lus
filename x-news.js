window.LUS_X_NEWS = {
  "updatedAt": "2026-09-25T00:48:03.662Z",
  "items": [
    {
      "time": "09:00",
      "title": "米中首脳 ワインで友好ムード演出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596444?source=rss",
      "publishedAt": "2026-09-25T00:00:19.000Z",
      "xQuery": "米中首脳 ワインで友好ムード演出"
    },
    {
      "time": "08:09",
      "title": "意図せず資金移動 楽天証券不具合",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596439?source=rss",
      "publishedAt": "2026-09-24T23:09:30.000Z",
      "xQuery": "意図せず資金移動 楽天証券不具合"
    },
    {
      "time": "08:58",
      "title": "ICC脱退呼びかけ呼応 ナウルだけ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596446?source=rss",
      "publishedAt": "2026-09-24T23:58:18.000Z",
      "xQuery": "ICC脱退呼びかけ呼応 ナウルだけ"
    },
    {
      "time": "08:27",
      "title": "スマホで撮影され合鍵複製 防衛策",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596443?source=rss",
      "publishedAt": "2026-09-24T23:27:01.000Z",
      "xQuery": "スマホで撮影され合鍵複製 防衛策"
    },
    {
      "time": "07:57",
      "title": "ファミマ「バイト改革」なぜ今",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596440?source=rss",
      "publishedAt": "2026-09-24T22:57:39.000Z",
      "xQuery": "ファミマ「バイト改革」なぜ今"
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
