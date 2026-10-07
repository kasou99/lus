window.LUS_X_NEWS = {
  "updatedAt": "2026-10-07T03:48:49.747Z",
  "items": [
    {
      "time": "12:00",
      "title": "簗農相 会見で辞任を改めて否定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597854?source=rss",
      "publishedAt": "2026-10-07T03:00:42.000Z",
      "xQuery": "簗農相 会見で辞任を改めて否定"
    },
    {
      "time": "11:11",
      "title": "政府 第2次補正予算編成を検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597844?source=rss",
      "publishedAt": "2026-10-07T02:11:56.000Z",
      "xQuery": "政府 第2次補正予算編成を検討"
    },
    {
      "time": "10:45",
      "title": "ビール大手4社カルテル疑い 調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597843?source=rss",
      "publishedAt": "2026-10-07T01:45:44.000Z",
      "xQuery": "ビール大手4社カルテル疑い 調査"
    },
    {
      "time": "11:34",
      "title": "転落巻き添え死は「殺人」父訴え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597845?source=rss",
      "publishedAt": "2026-10-07T02:34:35.000Z",
      "xQuery": "転落巻き添え死は「殺人」父訴え"
    },
    {
      "time": "12:10",
      "title": "PIECE OF BAKE運営破産申立てへ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597853?source=rss",
      "publishedAt": "2026-10-07T03:10:22.000Z",
      "xQuery": "PIECE OF BAKE運営破産申立てへ"
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
