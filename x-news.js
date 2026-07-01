window.LUS_X_NEWS = {
  "updatedAt": "2026-07-01T07:44:27.972Z",
  "items": [
    {
      "time": "14:49",
      "title": "2日にかけ西日本〜関東で大雨恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586344?source=rss",
      "publishedAt": "2026-07-01T05:49:34.000Z",
      "xQuery": "2日にかけ西日本〜関東で大雨恐れ"
    },
    {
      "time": "16:29",
      "title": "衆院議長 与野党に国会正常化要請",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586354?source=rss",
      "publishedAt": "2026-07-01T07:29:12.000Z",
      "xQuery": "衆院議長 与野党に国会正常化要請"
    },
    {
      "time": "16:33",
      "title": "米大統領 暗号資産巡り巨額の収入",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586356?source=rss",
      "publishedAt": "2026-07-01T07:33:23.000Z",
      "xQuery": "米大統領 暗号資産巡り巨額の収入"
    },
    {
      "time": "15:53",
      "title": "不明の10歳 滝で発見も死亡確認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586349?source=rss",
      "publishedAt": "2026-07-01T06:53:04.000Z",
      "xQuery": "不明の10歳 滝で発見も死亡確認"
    },
    {
      "time": "16:03",
      "title": "トヨタ ハイランダー8月全国発売",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586351?source=rss",
      "publishedAt": "2026-07-01T07:03:16.000Z",
      "xQuery": "トヨタ ハイランダー8月全国発売"
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
