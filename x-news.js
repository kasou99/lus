window.LUS_X_NEWS = {
  "updatedAt": "2026-07-02T01:09:56.663Z",
  "items": [
    {
      "time": "08:27",
      "title": "九州から関東 午前は激しい雨警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586415?source=rss",
      "publishedAt": "2026-07-01T23:27:21.000Z",
      "xQuery": "九州から関東 午前は激しい雨警戒"
    },
    {
      "time": "08:40",
      "title": "中部電力データ不正 発覚後も継続",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586418?source=rss",
      "publishedAt": "2026-07-01T23:40:00.000Z",
      "xQuery": "中部電力データ不正 発覚後も継続"
    },
    {
      "time": "08:55",
      "title": "玉木氏「自民と信頼関係に疑義」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586420?source=rss",
      "publishedAt": "2026-07-01T23:55:51.000Z",
      "xQuery": "玉木氏「自民と信頼関係に疑義」"
    },
    {
      "time": "09:39",
      "title": "超巨大地震巡る謎 東大チーム解明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586426?source=rss",
      "publishedAt": "2026-07-02T00:39:04.000Z",
      "xQuery": "超巨大地震巡る謎 東大チーム解明"
    },
    {
      "time": "09:10",
      "title": "50～70代未婚「孤独」が9割 調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586422?source=rss",
      "publishedAt": "2026-07-02T00:10:31.000Z",
      "xQuery": "50～70代未婚「孤独」が9割 調査"
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
