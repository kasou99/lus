window.LUS_X_NEWS = {
  "updatedAt": "2026-09-08T01:50:35.113Z",
  "items": [
    {
      "time": "10:08",
      "title": "世界分断した9.11 今も米社会に影",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594618?source=rss",
      "publishedAt": "2026-09-08T01:08:33.000Z",
      "xQuery": "世界分断した9.11 今も米社会に影"
    },
    {
      "time": "09:01",
      "title": "一時1ドル153円台 約半年ぶり水準",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594610?source=rss",
      "publishedAt": "2026-09-08T00:01:36.000Z",
      "xQuery": "一時1ドル153円台 約半年ぶり水準"
    },
    {
      "time": "09:23",
      "title": "福岡の海岸に遺体 不明の大学生か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594611?source=rss",
      "publishedAt": "2026-09-08T00:23:22.000Z",
      "xQuery": "福岡の海岸に遺体 不明の大学生か"
    },
    {
      "time": "10:14",
      "title": "アデランス子会社 ステマを謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594619?source=rss",
      "publishedAt": "2026-09-08T01:14:55.000Z",
      "xQuery": "アデランス子会社 ステマを謝罪"
    },
    {
      "time": "09:15",
      "title": "英JLR 従業員4000人を削減へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594613?source=rss",
      "publishedAt": "2026-09-08T00:15:14.000Z",
      "xQuery": "英JLR 従業員4000人を削減へ"
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
