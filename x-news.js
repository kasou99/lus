window.LUS_X_NEWS = {
  "updatedAt": "2026-10-14T08:25:01.087Z",
  "items": [
    {
      "time": "16:15",
      "title": "ワールドとTSI 経営統合で合意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598738?source=rss",
      "publishedAt": "2026-10-14T07:15:24.000Z",
      "xQuery": "ワールドとTSI 経営統合で合意"
    },
    {
      "time": "15:42",
      "title": "露で記者拘束 道新「詳細確認中」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598736?source=rss",
      "publishedAt": "2026-10-14T06:42:07.000Z",
      "xQuery": "露で記者拘束 道新「詳細確認中」"
    },
    {
      "time": "15:27",
      "title": "簗氏 24年衆院選で運動員買収疑惑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598734?source=rss",
      "publishedAt": "2026-10-14T06:27:25.000Z",
      "xQuery": "簗氏 24年衆院選で運動員買収疑惑"
    },
    {
      "time": "17:20",
      "title": "大樹生命の元社員を逮捕 詐取疑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598748?source=rss",
      "publishedAt": "2026-10-14T08:20:06.000Z",
      "xQuery": "大樹生命の元社員を逮捕 詐取疑い"
    },
    {
      "time": "15:25",
      "title": "だんじり事故 主催者らの責任は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598733?source=rss",
      "publishedAt": "2026-10-14T06:25:06.000Z",
      "xQuery": "だんじり事故 主催者らの責任は"
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
