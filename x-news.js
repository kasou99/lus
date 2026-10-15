window.LUS_X_NEWS = {
  "updatedAt": "2026-10-15T04:43:04.231Z",
  "items": [
    {
      "time": "12:10",
      "title": "重責こなしたい 農相起用の武部氏",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598849?source=rss",
      "publishedAt": "2026-10-15T03:10:52.000Z",
      "xQuery": "重責こなしたい 農相起用の武部氏"
    },
    {
      "time": "13:30",
      "title": "日経平均 一時3600円以上値下がり",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598860?source=rss",
      "publishedAt": "2026-10-15T04:30:12.000Z",
      "xQuery": "日経平均 一時3600円以上値下がり"
    },
    {
      "time": "11:26",
      "title": "運動会で孫の写真投稿 炎上相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598835?source=rss",
      "publishedAt": "2026-10-15T02:26:29.000Z",
      "xQuery": "運動会で孫の写真投稿 炎上相次ぐ"
    },
    {
      "time": "13:06",
      "title": "ソウルで最後の売春街 解体に本腰",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598858?source=rss",
      "publishedAt": "2026-10-15T04:06:17.000Z",
      "xQuery": "ソウルで最後の売春街 解体に本腰"
    },
    {
      "time": "12:49",
      "title": "「あけろ」文京区の督促状が物議",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598857?source=rss",
      "publishedAt": "2026-10-15T03:49:54.000Z",
      "xQuery": "「あけろ」文京区の督促状が物議"
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
