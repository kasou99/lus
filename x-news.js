window.LUS_X_NEWS = {
  "updatedAt": "2026-07-30T11:16:46.439Z",
  "items": [
    {
      "time": "17:20",
      "title": "避難生活で体調不良 防ぐためには",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589916?source=rss",
      "publishedAt": "2026-07-30T08:20:35.000Z",
      "xQuery": "避難生活で体調不良 防ぐためには"
    },
    {
      "time": "18:56",
      "title": "食料品消費税1% 首相が正式表明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589935?source=rss",
      "publishedAt": "2026-07-30T09:56:51.000Z",
      "xQuery": "食料品消費税1% 首相が正式表明"
    },
    {
      "time": "18:47",
      "title": "熊本県 当面ボランティア自粛要請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589932?source=rss",
      "publishedAt": "2026-07-30T09:47:59.000Z",
      "xQuery": "熊本県 当面ボランティア自粛要請"
    },
    {
      "time": "19:13",
      "title": "日本製紙八代 11人の捜索が完了",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589936?source=rss",
      "publishedAt": "2026-07-30T10:13:52.000Z",
      "xQuery": "日本製紙八代 11人の捜索が完了"
    },
    {
      "time": "17:49",
      "title": "ひろゆき氏と泉房穂氏 新党を設立",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589923?source=rss",
      "publishedAt": "2026-07-30T08:49:47.000Z",
      "xQuery": "ひろゆき氏と泉房穂氏 新党を設立"
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
