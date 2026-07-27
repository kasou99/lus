window.LUS_X_NEWS = {
  "updatedAt": "2026-07-27T01:41:28.138Z",
  "items": [
    {
      "time": "08:50",
      "title": "各地で猛烈な暑さ 九州で酷暑日か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589447?source=rss",
      "publishedAt": "2026-07-26T23:50:03.000Z",
      "xQuery": "各地で猛烈な暑さ 九州で酷暑日か"
    },
    {
      "time": "08:58",
      "title": "露大統領 侵攻継続の意欲変わらず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589451?source=rss",
      "publishedAt": "2026-07-26T23:58:41.000Z",
      "xQuery": "露大統領 侵攻継続の意欲変わらず"
    },
    {
      "time": "10:25",
      "title": "首相 支持率下落の原因分からない",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589461?source=rss",
      "publishedAt": "2026-07-27T01:25:38.000Z",
      "xQuery": "首相 支持率下落の原因分からない"
    },
    {
      "time": "09:41",
      "title": "住宅火災 子ども2人含む4人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589456?source=rss",
      "publishedAt": "2026-07-27T00:41:50.000Z",
      "xQuery": "住宅火災 子ども2人含む4人死亡"
    },
    {
      "time": "09:51",
      "title": "県議公開の音声 改ざん痕見られず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589454?source=rss",
      "publishedAt": "2026-07-27T00:51:24.000Z",
      "xQuery": "県議公開の音声 改ざん痕見られず"
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
