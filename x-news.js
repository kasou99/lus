window.LUS_X_NEWS = {
  "updatedAt": "2026-07-29T01:39:32.291Z",
  "items": [
    {
      "time": "10:26",
      "title": "地震 首相「調査中含め死者13人」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589741?source=rss",
      "publishedAt": "2026-07-29T01:26:24.000Z",
      "xQuery": "地震 首相「調査中含め死者13人」"
    },
    {
      "time": "08:08",
      "title": "イオン爆発 死亡の2人は20代女性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589731?source=rss",
      "publishedAt": "2026-07-28T23:08:09.000Z",
      "xQuery": "イオン爆発 死亡の2人は20代女性"
    },
    {
      "time": "07:37",
      "title": "映像 イオン爆発時のドラレコ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589727?source=rss",
      "publishedAt": "2026-07-28T22:37:11.000Z",
      "xQuery": "映像 イオン爆発時のドラレコ"
    },
    {
      "time": "09:25",
      "title": "熊本で危険な暑さ予想 熱中症警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589736?source=rss",
      "publishedAt": "2026-07-29T00:25:22.000Z",
      "xQuery": "熊本で危険な暑さ予想 熱中症警戒"
    },
    {
      "time": "07:37",
      "title": "熊本で地震 最大84cmの地殻変動",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589728?source=rss",
      "publishedAt": "2026-07-28T22:37:02.000Z",
      "xQuery": "熊本で地震 最大84cmの地殻変動"
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
