window.LUS_X_NEWS = {
  "updatedAt": "2026-11-07T06:17:20.875Z",
  "items": [
    {
      "time": "13:34",
      "title": "露がJT資産管理 制裁緩和狙いか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601634?source=rss",
      "publishedAt": "2026-11-07T04:34:08.000Z",
      "xQuery": "露がJT資産管理 制裁緩和狙いか"
    },
    {
      "time": "12:40",
      "title": "英メーガン妃の父 訴追され出廷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601627?source=rss",
      "publishedAt": "2026-11-07T03:40:41.000Z",
      "xQuery": "英メーガン妃の父 訴追され出廷"
    },
    {
      "time": "14:02",
      "title": "32年ぶりに「台風32号」発生",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601638?source=rss",
      "publishedAt": "2026-11-07T05:02:46.000Z",
      "xQuery": "32年ぶりに「台風32号」発生"
    },
    {
      "time": "14:39",
      "title": "置き配トラブル責任 国指針公表へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601645?source=rss",
      "publishedAt": "2026-11-07T05:39:50.000Z",
      "xQuery": "置き配トラブル責任 国指針公表へ"
    },
    {
      "time": "14:07",
      "title": "マンション建築現場で転落 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601640?source=rss",
      "publishedAt": "2026-11-07T05:07:53.000Z",
      "xQuery": "マンション建築現場で転落 死亡"
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
