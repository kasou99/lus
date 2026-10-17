window.LUS_X_NEWS = {
  "updatedAt": "2026-10-17T11:14:05.949Z",
  "items": [
    {
      "time": "17:10",
      "title": "新給付制度巡り平均3万円案 政府",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599130?source=rss",
      "publishedAt": "2026-10-17T08:10:40.000Z",
      "xQuery": "新給付制度巡り平均3万円案 政府"
    },
    {
      "time": "17:07",
      "title": "誤報の地震速報 ぞっとした被災者",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599128?source=rss",
      "publishedAt": "2026-10-17T08:07:34.000Z",
      "xQuery": "誤報の地震速報 ぞっとした被災者"
    },
    {
      "time": "19:01",
      "title": "中国車 ノルウェー軍情報を記録",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599145?source=rss",
      "publishedAt": "2026-10-17T10:01:54.000Z",
      "xQuery": "中国車 ノルウェー軍情報を記録"
    },
    {
      "time": "18:42",
      "title": "ソニー生命 50人を営業活動停止に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599146?source=rss",
      "publishedAt": "2026-10-17T09:42:34.000Z",
      "xQuery": "ソニー生命 50人を営業活動停止に"
    },
    {
      "time": "20:07",
      "title": "海で溺れていた高齢男女 意識不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599157?source=rss",
      "publishedAt": "2026-10-17T11:07:51.000Z",
      "xQuery": "海で溺れていた高齢男女 意識不明"
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
