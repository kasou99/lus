window.LUS_X_NEWS = {
  "updatedAt": "2026-08-03T06:07:28.488Z",
  "items": [
    {
      "time": "14:46",
      "title": "熊本市で酷暑日 最大級の警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590380?source=rss",
      "publishedAt": "2026-08-03T05:46:20.000Z",
      "xQuery": "熊本市で酷暑日 最大級の警戒を"
    },
    {
      "time": "12:59",
      "title": "コロナ感染も 避難所は雑魚寝状態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590369?source=rss",
      "publishedAt": "2026-08-03T03:59:53.000Z",
      "xQuery": "コロナ感染も 避難所は雑魚寝状態"
    },
    {
      "time": "14:41",
      "title": "羽田国内線 預け入れ締切を厳格化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590377?source=rss",
      "publishedAt": "2026-08-03T05:41:08.000Z",
      "xQuery": "羽田国内線 預け入れ締切を厳格化"
    },
    {
      "time": "14:29",
      "title": "イオン爆発 雑貨店幹部が指示謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590376?source=rss",
      "publishedAt": "2026-08-03T05:29:52.000Z",
      "xQuery": "イオン爆発 雑貨店幹部が指示謝罪"
    },
    {
      "time": "12:45",
      "title": "山林遺体「腹すいて盗みに」供述",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590367?source=rss",
      "publishedAt": "2026-08-03T03:45:20.000Z",
      "xQuery": "山林遺体「腹すいて盗みに」供述"
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
