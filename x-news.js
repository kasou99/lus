window.LUS_X_NEWS = {
  "updatedAt": "2026-08-09T05:24:51.506Z",
  "items": [
    {
      "time": "12:24",
      "title": "首相あいさつ 非核三原則「堅持」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591075?source=rss",
      "publishedAt": "2026-08-09T03:24:05.000Z",
      "xQuery": "首相あいさつ 非核三原則「堅持」"
    },
    {
      "time": "11:18",
      "title": "所得連動給付 政府が法整備検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591067?source=rss",
      "publishedAt": "2026-08-09T02:18:16.000Z",
      "xQuery": "所得連動給付 政府が法整備検討"
    },
    {
      "time": "12:39",
      "title": "80歳母を踏み死亡させた疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591076?source=rss",
      "publishedAt": "2026-08-09T03:39:42.000Z",
      "xQuery": "80歳母を踏み死亡させた疑い 逮捕"
    },
    {
      "time": "13:31",
      "title": "槍ヶ岳に遺体 付近では19歳が不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591079?source=rss",
      "publishedAt": "2026-08-09T04:31:04.000Z",
      "xQuery": "槍ヶ岳に遺体 付近では19歳が不明"
    },
    {
      "time": "10:46",
      "title": "阿波おどりで不適切な動画 憤り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591066?source=rss",
      "publishedAt": "2026-08-09T01:46:46.000Z",
      "xQuery": "阿波おどりで不適切な動画 憤り"
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
