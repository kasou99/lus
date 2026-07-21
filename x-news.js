window.LUS_X_NEWS = {
  "updatedAt": "2026-07-21T11:15:36.406Z",
  "items": [
    {
      "time": "17:48",
      "title": "コメ価格下落基調続く 今後の鍵は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588780?source=rss",
      "publishedAt": "2026-07-21T08:48:29.000Z",
      "xQuery": "コメ価格下落基調続く 今後の鍵は"
    },
    {
      "time": "18:19",
      "title": "金銭授受告白の県議 第三者委要望",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588788?source=rss",
      "publishedAt": "2026-07-21T09:19:12.000Z",
      "xQuery": "金銭授受告白の県議 第三者委要望"
    },
    {
      "time": "19:25",
      "title": "伐採中に倒れた木が直撃 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588800?source=rss",
      "publishedAt": "2026-07-21T10:25:46.000Z",
      "xQuery": "伐採中に倒れた木が直撃 男性死亡"
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
