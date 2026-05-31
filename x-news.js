window.LUS_X_NEWS = {
  "updatedAt": "2026-05-31T05:39:37.077Z",
  "items": [
    {
      "time": "13:47",
      "title": "「新型軍国主義」は虚偽 防衛相",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582410?source=rss",
      "publishedAt": "2026-05-31T04:47:35.000Z",
      "xQuery": "「新型軍国主義」は虚偽 防衛相"
    },
    {
      "time": "12:35",
      "title": "バスひき逃げ死亡 被害者父は悲痛",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582401?source=rss",
      "publishedAt": "2026-05-31T03:35:26.000Z",
      "xQuery": "バスひき逃げ死亡 被害者父は悲痛"
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
      "time": "13:03",
      "title": "「関東一涼しい街」移住に期待",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582404?source=rss",
      "publishedAt": "2026-05-31T04:03:51.000Z",
      "xQuery": "「関東一涼しい街」移住に期待"
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
