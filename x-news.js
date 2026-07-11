window.LUS_X_NEWS = {
  "updatedAt": "2026-07-11T17:24:48.223Z",
  "items": [
    {
      "time": "22:42",
      "title": "特別国会ヤマ場 重要法案積み残し",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587605?source=rss",
      "publishedAt": "2026-07-11T13:42:24.000Z",
      "xQuery": "特別国会ヤマ場 重要法案積み残し"
    },
    {
      "time": "20:58",
      "title": "首相 安倍氏の追悼集会で決意語る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587593?source=rss",
      "publishedAt": "2026-07-11T11:58:14.000Z",
      "xQuery": "首相 安倍氏の追悼集会で決意語る"
    },
    {
      "time": "23:48",
      "title": "モジタバ師「復讐を誓う」と表明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587611?source=rss",
      "publishedAt": "2026-07-11T14:48:01.000Z",
      "xQuery": "モジタバ師「復讐を誓う」と表明"
    },
    {
      "time": "23:22",
      "title": "釣り道具追いかけおぼれたか 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587610?source=rss",
      "publishedAt": "2026-07-11T14:22:07.000Z",
      "xQuery": "釣り道具追いかけおぼれたか 死亡"
    },
    {
      "time": "23:00",
      "title": "1日千人使うバス廃止へ 住民困惑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587607?source=rss",
      "publishedAt": "2026-07-11T14:00:35.000Z",
      "xQuery": "1日千人使うバス廃止へ 住民困惑"
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
