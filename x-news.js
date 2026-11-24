window.LUS_X_NEWS = {
  "updatedAt": "2026-11-24T02:36:41.447Z",
  "items": [
    {
      "time": "10:15",
      "title": "日経平均 一時2800円超値上がり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603771?source=rss",
      "publishedAt": "2026-11-24T01:15:25.000Z",
      "xQuery": "日経平均 一時2800円超値上がり"
    },
    {
      "time": "10:28",
      "title": "立憲 最大5万円給付案を参院提出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603770?source=rss",
      "publishedAt": "2026-11-24T01:28:07.000Z",
      "xQuery": "立憲 最大5万円給付案を参院提出"
    },
    {
      "time": "09:19",
      "title": "タジキスタンがICC脱退を通告",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603758?source=rss",
      "publishedAt": "2026-11-24T00:19:01.000Z",
      "xQuery": "タジキスタンがICC脱退を通告"
    },
    {
      "time": "09:02",
      "title": "フォークリフトが倒れ下敷き 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603756?source=rss",
      "publishedAt": "2026-11-24T00:02:04.000Z",
      "xQuery": "フォークリフトが倒れ下敷き 死亡"
    },
    {
      "time": "11:03",
      "title": "鉄鋼メーカー工場で爆発 1人けが",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603774?source=rss",
      "publishedAt": "2026-11-24T02:03:55.000Z",
      "xQuery": "鉄鋼メーカー工場で爆発 1人けが"
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
