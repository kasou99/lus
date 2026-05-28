window.LUS_X_NEWS = {
  "updatedAt": "2026-05-28T07:36:38.172Z",
  "items": [
    {
      "time": "16:26",
      "title": "新たな防災気象情報 提供を開始",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582041?source=rss",
      "publishedAt": "2026-05-28T07:26:16.000Z",
      "xQuery": "新たな防災気象情報 提供を開始"
    },
    {
      "time": "15:38",
      "title": "2月の衆院選は「合憲」岡山支部",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582032?source=rss",
      "publishedAt": "2026-05-28T06:38:05.000Z",
      "xQuery": "2月の衆院選は「合憲」岡山支部"
    },
    {
      "time": "14:23",
      "title": "米半導体企業 台湾投資の重要性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582020?source=rss",
      "publishedAt": "2026-05-28T05:23:12.000Z",
      "xQuery": "米半導体企業 台湾投資の重要性"
    },
    {
      "time": "16:04",
      "title": "損保J 個人向け火災保険3%値上げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582037?source=rss",
      "publishedAt": "2026-05-28T07:04:36.000Z",
      "xQuery": "損保J 個人向け火災保険3%値上げ"
    },
    {
      "time": "16:08",
      "title": "予約診療のキャンセル料 誤解拡散",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582036?source=rss",
      "publishedAt": "2026-05-28T07:08:03.000Z",
      "xQuery": "予約診療のキャンセル料 誤解拡散"
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
