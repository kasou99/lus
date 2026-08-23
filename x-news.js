window.LUS_X_NEWS = {
  "updatedAt": "2026-08-23T08:44:26.609Z",
  "items": [
    {
      "time": "16:53",
      "title": "特急事故 安全管理の書類など押収",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592782?source=rss",
      "publishedAt": "2026-08-23T07:53:05.000Z",
      "xQuery": "特急事故 安全管理の書類など押収"
    },
    {
      "time": "16:38",
      "title": "米地裁 移民ビザ発給停止を無効化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592780?source=rss",
      "publishedAt": "2026-08-23T07:38:17.000Z",
      "xQuery": "米地裁 移民ビザ発給停止を無効化"
    },
    {
      "time": "15:11",
      "title": "関東で震度5弱 けが人40人超に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592773?source=rss",
      "publishedAt": "2026-08-23T06:11:51.000Z",
      "xQuery": "関東で震度5弱 けが人40人超に"
    },
    {
      "time": "14:25",
      "title": "スマホ乗っ取られ詐欺SMSのbot化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592770?source=rss",
      "publishedAt": "2026-08-23T05:25:51.000Z",
      "xQuery": "スマホ乗っ取られ詐欺SMSのbot化"
    },
    {
      "time": "15:05",
      "title": "年金だけ苦しい 炎天下働くシニア",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592772?source=rss",
      "publishedAt": "2026-08-23T06:05:12.000Z",
      "xQuery": "年金だけ苦しい 炎天下働くシニア"
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
