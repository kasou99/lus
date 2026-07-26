window.LUS_X_NEWS = {
  "updatedAt": "2026-07-26T01:39:42.014Z",
  "items": [
    {
      "time": "09:19",
      "title": "米大統領 イラン空爆中止を指示か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589345?source=rss",
      "publishedAt": "2026-07-26T00:19:04.000Z",
      "xQuery": "米大統領 イラン空爆中止を指示か"
    },
    {
      "time": "08:34",
      "title": "カザフ大統領 露に侵攻凍結を進言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589337?source=rss",
      "publishedAt": "2026-07-25T23:34:07.000Z",
      "xQuery": "カザフ大統領 露に侵攻凍結を進言"
    },
    {
      "time": "07:54",
      "title": "相模原殺傷 道半ばの障害者理解",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589333?source=rss",
      "publishedAt": "2026-07-25T22:54:04.000Z",
      "xQuery": "相模原殺傷 道半ばの障害者理解"
    },
    {
      "time": "10:02",
      "title": "限界と言われた台風予測 AIで激変",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589347?source=rss",
      "publishedAt": "2026-07-26T01:02:02.000Z",
      "xQuery": "限界と言われた台風予測 AIで激変"
    },
    {
      "time": "09:04",
      "title": "車が逆走か オートバイの男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589343?source=rss",
      "publishedAt": "2026-07-26T00:04:11.000Z",
      "xQuery": "車が逆走か オートバイの男性死亡"
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
