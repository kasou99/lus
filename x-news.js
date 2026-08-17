window.LUS_X_NEWS = {
  "updatedAt": "2026-08-17T08:47:57.704Z",
  "items": [
    {
      "time": "16:52",
      "title": "イラン 米軍へ再攻撃辞さない方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592076?source=rss",
      "publishedAt": "2026-08-17T07:52:48.000Z",
      "xQuery": "イラン 米軍へ再攻撃辞さない方針"
    },
    {
      "time": "16:26",
      "title": "コロンビア地震 日本が物資供与へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592074?source=rss",
      "publishedAt": "2026-08-17T07:26:32.000Z",
      "xQuery": "コロンビア地震 日本が物資供与へ"
    },
    {
      "time": "17:32",
      "title": "福岡県会議長の辞職勧告 採決中止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592084?source=rss",
      "publishedAt": "2026-08-17T08:32:44.000Z",
      "xQuery": "福岡県会議長の辞職勧告 採決中止"
    },
    {
      "time": "15:55",
      "title": "浸水で放射性廃液が漏えい 千葉市",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592072?source=rss",
      "publishedAt": "2026-08-17T06:55:01.000Z",
      "xQuery": "浸水で放射性廃液が漏えい 千葉市"
    },
    {
      "time": "17:26",
      "title": "11歳が海岸で溺れ心肺停止 新潟",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592085?source=rss",
      "publishedAt": "2026-08-17T08:26:21.000Z",
      "xQuery": "11歳が海岸で溺れ心肺停止 新潟"
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
