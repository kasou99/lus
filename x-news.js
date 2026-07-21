window.LUS_X_NEWS = {
  "updatedAt": "2026-07-21T10:20:06.148Z",
  "items": [
    {
      "time": "17:20",
      "title": "中国 日本EEZ内での訓練巡り反論",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588774?source=rss",
      "publishedAt": "2026-07-21T08:20:53.000Z",
      "xQuery": "中国 日本EEZ内での訓練巡り反論"
    },
    {
      "time": "16:37",
      "title": "下請法違反 医療機器HOYAに勧告",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588768?source=rss",
      "publishedAt": "2026-07-21T07:37:11.000Z",
      "xQuery": "下請法違反 医療機器HOYAに勧告"
    },
    {
      "time": "17:00",
      "title": "首相の「0～3時間睡眠」投稿 波紋",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588770?source=rss",
      "publishedAt": "2026-07-21T08:00:03.000Z",
      "xQuery": "首相の「0～3時間睡眠」投稿 波紋"
    },
    {
      "time": "18:35",
      "title": "学習放獣したクマが出没 殺処分",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588793?source=rss",
      "publishedAt": "2026-07-21T09:35:37.000Z",
      "xQuery": "学習放獣したクマが出没 殺処分"
    },
    {
      "time": "16:36",
      "title": "熱中症疑い死亡 発見時体温42.6℃",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588767?source=rss",
      "publishedAt": "2026-07-21T07:36:38.000Z",
      "xQuery": "熱中症疑い死亡 発見時体温42.6℃"
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
