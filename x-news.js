window.LUS_X_NEWS = {
  "updatedAt": "2026-11-04T14:12:53.708Z",
  "items": [
    {
      "time": "20:49",
      "title": "米中間選挙 日本経済への影響は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601343?source=rss",
      "publishedAt": "2026-11-04T11:49:29.000Z",
      "xQuery": "米中間選挙 日本経済への影響は"
    },
    {
      "time": "22:03",
      "title": "関東 5日は滝のような雨降る所も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601351?source=rss",
      "publishedAt": "2026-11-04T13:03:46.000Z",
      "xQuery": "関東 5日は滝のような雨降る所も"
    },
    {
      "time": "22:37",
      "title": "米海兵隊員が訓練中に死亡 沖縄",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601357?source=rss",
      "publishedAt": "2026-11-04T13:37:27.000Z",
      "xQuery": "米海兵隊員が訓練中に死亡 沖縄"
    },
    {
      "time": "21:26",
      "title": "男児盗撮疑い逮捕 米から情報提供",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601348?source=rss",
      "publishedAt": "2026-11-04T12:26:17.000Z",
      "xQuery": "男児盗撮疑い逮捕 米から情報提供"
    },
    {
      "time": "21:40",
      "title": "香川の讃岐うどん店 混雑対応苦慮",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601347?source=rss",
      "publishedAt": "2026-11-04T12:40:19.000Z",
      "xQuery": "香川の讃岐うどん店 混雑対応苦慮"
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
