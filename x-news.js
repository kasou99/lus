window.LUS_X_NEWS = {
  "updatedAt": "2026-10-22T02:47:09.506Z",
  "items": [
    {
      "time": "10:58",
      "title": "失効免許証を捜査流用 神奈川県警",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599671?source=rss",
      "publishedAt": "2026-10-22T01:58:46.000Z",
      "xQuery": "失効免許証を捜査流用 神奈川県警"
    },
    {
      "time": "09:28",
      "title": "米メタ 7-9月期決算で26%増収",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599663?source=rss",
      "publishedAt": "2026-10-22T00:28:29.000Z",
      "xQuery": "米メタ 7-9月期決算で26%増収"
    },
    {
      "time": "11:33",
      "title": "PHPの脆弱性 10年以上発見されず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599674?source=rss",
      "publishedAt": "2026-10-22T02:33:43.000Z",
      "xQuery": "PHPの脆弱性 10年以上発見されず"
    },
    {
      "time": "10:23",
      "title": "乳児遺体遺棄した疑い 24歳女逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599668?source=rss",
      "publishedAt": "2026-10-22T01:23:17.000Z",
      "xQuery": "乳児遺体遺棄した疑い 24歳女逮捕"
    },
    {
      "time": "09:46",
      "title": "仕事探し困難「通信困窮」の実態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599665?source=rss",
      "publishedAt": "2026-10-22T00:46:20.000Z",
      "xQuery": "仕事探し困難「通信困窮」の実態"
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
