window.LUS_X_NEWS = {
  "updatedAt": "2026-08-12T13:34:12.310Z",
  "items": [
    {
      "time": "21:19",
      "title": "地震で観光業約60億円被害 熊本県",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591493?source=rss",
      "publishedAt": "2026-08-12T12:19:30.000Z",
      "xQuery": "地震で観光業約60億円被害 熊本県"
    },
    {
      "time": "21:11",
      "title": "首相 15日の靖国参拝を見送る方向",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591492?source=rss",
      "publishedAt": "2026-08-12T12:11:42.000Z",
      "xQuery": "首相 15日の靖国参拝を見送る方向"
    },
    {
      "time": "22:18",
      "title": "露大統領 北方領土は「ロシア領」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591499?source=rss",
      "publishedAt": "2026-08-12T13:18:33.000Z",
      "xQuery": "露大統領 北方領土は「ロシア領」"
    },
    {
      "time": "22:04",
      "title": "日航機墜落 遺体安置された体育館",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591497?source=rss",
      "publishedAt": "2026-08-12T13:04:23.000Z",
      "xQuery": "日航機墜落 遺体安置された体育館"
    },
    {
      "time": "20:37",
      "title": "イオン爆発 ハビタが「補償模索」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591485?source=rss",
      "publishedAt": "2026-08-12T11:37:21.000Z",
      "xQuery": "イオン爆発 ハビタが「補償模索」"
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
