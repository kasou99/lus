window.LUS_X_NEWS = {
  "updatedAt": "2026-06-28T09:12:22.195Z",
  "items": [
    {
      "time": "17:09",
      "title": "比例45減なら中小政党へ影響 試算",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586011?source=rss",
      "publishedAt": "2026-06-28T08:09:54.000Z",
      "xQuery": "比例45減なら中小政党へ影響 試算"
    },
    {
      "time": "15:33",
      "title": "沖北相 抗議船で平和学習に違和感",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585999?source=rss",
      "publishedAt": "2026-06-28T06:33:02.000Z",
      "xQuery": "沖北相 抗議船で平和学習に違和感"
    },
    {
      "time": "17:22",
      "title": "5歳不明1週間 母「後悔やまない」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586015?source=rss",
      "publishedAt": "2026-06-28T08:22:24.000Z",
      "xQuery": "5歳不明1週間 母「後悔やまない」"
    },
    {
      "time": "15:28",
      "title": "「独身マイホーム」増 メリデメは",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585998?source=rss",
      "publishedAt": "2026-06-28T06:28:17.000Z",
      "xQuery": "「独身マイホーム」増 メリデメは"
    },
    {
      "time": "17:18",
      "title": "吉田寮「現棟」建て替え方針 波紋",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586014?source=rss",
      "publishedAt": "2026-06-28T08:18:08.000Z",
      "xQuery": "吉田寮「現棟」建て替え方針 波紋"
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
