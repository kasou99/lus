window.LUS_X_NEWS = {
  "updatedAt": "2026-10-10T01:37:11.150Z",
  "items": [
    {
      "time": "08:45",
      "title": "米がICC制裁 首相「深く懸念」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598212?source=rss",
      "publishedAt": "2026-10-09T23:45:18.000Z",
      "xQuery": "米がICC制裁 首相「深く懸念」"
    },
    {
      "time": "10:11",
      "title": "簗氏巡り 自民に辞任不可避の声も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598223?source=rss",
      "publishedAt": "2026-10-10T01:11:28.000Z",
      "xQuery": "簗氏巡り 自民に辞任不可避の声も"
    },
    {
      "time": "08:47",
      "title": "カルテル疑惑 経営トップに報告か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598213?source=rss",
      "publishedAt": "2026-10-09T23:47:56.000Z",
      "xQuery": "カルテル疑惑 経営トップに報告か"
    },
    {
      "time": "08:42",
      "title": "サイバー攻撃 なぜ日本が標的に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598211?source=rss",
      "publishedAt": "2026-10-09T23:42:21.000Z",
      "xQuery": "サイバー攻撃 なぜ日本が標的に"
    },
    {
      "time": "07:21",
      "title": "キノコ採りに山へ 長野の町長死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598197?source=rss",
      "publishedAt": "2026-10-09T22:21:27.000Z",
      "xQuery": "キノコ採りに山へ 長野の町長死亡"
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
