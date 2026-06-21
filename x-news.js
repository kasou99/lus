window.LUS_X_NEWS = {
  "updatedAt": "2026-06-21T23:35:54.560Z",
  "items": [
    {
      "time": "08:25",
      "title": "米との協議 イラン代表団が退席",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585155?source=rss",
      "publishedAt": "2026-06-21T23:25:01.000Z",
      "xQuery": "米との協議 イラン代表団が退席"
    },
    {
      "time": "07:37",
      "title": "台風7号非常に強い勢力へ 進路は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585150?source=rss",
      "publishedAt": "2026-06-21T22:37:09.000Z",
      "xQuery": "台風7号非常に強い勢力へ 進路は"
    },
    {
      "time": "07:54",
      "title": "小笠原の外来種侵入調査へ 環境省",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585152?source=rss",
      "publishedAt": "2026-06-21T22:54:34.000Z",
      "xQuery": "小笠原の外来種侵入調査へ 環境省"
    },
    {
      "time": "07:34",
      "title": "旭川17歳殺害 内田被告きょう判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585149?source=rss",
      "publishedAt": "2026-06-21T22:34:16.000Z",
      "xQuery": "旭川17歳殺害 内田被告きょう判決"
    },
    {
      "time": "08:31",
      "title": "温泉入浴中5歳不明 川中心に捜索",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585156?source=rss",
      "publishedAt": "2026-06-21T23:31:34.000Z",
      "xQuery": "温泉入浴中5歳不明 川中心に捜索"
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
