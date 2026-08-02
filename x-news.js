window.LUS_X_NEWS = {
  "updatedAt": "2026-08-02T08:19:14.096Z",
  "items": [
    {
      "time": "15:35",
      "title": "日本製紙の工場被災 経営に打撃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590265?source=rss",
      "publishedAt": "2026-08-02T06:35:24.000Z",
      "xQuery": "日本製紙の工場被災 経営に打撃"
    },
    {
      "time": "16:57",
      "title": "高額療養費見直し パブコメ5300件",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590271?source=rss",
      "publishedAt": "2026-08-02T07:57:00.000Z",
      "xQuery": "高額療養費見直し パブコメ5300件"
    },
    {
      "time": "14:27",
      "title": "車中泊避難者が死亡 ガソリンは空",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590256?source=rss",
      "publishedAt": "2026-08-02T05:27:55.000Z",
      "xQuery": "車中泊避難者が死亡 ガソリンは空"
    },
    {
      "time": "16:25",
      "title": "海岸で夫を撮影中に落石 女性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590270?source=rss",
      "publishedAt": "2026-08-02T07:25:34.000Z",
      "xQuery": "海岸で夫を撮影中に落石 女性死亡"
    },
    {
      "time": "16:18",
      "title": "久保田智子氏 特別養子縁組を語る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590266?source=rss",
      "publishedAt": "2026-08-02T07:18:12.000Z",
      "xQuery": "久保田智子氏 特別養子縁組を語る"
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
