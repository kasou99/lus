window.LUS_X_NEWS = {
  "updatedAt": "2026-08-27T03:54:45.931Z",
  "items": [
    {
      "time": "10:28",
      "title": "石川・富山 18万人に緊急安全確保",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593236?source=rss",
      "publishedAt": "2026-08-27T01:28:30.000Z",
      "xQuery": "石川・富山 18万人に緊急安全確保"
    },
    {
      "time": "12:01",
      "title": "北陸 28日朝にかけ再び大雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593248?source=rss",
      "publishedAt": "2026-08-27T03:01:52.000Z",
      "xQuery": "北陸 28日朝にかけ再び大雨の恐れ"
    },
    {
      "time": "11:21",
      "title": "川あふれ道路冠水 住民ら早朝避難",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593241?source=rss",
      "publishedAt": "2026-08-27T02:21:36.000Z",
      "xQuery": "川あふれ道路冠水 住民ら早朝避難"
    },
    {
      "time": "12:34",
      "title": "怖い 石川・富山の住民に募る不安",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593254?source=rss",
      "publishedAt": "2026-08-27T03:34:51.000Z",
      "xQuery": "怖い 石川・富山の住民に募る不安"
    },
    {
      "time": "11:56",
      "title": "草間氏死去 直前まで絵筆手放さず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593249?source=rss",
      "publishedAt": "2026-08-27T02:56:17.000Z",
      "xQuery": "草間氏死去 直前まで絵筆手放さず"
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
