window.LUS_X_NEWS = {
  "updatedAt": "2026-10-15T03:44:55.493Z",
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
      "time": "11:47",
      "title": "北朝鮮 14日に潜水艦巡航ミサイル",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598841?source=rss",
      "publishedAt": "2026-10-15T02:47:27.000Z",
      "xQuery": "北朝鮮 14日に潜水艦巡航ミサイル"
    },
    {
      "time": "11:21",
      "title": "4歳男児死亡 こども園に市が監査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598836?source=rss",
      "publishedAt": "2026-10-15T02:21:49.000Z",
      "xQuery": "4歳男児死亡 こども園に市が監査"
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
      "time": "11:53",
      "title": "サケの代わりに「マヒマヒ」大漁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598843?source=rss",
      "publishedAt": "2026-10-15T02:53:18.000Z",
      "xQuery": "サケの代わりに「マヒマヒ」大漁"
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
