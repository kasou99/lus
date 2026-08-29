window.LUS_X_NEWS = {
  "updatedAt": "2026-08-29T01:17:07.215Z",
  "items": [
    {
      "time": "08:39",
      "title": "避難所行かない被災者 各々の事情",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593473?source=rss",
      "publishedAt": "2026-08-28T23:39:58.000Z",
      "xQuery": "避難所行かない被災者 各々の事情"
    },
    {
      "time": "08:07",
      "title": "石川・富山で大雨長引く恐れ 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593469?source=rss",
      "publishedAt": "2026-08-28T23:07:52.000Z",
      "xQuery": "石川・富山で大雨長引く恐れ 警戒"
    },
    {
      "time": "07:43",
      "title": "近畿で30年以内にM6.8超 50～60%",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593466?source=rss",
      "publishedAt": "2026-08-28T22:43:03.000Z",
      "xQuery": "近畿で30年以内にM6.8超 50～60%"
    },
    {
      "time": "09:30",
      "title": "福岡県議に公認出せない 首相意向",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593477?source=rss",
      "publishedAt": "2026-08-29T00:30:46.000Z",
      "xQuery": "福岡県議に公認出せない 首相意向"
    },
    {
      "time": "09:11",
      "title": "従業員死亡 容疑者は支配的立場か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593476?source=rss",
      "publishedAt": "2026-08-29T00:11:27.000Z",
      "xQuery": "従業員死亡 容疑者は支配的立場か"
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
