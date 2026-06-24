window.LUS_X_NEWS = {
  "updatedAt": "2026-06-24T14:20:29.074Z",
  "items": [
    {
      "time": "21:49",
      "title": "台風7号は沖縄に接近へ 警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585523?source=rss",
      "publishedAt": "2026-06-24T12:49:34.000Z",
      "xQuery": "台風7号は沖縄に接近へ 警戒を"
    },
    {
      "time": "22:18",
      "title": "クールジャパン機構 統廃合検討へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585526?source=rss",
      "publishedAt": "2026-06-24T13:18:34.000Z",
      "xQuery": "クールジャパン機構 統廃合検討へ"
    },
    {
      "time": "22:26",
      "title": "5歳男児不明 川が増水し捜索難航",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585527?source=rss",
      "publishedAt": "2026-06-24T13:26:48.000Z",
      "xQuery": "5歳男児不明 川が増水し捜索難航"
    },
    {
      "time": "20:41",
      "title": "弁護側 内田梨瑚被告は判決に納得",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585518?source=rss",
      "publishedAt": "2026-06-24T11:41:28.000Z",
      "xQuery": "弁護側 内田梨瑚被告は判決に納得"
    },
    {
      "time": "18:02",
      "title": "小学校火災 洗濯物乾かしたと教師",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585500?source=rss",
      "publishedAt": "2026-06-24T09:02:21.000Z",
      "xQuery": "小学校火災 洗濯物乾かしたと教師"
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
