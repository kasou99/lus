window.LUS_X_NEWS = {
  "updatedAt": "2026-09-18T02:44:54.923Z",
  "items": [
    {
      "time": "10:37",
      "title": "米中接近を懸念 試される高市外交",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595672?source=rss",
      "publishedAt": "2026-09-18T01:37:57.000Z",
      "xQuery": "米中接近を懸念 試される高市外交"
    },
    {
      "time": "08:22",
      "title": "英国王 AI企業幹部らに懸念示す",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595656?source=rss",
      "publishedAt": "2026-09-17T23:22:09.000Z",
      "xQuery": "英国王 AI企業幹部らに懸念示す"
    },
    {
      "time": "10:08",
      "title": "生活道路で死亡ひき逃げ疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595669?source=rss",
      "publishedAt": "2026-09-18T01:08:59.000Z",
      "xQuery": "生活道路で死亡ひき逃げ疑い 逮捕"
    },
    {
      "time": "11:25",
      "title": "中国 8月の若者失業率は最悪水準",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595675?source=rss",
      "publishedAt": "2026-09-18T02:25:32.000Z",
      "xQuery": "中国 8月の若者失業率は最悪水準"
    },
    {
      "time": "06:59",
      "title": "日産 新型スカイライン12月発表へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595646?source=rss",
      "publishedAt": "2026-09-17T21:59:43.000Z",
      "xQuery": "日産 新型スカイライン12月発表へ"
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
