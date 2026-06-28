window.LUS_X_NEWS = {
  "updatedAt": "2026-06-28T07:33:41.290Z",
  "items": [
    {
      "time": "13:54",
      "title": "近畿・中国・四国 土砂崩れ相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585991?source=rss",
      "publishedAt": "2026-06-28T04:54:55.000Z",
      "xQuery": "近畿・中国・四国 土砂崩れ相次ぐ"
    },
    {
      "time": "15:07",
      "title": "ミュトス5 米政府なぜ国内限定に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585997?source=rss",
      "publishedAt": "2026-06-28T06:07:51.000Z",
      "xQuery": "ミュトス5 米政府なぜ国内限定に"
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
      "time": "12:08",
      "title": "D-MAX並行輸入 価格は競合の倍",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585978?source=rss",
      "publishedAt": "2026-06-28T03:08:06.000Z",
      "xQuery": "D-MAX並行輸入 価格は競合の倍"
    },
    {
      "time": "15:53",
      "title": "鹿せんべい爆売れ 愛護会は懸念も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586004?source=rss",
      "publishedAt": "2026-06-28T06:53:41.000Z",
      "xQuery": "鹿せんべい爆売れ 愛護会は懸念も"
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
