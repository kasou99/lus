window.LUS_X_NEWS = {
  "updatedAt": "2026-09-11T02:44:14.248Z",
  "items": [
    {
      "time": "11:22",
      "title": "入閣枠狭き門 焦る安倍チルドレン",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594932?source=rss",
      "publishedAt": "2026-09-11T02:22:10.000Z",
      "xQuery": "入閣枠狭き門 焦る安倍チルドレン"
    },
    {
      "time": "11:10",
      "title": "武田薬品元社長 長谷川閑史氏死去",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594930?source=rss",
      "publishedAt": "2026-09-11T02:10:31.000Z",
      "xQuery": "武田薬品元社長 長谷川閑史氏死去"
    },
    {
      "time": "10:20",
      "title": "ChatGPT 一部プラン新規受付停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594928?source=rss",
      "publishedAt": "2026-09-11T01:20:06.000Z",
      "xQuery": "ChatGPT 一部プラン新規受付停止"
    },
    {
      "time": "11:18",
      "title": "社長殺害 被告に拘禁刑25年を求刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594931?source=rss",
      "publishedAt": "2026-09-11T02:18:15.000Z",
      "xQuery": "社長殺害 被告に拘禁刑25年を求刑"
    },
    {
      "time": "11:22",
      "title": "都バスであおり運転疑い 書類送検",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594933?source=rss",
      "publishedAt": "2026-09-11T02:22:33.000Z",
      "xQuery": "都バスであおり運転疑い 書類送検"
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
