window.LUS_X_NEWS = {
  "updatedAt": "2026-10-21T12:51:20.660Z",
  "items": [
    {
      "time": "21:10",
      "title": "秋田・子吉川に特別警報 最新情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599621?source=rss",
      "publishedAt": "2026-10-21T12:10:24.000Z",
      "xQuery": "秋田・子吉川に特別警報 最新情報"
    },
    {
      "time": "21:30",
      "title": "避難＝避難所ではない 垂直避難を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599620?source=rss",
      "publishedAt": "2026-10-21T12:30:07.000Z",
      "xQuery": "避難＝避難所ではない 垂直避難を"
    },
    {
      "time": "21:09",
      "title": "秋田の子吉川・石沢川で氾濫発生",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599623?source=rss",
      "publishedAt": "2026-10-21T12:09:44.000Z",
      "xQuery": "秋田の子吉川・石沢川で氾濫発生"
    },
    {
      "time": "21:44",
      "title": "氾濫巡り気象庁 直ちに安全確保を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599626?source=rss",
      "publishedAt": "2026-10-21T12:44:06.000Z",
      "xQuery": "氾濫巡り気象庁 直ちに安全確保を"
    },
    {
      "time": "20:30",
      "title": "秋田県 夜遅くにかけ激しい雨恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599616?source=rss",
      "publishedAt": "2026-10-21T11:30:57.000Z",
      "xQuery": "秋田県 夜遅くにかけ激しい雨恐れ"
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
