window.LUS_X_NEWS = {
  "updatedAt": "2026-08-19T17:41:05.171Z",
  "items": [
    {
      "time": "22:50",
      "title": "豪雨 千葉市幹線道路の車撤去完了",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592341?source=rss",
      "publishedAt": "2026-08-19T13:50:40.000Z",
      "xQuery": "豪雨 千葉市幹線道路の車撤去完了"
    },
    {
      "time": "21:49",
      "title": "JR九州被害額16年地震上回る恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592335?source=rss",
      "publishedAt": "2026-08-19T12:49:21.000Z",
      "xQuery": "JR九州被害額16年地震上回る恐れ"
    },
    {
      "time": "20:59",
      "title": "中道落選者ら 政治団体ゴリラ設立",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592328?source=rss",
      "publishedAt": "2026-08-19T11:59:44.000Z",
      "xQuery": "中道落選者ら 政治団体ゴリラ設立"
    },
    {
      "time": "20:21",
      "title": "診察待つ列に車突っ込む 女性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592327?source=rss",
      "publishedAt": "2026-08-19T11:21:31.000Z",
      "xQuery": "診察待つ列に車突っ込む 女性死亡"
    },
    {
      "time": "19:30",
      "title": "道沿いに食パン大量投棄 3日連続",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592320?source=rss",
      "publishedAt": "2026-08-19T10:30:12.000Z",
      "xQuery": "道沿いに食パン大量投棄 3日連続"
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
