window.LUS_X_NEWS = {
  "updatedAt": "2026-08-30T08:21:07.721Z",
  "items": [
    {
      "time": "14:52",
      "title": "福井県 住宅浸水など被害相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593623?source=rss",
      "publishedAt": "2026-08-30T05:52:46.000Z",
      "xQuery": "福井県 住宅浸水など被害相次ぐ"
    },
    {
      "time": "16:23",
      "title": "小売り事業の税優遇要望へ 経産省",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593631?source=rss",
      "publishedAt": "2026-08-30T07:23:16.000Z",
      "xQuery": "小売り事業の税優遇要望へ 経産省"
    },
    {
      "time": "16:30",
      "title": "「議連補助金」予算化 福岡県だけ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593633?source=rss",
      "publishedAt": "2026-08-30T07:30:20.000Z",
      "xQuery": "「議連補助金」予算化 福岡県だけ"
    },
    {
      "time": "17:09",
      "title": "「ヤミ民泊一掃」Airbnbの勝算",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593637?source=rss",
      "publishedAt": "2026-08-30T08:09:11.000Z",
      "xQuery": "「ヤミ民泊一掃」Airbnbの勝算"
    },
    {
      "time": "17:06",
      "title": "レゴランド 客の11人一時閉じ込め",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593640?source=rss",
      "publishedAt": "2026-08-30T08:06:36.000Z",
      "xQuery": "レゴランド 客の11人一時閉じ込め"
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
