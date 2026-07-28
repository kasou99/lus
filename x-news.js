window.LUS_X_NEWS = {
  "updatedAt": "2026-07-28T10:22:34.292Z",
  "items": [
    {
      "time": "19:09",
      "title": "イオンモール熊本爆発 閉じ込めか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589674?source=rss",
      "publishedAt": "2026-07-28T10:09:48.000Z",
      "xQuery": "イオンモール熊本爆発 閉じ込めか"
    },
    {
      "time": "18:11",
      "title": "1週間程度は震度7程度の地震注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589662?source=rss",
      "publishedAt": "2026-07-28T09:11:31.000Z",
      "xQuery": "1週間程度は震度7程度の地震注意"
    },
    {
      "time": "19:20",
      "title": "熊本氷川町の病院 50人以上けが",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589675?source=rss",
      "publishedAt": "2026-07-28T10:20:31.000Z",
      "xQuery": "熊本氷川町の病院 50人以上けが"
    },
    {
      "time": "16:54",
      "title": "熊本県で震度7 現地のSNS投稿",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589640?source=rss",
      "publishedAt": "2026-07-28T07:54:10.000Z",
      "xQuery": "熊本県で震度7 現地のSNS投稿"
    },
    {
      "time": "18:08",
      "title": "熊本県で震度7 最新情報まとめ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589656?source=rss",
      "publishedAt": "2026-07-28T09:08:59.000Z",
      "xQuery": "熊本県で震度7 最新情報まとめ"
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
