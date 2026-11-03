window.LUS_X_NEWS = {
  "updatedAt": "2026-11-03T11:35:10.530Z",
  "items": [
    {
      "time": "20:29",
      "title": "アメリカ 中間選挙の投票始まる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601217?source=rss",
      "publishedAt": "2026-11-03T11:29:21.000Z",
      "xQuery": "アメリカ 中間選挙の投票始まる"
    },
    {
      "time": "18:50",
      "title": "GMOのサーバー「設計上の不備」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601209?source=rss",
      "publishedAt": "2026-11-03T09:50:53.000Z",
      "xQuery": "GMOのサーバー「設計上の不備」"
    },
    {
      "time": "20:26",
      "title": "関東 4日夜-5日に激しい雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601216?source=rss",
      "publishedAt": "2026-11-03T11:26:01.000Z",
      "xQuery": "関東 4日夜-5日に激しい雨の恐れ"
    },
    {
      "time": "19:38",
      "title": "ゴルフカートにひかれ 女性重傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601211?source=rss",
      "publishedAt": "2026-11-03T10:38:44.000Z",
      "xQuery": "ゴルフカートにひかれ 女性重傷"
    },
    {
      "time": "18:09",
      "title": "盤上に虫 藤井竜王思わず席を立つ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601201?source=rss",
      "publishedAt": "2026-11-03T09:09:52.000Z",
      "xQuery": "盤上に虫 藤井竜王思わず席を立つ"
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
