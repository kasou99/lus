window.LUS_X_NEWS = {
  "updatedAt": "2026-07-01T10:47:03.155Z",
  "items": [
    {
      "time": "18:18",
      "title": "自民と維新 国会審議巡り覚書調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586371?source=rss",
      "publishedAt": "2026-07-01T09:18:27.000Z",
      "xQuery": "自民と維新 国会審議巡り覚書調整"
    },
    {
      "time": "18:34",
      "title": "モバイルSuica 不具合が解消",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586374?source=rss",
      "publishedAt": "2026-07-01T09:34:30.000Z",
      "xQuery": "モバイルSuica 不具合が解消"
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
      "time": "19:35",
      "title": "不同意わいせつ疑い 市議書類送検",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586379?source=rss",
      "publishedAt": "2026-07-01T10:35:19.000Z",
      "xQuery": "不同意わいせつ疑い 市議書類送検"
    },
    {
      "time": "19:11",
      "title": "スムージー再び半額へ セブン対策",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586377?source=rss",
      "publishedAt": "2026-07-01T10:11:43.000Z",
      "xQuery": "スムージー再び半額へ セブン対策"
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
