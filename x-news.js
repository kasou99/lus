window.LUS_X_NEWS = {
  "updatedAt": "2026-05-22T05:30:57.353Z",
  "items": [
    {
      "time": "14:04",
      "title": "新浪剛史氏を不起訴処分 福岡地検",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581219?source=rss",
      "publishedAt": "2026-05-22T05:04:22.000Z",
      "xQuery": "新浪剛史氏を不起訴処分 福岡地検"
    },
    {
      "time": "13:47",
      "title": "シニア起業 地域経済への効果期待",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581210?source=rss",
      "publishedAt": "2026-05-22T04:47:57.000Z",
      "xQuery": "シニア起業 地域経済への効果期待"
    },
    {
      "time": "13:26",
      "title": "栃木強殺 遺族がコメント公表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581214?source=rss",
      "publishedAt": "2026-05-22T04:26:50.000Z",
      "xQuery": "栃木強殺 遺族がコメント公表"
    },
    {
      "time": "11:45",
      "title": "ストーカー加害者にGPS案 課題は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581201?source=rss",
      "publishedAt": "2026-05-22T02:45:14.000Z",
      "xQuery": "ストーカー加害者にGPS案 課題は"
    },
    {
      "time": "13:49",
      "title": "トヨタ GWの稼働日見直し検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581217?source=rss",
      "publishedAt": "2026-05-22T04:49:55.000Z",
      "xQuery": "トヨタ GWの稼働日見直し検討"
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
