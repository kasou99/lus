window.LUS_X_NEWS = {
  "updatedAt": "2026-08-28T03:49:43.044Z",
  "items": [
    {
      "time": "09:42",
      "title": "首相 成長と財政規律の両立目指す",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593365?source=rss",
      "publishedAt": "2026-08-28T00:42:34.000Z",
      "xQuery": "首相 成長と財政規律の両立目指す"
    },
    {
      "time": "11:46",
      "title": "全国の待機児童2435人 9年ぶり増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593379?source=rss",
      "publishedAt": "2026-08-28T02:46:38.000Z",
      "xQuery": "全国の待機児童2435人 9年ぶり増"
    },
    {
      "time": "12:19",
      "title": "ネパールで不明日本人ら 名簿公表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593387?source=rss",
      "publishedAt": "2026-08-28T03:19:05.000Z",
      "xQuery": "ネパールで不明日本人ら 名簿公表"
    },
    {
      "time": "12:00",
      "title": "ネパール せき止め湖が決壊の危険",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593381?source=rss",
      "publishedAt": "2026-08-28T03:00:16.000Z",
      "xQuery": "ネパール せき止め湖が決壊の危険"
    },
    {
      "time": "12:14",
      "title": "「東北の麻薬王」に拘禁刑7年6月",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593386?source=rss",
      "publishedAt": "2026-08-28T03:14:45.000Z",
      "xQuery": "「東北の麻薬王」に拘禁刑7年6月"
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
