window.LUS_X_NEWS = {
  "updatedAt": "2026-08-31T22:16:13.153Z",
  "items": [
    {
      "time": "06:52",
      "title": "米露財務相が会談 ウ和平案協議か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593798?source=rss",
      "publishedAt": "2026-08-31T21:52:17.000Z",
      "xQuery": "米露財務相が会談 ウ和平案協議か"
    },
    {
      "time": "23:05",
      "title": "信組不祥事 金融庁が検査拡充へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593788?source=rss",
      "publishedAt": "2026-08-31T14:05:06.000Z",
      "xQuery": "信組不祥事 金融庁が検査拡充へ"
    },
    {
      "time": "06:39",
      "title": "三重の商店街火災 ほぼ全焼か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593797?source=rss",
      "publishedAt": "2026-08-31T21:39:28.000Z",
      "xQuery": "三重の商店街火災 ほぼ全焼か"
    },
    {
      "time": "21:54",
      "title": "住宅ローン変動金利 2行引き上げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593780?source=rss",
      "publishedAt": "2026-08-31T12:54:07.000Z",
      "xQuery": "住宅ローン変動金利 2行引き上げ"
    },
    {
      "time": "23:46",
      "title": "和菓子店の店主死亡 トクリュウか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593793?source=rss",
      "publishedAt": "2026-08-31T14:46:29.000Z",
      "xQuery": "和菓子店の店主死亡 トクリュウか"
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
