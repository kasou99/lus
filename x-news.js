window.LUS_X_NEWS = {
  "updatedAt": "2026-10-16T09:42:37.561Z",
  "items": [
    {
      "time": "17:58",
      "title": "簗前農相 運動員への支払い指示か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599011?source=rss",
      "publishedAt": "2026-10-16T08:58:39.000Z",
      "xQuery": "簗前農相 運動員への支払い指示か"
    },
    {
      "time": "18:08",
      "title": "印旛沼の堤防 緊急復旧が完了",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599013?source=rss",
      "publishedAt": "2026-10-16T09:08:45.000Z",
      "xQuery": "印旛沼の堤防 緊急復旧が完了"
    },
    {
      "time": "17:20",
      "title": "緊急地震速報取り消し 各地混乱",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599005?source=rss",
      "publishedAt": "2026-10-16T08:20:17.000Z",
      "xQuery": "緊急地震速報取り消し 各地混乱"
    },
    {
      "time": "17:13",
      "title": "日経新聞 個人情報が183万件流出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599004?source=rss",
      "publishedAt": "2026-10-16T08:13:11.000Z",
      "xQuery": "日経新聞 個人情報が183万件流出"
    },
    {
      "time": "17:42",
      "title": "攻撃受け 県メアドから迷惑メール",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599003?source=rss",
      "publishedAt": "2026-10-16T08:42:36.000Z",
      "xQuery": "攻撃受け 県メアドから迷惑メール"
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
