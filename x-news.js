window.LUS_X_NEWS = {
  "updatedAt": "2026-10-16T05:42:01.831Z",
  "items": [
    {
      "time": "14:36",
      "title": "気象庁 サイバー攻撃の可能性ない",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598988?source=rss",
      "publishedAt": "2026-10-16T05:36:29.000Z",
      "xQuery": "気象庁 サイバー攻撃の可能性ない"
    },
    {
      "time": "13:45",
      "title": "気象庁 M6.9をM9.9と過大に予測",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598983?source=rss",
      "publishedAt": "2026-10-16T04:45:24.000Z",
      "xQuery": "気象庁 M6.9をM9.9と過大に予測"
    },
    {
      "time": "13:35",
      "title": "王将社長射殺事件 男に無罪判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598982?source=rss",
      "publishedAt": "2026-10-16T04:35:54.000Z",
      "xQuery": "王将社長射殺事件 男に無罪判決"
    },
    {
      "time": "14:01",
      "title": "テスラ新型車 空中旋回を実演",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598984?source=rss",
      "publishedAt": "2026-10-16T05:01:53.000Z",
      "xQuery": "テスラ新型車 空中旋回を実演"
    },
    {
      "time": "11:08",
      "title": "葉物野菜高騰 家計に優しい料理は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598961?source=rss",
      "publishedAt": "2026-10-16T02:08:10.000Z",
      "xQuery": "葉物野菜高騰 家計に優しい料理は"
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
