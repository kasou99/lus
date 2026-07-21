window.LUS_X_NEWS = {
  "updatedAt": "2026-07-21T01:40:28.077Z",
  "items": [
    {
      "time": "09:07",
      "title": "延長国会 副首都など4法案綱渡り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588708?source=rss",
      "publishedAt": "2026-07-21T00:07:54.000Z",
      "xQuery": "延長国会 副首都など4法案綱渡り"
    },
    {
      "time": "07:35",
      "title": "米兵死亡 米大統領がイランに警告",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588700?source=rss",
      "publishedAt": "2026-07-20T22:35:03.000Z",
      "xQuery": "米兵死亡 米大統領がイランに警告"
    },
    {
      "time": "10:08",
      "title": "米 カナダ製品の一部に50%関税へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588715?source=rss",
      "publishedAt": "2026-07-21T01:08:19.000Z",
      "xQuery": "米 カナダ製品の一部に50%関税へ"
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
