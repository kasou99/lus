window.LUS_X_NEWS = {
  "updatedAt": "2026-07-10T10:33:57.133Z",
  "items": [
    {
      "time": "18:02",
      "title": "地方税収50兆円超え 給与所得増で",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587446?source=rss",
      "publishedAt": "2026-07-10T09:02:27.000Z",
      "xQuery": "地方税収50兆円超え 給与所得増で"
    },
    {
      "time": "17:42",
      "title": "台風 沖縄・先島諸島に11日最接近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587442?source=rss",
      "publishedAt": "2026-07-10T08:42:42.000Z",
      "xQuery": "台風 沖縄・先島諸島に11日最接近"
    },
    {
      "time": "17:33",
      "title": "死亡ひき逃げ事件 配送業の男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587443?source=rss",
      "publishedAt": "2026-07-10T08:33:16.000Z",
      "xQuery": "死亡ひき逃げ事件 配送業の男逮捕"
    },
    {
      "time": "18:26",
      "title": "イトーヨーカドー運営 なぜ急回復",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587448?source=rss",
      "publishedAt": "2026-07-10T09:26:51.000Z",
      "xQuery": "イトーヨーカドー運営 なぜ急回復"
    },
    {
      "time": "18:40",
      "title": "サンマ1匹21万6000円 客は驚き",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587455?source=rss",
      "publishedAt": "2026-07-10T09:40:38.000Z",
      "xQuery": "サンマ1匹21万6000円 客は驚き"
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
