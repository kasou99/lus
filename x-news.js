window.LUS_X_NEWS = {
  "updatedAt": "2026-08-30T07:36:26.006Z",
  "items": [
    {
      "time": "14:52",
      "title": "福井県 住宅浸水など被害相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593623?source=rss",
      "publishedAt": "2026-08-30T05:52:46.000Z",
      "xQuery": "福井県 住宅浸水など被害相次ぐ"
    },
    {
      "time": "16:23",
      "title": "小売り事業の税優遇要望へ 経産省",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593631?source=rss",
      "publishedAt": "2026-08-30T07:23:16.000Z",
      "xQuery": "小売り事業の税優遇要望へ 経産省"
    },
    {
      "time": "16:05",
      "title": "外国人が駆け込むクリニック 密着",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593628?source=rss",
      "publishedAt": "2026-08-30T07:05:44.000Z",
      "xQuery": "外国人が駆け込むクリニック 密着"
    },
    {
      "time": "14:32",
      "title": "山肌埋め尽くすシカ 南アルプス",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593620?source=rss",
      "publishedAt": "2026-08-30T05:32:35.000Z",
      "xQuery": "山肌埋め尽くすシカ 南アルプス"
    },
    {
      "time": "15:29",
      "title": "皇居ランに賛否 SNSで議論が拡大",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593624?source=rss",
      "publishedAt": "2026-08-30T06:29:16.000Z",
      "xQuery": "皇居ランに賛否 SNSで議論が拡大"
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
