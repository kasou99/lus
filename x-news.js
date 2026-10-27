window.LUS_X_NEWS = {
  "updatedAt": "2026-10-27T12:27:10.080Z",
  "items": [
    {
      "time": "18:28",
      "title": "北日本 今季一番強い寒気襲来へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600325?source=rss",
      "publishedAt": "2026-10-27T09:28:41.000Z",
      "xQuery": "北日本 今季一番強い寒気襲来へ"
    },
    {
      "time": "20:30",
      "title": "習近平氏 福田康夫氏の遺族に弔電",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600336?source=rss",
      "publishedAt": "2026-10-27T11:30:45.000Z",
      "xQuery": "習近平氏 福田康夫氏の遺族に弔電"
    },
    {
      "time": "19:41",
      "title": "キーウの「京都公園」にミサイル",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600333?source=rss",
      "publishedAt": "2026-10-27T10:41:37.000Z",
      "xQuery": "キーウの「京都公園」にミサイル"
    },
    {
      "time": "20:39",
      "title": "GMO 情報提供者に総額1.5億円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600337?source=rss",
      "publishedAt": "2026-10-27T11:39:38.000Z",
      "xQuery": "GMO 情報提供者に総額1.5億円"
    },
    {
      "time": "19:18",
      "title": "バス運転手19人インフル感染 減便",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600332?source=rss",
      "publishedAt": "2026-10-27T10:18:41.000Z",
      "xQuery": "バス運転手19人インフル感染 減便"
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
