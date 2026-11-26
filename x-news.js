window.LUS_X_NEWS = {
  "updatedAt": "2026-11-26T23:35:50.770Z",
  "items": [
    {
      "time": "07:33",
      "title": "問責案きょう採決 可否は見通せず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604133?source=rss",
      "publishedAt": "2026-11-26T22:33:53.000Z",
      "xQuery": "問責案きょう採決 可否は見通せず"
    },
    {
      "time": "08:17",
      "title": "ロシア 高市氏との首脳対話認める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604138?source=rss",
      "publishedAt": "2026-11-26T23:17:23.000Z",
      "xQuery": "ロシア 高市氏との首脳対話認める"
    },
    {
      "time": "07:39",
      "title": "女性死亡 飲酒しひき逃げ疑い逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604132?source=rss",
      "publishedAt": "2026-11-26T22:39:32.000Z",
      "xQuery": "女性死亡 飲酒しひき逃げ疑い逮捕"
    },
    {
      "time": "07:56",
      "title": "JTなど 英たばこ大手買収検討か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604136?source=rss",
      "publishedAt": "2026-11-26T22:56:24.000Z",
      "xQuery": "JTなど 英たばこ大手買収検討か"
    },
    {
      "time": "06:56",
      "title": "ちいかわイベ グッズ早期完売謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604129?source=rss",
      "publishedAt": "2026-11-26T21:56:12.000Z",
      "xQuery": "ちいかわイベ グッズ早期完売謝罪"
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
