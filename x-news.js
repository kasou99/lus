window.LUS_X_NEWS = {
  "updatedAt": "2026-06-21T09:25:37.437Z",
  "items": [
    {
      "time": "16:17",
      "title": "イラン 海峡封鎖圧力で交渉主導か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585095?source=rss",
      "publishedAt": "2026-06-21T07:17:19.000Z",
      "xQuery": "イラン 海峡封鎖圧力で交渉主導か"
    },
    {
      "time": "17:11",
      "title": "性被害訴えた検事 二次被害の実態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585101?source=rss",
      "publishedAt": "2026-06-21T08:11:06.000Z",
      "xQuery": "性被害訴えた検事 二次被害の実態"
    },
    {
      "time": "16:46",
      "title": "HIV感染 20年以上薬を飲む男性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585099?source=rss",
      "publishedAt": "2026-06-21T07:46:41.000Z",
      "xQuery": "HIV感染 20年以上薬を飲む男性"
    },
    {
      "time": "17:05",
      "title": "ジャングリア なぜ口コミが回復",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585100?source=rss",
      "publishedAt": "2026-06-21T08:05:54.000Z",
      "xQuery": "ジャングリア なぜ口コミが回復"
    },
    {
      "time": "13:23",
      "title": "海外製天気アプリ 相次ぐ誤情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585073?source=rss",
      "publishedAt": "2026-06-21T04:23:06.000Z",
      "xQuery": "海外製天気アプリ 相次ぐ誤情報"
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
