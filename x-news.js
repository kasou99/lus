window.LUS_X_NEWS = {
  "updatedAt": "2026-05-24T09:03:05.769Z",
  "items": [
    {
      "time": "16:41",
      "title": "赤沢氏が訪中 日中関係は不透明感",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581501?source=rss",
      "publishedAt": "2026-05-24T07:41:01.000Z",
      "xQuery": "赤沢氏が訪中 日中関係は不透明感"
    },
    {
      "time": "15:44",
      "title": "日本で暮らす高齢外国人 生活困窮",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581493?source=rss",
      "publishedAt": "2026-05-24T06:44:42.000Z",
      "xQuery": "日本で暮らす高齢外国人 生活困窮"
    },
    {
      "time": "14:33",
      "title": "「海の外来種」日本で100種超す",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581485?source=rss",
      "publishedAt": "2026-05-24T05:33:50.000Z",
      "xQuery": "「海の外来種」日本で100種超す"
    },
    {
      "time": "17:06",
      "title": "兵庫母娘殺害事件 42歳男に逮捕状",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581508?source=rss",
      "publishedAt": "2026-05-24T08:06:30.000Z",
      "xQuery": "兵庫母娘殺害事件 42歳男に逮捕状"
    },
    {
      "time": "13:56",
      "title": "ISS「きぼう」どこで見える 解説",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581483?source=rss",
      "publishedAt": "2026-05-24T04:56:24.000Z",
      "xQuery": "ISS「きぼう」どこで見える 解説"
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
