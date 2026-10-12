window.LUS_X_NEWS = {
  "updatedAt": "2026-10-12T02:10:23.214Z",
  "items": [
    {
      "time": "10:19",
      "title": "北が2度ミサイル EEZ外に落下か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598471?source=rss",
      "publishedAt": "2026-10-12T01:19:09.000Z",
      "xQuery": "北が2度ミサイル EEZ外に落下か"
    },
    {
      "time": "08:18",
      "title": "サウジの安保が悪化 米国支援鈍く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598456?source=rss",
      "publishedAt": "2026-10-11T23:18:03.000Z",
      "xQuery": "サウジの安保が悪化 米国支援鈍く"
    },
    {
      "time": "10:53",
      "title": "ひき逃げ疑い逮捕 仕事継続と供述",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598476?source=rss",
      "publishedAt": "2026-10-12T01:53:25.000Z",
      "xQuery": "ひき逃げ疑い逮捕 仕事継続と供述"
    },
    {
      "time": "10:42",
      "title": "中野窃盗 被告は国際的窃盗団か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598475?source=rss",
      "publishedAt": "2026-10-12T01:42:07.000Z",
      "xQuery": "中野窃盗 被告は国際的窃盗団か"
    },
    {
      "time": "10:03",
      "title": "アシックスとナイキ なぜ「明暗」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598467?source=rss",
      "publishedAt": "2026-10-12T01:03:13.000Z",
      "xQuery": "アシックスとナイキ なぜ「明暗」"
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
