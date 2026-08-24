window.LUS_X_NEWS = {
  "updatedAt": "2026-08-24T09:21:51.078Z",
  "items": [
    {
      "time": "17:42",
      "title": "台風18号が沖縄へ 影響長引く恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592895?source=rss",
      "publishedAt": "2026-08-24T08:42:48.000Z",
      "xQuery": "台風18号が沖縄へ 影響長引く恐れ"
    },
    {
      "time": "16:04",
      "title": "居眠り運転など検知 搭載義務化へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592884?source=rss",
      "publishedAt": "2026-08-24T07:04:25.000Z",
      "xQuery": "居眠り運転など検知 搭載義務化へ"
    },
    {
      "time": "15:21",
      "title": "木原氏 ICC所長と緊密に意思疎通",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592880?source=rss",
      "publishedAt": "2026-08-24T06:21:28.000Z",
      "xQuery": "木原氏 ICC所長と緊密に意思疎通"
    },
    {
      "time": "18:20",
      "title": "クマと車衝突か 運転手の男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592902?source=rss",
      "publishedAt": "2026-08-24T09:20:01.000Z",
      "xQuery": "クマと車衝突か 運転手の男性死亡"
    },
    {
      "time": "17:05",
      "title": "モコモコ 永谷園が一時休売を発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592889?source=rss",
      "publishedAt": "2026-08-24T08:05:43.000Z",
      "xQuery": "モコモコ 永谷園が一時休売を発表"
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
