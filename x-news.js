window.LUS_X_NEWS = {
  "updatedAt": "2026-08-02T04:40:15.289Z",
  "items": [
    {
      "time": "12:02",
      "title": "米大統領 イラン大規模攻撃を中止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590237?source=rss",
      "publishedAt": "2026-08-02T03:02:05.000Z",
      "xQuery": "米大統領 イラン大規模攻撃を中止"
    },
    {
      "time": "11:35",
      "title": "防衛機密 クラウドで運用へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590235?source=rss",
      "publishedAt": "2026-08-02T02:35:06.000Z",
      "xQuery": "防衛機密 クラウドで運用へ"
    },
    {
      "time": "12:26",
      "title": "避難所の70代女性 コロナに感染",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590242?source=rss",
      "publishedAt": "2026-08-02T03:26:15.000Z",
      "xQuery": "避難所の70代女性 コロナに感染"
    },
    {
      "time": "12:56",
      "title": "スカイダイビングで着地失敗 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590246?source=rss",
      "publishedAt": "2026-08-02T03:56:15.000Z",
      "xQuery": "スカイダイビングで着地失敗 死亡"
    },
    {
      "time": "12:41",
      "title": "山中で2歳を保護 不明から21時間",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590245?source=rss",
      "publishedAt": "2026-08-02T03:41:41.000Z",
      "xQuery": "山中で2歳を保護 不明から21時間"
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
