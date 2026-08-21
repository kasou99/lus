window.LUS_X_NEWS = {
  "updatedAt": "2026-08-21T00:50:16.456Z",
  "items": [
    {
      "time": "08:16",
      "title": "暑さ続く 北陸・東北は大雨恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592488?source=rss",
      "publishedAt": "2026-08-20T23:16:42.000Z",
      "xQuery": "暑さ続く 北陸・東北は大雨恐れ"
    },
    {
      "time": "09:03",
      "title": "大規模11私大 理系学生増など検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592492?source=rss",
      "publishedAt": "2026-08-21T00:03:47.000Z",
      "xQuery": "大規模11私大 理系学生増など検討"
    },
    {
      "time": "09:07",
      "title": "SKハイニックス 宮城に工場案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592493?source=rss",
      "publishedAt": "2026-08-21T00:07:12.000Z",
      "xQuery": "SKハイニックス 宮城に工場案"
    },
    {
      "time": "09:05",
      "title": "4人死亡 業務上過失致死疑い視野",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592491?source=rss",
      "publishedAt": "2026-08-21T00:05:07.000Z",
      "xQuery": "4人死亡 業務上過失致死疑い視野"
    },
    {
      "time": "07:28",
      "title": "小2が味に違和感 配布の水にネジ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592481?source=rss",
      "publishedAt": "2026-08-20T22:28:25.000Z",
      "xQuery": "小2が味に違和感 配布の水にネジ"
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
