window.LUS_X_NEWS = {
  "updatedAt": "2026-07-28T15:19:08.910Z",
  "items": [
    {
      "time": "21:32",
      "title": "イオンモール熊本20-30人安否不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589695?source=rss",
      "publishedAt": "2026-07-28T12:32:21.000Z",
      "xQuery": "イオンモール熊本20-30人安否不明"
    },
    {
      "time": "21:08",
      "title": "熊本県で震度7 最新情報まとめ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589694?source=rss",
      "publishedAt": "2026-07-28T12:08:03.000Z",
      "xQuery": "熊本県で震度7 最新情報まとめ"
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
      "time": "22:31",
      "title": "九州の交通網やライフライン 影響",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589702?source=rss",
      "publishedAt": "2026-07-28T13:31:06.000Z",
      "xQuery": "九州の交通網やライフライン 影響"
    },
    {
      "time": "22:15",
      "title": "鉄道各社見合わせ 帰宅困難者続出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589699?source=rss",
      "publishedAt": "2026-07-28T13:15:21.000Z",
      "xQuery": "鉄道各社見合わせ 帰宅困難者続出"
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
