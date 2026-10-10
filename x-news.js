window.LUS_X_NEWS = {
  "updatedAt": "2026-10-10T19:38:37.235Z",
  "items": [
    {
      "time": "22:59",
      "title": "外相 赤根・ルビオ両氏と電話協議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598307?source=rss",
      "publishedAt": "2026-10-10T13:59:00.000Z",
      "xQuery": "外相 赤根・ルビオ両氏と電話協議"
    },
    {
      "time": "23:19",
      "title": "パレスチナ議会選 来年9月に延期",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598309?source=rss",
      "publishedAt": "2026-10-10T14:19:20.000Z",
      "xQuery": "パレスチナ議会選 来年9月に延期"
    },
    {
      "time": "19:58",
      "title": "カルテル疑惑 卸売業者が実態証言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598291?source=rss",
      "publishedAt": "2026-10-10T10:58:38.000Z",
      "xQuery": "カルテル疑惑 卸売業者が実態証言"
    },
    {
      "time": "22:30",
      "title": "車と衝突 義父が用水路に落ち死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598304?source=rss",
      "publishedAt": "2026-10-10T13:30:01.000Z",
      "xQuery": "車と衝突 義父が用水路に落ち死亡"
    },
    {
      "time": "18:10",
      "title": "年収2千万円ざら 稼ぐミカン農家",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598278?source=rss",
      "publishedAt": "2026-10-10T09:10:38.000Z",
      "xQuery": "年収2千万円ざら 稼ぐミカン農家"
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
