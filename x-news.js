window.LUS_X_NEWS = {
  "updatedAt": "2026-09-20T23:37:38.258Z",
  "items": [
    {
      "time": "07:07",
      "title": "台風21日午後に関東最接近 警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595971?source=rss",
      "publishedAt": "2026-09-20T22:07:13.000Z",
      "xQuery": "台風21日午後に関東最接近 警戒を"
    },
    {
      "time": "07:35",
      "title": "首相が国連初演説へ ICC言及焦点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595975?source=rss",
      "publishedAt": "2026-09-20T22:35:28.000Z",
      "xQuery": "首相が国連初演説へ ICC言及焦点"
    },
    {
      "time": "08:01",
      "title": "子どもを追い込む指導 悩む教員",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595977?source=rss",
      "publishedAt": "2026-09-20T23:01:55.000Z",
      "xQuery": "子どもを追い込む指導 悩む教員"
    },
    {
      "time": "08:05",
      "title": "渋谷で若者離れ? 人流データ分析",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595978?source=rss",
      "publishedAt": "2026-09-20T23:05:01.000Z",
      "xQuery": "渋谷で若者離れ? 人流データ分析"
    },
    {
      "time": "23:02",
      "title": "眼鏡を拾おうと川に入る 16歳死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595969?source=rss",
      "publishedAt": "2026-09-20T14:02:06.000Z",
      "xQuery": "眼鏡を拾おうと川に入る 16歳死亡"
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
