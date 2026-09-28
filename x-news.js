window.LUS_X_NEWS = {
  "updatedAt": "2026-09-28T11:41:32.282Z",
  "items": [
    {
      "time": "18:20",
      "title": "台風26号 1日に関東接近のおそれ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596872?source=rss",
      "publishedAt": "2026-09-28T09:20:55.000Z",
      "xQuery": "台風26号 1日に関東接近のおそれ"
    },
    {
      "time": "19:56",
      "title": "談合対象マンション名 なぜ公表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596878?source=rss",
      "publishedAt": "2026-09-28T10:56:02.000Z",
      "xQuery": "談合対象マンション名 なぜ公表"
    },
    {
      "time": "18:48",
      "title": "遺体は不明の6歳男児 両親が心境",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596875?source=rss",
      "publishedAt": "2026-09-28T09:48:25.000Z",
      "xQuery": "遺体は不明の6歳男児 両親が心境"
    },
    {
      "time": "19:26",
      "title": "ゴーカート2歳死亡事故 無罪主張",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596877?source=rss",
      "publishedAt": "2026-09-28T10:26:49.000Z",
      "xQuery": "ゴーカート2歳死亡事故 無罪主張"
    },
    {
      "time": "20:10",
      "title": "天皇陛下のスマホで撮影 写真公開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596879?source=rss",
      "publishedAt": "2026-09-28T11:10:35.000Z",
      "xQuery": "天皇陛下のスマホで撮影 写真公開"
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
