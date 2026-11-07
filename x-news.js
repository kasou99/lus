window.LUS_X_NEWS = {
  "updatedAt": "2026-11-07T09:35:03.341Z",
  "items": [
    {
      "time": "17:23",
      "title": "自民 採決前退席の4氏に説明要求",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601664?source=rss",
      "publishedAt": "2026-11-07T08:23:17.000Z",
      "xQuery": "自民 採決前退席の4氏に説明要求"
    },
    {
      "time": "16:57",
      "title": "中国の大学など 日本語学ぶ学生減",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601663?source=rss",
      "publishedAt": "2026-11-07T07:57:28.000Z",
      "xQuery": "中国の大学など 日本語学ぶ学生減"
    },
    {
      "time": "17:08",
      "title": "障害者と性 問題提起の投稿真意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601665?source=rss",
      "publishedAt": "2026-11-07T08:08:36.000Z",
      "xQuery": "障害者と性 問題提起の投稿真意"
    },
    {
      "time": "17:27",
      "title": "受験生困惑?県の図書館長期休館",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601668?source=rss",
      "publishedAt": "2026-11-07T08:27:09.000Z",
      "xQuery": "受験生困惑?県の図書館長期休館"
    },
    {
      "time": "18:01",
      "title": "店主以外全員が認知症 愛知の食堂",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601672?source=rss",
      "publishedAt": "2026-11-07T09:01:46.000Z",
      "xQuery": "店主以外全員が認知症 愛知の食堂"
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
