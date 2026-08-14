window.LUS_X_NEWS = {
  "updatedAt": "2026-08-14T03:50:07.866Z",
  "items": [
    {
      "time": "12:04",
      "title": "千葉市で1人死亡 大雨の死者5人に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591676?source=rss",
      "publishedAt": "2026-08-14T03:04:48.000Z",
      "xQuery": "千葉市で1人死亡 大雨の死者5人に"
    },
    {
      "time": "12:38",
      "title": "大雨から一夜 関東の鉄道運行情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591678?source=rss",
      "publishedAt": "2026-08-14T03:38:09.000Z",
      "xQuery": "大雨から一夜 関東の鉄道運行情報"
    },
    {
      "time": "10:53",
      "title": "千葉駅 一夜明かした家族連れも",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591672?source=rss",
      "publishedAt": "2026-08-14T01:53:50.000Z",
      "xQuery": "千葉駅 一夜明かした家族連れも"
    },
    {
      "time": "09:18",
      "title": "帰宅困難の約4千人 自衛隊が輸送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591664?source=rss",
      "publishedAt": "2026-08-14T00:18:28.000Z",
      "xQuery": "帰宅困難の約4千人 自衛隊が輸送"
    },
    {
      "time": "10:21",
      "title": "パワハラの横浜市長 市議追及に涙",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591670?source=rss",
      "publishedAt": "2026-08-14T01:21:02.000Z",
      "xQuery": "パワハラの横浜市長 市議追及に涙"
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
