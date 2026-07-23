window.LUS_X_NEWS = {
  "updatedAt": "2026-07-23T01:40:38.595Z",
  "items": [
    {
      "time": "09:34",
      "title": "厳暑続く 東海中心に40℃超の予想",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588982?source=rss",
      "publishedAt": "2026-07-23T00:34:10.000Z",
      "xQuery": "厳暑続く 東海中心に40℃超の予想"
    },
    {
      "time": "09:47",
      "title": "Google親会社4-6月期 純利益4倍",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588983?source=rss",
      "publishedAt": "2026-07-23T00:47:10.000Z",
      "xQuery": "Google親会社4-6月期 純利益4倍"
    },
    {
      "time": "10:14",
      "title": "日本で露スパイ活動 報道直後出国",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588985?source=rss",
      "publishedAt": "2026-07-23T01:14:19.000Z",
      "xQuery": "日本で露スパイ活動 報道直後出国"
    },
    {
      "time": "07:33",
      "title": "セブン 従業員らの不正転売横行か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588970?source=rss",
      "publishedAt": "2026-07-22T22:33:44.000Z",
      "xQuery": "セブン 従業員らの不正転売横行か"
    },
    {
      "time": "08:28",
      "title": "対向車多いのに右折信号なし 背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588975?source=rss",
      "publishedAt": "2026-07-22T23:28:02.000Z",
      "xQuery": "対向車多いのに右折信号なし 背景"
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
