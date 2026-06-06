window.LUS_X_NEWS = {
  "updatedAt": "2026-06-06T05:26:22.026Z",
  "items": [
    {
      "time": "13:34",
      "title": "九州南部・奄美 土砂災害に警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583163?source=rss",
      "publishedAt": "2026-06-06T04:34:36.000Z",
      "xQuery": "九州南部・奄美 土砂災害に警戒"
    },
    {
      "time": "10:57",
      "title": "米‌政府がAI企業株取得を検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583146?source=rss",
      "publishedAt": "2026-06-06T01:57:35.000Z",
      "xQuery": "米‌政府がAI企業株取得を検討"
    },
    {
      "time": "12:23",
      "title": "高齢ドライバー雇う怖さ 社長吐露",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583152?source=rss",
      "publishedAt": "2026-06-06T03:23:13.000Z",
      "xQuery": "高齢ドライバー雇う怖さ 社長吐露"
    },
    {
      "time": "11:53",
      "title": "マンジャロで痩せる 依存に警鐘",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583151?source=rss",
      "publishedAt": "2026-06-06T02:53:56.000Z",
      "xQuery": "マンジャロで痩せる 依存に警鐘"
    },
    {
      "time": "13:09",
      "title": "子が暴行受ける動画 投稿の母葛藤",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583158?source=rss",
      "publishedAt": "2026-06-06T04:09:19.000Z",
      "xQuery": "子が暴行受ける動画 投稿の母葛藤"
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
