window.LUS_X_NEWS = {
  "updatedAt": "2026-06-04T11:33:36.722Z",
  "items": [
    {
      "time": "19:03",
      "title": "今年度補正予算案が衆院通過",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582950?source=rss",
      "publishedAt": "2026-06-04T10:03:57.000Z",
      "xQuery": "今年度補正予算案が衆院通過"
    },
    {
      "time": "20:18",
      "title": "熱中症疑い 都内で70代男性が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582957?source=rss",
      "publishedAt": "2026-06-04T11:18:05.000Z",
      "xQuery": "熱中症疑い 都内で70代男性が死亡"
    },
    {
      "time": "18:56",
      "title": "足立の花火で入場規制を無視 波紋",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582947?source=rss",
      "publishedAt": "2026-06-04T09:56:08.000Z",
      "xQuery": "足立の花火で入場規制を無視 波紋"
    },
    {
      "time": "20:05",
      "title": "脱毛大手ミュゼ 破産の舞台裏激白",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582956?source=rss",
      "publishedAt": "2026-06-04T11:05:05.000Z",
      "xQuery": "脱毛大手ミュゼ 破産の舞台裏激白"
    },
    {
      "time": "20:26",
      "title": "プレモルと黒ラベル 値下げへ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582958?source=rss",
      "publishedAt": "2026-06-04T11:26:07.000Z",
      "xQuery": "プレモルと黒ラベル 値下げへ"
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
