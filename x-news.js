window.LUS_X_NEWS = {
  "updatedAt": "2026-06-10T03:51:28.901Z",
  "items": [
    {
      "time": "10:01",
      "title": "ラピダス 英伊と研究開発で協力へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583642?source=rss",
      "publishedAt": "2026-06-10T01:01:03.000Z",
      "xQuery": "ラピダス 英伊と研究開発で協力へ"
    },
    {
      "time": "09:59",
      "title": "防衛装備品の輸出 支援組織を調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583641?source=rss",
      "publishedAt": "2026-06-10T00:59:19.000Z",
      "xQuery": "防衛装備品の輸出 支援組織を調整"
    },
    {
      "time": "12:13",
      "title": "米軍 ヘリ撃墜への報復攻撃を終了",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583657?source=rss",
      "publishedAt": "2026-06-10T03:13:13.000Z",
      "xQuery": "米軍 ヘリ撃墜への報復攻撃を終了"
    },
    {
      "time": "10:37",
      "title": "クマ警戒いつまで 福島市4人負傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583646?source=rss",
      "publishedAt": "2026-06-10T01:37:54.000Z",
      "xQuery": "クマ警戒いつまで 福島市4人負傷"
    },
    {
      "time": "09:37",
      "title": "スシロー皿タワー 中国SNSで拡散",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583639?source=rss",
      "publishedAt": "2026-06-10T00:37:22.000Z",
      "xQuery": "スシロー皿タワー 中国SNSで拡散"
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
