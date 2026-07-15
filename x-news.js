window.LUS_X_NEWS = {
  "updatedAt": "2026-07-15T11:34:45.704Z",
  "items": [
    {
      "time": "19:15",
      "title": "ニチレイ障害 サイバー攻撃が原因",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588070?source=rss",
      "publishedAt": "2026-07-15T10:15:56.000Z",
      "xQuery": "ニチレイ障害 サイバー攻撃が原因"
    },
    {
      "time": "18:41",
      "title": "音声データで名指し 県議面会否定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588066?source=rss",
      "publishedAt": "2026-07-15T09:41:15.000Z",
      "xQuery": "音声データで名指し 県議面会否定"
    },
    {
      "time": "18:38",
      "title": "小1はねられ死亡 横断中に転倒か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588060?source=rss",
      "publishedAt": "2026-07-15T09:38:28.000Z",
      "xQuery": "小1はねられ死亡 横断中に転倒か"
    },
    {
      "time": "17:38",
      "title": "点滴に大便入れ患者殺害疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588054?source=rss",
      "publishedAt": "2026-07-15T08:38:43.000Z",
      "xQuery": "点滴に大便入れ患者殺害疑い 逮捕"
    },
    {
      "time": "20:23",
      "title": "「LINE VOOM」サービス終了へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588076?source=rss",
      "publishedAt": "2026-07-15T11:23:28.000Z",
      "xQuery": "「LINE VOOM」サービス終了へ"
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
