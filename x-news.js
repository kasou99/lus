window.LUS_X_NEWS = {
  "updatedAt": "2026-07-23T14:18:19.753Z",
  "items": [
    {
      "time": "19:26",
      "title": "EU グーグルに制裁金1660億円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589057?source=rss",
      "publishedAt": "2026-07-23T10:26:52.000Z",
      "xQuery": "EU グーグルに制裁金1660億円"
    },
    {
      "time": "20:43",
      "title": "皇室典範改正 麻生氏「ようやく」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589065?source=rss",
      "publishedAt": "2026-07-23T11:43:24.000Z",
      "xQuery": "皇室典範改正 麻生氏「ようやく」"
    },
    {
      "time": "21:38",
      "title": "山岳部の女子高校生 奥穂高で滑落",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589072?source=rss",
      "publishedAt": "2026-07-23T12:38:37.000Z",
      "xQuery": "山岳部の女子高校生 奥穂高で滑落"
    },
    {
      "time": "23:00",
      "title": "刃物を持った男に警官が発砲 映像",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589078?source=rss",
      "publishedAt": "2026-07-23T14:00:46.000Z",
      "xQuery": "刃物を持った男に警官が発砲 映像"
    },
    {
      "time": "20:21",
      "title": "動物園でペンギン全4羽相次ぎ死ぬ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589060?source=rss",
      "publishedAt": "2026-07-23T11:21:25.000Z",
      "xQuery": "動物園でペンギン全4羽相次ぎ死ぬ"
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
