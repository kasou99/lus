window.LUS_X_NEWS = {
  "updatedAt": "2026-08-09T10:46:03.541Z",
  "items": [
    {
      "time": "17:23",
      "title": "原爆の記憶忘れる前に 語る97歳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591104?source=rss",
      "publishedAt": "2026-08-09T08:23:19.000Z",
      "xQuery": "原爆の記憶忘れる前に 語る97歳"
    },
    {
      "time": "17:49",
      "title": "沖縄戦犠牲の祖母 戸籍再製できず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591106?source=rss",
      "publishedAt": "2026-08-09T08:49:19.000Z",
      "xQuery": "沖縄戦犠牲の祖母 戸籍再製できず"
    },
    {
      "time": "17:40",
      "title": "台湾 長崎式典の席巡り異例の抗議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591107?source=rss",
      "publishedAt": "2026-08-09T08:40:58.000Z",
      "xQuery": "台湾 長崎式典の席巡り異例の抗議"
    },
    {
      "time": "18:50",
      "title": "遊泳中に女性3人溺れる 1人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591112?source=rss",
      "publishedAt": "2026-08-09T09:50:54.000Z",
      "xQuery": "遊泳中に女性3人溺れる 1人死亡"
    },
    {
      "time": "18:18",
      "title": "波にさらわれ男性死亡 海岸散歩中",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591108?source=rss",
      "publishedAt": "2026-08-09T09:18:46.000Z",
      "xQuery": "波にさらわれ男性死亡 海岸散歩中"
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
