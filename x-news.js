window.LUS_X_NEWS = {
  "updatedAt": "2026-07-21T12:05:50.235Z",
  "items": [
    {
      "time": "20:40",
      "title": "22日は関東も40℃の酷暑日予想",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588807?source=rss",
      "publishedAt": "2026-07-21T11:40:30.000Z",
      "xQuery": "22日は関東も40℃の酷暑日予想"
    },
    {
      "time": "20:00",
      "title": "自民有志 トレカ振興の議連設立へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588804?source=rss",
      "publishedAt": "2026-07-21T11:00:38.000Z",
      "xQuery": "自民有志 トレカ振興の議連設立へ"
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
    },
    {
      "time": "20:51",
      "title": "勤務後休憩1hで乗務 誤って駅通過",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588812?source=rss",
      "publishedAt": "2026-07-21T11:51:10.000Z",
      "xQuery": "勤務後休憩1hで乗務 誤って駅通過"
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
