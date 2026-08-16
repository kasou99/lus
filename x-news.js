window.LUS_X_NEWS = {
  "updatedAt": "2026-08-16T08:09:48.955Z",
  "items": [
    {
      "time": "16:24",
      "title": "防空壕で生まれた自民森山氏 思い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591954?source=rss",
      "publishedAt": "2026-08-16T07:24:48.000Z",
      "xQuery": "防空壕で生まれた自民森山氏 思い"
    },
    {
      "time": "16:59",
      "title": "地震で実家崩れ「助けて」父の声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591961?source=rss",
      "publishedAt": "2026-08-16T07:59:28.000Z",
      "xQuery": "地震で実家崩れ「助けて」父の声"
    },
    {
      "time": "14:38",
      "title": "ベルギーで過去最大規模の山火事",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591943?source=rss",
      "publishedAt": "2026-08-16T05:38:01.000Z",
      "xQuery": "ベルギーで過去最大規模の山火事"
    },
    {
      "time": "14:41",
      "title": "釣り竿取りに池泳ぎ溺れたか 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591945?source=rss",
      "publishedAt": "2026-08-16T05:41:56.000Z",
      "xQuery": "釣り竿取りに池泳ぎ溺れたか 死亡"
    },
    {
      "time": "15:46",
      "title": "高専「ネーミングライツ」広がる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591951?source=rss",
      "publishedAt": "2026-08-16T06:46:17.000Z",
      "xQuery": "高専「ネーミングライツ」広がる"
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
