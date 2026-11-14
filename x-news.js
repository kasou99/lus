window.LUS_X_NEWS = {
  "updatedAt": "2026-11-14T03:12:53.802Z",
  "items": [
    {
      "time": "10:50",
      "title": "全米 航空機の地上待機命令を解除",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602522?source=rss",
      "publishedAt": "2026-11-14T01:50:35.000Z",
      "xQuery": "全米 航空機の地上待機命令を解除"
    },
    {
      "time": "09:53",
      "title": "FRB 市場の最大脅威は「AI関連」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602514?source=rss",
      "publishedAt": "2026-11-14T00:53:09.000Z",
      "xQuery": "FRB 市場の最大脅威は「AI関連」"
    },
    {
      "time": "11:26",
      "title": "3歳死亡 5回虐待通告もなぜ防げず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602526?source=rss",
      "publishedAt": "2026-11-14T02:26:28.000Z",
      "xQuery": "3歳死亡 5回虐待通告もなぜ防げず"
    },
    {
      "time": "11:03",
      "title": "ニデック半期報告書 提出延期検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602523?source=rss",
      "publishedAt": "2026-11-14T02:03:37.000Z",
      "xQuery": "ニデック半期報告書 提出延期検討"
    },
    {
      "time": "10:28",
      "title": "「銀だこ」曲がり角 赤字転落なぜ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6602520?source=rss",
      "publishedAt": "2026-11-14T01:28:24.000Z",
      "xQuery": "「銀だこ」曲がり角 赤字転落なぜ"
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
