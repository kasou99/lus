window.LUS_X_NEWS = {
  "updatedAt": "2026-09-08T10:18:43.193Z",
  "items": [
    {
      "time": "18:30",
      "title": "愛知・岐阜の庄内川 氾濫特別警報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594671?source=rss",
      "publishedAt": "2026-09-08T09:30:49.000Z",
      "xQuery": "愛知・岐阜の庄内川 氾濫特別警報"
    },
    {
      "time": "18:32",
      "title": "安全確保を 大雨のときのNG行動",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593591?source=rss",
      "publishedAt": "2026-09-08T09:32:24.000Z",
      "xQuery": "安全確保を 大雨のときのNG行動"
    },
    {
      "time": "18:56",
      "title": "名古屋市 60万世帯に緊急安全確保",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594674?source=rss",
      "publishedAt": "2026-09-08T09:56:19.000Z",
      "xQuery": "名古屋市 60万世帯に緊急安全確保"
    },
    {
      "time": "18:55",
      "title": "愛知・岐阜で特別警報 最新情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594673?source=rss",
      "publishedAt": "2026-09-08T09:55:16.000Z",
      "xQuery": "愛知・岐阜で特別警報 最新情報"
    },
    {
      "time": "18:17",
      "title": "東海地方で大雨 現地のSNS投稿",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594666?source=rss",
      "publishedAt": "2026-09-08T09:17:34.000Z",
      "xQuery": "東海地方で大雨 現地のSNS投稿"
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
