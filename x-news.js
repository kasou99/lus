window.LUS_X_NEWS = {
  "updatedAt": "2026-07-25T08:47:07.975Z",
  "items": [
    {
      "time": "17:05",
      "title": "25日夕～都心周辺で激しい雨か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589274?source=rss",
      "publishedAt": "2026-07-25T08:05:47.000Z",
      "xQuery": "25日夕～都心周辺で激しい雨か"
    },
    {
      "time": "14:48",
      "title": "辞職の副議長 蔵内議長を支えたい",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589255?source=rss",
      "publishedAt": "2026-07-25T05:48:19.000Z",
      "xQuery": "辞職の副議長 蔵内議長を支えたい"
    },
    {
      "time": "16:49",
      "title": "最賃 近隣県を意識した競争過熱",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589266?source=rss",
      "publishedAt": "2026-07-25T07:49:14.000Z",
      "xQuery": "最賃 近隣県を意識した競争過熱"
    },
    {
      "time": "14:42",
      "title": "ジャングリア1年 来場者数100万人",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589256?source=rss",
      "publishedAt": "2026-07-25T05:42:15.000Z",
      "xQuery": "ジャングリア1年 来場者数100万人"
    },
    {
      "time": "16:53",
      "title": "かゆみ止め薬「ムヒ」 ギネス認定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589270?source=rss",
      "publishedAt": "2026-07-25T07:53:52.000Z",
      "xQuery": "かゆみ止め薬「ムヒ」 ギネス認定"
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
