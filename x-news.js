window.LUS_X_NEWS = {
  "updatedAt": "2026-08-21T10:43:33.692Z",
  "items": [
    {
      "time": "18:58",
      "title": "4人死亡 列車見張り員ら任意聴取",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592573?source=rss",
      "publishedAt": "2026-08-21T09:58:13.000Z",
      "xQuery": "4人死亡 列車見張り員ら任意聴取"
    },
    {
      "time": "17:28",
      "title": "育児サービス利用など税優遇 方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592556?source=rss",
      "publishedAt": "2026-08-21T08:28:09.000Z",
      "xQuery": "育児サービス利用など税優遇 方針"
    },
    {
      "time": "17:59",
      "title": "鈴木宗男氏 駐露大使の対応を批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592561?source=rss",
      "publishedAt": "2026-08-21T08:59:43.000Z",
      "xQuery": "鈴木宗男氏 駐露大使の対応を批判"
    },
    {
      "time": "18:26",
      "title": "馬渕隆一さん死去 マブチモーター",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592569?source=rss",
      "publishedAt": "2026-08-21T09:26:39.000Z",
      "xQuery": "馬渕隆一さん死去 マブチモーター"
    },
    {
      "time": "17:08",
      "title": "病院から姿消した被告 遺体で発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592555?source=rss",
      "publishedAt": "2026-08-21T08:08:16.000Z",
      "xQuery": "病院から姿消した被告 遺体で発見"
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
