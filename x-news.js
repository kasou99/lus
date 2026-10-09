window.LUS_X_NEWS = {
  "updatedAt": "2026-10-09T02:33:28.747Z",
  "items": [
    {
      "time": "10:38",
      "title": "政府 消費減税法案を閣議決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598094?source=rss",
      "publishedAt": "2026-10-09T01:38:53.000Z",
      "xQuery": "政府 消費減税法案を閣議決定"
    },
    {
      "time": "10:52",
      "title": "熊本地震で液状化現象 住民頭抱え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598099?source=rss",
      "publishedAt": "2026-10-09T01:52:40.000Z",
      "xQuery": "熊本地震で液状化現象 住民頭抱え"
    },
    {
      "time": "11:19",
      "title": "党会合で簗氏謝罪 宗男氏の激怒で",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598101?source=rss",
      "publishedAt": "2026-10-09T02:19:28.000Z",
      "xQuery": "党会合で簗氏謝罪 宗男氏の激怒で"
    },
    {
      "time": "08:33",
      "title": "露でペスト疑い 接触者に異常なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598077?source=rss",
      "publishedAt": "2026-10-08T23:33:55.000Z",
      "xQuery": "露でペスト疑い 接触者に異常なし"
    },
    {
      "time": "10:06",
      "title": "ブックオフ 約643万件情報流出か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598089?source=rss",
      "publishedAt": "2026-10-09T01:06:02.000Z",
      "xQuery": "ブックオフ 約643万件情報流出か"
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
