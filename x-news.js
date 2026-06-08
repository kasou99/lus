window.LUS_X_NEWS = {
  "updatedAt": "2026-06-08T08:01:20.403Z",
  "items": [
    {
      "time": "14:16",
      "title": "各地で津波観測 父島で20cm",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583427?source=rss",
      "publishedAt": "2026-06-08T05:16:17.000Z",
      "xQuery": "各地で津波観測 父島で20cm"
    },
    {
      "time": "16:59",
      "title": "津波注意報を全て解除 気象庁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583441?source=rss",
      "publishedAt": "2026-06-08T07:59:15.000Z",
      "xQuery": "津波注意報を全て解除 気象庁"
    },
    {
      "time": "16:01",
      "title": "H3ロケット6号機 打ち上げ延期",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583432?source=rss",
      "publishedAt": "2026-06-08T07:01:33.000Z",
      "xQuery": "H3ロケット6号機 打ち上げ延期"
    },
    {
      "time": "15:32",
      "title": "17歳殺害 法廷に響く父親の訴え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583430?source=rss",
      "publishedAt": "2026-06-08T06:32:57.000Z",
      "xQuery": "17歳殺害 法廷に響く父親の訴え"
    },
    {
      "time": "16:40",
      "title": "ポケカ購入 マイナカード導入へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583436?source=rss",
      "publishedAt": "2026-06-08T07:40:18.000Z",
      "xQuery": "ポケカ購入 マイナカード導入へ"
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
