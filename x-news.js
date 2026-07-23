window.LUS_X_NEWS = {
  "updatedAt": "2026-07-23T03:10:42.769Z",
  "items": [
    {
      "time": "10:39",
      "title": "内閣支持率が下落 与党に危機感",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588988?source=rss",
      "publishedAt": "2026-07-23T01:39:21.000Z",
      "xQuery": "内閣支持率が下落 与党に危機感"
    },
    {
      "time": "11:04",
      "title": "仏で猛暑の16日間 死者5764人増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588990?source=rss",
      "publishedAt": "2026-07-23T02:04:40.000Z",
      "xQuery": "仏で猛暑の16日間 死者5764人増"
    },
    {
      "time": "11:44",
      "title": "園昼食で0歳窒息 市への報告遅れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588997?source=rss",
      "publishedAt": "2026-07-23T02:44:43.000Z",
      "xQuery": "園昼食で0歳窒息 市への報告遅れ"
    },
    {
      "time": "07:33",
      "title": "セブン 従業員らの不正転売横行か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588970?source=rss",
      "publishedAt": "2026-07-22T22:33:44.000Z",
      "xQuery": "セブン 従業員らの不正転売横行か"
    },
    {
      "time": "11:39",
      "title": "警官ら懲戒処分「異性関係」最多",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588994?source=rss",
      "publishedAt": "2026-07-23T02:39:18.000Z",
      "xQuery": "警官ら懲戒処分「異性関係」最多"
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
