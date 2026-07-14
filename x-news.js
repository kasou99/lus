window.LUS_X_NEWS = {
  "updatedAt": "2026-07-14T11:34:21.457Z",
  "items": [
    {
      "time": "18:40",
      "title": "中道・立憲・公明 相違が浮き彫り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587930?source=rss",
      "publishedAt": "2026-07-14T09:40:30.000Z",
      "xQuery": "中道・立憲・公明 相違が浮き彫り"
    },
    {
      "time": "18:05",
      "title": "米イラン戦争の出口は 3つの想定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587917?source=rss",
      "publishedAt": "2026-07-14T09:05:51.000Z",
      "xQuery": "米イラン戦争の出口は 3つの想定"
    },
    {
      "time": "19:58",
      "title": "工場で実験中に爆発か 意識不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587940?source=rss",
      "publishedAt": "2026-07-14T10:58:21.000Z",
      "xQuery": "工場で実験中に爆発か 意識不明"
    },
    {
      "time": "19:33",
      "title": "福岡知事 県議「先生」呼びやめて",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587938?source=rss",
      "publishedAt": "2026-07-14T10:33:46.000Z",
      "xQuery": "福岡知事 県議「先生」呼びやめて"
    },
    {
      "time": "20:21",
      "title": "イケアジャパンに初の日本人社長",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587943?source=rss",
      "publishedAt": "2026-07-14T11:21:44.000Z",
      "xQuery": "イケアジャパンに初の日本人社長"
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
