window.LUS_X_NEWS = {
  "updatedAt": "2026-06-14T12:51:54.614Z",
  "items": [
    {
      "time": "21:12",
      "title": "首相「日英関係をもっと高みに」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584247?source=rss",
      "publishedAt": "2026-06-14T12:12:27.000Z",
      "xQuery": "首相「日英関係をもっと高みに」"
    },
    {
      "time": "17:46",
      "title": "米大統領に健康不安説 払拭に躍起",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584222?source=rss",
      "publishedAt": "2026-06-14T08:46:06.000Z",
      "xQuery": "米大統領に健康不安説 払拭に躍起"
    },
    {
      "time": "14:34",
      "title": "ボビー容疑者逮捕 事実違うと否認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584202?source=rss",
      "publishedAt": "2026-06-14T05:34:25.000Z",
      "xQuery": "ボビー容疑者逮捕 事実違うと否認"
    },
    {
      "time": "21:27",
      "title": "素潜り漁の81歳死亡 海底で発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584250?source=rss",
      "publishedAt": "2026-06-14T12:27:11.000Z",
      "xQuery": "素潜り漁の81歳死亡 海底で発見"
    },
    {
      "time": "20:45",
      "title": "新神戸駅直結の巨大モール 廃墟化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584246?source=rss",
      "publishedAt": "2026-06-14T11:45:04.000Z",
      "xQuery": "新神戸駅直結の巨大モール 廃墟化"
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
