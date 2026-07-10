window.LUS_X_NEWS = {
  "updatedAt": "2026-07-10T06:22:50.713Z",
  "items": [
    {
      "time": "13:49",
      "title": "皇室典範改正案 衆院本会議を通過",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587421?source=rss",
      "publishedAt": "2026-07-10T04:49:54.000Z",
      "xQuery": "皇室典範改正案 衆院本会議を通過"
    },
    {
      "time": "13:37",
      "title": "全東信破産 店側の資金繰り支援へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587419?source=rss",
      "publishedAt": "2026-07-10T04:37:50.000Z",
      "xQuery": "全東信破産 店側の資金繰り支援へ"
    },
    {
      "time": "14:58",
      "title": "覚書は終わり トランプ氏激怒の訳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587426?source=rss",
      "publishedAt": "2026-07-10T05:58:51.000Z",
      "xQuery": "覚書は終わり トランプ氏激怒の訳"
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
      "time": "15:19",
      "title": "駐機中の飛行機内から煙 新千歳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587428?source=rss",
      "publishedAt": "2026-07-10T06:19:11.000Z",
      "xQuery": "駐機中の飛行機内から煙 新千歳"
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
