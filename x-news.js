window.LUS_X_NEWS = {
  "updatedAt": "2026-08-04T01:40:27.369Z",
  "items": [
    {
      "time": "08:37",
      "title": "熊本の高齢者施設 職員の負担増加",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590455?source=rss",
      "publishedAt": "2026-08-03T23:37:29.000Z",
      "xQuery": "熊本の高齢者施設 職員の負担増加"
    },
    {
      "time": "08:41",
      "title": "台風が小笠原に最接近 厳重警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590457?source=rss",
      "publishedAt": "2026-08-03T23:41:14.000Z",
      "xQuery": "台風が小笠原に最接近 厳重警戒"
    },
    {
      "time": "09:48",
      "title": "ウ軍が露ビーチに攻撃 7人が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590463?source=rss",
      "publishedAt": "2026-08-04T00:48:55.000Z",
      "xQuery": "ウ軍が露ビーチに攻撃 7人が死亡"
    },
    {
      "time": "10:06",
      "title": "東名高速で3台絡む事故 1人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590464?source=rss",
      "publishedAt": "2026-08-04T01:06:30.000Z",
      "xQuery": "東名高速で3台絡む事故 1人死亡"
    },
    {
      "time": "08:05",
      "title": "花火大会で禁止行為相次ぎ 怒り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590453?source=rss",
      "publishedAt": "2026-08-03T23:05:47.000Z",
      "xQuery": "花火大会で禁止行為相次ぎ 怒り"
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
