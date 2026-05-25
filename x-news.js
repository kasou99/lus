window.LUS_X_NEWS = {
  "updatedAt": "2026-05-25T17:38:09.608Z",
  "items": [
    {
      "time": "21:43",
      "title": "飲食料品の消費税1%案有力 政府",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581679?source=rss",
      "publishedAt": "2026-05-25T12:43:16.000Z",
      "xQuery": "飲食料品の消費税1%案有力 政府"
    },
    {
      "time": "22:57",
      "title": "米イラン 高濃縮ウランの扱いで溝",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581691?source=rss",
      "publishedAt": "2026-05-25T13:57:00.000Z",
      "xQuery": "米イラン 高濃縮ウランの扱いで溝"
    },
    {
      "time": "20:48",
      "title": "トランプ氏 対中融和に転じた背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581672?source=rss",
      "publishedAt": "2026-05-25T11:48:04.000Z",
      "xQuery": "トランプ氏 対中融和に転じた背景"
    },
    {
      "time": "21:00",
      "title": "習氏が高市氏巡り激高か 中国否定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581674?source=rss",
      "publishedAt": "2026-05-25T12:00:21.000Z",
      "xQuery": "習氏が高市氏巡り激高か 中国否定"
    },
    {
      "time": "19:34",
      "title": "大学生集団暴行 法廷で暴行の音声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581662?source=rss",
      "publishedAt": "2026-05-25T10:34:08.000Z",
      "xQuery": "大学生集団暴行 法廷で暴行の音声"
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
