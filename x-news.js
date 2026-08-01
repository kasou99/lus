window.LUS_X_NEWS = {
  "updatedAt": "2026-08-01T00:50:02.218Z",
  "items": [
    {
      "time": "08:54",
      "title": "熊本地震で断水 一部は長期化恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590104?source=rss",
      "publishedAt": "2026-07-31T23:54:22.000Z",
      "xQuery": "熊本地震で断水 一部は長期化恐れ"
    },
    {
      "time": "08:23",
      "title": "米 過去最大級のイラン攻撃計画か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590099?source=rss",
      "publishedAt": "2026-07-31T23:23:37.000Z",
      "xQuery": "米 過去最大級のイラン攻撃計画か"
    },
    {
      "time": "07:51",
      "title": "高額療養費 負担上限が最大7%増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590096?source=rss",
      "publishedAt": "2026-07-31T22:51:31.000Z",
      "xQuery": "高額療養費 負担上限が最大7%増"
    },
    {
      "time": "09:31",
      "title": "米財務長官ToDoメモに「円買い」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590109?source=rss",
      "publishedAt": "2026-08-01T00:31:02.000Z",
      "xQuery": "米財務長官ToDoメモに「円買い」"
    },
    {
      "time": "08:51",
      "title": "市川のマンションで爆発か2人搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590105?source=rss",
      "publishedAt": "2026-07-31T23:51:03.000Z",
      "xQuery": "市川のマンションで爆発か2人搬送"
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
