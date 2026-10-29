window.LUS_X_NEWS = {
  "updatedAt": "2026-10-29T06:44:08.531Z",
  "items": [
    {
      "time": "13:29",
      "title": "北発射のミサイルEEZ外に落下か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600542?source=rss",
      "publishedAt": "2026-10-29T04:29:48.000Z",
      "xQuery": "北発射のミサイルEEZ外に落下か"
    },
    {
      "time": "13:56",
      "title": "GMOサイバー攻撃 捜査の焦点は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600531?source=rss",
      "publishedAt": "2026-10-29T04:56:54.000Z",
      "xQuery": "GMOサイバー攻撃 捜査の焦点は"
    },
    {
      "time": "13:10",
      "title": "餃子の王将社長射殺 検察側が控訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600537?source=rss",
      "publishedAt": "2026-10-29T04:10:22.000Z",
      "xQuery": "餃子の王将社長射殺 検察側が控訴"
    },
    {
      "time": "14:52",
      "title": "銀座の異臭騒ぎ 傷害疑いで男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600551?source=rss",
      "publishedAt": "2026-10-29T05:52:56.000Z",
      "xQuery": "銀座の異臭騒ぎ 傷害疑いで男逮捕"
    },
    {
      "time": "14:07",
      "title": "原口一博元議員に賠償命令 地裁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600547?source=rss",
      "publishedAt": "2026-10-29T05:07:00.000Z",
      "xQuery": "原口一博元議員に賠償命令 地裁"
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
