window.LUS_X_NEWS = {
  "updatedAt": "2026-07-08T21:56:57.771Z",
  "items": [
    {
      "time": "06:28",
      "title": "台風9号 11日朝石垣島など直撃か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587241?source=rss",
      "publishedAt": "2026-07-08T21:28:32.000Z",
      "xQuery": "台風9号 11日朝石垣島など直撃か"
    },
    {
      "time": "06:20",
      "title": "米軍 イランへの新たな攻撃実施",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587240?source=rss",
      "publishedAt": "2026-07-08T21:20:25.000Z",
      "xQuery": "米軍 イランへの新たな攻撃実施"
    },
    {
      "time": "23:37",
      "title": "米大統領 イランと日本言い間違え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587233?source=rss",
      "publishedAt": "2026-07-08T14:37:14.000Z",
      "xQuery": "米大統領 イランと日本言い間違え"
    },
    {
      "time": "23:26",
      "title": "全東信が破産 2万店超に未入金か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587232?source=rss",
      "publishedAt": "2026-07-08T14:26:25.000Z",
      "xQuery": "全東信が破産 2万店超に未入金か"
    },
    {
      "time": "06:11",
      "title": "住宅で70代死亡 殺人疑い息子逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587239?source=rss",
      "publishedAt": "2026-07-08T21:11:21.000Z",
      "xQuery": "住宅で70代死亡 殺人疑い息子逮捕"
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
