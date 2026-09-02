window.LUS_X_NEWS = {
  "updatedAt": "2026-09-02T04:22:55.850Z",
  "items": [
    {
      "time": "12:10",
      "title": "合流頓挫の中道 立憲系の動向焦点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593956?source=rss",
      "publishedAt": "2026-09-02T03:10:17.000Z",
      "xQuery": "合流頓挫の中道 立憲系の動向焦点"
    },
    {
      "time": "09:18",
      "title": "マスク氏がEUを批判 G20関連会合",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593941?source=rss",
      "publishedAt": "2026-09-02T00:18:22.000Z",
      "xQuery": "マスク氏がEUを批判 G20関連会合"
    },
    {
      "time": "11:36",
      "title": "露大統領 関係悪化は日本に全責任",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593953?source=rss",
      "publishedAt": "2026-09-02T02:36:54.000Z",
      "xQuery": "露大統領 関係悪化は日本に全責任"
    },
    {
      "time": "12:03",
      "title": "車田正美さん 28億円賠償求め提訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593960?source=rss",
      "publishedAt": "2026-09-02T03:03:01.000Z",
      "xQuery": "車田正美さん 28億円賠償求め提訴"
    },
    {
      "time": "12:47",
      "title": "「街の顔」百貨店の閉店加速 背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593962?source=rss",
      "publishedAt": "2026-09-02T03:47:55.000Z",
      "xQuery": "「街の顔」百貨店の閉店加速 背景"
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
