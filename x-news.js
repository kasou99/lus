window.LUS_X_NEWS = {
  "updatedAt": "2026-11-14T17:35:05.411Z",
  "items": [
    {
      "time": "20:17",
      "title": "米中露の接近 日本政府は危機感",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602584?source=rss",
      "publishedAt": "2026-11-14T11:17:04.000Z",
      "xQuery": "米中露の接近 日本政府は危機感"
    },
    {
      "time": "22:45",
      "title": "AI悪用攻撃拠点か 世界で千台発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602602?source=rss",
      "publishedAt": "2026-11-14T13:45:44.000Z",
      "xQuery": "AI悪用攻撃拠点か 世界で千台発見"
    },
    {
      "time": "23:42",
      "title": "MS 障害原因は過去の増強作業",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602606?source=rss",
      "publishedAt": "2026-11-14T14:42:06.000Z",
      "xQuery": "MS 障害原因は過去の増強作業"
    },
    {
      "time": "21:32",
      "title": "日本兵の墓が無縁化 解消に法の壁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602590?source=rss",
      "publishedAt": "2026-11-14T12:32:53.000Z",
      "xQuery": "日本兵の墓が無縁化 解消に法の壁"
    },
    {
      "time": "21:56",
      "title": "縦型ショートドラマ トラブル急増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602597?source=rss",
      "publishedAt": "2026-11-14T12:56:42.000Z",
      "xQuery": "縦型ショートドラマ トラブル急増"
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
