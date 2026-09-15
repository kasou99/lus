window.LUS_X_NEWS = {
  "updatedAt": "2026-09-15T01:30:27.168Z",
  "items": [
    {
      "time": "09:24",
      "title": "自動運転タクシー 東京で27年にも",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595329?source=rss",
      "publishedAt": "2026-09-15T00:24:41.000Z",
      "xQuery": "自動運転タクシー 東京で27年にも"
    },
    {
      "time": "09:11",
      "title": "サウジ パイプライン復旧に3～5週",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595326?source=rss",
      "publishedAt": "2026-09-15T00:11:52.000Z",
      "xQuery": "サウジ パイプライン復旧に3～5週"
    },
    {
      "time": "09:59",
      "title": "宇宙空間に兵器配備 米空軍認める",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595333?source=rss",
      "publishedAt": "2026-09-15T00:59:12.000Z",
      "xQuery": "宇宙空間に兵器配備 米空軍認める"
    },
    {
      "time": "08:53",
      "title": "刺激求める「ドパガキ」生む背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595323?source=rss",
      "publishedAt": "2026-09-14T23:53:14.000Z",
      "xQuery": "刺激求める「ドパガキ」生む背景"
    },
    {
      "time": "09:21",
      "title": "マンジャロで体重激減 恐怖語る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595330?source=rss",
      "publishedAt": "2026-09-15T00:21:15.000Z",
      "xQuery": "マンジャロで体重激減 恐怖語る"
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
