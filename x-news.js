window.LUS_X_NEWS = {
  "updatedAt": "2026-05-23T09:12:59.388Z",
  "items": [
    {
      "time": "15:42",
      "title": "国力研究会 議員集まりすぎ誤算か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581371?source=rss",
      "publishedAt": "2026-05-23T06:42:51.000Z",
      "xQuery": "国力研究会 議員集まりすぎ誤算か"
    },
    {
      "time": "17:37",
      "title": "ハンガリー首相 ICC脱退を撤回",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581388?source=rss",
      "publishedAt": "2026-05-23T08:37:52.000Z",
      "xQuery": "ハンガリー首相 ICC脱退を撤回"
    },
    {
      "time": "16:35",
      "title": "トランプ氏 長男の結婚式を欠席へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581379?source=rss",
      "publishedAt": "2026-05-23T07:35:06.000Z",
      "xQuery": "トランプ氏 長男の結婚式を欠席へ"
    },
    {
      "time": "17:26",
      "title": "かゆみひたすら我慢 30歳難病苦悩",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581387?source=rss",
      "publishedAt": "2026-05-23T08:26:00.000Z",
      "xQuery": "かゆみひたすら我慢 30歳難病苦悩"
    },
    {
      "time": "18:03",
      "title": "1-2万円程度のハンディファン続々",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581392?source=rss",
      "publishedAt": "2026-05-23T09:03:34.000Z",
      "xQuery": "1-2万円程度のハンディファン続々"
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
