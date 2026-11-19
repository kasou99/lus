window.LUS_X_NEWS = {
  "updatedAt": "2026-11-19T14:11:57.750Z",
  "items": [
    {
      "time": "21:15",
      "title": "ロヒンギャ迫害 ジェノサイド認定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603205?source=rss",
      "publishedAt": "2026-11-19T12:15:23.000Z",
      "xQuery": "ロヒンギャ迫害 ジェノサイド認定"
    },
    {
      "time": "23:00",
      "title": "高市首相 トランプ氏と電話会談",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603216?source=rss",
      "publishedAt": "2026-11-19T14:00:34.000Z",
      "xQuery": "高市首相 トランプ氏と電話会談"
    },
    {
      "time": "22:03",
      "title": "高市首相を「冷遇」? 中国が反論",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603208?source=rss",
      "publishedAt": "2026-11-19T13:03:28.000Z",
      "xQuery": "高市首相を「冷遇」? 中国が反論"
    },
    {
      "time": "21:06",
      "title": "楽天証券に報告徴求命令 金融庁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603203?source=rss",
      "publishedAt": "2026-11-19T12:06:41.000Z",
      "xQuery": "楽天証券に報告徴求命令 金融庁"
    },
    {
      "time": "22:47",
      "title": "千葉3人切りつけ事件 男を再逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603214?source=rss",
      "publishedAt": "2026-11-19T13:47:35.000Z",
      "xQuery": "千葉3人切りつけ事件 男を再逮捕"
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
