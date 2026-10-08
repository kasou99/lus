window.LUS_X_NEWS = {
  "updatedAt": "2026-10-08T07:27:45.203Z",
  "items": [
    {
      "time": "13:21",
      "title": "ビール4社 業者間の「合意」焦点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597983?source=rss",
      "publishedAt": "2026-10-08T04:21:21.000Z",
      "xQuery": "ビール4社 業者間の「合意」焦点"
    },
    {
      "time": "12:21",
      "title": "米国防総省 イラン攻撃準備命令か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597981?source=rss",
      "publishedAt": "2026-10-08T03:21:16.000Z",
      "xQuery": "米国防総省 イラン攻撃準備命令か"
    },
    {
      "time": "14:05",
      "title": "那須町長選当選無効取り消し 高裁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597991?source=rss",
      "publishedAt": "2026-10-08T05:05:13.000Z",
      "xQuery": "那須町長選当選無効取り消し 高裁"
    },
    {
      "time": "14:45",
      "title": "宜野湾殺害 男は事前に刃物用意か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597993?source=rss",
      "publishedAt": "2026-10-08T05:45:41.000Z",
      "xQuery": "宜野湾殺害 男は事前に刃物用意か"
    },
    {
      "time": "15:03",
      "title": "タイで波紋 大村知事が発言を説明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597995?source=rss",
      "publishedAt": "2026-10-08T06:03:22.000Z",
      "xQuery": "タイで波紋 大村知事が発言を説明"
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
