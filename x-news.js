window.LUS_X_NEWS = {
  "updatedAt": "2026-09-14T11:38:07.831Z",
  "items": [
    {
      "time": "20:19",
      "title": "中部電の不正 経産相が厳しく批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595291?source=rss",
      "publishedAt": "2026-09-14T11:19:16.000Z",
      "xQuery": "中部電の不正 経産相が厳しく批判"
    },
    {
      "time": "16:57",
      "title": "25年の災害で学習中断の子1.7億人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595274?source=rss",
      "publishedAt": "2026-09-14T07:57:45.000Z",
      "xQuery": "25年の災害で学習中断の子1.7億人"
    },
    {
      "time": "19:50",
      "title": "やまゆり園職員が入所者虐待 認定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595288?source=rss",
      "publishedAt": "2026-09-14T10:50:13.000Z",
      "xQuery": "やまゆり園職員が入所者虐待 認定"
    },
    {
      "time": "12:36",
      "title": "ダウン症の子6年の生涯 CMに反響",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595245?source=rss",
      "publishedAt": "2026-09-14T03:36:35.000Z",
      "xQuery": "ダウン症の子6年の生涯 CMに反響"
    },
    {
      "time": "20:30",
      "title": "38社で1万1610人「国保逃れ」確認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595292?source=rss",
      "publishedAt": "2026-09-14T11:30:02.000Z",
      "xQuery": "38社で1万1610人「国保逃れ」確認"
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
