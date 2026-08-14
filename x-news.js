window.LUS_X_NEWS = {
  "updatedAt": "2026-08-14T08:33:26.209Z",
  "items": [
    {
      "time": "16:35",
      "title": "関東 局地的に非常に激しい雨恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591705?source=rss",
      "publishedAt": "2026-08-14T07:35:06.000Z",
      "xQuery": "関東 局地的に非常に激しい雨恐れ"
    },
    {
      "time": "15:46",
      "title": "千葉豪雨で8人死亡 約7400人避難",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591698?source=rss",
      "publishedAt": "2026-08-14T06:46:45.000Z",
      "xQuery": "千葉豪雨で8人死亡 約7400人避難"
    },
    {
      "time": "17:13",
      "title": "水没した車 住民が泳ぎ窓割り救助",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591710?source=rss",
      "publishedAt": "2026-08-14T08:13:22.000Z",
      "xQuery": "水没した車 住民が泳ぎ窓割り救助"
    },
    {
      "time": "16:10",
      "title": "阿蘇中岳 噴火警戒レベル3に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591699?source=rss",
      "publishedAt": "2026-08-14T07:10:00.000Z",
      "xQuery": "阿蘇中岳 噴火警戒レベル3に"
    },
    {
      "time": "11:55",
      "title": "北方領土巡る日本の抗議 露が反発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591673?source=rss",
      "publishedAt": "2026-08-14T02:55:49.000Z",
      "xQuery": "北方領土巡る日本の抗議 露が反発"
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
