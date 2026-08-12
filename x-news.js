window.LUS_X_NEWS = {
  "updatedAt": "2026-08-12T02:58:19.587Z",
  "items": [
    {
      "time": "07:39",
      "title": "熊本地震2週間 仮設住宅整備進む",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591383?source=rss",
      "publishedAt": "2026-08-11T22:39:41.000Z",
      "xQuery": "熊本地震2週間 仮設住宅整備進む"
    },
    {
      "time": "09:53",
      "title": "終戦3日前の満州 集団自決の証言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591402?source=rss",
      "publishedAt": "2026-08-12T00:53:07.000Z",
      "xQuery": "終戦3日前の満州 集団自決の証言"
    },
    {
      "time": "08:22",
      "title": "コロンビア地震 行方不明3000人超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591391?source=rss",
      "publishedAt": "2026-08-11T23:22:20.000Z",
      "xQuery": "コロンビア地震 行方不明3000人超"
    },
    {
      "time": "11:15",
      "title": "台風17号発生 来週以降に影響恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591411?source=rss",
      "publishedAt": "2026-08-12T02:15:53.000Z",
      "xQuery": "台風17号発生 来週以降に影響恐れ"
    },
    {
      "time": "11:33",
      "title": "スポーツ用品大手オン 株価急落",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591414?source=rss",
      "publishedAt": "2026-08-12T02:33:53.000Z",
      "xQuery": "スポーツ用品大手オン 株価急落"
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
