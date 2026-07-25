window.LUS_X_NEWS = {
  "updatedAt": "2026-07-25T15:27:38.109Z",
  "items": [
    {
      "time": "22:37",
      "title": "陸自情報部隊 元隊員が実態を証言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589313?source=rss",
      "publishedAt": "2026-07-25T13:37:10.000Z",
      "xQuery": "陸自情報部隊 元隊員が実態を証言"
    },
    {
      "time": "20:28",
      "title": "仏「核の傘」拡大構想 相次ぐ賛同",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589297?source=rss",
      "publishedAt": "2026-07-25T11:28:16.000Z",
      "xQuery": "仏「核の傘」拡大構想 相次ぐ賛同"
    },
    {
      "time": "23:45",
      "title": "内閣支持率下落 市民求める政策は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589323?source=rss",
      "publishedAt": "2026-07-25T14:45:16.000Z",
      "xQuery": "内閣支持率下落 市民求める政策は"
    },
    {
      "time": "21:16",
      "title": "岡本公三容疑者 死因は肺の合併症",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589304?source=rss",
      "publishedAt": "2026-07-25T12:16:38.000Z",
      "xQuery": "岡本公三容疑者 死因は肺の合併症"
    },
    {
      "time": "18:31",
      "title": "切断遺体 事件後にノコギリ出品か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589285?source=rss",
      "publishedAt": "2026-07-25T09:31:22.000Z",
      "xQuery": "切断遺体 事件後にノコギリ出品か"
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
