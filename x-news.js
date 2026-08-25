window.LUS_X_NEWS = {
  "updatedAt": "2026-08-25T08:47:59.521Z",
  "items": [
    {
      "time": "16:32",
      "title": "出国税の使い道 見直しを検討へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593021?source=rss",
      "publishedAt": "2026-08-25T07:32:06.000Z",
      "xQuery": "出国税の使い道 見直しを検討へ"
    },
    {
      "time": "16:52",
      "title": "26年版警察白書 大川原冤罪に言及",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593023?source=rss",
      "publishedAt": "2026-08-25T07:52:52.000Z",
      "xQuery": "26年版警察白書 大川原冤罪に言及"
    },
    {
      "time": "16:57",
      "title": "26日関東で局地的な雷雨恐れ 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593026?source=rss",
      "publishedAt": "2026-08-25T07:57:37.000Z",
      "xQuery": "26日関東で局地的な雷雨恐れ 警戒"
    },
    {
      "time": "17:30",
      "title": "医療事故 母子感染防げずがん発症",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593032?source=rss",
      "publishedAt": "2026-08-25T08:30:57.000Z",
      "xQuery": "医療事故 母子感染防げずがん発症"
    },
    {
      "time": "16:31",
      "title": "競泳・本多灯被告に拘禁刑1年求刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593020?source=rss",
      "publishedAt": "2026-08-25T07:31:06.000Z",
      "xQuery": "競泳・本多灯被告に拘禁刑1年求刑"
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
