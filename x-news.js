window.LUS_X_NEWS = {
  "updatedAt": "2026-09-11T04:42:19.692Z",
  "items": [
    {
      "time": "11:43",
      "title": "浜岡原発の審査 申請取り下げ検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594937?source=rss",
      "publishedAt": "2026-09-11T02:43:07.000Z",
      "xQuery": "浜岡原発の審査 申請取り下げ検討"
    },
    {
      "time": "12:02",
      "title": "政府職員らの情報 24万件漏えいか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594942?source=rss",
      "publishedAt": "2026-09-11T03:02:31.000Z",
      "xQuery": "政府職員らの情報 24万件漏えいか"
    },
    {
      "time": "12:35",
      "title": "傷害事件で逮捕 高2死亡に関与か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594945?source=rss",
      "publishedAt": "2026-09-11T03:35:16.000Z",
      "xQuery": "傷害事件で逮捕 高2死亡に関与か"
    },
    {
      "time": "11:22",
      "title": "都バスであおり運転疑い 書類送検",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594933?source=rss",
      "publishedAt": "2026-09-11T02:22:33.000Z",
      "xQuery": "都バスであおり運転疑い 書類送検"
    },
    {
      "time": "13:07",
      "title": "富士山遭難救助 なぜ有料化難しい",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594936?source=rss",
      "publishedAt": "2026-09-11T04:07:55.000Z",
      "xQuery": "富士山遭難救助 なぜ有料化難しい"
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
