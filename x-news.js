window.LUS_X_NEWS = {
  "updatedAt": "2026-05-29T02:26:30.242Z",
  "items": [
    {
      "time": "08:26",
      "title": "関東から西で30℃超に 熱中症注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582116?source=rss",
      "publishedAt": "2026-05-28T23:26:14.000Z",
      "xQuery": "関東から西で30℃超に 熱中症注意"
    },
    {
      "time": "10:40",
      "title": "ネタニヤフ氏 ガザ70%掌握を指示",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582135?source=rss",
      "publishedAt": "2026-05-29T01:40:53.000Z",
      "xQuery": "ネタニヤフ氏 ガザ70%掌握を指示"
    },
    {
      "time": "09:53",
      "title": "露の批判「ばかげている」日本",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582129?source=rss",
      "publishedAt": "2026-05-29T00:53:09.000Z",
      "xQuery": "露の批判「ばかげている」日本"
    },
    {
      "time": "10:26",
      "title": "ハーバード卒業式ゲスト 政権批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582131?source=rss",
      "publishedAt": "2026-05-29T01:26:04.000Z",
      "xQuery": "ハーバード卒業式ゲスト 政権批判"
    },
    {
      "time": "10:36",
      "title": "TSMC経済効果に南北格差 熊本県",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582134?source=rss",
      "publishedAt": "2026-05-29T01:36:03.000Z",
      "xQuery": "TSMC経済効果に南北格差 熊本県"
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
