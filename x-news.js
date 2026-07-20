window.LUS_X_NEWS = {
  "updatedAt": "2026-07-20T23:50:51.469Z",
  "items": [
    {
      "time": "07:35",
      "title": "米兵死亡 米大統領がイランに警告",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588700?source=rss",
      "publishedAt": "2026-07-20T22:35:03.000Z",
      "xQuery": "米兵死亡 米大統領がイランに警告"
    },
    {
      "time": "06:36",
      "title": "東海などで危険な暑さ 酷暑日予想",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588695?source=rss",
      "publishedAt": "2026-07-20T21:36:52.000Z",
      "xQuery": "東海などで危険な暑さ 酷暑日予想"
    },
    {
      "time": "07:15",
      "title": "公取委 来夏にも大幅組織改編",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588697?source=rss",
      "publishedAt": "2026-07-20T22:15:29.000Z",
      "xQuery": "公取委 来夏にも大幅組織改編"
    },
    {
      "time": "08:39",
      "title": "保育中うつぶせ寝で死亡 母の無念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588705?source=rss",
      "publishedAt": "2026-07-20T23:39:09.000Z",
      "xQuery": "保育中うつぶせ寝で死亡 母の無念"
    },
    {
      "time": "08:38",
      "title": "学校のぎょう虫検査 姿消した訳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588703?source=rss",
      "publishedAt": "2026-07-20T23:38:03.000Z",
      "xQuery": "学校のぎょう虫検査 姿消した訳"
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
