window.LUS_X_NEWS = {
  "updatedAt": "2026-06-02T05:44:30.353Z",
  "items": [
    {
      "time": "12:04",
      "title": "台風 西日本は明日にかけ大雨警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582651?source=rss",
      "publishedAt": "2026-06-02T03:04:13.000Z",
      "xQuery": "台風 西日本は明日にかけ大雨警戒"
    },
    {
      "time": "12:53",
      "title": "トランプ氏 イスラエル首相に怒り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582659?source=rss",
      "publishedAt": "2026-06-02T03:53:28.000Z",
      "xQuery": "トランプ氏 イスラエル首相に怒り"
    },
    {
      "time": "12:54",
      "title": "露がウ各地に大規模攻撃 住宅損壊",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582661?source=rss",
      "publishedAt": "2026-06-02T03:54:10.000Z",
      "xQuery": "露がウ各地に大規模攻撃 住宅損壊"
    },
    {
      "time": "13:38",
      "title": "台風接近 レジャー施設休業相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582664?source=rss",
      "publishedAt": "2026-06-02T04:38:08.000Z",
      "xQuery": "台風接近 レジャー施設休業相次ぐ"
    },
    {
      "time": "12:17",
      "title": "ジムの女性専用部屋から男性 物議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582650?source=rss",
      "publishedAt": "2026-06-02T03:17:17.000Z",
      "xQuery": "ジムの女性専用部屋から男性 物議"
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
