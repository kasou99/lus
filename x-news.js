window.LUS_X_NEWS = {
  "updatedAt": "2026-09-06T09:16:50.431Z",
  "items": [
    {
      "time": "16:37",
      "title": "東海や関東 土砂災害など厳重警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594433?source=rss",
      "publishedAt": "2026-09-06T07:37:45.000Z",
      "xQuery": "東海や関東 土砂災害など厳重警戒"
    },
    {
      "time": "17:48",
      "title": "金採掘か環境か 過疎の町の決断",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594442?source=rss",
      "publishedAt": "2026-09-06T08:48:34.000Z",
      "xQuery": "金採掘か環境か 過疎の町の決断"
    },
    {
      "time": "16:48",
      "title": "「殺人ロボ」巡り文書合意 国連",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594436?source=rss",
      "publishedAt": "2026-09-06T07:48:38.000Z",
      "xQuery": "「殺人ロボ」巡り文書合意 国連"
    },
    {
      "time": "17:22",
      "title": "5人死傷のケーキ店 地域で人気",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594438?source=rss",
      "publishedAt": "2026-09-06T08:22:42.000Z",
      "xQuery": "5人死傷のケーキ店 地域で人気"
    },
    {
      "time": "16:25",
      "title": "包丁の保有率 20代女性で9割切る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594432?source=rss",
      "publishedAt": "2026-09-06T07:25:31.000Z",
      "xQuery": "包丁の保有率 20代女性で9割切る"
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
