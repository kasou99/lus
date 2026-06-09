window.LUS_X_NEWS = {
  "updatedAt": "2026-06-09T07:28:49.415Z",
  "items": [
    {
      "time": "14:12",
      "title": "米との合意近かった イラン高官",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583551?source=rss",
      "publishedAt": "2026-06-09T05:12:08.000Z",
      "xQuery": "米との合意近かった イラン高官"
    },
    {
      "time": "14:59",
      "title": "日銀 6月会合で利上げの公算大",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583556?source=rss",
      "publishedAt": "2026-06-09T05:59:12.000Z",
      "xQuery": "日銀 6月会合で利上げの公算大"
    },
    {
      "time": "15:58",
      "title": "宇都宮のクマ 麻酔銃が命中し捕獲",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583562?source=rss",
      "publishedAt": "2026-06-09T06:58:41.000Z",
      "xQuery": "宇都宮のクマ 麻酔銃が命中し捕獲"
    },
    {
      "time": "12:27",
      "title": "秋葉原事件の献花台にごみ 対策へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583540?source=rss",
      "publishedAt": "2026-06-09T03:27:29.000Z",
      "xQuery": "秋葉原事件の献花台にごみ 対策へ"
    },
    {
      "time": "14:56",
      "title": "西成「釜ヶ崎の象徴」解体始まる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583554?source=rss",
      "publishedAt": "2026-06-09T05:56:35.000Z",
      "xQuery": "西成「釜ヶ崎の象徴」解体始まる"
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
