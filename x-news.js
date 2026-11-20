window.LUS_X_NEWS = {
  "updatedAt": "2026-11-20T13:11:13.742Z",
  "items": [
    {
      "time": "21:53",
      "title": "熊本県で震度4 津波の心配なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603337?source=rss",
      "publishedAt": "2026-11-20T12:53:13.000Z",
      "xQuery": "熊本県で震度4 津波の心配なし"
    },
    {
      "time": "21:31",
      "title": "安保3文書素案 原潜「検討着手」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603335?source=rss",
      "publishedAt": "2026-11-20T12:31:19.000Z",
      "xQuery": "安保3文書素案 原潜「検討着手」"
    },
    {
      "time": "20:09",
      "title": "大型クロマグロ漁獲枠 25%増合意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603329?source=rss",
      "publishedAt": "2026-11-20T11:09:13.000Z",
      "xQuery": "大型クロマグロ漁獲枠 25%増合意"
    },
    {
      "time": "21:02",
      "title": "自民党で関文科相の辞任論が浮上",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603332?source=rss",
      "publishedAt": "2026-11-20T12:02:20.000Z",
      "xQuery": "自民党で関文科相の辞任論が浮上"
    },
    {
      "time": "20:41",
      "title": "小中高生の自殺者数 最多ペース",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603331?source=rss",
      "publishedAt": "2026-11-20T11:41:48.000Z",
      "xQuery": "小中高生の自殺者数 最多ペース"
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
