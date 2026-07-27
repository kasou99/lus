window.LUS_X_NEWS = {
  "updatedAt": "2026-07-27T06:12:30.642Z",
  "items": [
    {
      "time": "14:53",
      "title": "松橋事件 国と熊本県に賠償命令",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589495?source=rss",
      "publishedAt": "2026-07-27T05:53:36.000Z",
      "xQuery": "松橋事件 国と熊本県に賠償命令"
    },
    {
      "time": "14:06",
      "title": "カネを情に変え 識者が見る角栄氏",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589488?source=rss",
      "publishedAt": "2026-07-27T05:06:17.000Z",
      "xQuery": "カネを情に変え 識者が見る角栄氏"
    },
    {
      "time": "13:44",
      "title": "1回の登山で「2度遭難」相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589485?source=rss",
      "publishedAt": "2026-07-27T04:44:37.000Z",
      "xQuery": "1回の登山で「2度遭難」相次ぐ"
    },
    {
      "time": "14:47",
      "title": "可搬式オービス盗んだ疑い 男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589490?source=rss",
      "publishedAt": "2026-07-27T05:47:49.000Z",
      "xQuery": "可搬式オービス盗んだ疑い 男逮捕"
    },
    {
      "time": "14:58",
      "title": "テスト中暴走 OpenAI把握に時間",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589496?source=rss",
      "publishedAt": "2026-07-27T05:58:51.000Z",
      "xQuery": "テスト中暴走 OpenAI把握に時間"
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
