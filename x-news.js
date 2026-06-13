window.LUS_X_NEWS = {
  "updatedAt": "2026-06-13T10:54:43.819Z",
  "items": [
    {
      "time": "17:44",
      "title": "ウクライナ戦況好転 露の侵略停滞",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584101?source=rss",
      "publishedAt": "2026-06-13T08:44:40.000Z",
      "xQuery": "ウクライナ戦況好転 露の侵略停滞"
    },
    {
      "time": "18:59",
      "title": "物価高 難病患者にはさらに重く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584109?source=rss",
      "publishedAt": "2026-06-13T09:59:34.000Z",
      "xQuery": "物価高 難病患者にはさらに重く"
    },
    {
      "time": "17:01",
      "title": "LUUP運転の男性死亡 事故原因は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584094?source=rss",
      "publishedAt": "2026-06-13T08:01:25.000Z",
      "xQuery": "LUUP運転の男性死亡 事故原因は"
    },
    {
      "time": "19:30",
      "title": "手術で耳作った 疾患発信する女性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584113?source=rss",
      "publishedAt": "2026-06-13T10:30:25.000Z",
      "xQuery": "手術で耳作った 疾患発信する女性"
    },
    {
      "time": "13:04",
      "title": "「レアハンバーグ」炎上 店の現在",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584071?source=rss",
      "publishedAt": "2026-06-13T04:04:35.000Z",
      "xQuery": "「レアハンバーグ」炎上 店の現在"
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
