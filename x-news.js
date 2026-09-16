window.LUS_X_NEWS = {
  "updatedAt": "2026-09-16T03:43:13.398Z",
  "items": [
    {
      "time": "10:53",
      "title": "自民の新執行部発足 麻生氏ら続投",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595455?source=rss",
      "publishedAt": "2026-09-16T01:53:08.000Z",
      "xQuery": "自民の新執行部発足 麻生氏ら続投"
    },
    {
      "time": "11:43",
      "title": "首相 参院役員の人事権は私にない",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595467?source=rss",
      "publishedAt": "2026-09-16T02:43:54.000Z",
      "xQuery": "首相 参院役員の人事権は私にない"
    },
    {
      "time": "11:05",
      "title": "台風発生へ 連休の本州に影響恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595457?source=rss",
      "publishedAt": "2026-09-16T02:05:22.000Z",
      "xQuery": "台風発生へ 連休の本州に影響恐れ"
    },
    {
      "time": "12:12",
      "title": "元カープ選手に薬物譲渡の男 有罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595475?source=rss",
      "publishedAt": "2026-09-16T03:12:51.000Z",
      "xQuery": "元カープ選手に薬物譲渡の男 有罪"
    },
    {
      "time": "11:54",
      "title": "生徒2人と窃盗未遂疑い 教諭逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595468?source=rss",
      "publishedAt": "2026-09-16T02:54:08.000Z",
      "xQuery": "生徒2人と窃盗未遂疑い 教諭逮捕"
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
