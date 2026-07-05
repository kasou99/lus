window.LUS_X_NEWS = {
  "updatedAt": "2026-07-05T12:00:04.027Z",
  "items": [
    {
      "time": "19:16",
      "title": "九州北部 土砂災害など厳重警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586836?source=rss",
      "publishedAt": "2026-07-05T10:16:06.000Z",
      "xQuery": "九州北部 土砂災害など厳重警戒を"
    },
    {
      "time": "17:01",
      "title": "中露が軍事演習発表 日本けん制か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586820?source=rss",
      "publishedAt": "2026-07-05T08:01:02.000Z",
      "xQuery": "中露が軍事演習発表 日本けん制か"
    },
    {
      "time": "20:39",
      "title": "橋から車が転落し大破 男性が重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586847?source=rss",
      "publishedAt": "2026-07-05T11:39:16.000Z",
      "xQuery": "橋から車が転落し大破 男性が重体"
    },
    {
      "time": "20:57",
      "title": "市長選候補「仙人」得票2割の衝撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586848?source=rss",
      "publishedAt": "2026-07-05T11:57:46.000Z",
      "xQuery": "市長選候補「仙人」得票2割の衝撃"
    },
    {
      "time": "20:15",
      "title": "銀座に異変 大衆チェーン続々出店",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586843?source=rss",
      "publishedAt": "2026-07-05T11:15:01.000Z",
      "xQuery": "銀座に異変 大衆チェーン続々出店"
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
