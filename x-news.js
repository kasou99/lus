window.LUS_X_NEWS = {
  "updatedAt": "2026-07-01T09:19:24.663Z",
  "items": [
    {
      "time": "16:29",
      "title": "衆院議長 与野党に国会正常化要請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586354?source=rss",
      "publishedAt": "2026-07-01T07:29:12.000Z",
      "xQuery": "衆院議長 与野党に国会正常化要請"
    },
    {
      "time": "16:56",
      "title": "習氏 台湾統一は「歴史的任務」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586358?source=rss",
      "publishedAt": "2026-07-01T07:56:20.000Z",
      "xQuery": "習氏 台湾統一は「歴史的任務」"
    },
    {
      "time": "15:53",
      "title": "不明の10歳 滝で発見も死亡確認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586349?source=rss",
      "publishedAt": "2026-07-01T06:53:04.000Z",
      "xQuery": "不明の10歳 滝で発見も死亡確認"
    },
    {
      "time": "17:24",
      "title": "山に遺体 クマが人を獲物と認識か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586361?source=rss",
      "publishedAt": "2026-07-01T08:24:37.000Z",
      "xQuery": "山に遺体 クマが人を獲物と認識か"
    },
    {
      "time": "17:15",
      "title": "5歳不明 消防は一旦捜索打ち切り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586360?source=rss",
      "publishedAt": "2026-07-01T08:15:35.000Z",
      "xQuery": "5歳不明 消防は一旦捜索打ち切り"
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
