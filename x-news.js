window.LUS_X_NEWS = {
  "updatedAt": "2026-09-28T04:24:05.677Z",
  "items": [
    {
      "time": "11:43",
      "title": "東海-関東沿岸部は激しい雨 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596822?source=rss",
      "publishedAt": "2026-09-28T02:43:51.000Z",
      "xQuery": "東海-関東沿岸部は激しい雨 警戒"
    },
    {
      "time": "10:21",
      "title": "群馬殺害 男が事前に包丁準備か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596809?source=rss",
      "publishedAt": "2026-09-28T01:21:04.000Z",
      "xQuery": "群馬殺害 男が事前に包丁準備か"
    },
    {
      "time": "11:31",
      "title": "台風で最愛の妻死亡 結婚して2年",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596820?source=rss",
      "publishedAt": "2026-09-28T02:31:05.000Z",
      "xQuery": "台風で最愛の妻死亡 結婚して2年"
    },
    {
      "time": "12:33",
      "title": "千葉の川に遺体 台風で不明男性か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596828?source=rss",
      "publishedAt": "2026-09-28T03:33:52.000Z",
      "xQuery": "千葉の川に遺体 台風で不明男性か"
    },
    {
      "time": "12:11",
      "title": "パパ活面接称し性的暴行疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596824?source=rss",
      "publishedAt": "2026-09-28T03:11:57.000Z",
      "xQuery": "パパ活面接称し性的暴行疑い 逮捕"
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
