window.LUS_X_NEWS = {
  "updatedAt": "2026-07-22T23:51:32.117Z",
  "items": [
    {
      "time": "06:33",
      "title": "災害級の暑さ 山梨などで酷暑日か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588965?source=rss",
      "publishedAt": "2026-07-22T21:33:34.000Z",
      "xQuery": "災害級の暑さ 山梨などで酷暑日か"
    },
    {
      "time": "07:18",
      "title": "オンカジ対策 強制遮断を排除せず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588969?source=rss",
      "publishedAt": "2026-07-22T22:18:40.000Z",
      "xQuery": "オンカジ対策 強制遮断を排除せず"
    },
    {
      "time": "07:15",
      "title": "25年中傷投稿特定申し立て1万件超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588968?source=rss",
      "publishedAt": "2026-07-22T22:15:24.000Z",
      "xQuery": "25年中傷投稿特定申し立て1万件超"
    },
    {
      "time": "08:28",
      "title": "対向車多いのに右折信号なし 背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588975?source=rss",
      "publishedAt": "2026-07-22T23:28:02.000Z",
      "xQuery": "対向車多いのに右折信号なし 背景"
    },
    {
      "time": "07:33",
      "title": "セブン 従業員らの不正転売横行か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588970?source=rss",
      "publishedAt": "2026-07-22T22:33:44.000Z",
      "xQuery": "セブン 従業員らの不正転売横行か"
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
