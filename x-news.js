window.LUS_X_NEWS = {
  "updatedAt": "2026-11-25T20:10:28.816Z",
  "items": [
    {
      "time": "00:17",
      "title": "米 日中やEUなどに新関税を提案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603990?source=rss",
      "publishedAt": "2026-11-25T15:17:03.000Z",
      "xQuery": "米 日中やEUなどに新関税を提案"
    },
    {
      "time": "23:12",
      "title": "3文書 防衛力整備計画の指針判明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603985?source=rss",
      "publishedAt": "2026-11-25T14:12:01.000Z",
      "xQuery": "3文書 防衛力整備計画の指針判明"
    },
    {
      "time": "22:04",
      "title": "福岡刺殺 確保の男を別容疑で逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603982?source=rss",
      "publishedAt": "2026-11-25T13:04:10.000Z",
      "xQuery": "福岡刺殺 確保の男を別容疑で逮捕"
    },
    {
      "time": "23:46",
      "title": "神奈川の死亡事故 5分以上逆走か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603988?source=rss",
      "publishedAt": "2026-11-25T14:46:07.000Z",
      "xQuery": "神奈川の死亡事故 5分以上逆走か"
    },
    {
      "time": "23:17",
      "title": "くら寿司 ちいかわ企画初日で終了",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603987?source=rss",
      "publishedAt": "2026-11-25T14:17:26.000Z",
      "xQuery": "くら寿司 ちいかわ企画初日で終了"
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
