window.LUS_X_NEWS = {
  "updatedAt": "2026-11-26T14:36:15.728Z",
  "items": [
    {
      "time": "20:37",
      "title": "中国 アメリカの新関税案に反発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604107?source=rss",
      "publishedAt": "2026-11-26T11:37:31.000Z",
      "xQuery": "中国 アメリカの新関税案に反発"
    },
    {
      "time": "20:53",
      "title": "笹川環境相側 国契約企業から寄付",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604111?source=rss",
      "publishedAt": "2026-11-26T11:53:29.000Z",
      "xQuery": "笹川環境相側 国契約企業から寄付"
    },
    {
      "time": "23:22",
      "title": "北朝鮮が露軍事支援停止か ウ発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604122?source=rss",
      "publishedAt": "2026-11-26T14:22:48.000Z",
      "xQuery": "北朝鮮が露軍事支援停止か ウ発表"
    },
    {
      "time": "22:19",
      "title": "福井の山中に遺体 殺人疑い再逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604117?source=rss",
      "publishedAt": "2026-11-26T13:19:10.000Z",
      "xQuery": "福井の山中に遺体 殺人疑い再逮捕"
    },
    {
      "time": "21:14",
      "title": "汚水が混入か 飲食店ビルで食中毒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604114?source=rss",
      "publishedAt": "2026-11-26T12:14:49.000Z",
      "xQuery": "汚水が混入か 飲食店ビルで食中毒"
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
