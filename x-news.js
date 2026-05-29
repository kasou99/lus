window.LUS_X_NEWS = {
  "updatedAt": "2026-05-29T07:35:22.750Z",
  "items": [
    {
      "time": "15:58",
      "title": "東京株終値6万6329円 最高値更新",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582181?source=rss",
      "publishedAt": "2026-05-29T06:58:56.000Z",
      "xQuery": "東京株終値6万6329円 最高値更新"
    },
    {
      "time": "14:20",
      "title": "中道・小川氏 立憲巡る発言を陳謝",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582169?source=rss",
      "publishedAt": "2026-05-29T05:20:52.000Z",
      "xQuery": "中道・小川氏 立憲巡る発言を陳謝"
    },
    {
      "time": "13:28",
      "title": "JAL飲酒問題 国交相「大変遺憾」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582160?source=rss",
      "publishedAt": "2026-05-29T04:28:12.000Z",
      "xQuery": "JAL飲酒問題 国交相「大変遺憾」"
    },
    {
      "time": "15:44",
      "title": "栃木強殺主導か 容疑者を公開手配",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582175?source=rss",
      "publishedAt": "2026-05-29T06:44:52.000Z",
      "xQuery": "栃木強殺主導か 容疑者を公開手配"
    },
    {
      "time": "13:59",
      "title": "緊急着陸 出発の羽田には異物散乱",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582166?source=rss",
      "publishedAt": "2026-05-29T04:59:39.000Z",
      "xQuery": "緊急着陸 出発の羽田には異物散乱"
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
