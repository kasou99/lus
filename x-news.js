window.LUS_X_NEWS = {
  "updatedAt": "2026-06-19T11:04:22.702Z",
  "items": [
    {
      "time": "19:02",
      "title": "20-21日 西-東日本で警報級大雨か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584871?source=rss",
      "publishedAt": "2026-06-19T10:02:44.000Z",
      "xQuery": "20-21日 西-東日本で警報級大雨か"
    },
    {
      "time": "18:58",
      "title": "ウクライナ侵攻 露の人的優位陰り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584868?source=rss",
      "publishedAt": "2026-06-19T09:58:45.000Z",
      "xQuery": "ウクライナ侵攻 露の人的優位陰り"
    },
    {
      "time": "19:27",
      "title": "東海道新幹線 全線で運転見合わせ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584874?source=rss",
      "publishedAt": "2026-06-19T10:27:10.000Z",
      "xQuery": "東海道新幹線 全線で運転見合わせ"
    },
    {
      "time": "19:29",
      "title": "ランドセルにくぎ いじめ重大事態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584872?source=rss",
      "publishedAt": "2026-06-19T10:29:48.000Z",
      "xQuery": "ランドセルにくぎ いじめ重大事態"
    },
    {
      "time": "13:22",
      "title": "日清 カップ焼きそば28万個回収",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584828?source=rss",
      "publishedAt": "2026-06-19T04:22:40.000Z",
      "xQuery": "日清 カップ焼きそば28万個回収"
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
