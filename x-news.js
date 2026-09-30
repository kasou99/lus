window.LUS_X_NEWS = {
  "updatedAt": "2026-09-30T01:36:19.379Z",
  "items": [
    {
      "time": "08:25",
      "title": "中国念頭 鉄鋼う回輸出監視強化へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597017?source=rss",
      "publishedAt": "2026-09-29T23:25:22.000Z",
      "xQuery": "中国念頭 鉄鋼う回輸出監視強化へ"
    },
    {
      "time": "09:41",
      "title": "習近平政権 岩屋前外相を厚遇",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597025?source=rss",
      "publishedAt": "2026-09-30T00:41:55.000Z",
      "xQuery": "習近平政権 岩屋前外相を厚遇"
    },
    {
      "time": "08:54",
      "title": "北朝鮮 地雷爆発は韓国の自作自演",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597020?source=rss",
      "publishedAt": "2026-09-29T23:54:35.000Z",
      "xQuery": "北朝鮮 地雷爆発は韓国の自作自演"
    },
    {
      "time": "08:38",
      "title": "早朝の高速バス乗り場に行列 千葉",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597019?source=rss",
      "publishedAt": "2026-09-29T23:38:14.000Z",
      "xQuery": "早朝の高速バス乗り場に行列 千葉"
    },
    {
      "time": "07:26",
      "title": "熱中症で娘倒れ寝たきり 父の訴え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597007?source=rss",
      "publishedAt": "2026-09-29T22:26:59.000Z",
      "xQuery": "熱中症で娘倒れ寝たきり 父の訴え"
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
