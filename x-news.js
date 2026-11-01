window.LUS_X_NEWS = {
  "updatedAt": "2026-11-01T14:09:48.083Z",
  "items": [
    {
      "time": "21:18",
      "title": "GMO攻撃 北朝鮮系のハッカーか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600991?source=rss",
      "publishedAt": "2026-11-01T12:18:46.000Z",
      "xQuery": "GMO攻撃 北朝鮮系のハッカーか"
    },
    {
      "time": "22:01",
      "title": "闇サイトで高まる 日本への関心",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600998?source=rss",
      "publishedAt": "2026-11-01T13:01:10.000Z",
      "xQuery": "闇サイトで高まる 日本への関心"
    },
    {
      "time": "21:37",
      "title": "釣り人が海に転落 1人死亡1人不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600994?source=rss",
      "publishedAt": "2026-11-01T12:37:07.000Z",
      "xQuery": "釣り人が海に転落 1人死亡1人不明"
    },
    {
      "time": "21:59",
      "title": "望月衣塑子記者の対談本 回収へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600996?source=rss",
      "publishedAt": "2026-11-01T12:59:35.000Z",
      "xQuery": "望月衣塑子記者の対談本 回収へ"
    },
    {
      "time": "21:04",
      "title": "PFOS含む泡消火剤 川に流出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600990?source=rss",
      "publishedAt": "2026-11-01T12:04:22.000Z",
      "xQuery": "PFOS含む泡消火剤 川に流出"
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
