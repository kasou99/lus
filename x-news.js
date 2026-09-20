window.LUS_X_NEWS = {
  "updatedAt": "2026-09-20T13:15:03.221Z",
  "items": [
    {
      "time": "19:13",
      "title": "台風 21日午後が雨風のピーク",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595939?source=rss",
      "publishedAt": "2026-09-20T10:13:29.000Z",
      "xQuery": "台風 21日午後が雨風のピーク"
    },
    {
      "time": "20:35",
      "title": "小野寺五典氏 自民税調会長を続投",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595949?source=rss",
      "publishedAt": "2026-09-20T11:35:14.000Z",
      "xQuery": "小野寺五典氏 自民税調会長を続投"
    },
    {
      "time": "21:52",
      "title": "米大統領 なぜAIの名称変更を提案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595957?source=rss",
      "publishedAt": "2026-09-20T12:52:27.000Z",
      "xQuery": "米大統領 なぜAIの名称変更を提案"
    },
    {
      "time": "19:31",
      "title": "眼鏡を拾おうと川に入る 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595942?source=rss",
      "publishedAt": "2026-09-20T10:31:10.000Z",
      "xQuery": "眼鏡を拾おうと川に入る 男性死亡"
    },
    {
      "time": "22:05",
      "title": "妊娠中にがん発覚 母になり旅立つ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595961?source=rss",
      "publishedAt": "2026-09-20T13:05:26.000Z",
      "xQuery": "妊娠中にがん発覚 母になり旅立つ"
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
