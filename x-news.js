window.LUS_X_NEWS = {
  "updatedAt": "2026-06-29T05:45:11.587Z",
  "items": [
    {
      "time": "14:23",
      "title": "沖縄地方が梅雨明け 熱中症に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586100?source=rss",
      "publishedAt": "2026-06-29T05:23:24.000Z",
      "xQuery": "沖縄地方が梅雨明け 熱中症に注意"
    },
    {
      "time": "13:50",
      "title": "がん拠点病院9割 薬物治療医不足",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586098?source=rss",
      "publishedAt": "2026-06-29T04:50:30.000Z",
      "xQuery": "がん拠点病院9割 薬物治療医不足"
    },
    {
      "time": "13:52",
      "title": "地中から遺体 共犯関係の口封じか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586097?source=rss",
      "publishedAt": "2026-06-29T04:52:14.000Z",
      "xQuery": "地中から遺体 共犯関係の口封じか"
    },
    {
      "time": "12:11",
      "title": "飲酒の軽トラが自転車はねる 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586085?source=rss",
      "publishedAt": "2026-06-29T03:11:00.000Z",
      "xQuery": "飲酒の軽トラが自転車はねる 死亡"
    },
    {
      "time": "08:30",
      "title": "悪質ホスト 売春導く構図変わらず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586062?source=rss",
      "publishedAt": "2026-06-28T23:30:54.000Z",
      "xQuery": "悪質ホスト 売春導く構図変わらず"
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
