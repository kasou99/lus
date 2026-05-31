window.LUS_X_NEWS = {
  "updatedAt": "2026-05-31T07:30:46.263Z",
  "items": [
    {
      "time": "15:49",
      "title": "台風は1日沖縄に最接近 厳重警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582424?source=rss",
      "publishedAt": "2026-05-31T06:49:08.000Z",
      "xQuery": "台風は1日沖縄に最接近 厳重警戒"
    },
    {
      "time": "14:55",
      "title": "米軍 東太平洋で麻薬密輸船を空爆",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582419?source=rss",
      "publishedAt": "2026-05-31T05:55:09.000Z",
      "xQuery": "米軍 東太平洋で麻薬密輸船を空爆"
    },
    {
      "time": "13:51",
      "title": "×印見つからず 不快広告なぜ乱発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582411?source=rss",
      "publishedAt": "2026-05-31T04:51:52.000Z",
      "xQuery": "×印見つからず 不快広告なぜ乱発"
    },
    {
      "time": "15:07",
      "title": "スーツで街歩く「背広散歩」狙い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582421?source=rss",
      "publishedAt": "2026-05-31T06:07:52.000Z",
      "xQuery": "スーツで街歩く「背広散歩」狙い"
    },
    {
      "time": "14:32",
      "title": "ヴィレヴァン本店閉店 ファンが列",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582415?source=rss",
      "publishedAt": "2026-05-31T05:32:24.000Z",
      "xQuery": "ヴィレヴァン本店閉店 ファンが列"
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
