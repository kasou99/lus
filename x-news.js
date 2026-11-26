window.LUS_X_NEWS = {
  "updatedAt": "2026-11-26T22:10:45.228Z",
  "items": [
    {
      "time": "06:15",
      "title": "沖縄県本島北部 線状降水帯が発生",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604125?source=rss",
      "publishedAt": "2026-11-26T21:15:22.000Z",
      "xQuery": "沖縄県本島北部 線状降水帯が発生"
    },
    {
      "time": "06:06",
      "title": "ECB総裁にデコス氏 EU首脳が合意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604124?source=rss",
      "publishedAt": "2026-11-26T21:06:20.000Z",
      "xQuery": "ECB総裁にデコス氏 EU首脳が合意"
    },
    {
      "time": "23:22",
      "title": "北朝鮮が露軍事支援停止か ウ発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604122?source=rss",
      "publishedAt": "2026-11-26T14:22:48.000Z",
      "xQuery": "北朝鮮が露軍事支援停止か ウ発表"
    },
    {
      "time": "21:14",
      "title": "汚水が混入か 飲食店ビルで食中毒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604114?source=rss",
      "publishedAt": "2026-11-26T12:14:49.000Z",
      "xQuery": "汚水が混入か 飲食店ビルで食中毒"
    },
    {
      "time": "06:20",
      "title": "アメ横周辺の道に机 営業停止処分",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6604126?source=rss",
      "publishedAt": "2026-11-26T21:20:31.000Z",
      "xQuery": "アメ横周辺の道に机 営業停止処分"
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
