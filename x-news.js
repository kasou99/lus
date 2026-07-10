window.LUS_X_NEWS = {
  "updatedAt": "2026-07-10T04:49:27.592Z",
  "items": [
    {
      "time": "13:38",
      "title": "改正個人情報保護法が成立 今後は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587420?source=rss",
      "publishedAt": "2026-07-10T04:38:32.000Z",
      "xQuery": "改正個人情報保護法が成立 今後は"
    },
    {
      "time": "12:36",
      "title": "成田新滑走路巡り土地収用申請へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587412?source=rss",
      "publishedAt": "2026-07-10T03:36:40.000Z",
      "xQuery": "成田新滑走路巡り土地収用申請へ"
    },
    {
      "time": "11:17",
      "title": "皇室典範改正案の行方 識者に聞く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587388?source=rss",
      "publishedAt": "2026-07-10T02:17:38.000Z",
      "xQuery": "皇室典範改正案の行方 識者に聞く"
    },
    {
      "time": "11:50",
      "title": "北陸新幹線 延伸ルート来週決定へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587397?source=rss",
      "publishedAt": "2026-07-10T02:50:51.000Z",
      "xQuery": "北陸新幹線 延伸ルート来週決定へ"
    },
    {
      "time": "11:37",
      "title": "イラン トランプ氏の暗殺を計画か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587394?source=rss",
      "publishedAt": "2026-07-10T02:37:27.000Z",
      "xQuery": "イラン トランプ氏の暗殺を計画か"
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
