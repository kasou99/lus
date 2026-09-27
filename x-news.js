window.LUS_X_NEWS = {
  "updatedAt": "2026-09-27T03:45:33.955Z",
  "items": [
    {
      "time": "10:09",
      "title": "福岡・熊本 線状降水帯発生の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596688?source=rss",
      "publishedAt": "2026-09-27T01:09:30.000Z",
      "xQuery": "福岡・熊本 線状降水帯発生の恐れ"
    },
    {
      "time": "10:20",
      "title": "「政治とカネ」再燃 自民に警戒感",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596689?source=rss",
      "publishedAt": "2026-09-27T01:20:24.000Z",
      "xQuery": "「政治とカネ」再燃 自民に警戒感"
    },
    {
      "time": "11:16",
      "title": "家計に影響も 10月からどう変わる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596694?source=rss",
      "publishedAt": "2026-09-27T02:16:26.000Z",
      "xQuery": "家計に影響も 10月からどう変わる"
    },
    {
      "time": "12:14",
      "title": "群馬殺害 手配の男名義の車を押収",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596699?source=rss",
      "publishedAt": "2026-09-27T03:14:13.000Z",
      "xQuery": "群馬殺害 手配の男名義の車を押収"
    },
    {
      "time": "10:54",
      "title": "混雑率177%も増発できず 3つの壁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596691?source=rss",
      "publishedAt": "2026-09-27T01:54:05.000Z",
      "xQuery": "混雑率177%も増発できず 3つの壁"
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
