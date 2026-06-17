window.LUS_X_NEWS = {
  "updatedAt": "2026-06-17T03:51:43.917Z",
  "items": [
    {
      "time": "12:00",
      "title": "16日地震の関東 土砂災害に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584568?source=rss",
      "publishedAt": "2026-06-17T03:00:55.000Z",
      "xQuery": "16日地震の関東 土砂災害に注意"
    },
    {
      "time": "11:30",
      "title": "カルテル疑い 価格相談許されぬ訳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584557?source=rss",
      "publishedAt": "2026-06-17T02:30:05.000Z",
      "xQuery": "カルテル疑い 価格相談許されぬ訳"
    },
    {
      "time": "12:47",
      "title": "知床沈没事故 桂田被告が即日控訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584576?source=rss",
      "publishedAt": "2026-06-17T03:47:14.000Z",
      "xQuery": "知床沈没事故 桂田被告が即日控訴"
    },
    {
      "time": "11:56",
      "title": "露大統領風刺のアーティスト 射殺",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584566?source=rss",
      "publishedAt": "2026-06-17T02:56:52.000Z",
      "xQuery": "露大統領風刺のアーティスト 射殺"
    },
    {
      "time": "10:31",
      "title": "円谷プロで退職者が続出 社員証言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584550?source=rss",
      "publishedAt": "2026-06-17T01:31:37.000Z",
      "xQuery": "円谷プロで退職者が続出 社員証言"
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
