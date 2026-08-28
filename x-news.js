window.LUS_X_NEWS = {
  "updatedAt": "2026-08-28T23:36:48.021Z",
  "items": [
    {
      "time": "08:07",
      "title": "石川・富山で大雨長引く恐れ 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593469?source=rss",
      "publishedAt": "2026-08-28T23:07:52.000Z",
      "xQuery": "石川・富山で大雨長引く恐れ 警戒"
    },
    {
      "time": "07:54",
      "title": "ネパール土石流 行方不明2500人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593467?source=rss",
      "publishedAt": "2026-08-28T22:54:56.000Z",
      "xQuery": "ネパール土石流 行方不明2500人"
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
      "time": "07:40",
      "title": "中高生3人流され不明 捜索続く",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593468?source=rss",
      "publishedAt": "2026-08-28T22:40:08.000Z",
      "xQuery": "中高生3人流され不明 捜索続く"
    },
    {
      "time": "07:25",
      "title": "赤ちゃんの遺体を遺棄疑い 女逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593464?source=rss",
      "publishedAt": "2026-08-28T22:25:01.000Z",
      "xQuery": "赤ちゃんの遺体を遺棄疑い 女逮捕"
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
