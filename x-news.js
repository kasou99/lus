window.LUS_X_NEWS = {
  "updatedAt": "2026-11-22T01:39:15.909Z",
  "items": [
    {
      "time": "09:26",
      "title": "「脱化石」削除巡り紛糾 COP31",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603508?source=rss",
      "publishedAt": "2026-11-22T00:26:56.000Z",
      "xQuery": "「脱化石」削除巡り紛糾 COP31"
    },
    {
      "time": "09:38",
      "title": "大雪で水族館停電 生き物を移動",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603510?source=rss",
      "publishedAt": "2026-11-22T00:38:32.000Z",
      "xQuery": "大雪で水族館停電 生き物を移動"
    },
    {
      "time": "10:35",
      "title": "今年8人転落の防波堤 全員県外客",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603517?source=rss",
      "publishedAt": "2026-11-22T01:35:08.000Z",
      "xQuery": "今年8人転落の防波堤 全員県外客"
    },
    {
      "time": "08:44",
      "title": "児童2人の小学校 残り少ない日々",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603502?source=rss",
      "publishedAt": "2026-11-21T23:44:37.000Z",
      "xQuery": "児童2人の小学校 残り少ない日々"
    },
    {
      "time": "09:58",
      "title": "メンズメイク 若者を悩ます世代差",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603512?source=rss",
      "publishedAt": "2026-11-22T00:58:05.000Z",
      "xQuery": "メンズメイク 若者を悩ます世代差"
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
