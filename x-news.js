window.LUS_X_NEWS = {
  "updatedAt": "2026-07-11T04:35:51.664Z",
  "items": [
    {
      "time": "12:01",
      "title": "台風9号7人ケガ 2万2000戸が停電",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587531?source=rss",
      "publishedAt": "2026-07-11T03:01:41.000Z",
      "xQuery": "台風9号7人ケガ 2万2000戸が停電"
    },
    {
      "time": "12:20",
      "title": "原爆の惨状伝える「異形の遺骨」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587532?source=rss",
      "publishedAt": "2026-07-11T03:20:45.000Z",
      "xQuery": "原爆の惨状伝える「異形の遺骨」"
    },
    {
      "time": "12:39",
      "title": "首切断事件 現場ホテル厳しい現実",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587533?source=rss",
      "publishedAt": "2026-07-11T03:39:02.000Z",
      "xQuery": "首切断事件 現場ホテル厳しい現実"
    },
    {
      "time": "13:16",
      "title": "再使用ロケット実験機 着陸成功",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587541?source=rss",
      "publishedAt": "2026-07-11T04:16:34.000Z",
      "xQuery": "再使用ロケット実験機 着陸成功"
    },
    {
      "time": "11:47",
      "title": "ヘンリー王子一家 英国王と対面",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587528?source=rss",
      "publishedAt": "2026-07-11T02:47:54.000Z",
      "xQuery": "ヘンリー王子一家 英国王と対面"
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
