window.LUS_X_NEWS = {
  "updatedAt": "2026-10-13T12:30:15.233Z",
  "items": [
    {
      "time": "20:15",
      "title": "イオン中間決算 災害の特損42億円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598646?source=rss",
      "publishedAt": "2026-10-13T11:15:18.000Z",
      "xQuery": "イオン中間決算 災害の特損42億円"
    },
    {
      "time": "20:58",
      "title": "不正アクセス 自治体の配信が停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598649?source=rss",
      "publishedAt": "2026-10-13T11:58:48.000Z",
      "xQuery": "不正アクセス 自治体の配信が停止"
    },
    {
      "time": "18:01",
      "title": "簗氏答弁受け 選管「あり得ない」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598637?source=rss",
      "publishedAt": "2026-10-13T09:01:25.000Z",
      "xQuery": "簗氏答弁受け 選管「あり得ない」"
    },
    {
      "time": "18:38",
      "title": "ゼリー詰まらせ死亡 一口サイズか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598640?source=rss",
      "publishedAt": "2026-10-13T09:38:43.000Z",
      "xQuery": "ゼリー詰まらせ死亡 一口サイズか"
    },
    {
      "time": "20:41",
      "title": "看護師が患者の動画投稿 運営謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598648?source=rss",
      "publishedAt": "2026-10-13T11:41:36.000Z",
      "xQuery": "看護師が患者の動画投稿 運営謝罪"
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
