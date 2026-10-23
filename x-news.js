window.LUS_X_NEWS = {
  "updatedAt": "2026-10-23T00:47:18.250Z",
  "items": [
    {
      "time": "08:32",
      "title": "食料品消費税1% 買い物は変わるか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599768?source=rss",
      "publishedAt": "2026-10-22T23:32:18.000Z",
      "xQuery": "食料品消費税1% 買い物は変わるか"
    },
    {
      "time": "09:07",
      "title": "チベットでM7.0の地震 16人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599773?source=rss",
      "publishedAt": "2026-10-23T00:07:35.000Z",
      "xQuery": "チベットでM7.0の地震 16人死亡"
    },
    {
      "time": "07:41",
      "title": "デジ庁HPの問い合わせ内容漏洩か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599763?source=rss",
      "publishedAt": "2026-10-22T22:41:18.000Z",
      "xQuery": "デジ庁HPの問い合わせ内容漏洩か"
    },
    {
      "time": "08:58",
      "title": "「PHP」暮らし直撃 徹夜の社員も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599772?source=rss",
      "publishedAt": "2026-10-22T23:58:12.000Z",
      "xQuery": "「PHP」暮らし直撃 徹夜の社員も"
    },
    {
      "time": "07:49",
      "title": "生活保護利用者の車保有 緩和検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599765?source=rss",
      "publishedAt": "2026-10-22T22:49:45.000Z",
      "xQuery": "生活保護利用者の車保有 緩和検討"
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
