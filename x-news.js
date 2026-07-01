window.LUS_X_NEWS = {
  "updatedAt": "2026-07-01T13:27:04.920Z",
  "items": [
    {
      "time": "21:16",
      "title": "青森・岩手で震度4 津波心配なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586387?source=rss",
      "publishedAt": "2026-07-01T12:16:56.000Z",
      "xQuery": "青森・岩手で震度4 津波心配なし"
    },
    {
      "time": "16:38",
      "title": "パスポート申請余裕持って 木原氏",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586357?source=rss",
      "publishedAt": "2026-07-01T07:38:52.000Z",
      "xQuery": "パスポート申請余裕持って 木原氏"
    },
    {
      "time": "21:36",
      "title": "行方不明の10歳死亡 校長が陳謝",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586389?source=rss",
      "publishedAt": "2026-07-01T12:36:22.000Z",
      "xQuery": "行方不明の10歳死亡 校長が陳謝"
    },
    {
      "time": "21:52",
      "title": "家畜市場で牛暴れる 4人病院搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586390?source=rss",
      "publishedAt": "2026-07-01T12:52:14.000Z",
      "xQuery": "家畜市場で牛暴れる 4人病院搬送"
    },
    {
      "time": "18:03",
      "title": "出川哲朗の兄の海苔問屋 高騰嘆く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586372?source=rss",
      "publishedAt": "2026-07-01T09:03:58.000Z",
      "xQuery": "出川哲朗の兄の海苔問屋 高騰嘆く"
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
