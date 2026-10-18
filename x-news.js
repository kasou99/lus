window.LUS_X_NEWS = {
  "updatedAt": "2026-10-18T10:15:10.634Z",
  "items": [
    {
      "time": "17:45",
      "title": "内閣支持49%で発足以来最低 共同",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599260?source=rss",
      "publishedAt": "2026-10-18T08:45:32.000Z",
      "xQuery": "内閣支持49%で発足以来最低 共同"
    },
    {
      "time": "17:30",
      "title": "不動産取引のマネロン点検強化へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599259?source=rss",
      "publishedAt": "2026-10-18T08:30:52.000Z",
      "xQuery": "不動産取引のマネロン点検強化へ"
    },
    {
      "time": "18:34",
      "title": "SUBARU 20年代後半にSDV投入へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599267?source=rss",
      "publishedAt": "2026-10-18T09:34:26.000Z",
      "xQuery": "SUBARU 20年代後半にSDV投入へ"
    },
    {
      "time": "18:47",
      "title": "漏えい急増は中国製LLM起因 指摘",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599269?source=rss",
      "publishedAt": "2026-10-18T09:47:35.000Z",
      "xQuery": "漏えい急増は中国製LLM起因 指摘"
    },
    {
      "time": "18:12",
      "title": "傾いていた住宅が倒壊 86歳死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599266?source=rss",
      "publishedAt": "2026-10-18T09:12:16.000Z",
      "xQuery": "傾いていた住宅が倒壊 86歳死亡"
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
