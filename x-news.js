window.LUS_X_NEWS = {
  "updatedAt": "2026-11-18T09:12:22.996Z",
  "items": [
    {
      "time": "17:51",
      "title": "DHC 顧客氏名など1911万件漏えい",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603058?source=rss",
      "publishedAt": "2026-11-18T08:51:06.000Z",
      "xQuery": "DHC 顧客氏名など1911万件漏えい"
    },
    {
      "time": "16:40",
      "title": "日本車の部品 一部共通化する方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603047?source=rss",
      "publishedAt": "2026-11-18T07:40:00.000Z",
      "xQuery": "日本車の部品 一部共通化する方針"
    },
    {
      "time": "17:42",
      "title": "高市氏が中国到着 歓迎に各国と差",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603057?source=rss",
      "publishedAt": "2026-11-18T08:42:41.000Z",
      "xQuery": "高市氏が中国到着 歓迎に各国と差"
    },
    {
      "time": "16:38",
      "title": "米大統領に出前ふるまう 比大統領",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603048?source=rss",
      "publishedAt": "2026-11-18T07:38:16.000Z",
      "xQuery": "米大統領に出前ふるまう 比大統領"
    },
    {
      "time": "16:32",
      "title": "Suica新キャラ A案とC案も活用へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603046?source=rss",
      "publishedAt": "2026-11-18T07:32:25.000Z",
      "xQuery": "Suica新キャラ A案とC案も活用へ"
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
