window.LUS_X_NEWS = {
  "updatedAt": "2026-10-30T23:35:07.622Z",
  "items": [
    {
      "time": "07:29",
      "title": "茂木外相 露外相に記者の解放要求",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600743?source=rss",
      "publishedAt": "2026-10-30T22:29:41.000Z",
      "xQuery": "茂木外相 露外相に記者の解放要求"
    },
    {
      "time": "07:39",
      "title": "e-Taxかたる不審メール 相談急増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600745?source=rss",
      "publishedAt": "2026-10-30T22:39:25.000Z",
      "xQuery": "e-Taxかたる不審メール 相談急増"
    },
    {
      "time": "08:05",
      "title": "教皇が米中間選挙に投票 史上初",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600748?source=rss",
      "publishedAt": "2026-10-30T23:05:29.000Z",
      "xQuery": "教皇が米中間選挙に投票 史上初"
    },
    {
      "time": "08:15",
      "title": "転覆 同志社会見に遺族コメント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600752?source=rss",
      "publishedAt": "2026-10-30T23:15:38.000Z",
      "xQuery": "転覆 同志社会見に遺族コメント"
    },
    {
      "time": "07:25",
      "title": "都内最古の「天下一品」閉店へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600740?source=rss",
      "publishedAt": "2026-10-30T22:25:10.000Z",
      "xQuery": "都内最古の「天下一品」閉店へ"
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
