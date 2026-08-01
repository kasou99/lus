window.LUS_X_NEWS = {
  "updatedAt": "2026-08-01T09:15:20.172Z",
  "items": [
    {
      "time": "16:45",
      "title": "イオンモール熊本の捜索活動終了",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590166?source=rss",
      "publishedAt": "2026-08-01T07:45:20.000Z",
      "xQuery": "イオンモール熊本の捜索活動終了"
    },
    {
      "time": "15:51",
      "title": "熊本地震で家失う 診療続ける医師",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590154?source=rss",
      "publishedAt": "2026-08-01T06:51:02.000Z",
      "xQuery": "熊本地震で家失う 診療続ける医師"
    },
    {
      "time": "16:31",
      "title": "東海や西日本2日以降も危険な暑さ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590162?source=rss",
      "publishedAt": "2026-08-01T07:31:18.000Z",
      "xQuery": "東海や西日本2日以降も危険な暑さ"
    },
    {
      "time": "16:17",
      "title": "未明に国道ではねられ 9歳が重体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590157?source=rss",
      "publishedAt": "2026-08-01T07:17:18.000Z",
      "xQuery": "未明に国道ではねられ 9歳が重体"
    },
    {
      "time": "16:57",
      "title": "男児がいじめ被害 重大事態に認定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590165?source=rss",
      "publishedAt": "2026-08-01T07:57:40.000Z",
      "xQuery": "男児がいじめ被害 重大事態に認定"
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
