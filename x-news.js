window.LUS_X_NEWS = {
  "updatedAt": "2026-11-19T05:12:12.950Z",
  "items": [
    {
      "time": "12:32",
      "title": "平均年齢75.7歳 歴史的首脳会談へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603148?source=rss",
      "publishedAt": "2026-11-19T03:32:29.000Z",
      "xQuery": "平均年齢75.7歳 歴史的首脳会談へ"
    },
    {
      "time": "13:37",
      "title": "APEC 中国が見せた「線引き」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603146?source=rss",
      "publishedAt": "2026-11-19T04:37:28.000Z",
      "xQuery": "APEC 中国が見せた「線引き」"
    },
    {
      "time": "12:05",
      "title": "タマホーム 高松以外も不正請求か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603142?source=rss",
      "publishedAt": "2026-11-19T03:05:48.000Z",
      "xQuery": "タマホーム 高松以外も不正請求か"
    },
    {
      "time": "13:05",
      "title": "スバル 米国製SUVを「逆輸入」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603150?source=rss",
      "publishedAt": "2026-11-19T04:05:33.000Z",
      "xQuery": "スバル 米国製SUVを「逆輸入」"
    },
    {
      "time": "12:10",
      "title": "小便器「丸見え」女性記者が驚き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603145?source=rss",
      "publishedAt": "2026-11-19T03:10:33.000Z",
      "xQuery": "小便器「丸見え」女性記者が驚き"
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
