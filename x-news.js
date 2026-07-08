window.LUS_X_NEWS = {
  "updatedAt": "2026-07-08T23:29:08.901Z",
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
      "time": "07:50",
      "title": "米イラン緊張 パキスタン懸念表明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587246?source=rss",
      "publishedAt": "2026-07-08T22:50:27.000Z",
      "xQuery": "米イラン緊張 パキスタン懸念表明"
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
      "time": "07:25",
      "title": "KDDI共同創業者の子4人 申告漏れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587245?source=rss",
      "publishedAt": "2026-07-08T22:25:13.000Z",
      "xQuery": "KDDI共同創業者の子4人 申告漏れ"
    },
    {
      "time": "07:32",
      "title": "快活CLUBアプリ攻撃疑い18歳逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587243?source=rss",
      "publishedAt": "2026-07-08T22:32:24.000Z",
      "xQuery": "快活CLUBアプリ攻撃疑い18歳逮捕"
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
