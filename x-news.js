window.LUS_X_NEWS = {
  "updatedAt": "2026-07-20T06:06:07.463Z",
  "items": [
    {
      "time": "10:54",
      "title": "日米合意1年 関税の負担依然重く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588606?source=rss",
      "publishedAt": "2026-07-20T01:54:28.000Z",
      "xQuery": "日米合意1年 関税の負担依然重く"
    },
    {
      "time": "13:42",
      "title": "猟銃許可の身辺調査見直し 警察庁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588623?source=rss",
      "publishedAt": "2026-07-20T04:42:14.000Z",
      "xQuery": "猟銃許可の身辺調査見直し 警察庁"
    },
    {
      "time": "14:57",
      "title": "姫路の殺人事件 新たに男2人逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588630?source=rss",
      "publishedAt": "2026-07-20T05:57:34.000Z",
      "xQuery": "姫路の殺人事件 新たに男2人逮捕"
    },
    {
      "time": "14:20",
      "title": "山陽道に釘など散乱 約10台パンク",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588626?source=rss",
      "publishedAt": "2026-07-20T05:20:21.000Z",
      "xQuery": "山陽道に釘など散乱 約10台パンク"
    },
    {
      "time": "12:30",
      "title": "運営もう無理 酷暑で海水浴離れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588617?source=rss",
      "publishedAt": "2026-07-20T03:30:38.000Z",
      "xQuery": "運営もう無理 酷暑で海水浴離れ"
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
