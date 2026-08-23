window.LUS_X_NEWS = {
  "updatedAt": "2026-08-23T12:10:21.906Z",
  "items": [
    {
      "time": "20:05",
      "title": "高市内閣の支持率横ばい41% 毎日",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592802?source=rss",
      "publishedAt": "2026-08-23T11:05:18.000Z",
      "xQuery": "高市内閣の支持率横ばい41% 毎日"
    },
    {
      "time": "20:02",
      "title": "関東で震度5弱 未明の揺れに驚き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592801?source=rss",
      "publishedAt": "2026-08-23T11:02:25.000Z",
      "xQuery": "関東で震度5弱 未明の揺れに驚き"
    },
    {
      "time": "19:58",
      "title": "4人死亡 事故までに列車3本が通過",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592798?source=rss",
      "publishedAt": "2026-08-23T10:58:33.000Z",
      "xQuery": "4人死亡 事故までに列車3本が通過"
    },
    {
      "time": "20:09",
      "title": "独身と嘘つかれ妊娠 娘のため提訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592803?source=rss",
      "publishedAt": "2026-08-23T11:09:29.000Z",
      "xQuery": "独身と嘘つかれ妊娠 娘のため提訴"
    },
    {
      "time": "16:32",
      "title": "就活で障害伝えず76% 不利益懸念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592777?source=rss",
      "publishedAt": "2026-08-23T07:32:51.000Z",
      "xQuery": "就活で障害伝えず76% 不利益懸念"
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
