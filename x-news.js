window.LUS_X_NEWS = {
  "updatedAt": "2026-07-23T06:03:38.459Z",
  "items": [
    {
      "time": "13:35",
      "title": "三重で40.4℃ 国内3日連続酷暑日",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589014?source=rss",
      "publishedAt": "2026-07-23T04:35:37.000Z",
      "xQuery": "三重で40.4℃ 国内3日連続酷暑日"
    },
    {
      "time": "13:52",
      "title": "中傷動画巡る秘書陳述書 識者分析",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589016?source=rss",
      "publishedAt": "2026-07-23T04:52:04.000Z",
      "xQuery": "中傷動画巡る秘書陳述書 識者分析"
    },
    {
      "time": "13:21",
      "title": "草刈り中にため池転落 2人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589012?source=rss",
      "publishedAt": "2026-07-23T04:21:21.000Z",
      "xQuery": "草刈り中にため池転落 2人死亡"
    },
    {
      "time": "14:26",
      "title": "川で男子中学生が溺れる 心肺停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589020?source=rss",
      "publishedAt": "2026-07-23T05:26:32.000Z",
      "xQuery": "川で男子中学生が溺れる 心肺停止"
    },
    {
      "time": "13:47",
      "title": "セブン 従業員らの転売は重大問題",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589015?source=rss",
      "publishedAt": "2026-07-23T04:47:21.000Z",
      "xQuery": "セブン 従業員らの転売は重大問題"
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
