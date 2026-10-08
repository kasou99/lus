window.LUS_X_NEWS = {
  "updatedAt": "2026-10-08T19:16:19.785Z",
  "items": [
    {
      "time": "22:55",
      "title": "在沖縄米軍 9日まで通常訓練停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598059?source=rss",
      "publishedAt": "2026-10-08T13:55:00.000Z",
      "xQuery": "在沖縄米軍 9日まで通常訓練停止"
    },
    {
      "time": "19:19",
      "title": "ノーベル平和賞の候補にICC 背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598033?source=rss",
      "publishedAt": "2026-10-08T10:19:09.000Z",
      "xQuery": "ノーベル平和賞の候補にICC 背景"
    },
    {
      "time": "23:40",
      "title": "関東-九州は秋晴れ多い 1カ月予報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598062?source=rss",
      "publishedAt": "2026-10-08T14:40:47.000Z",
      "xQuery": "関東-九州は秋晴れ多い 1カ月予報"
    },
    {
      "time": "00:06",
      "title": "プルデンシャル 不正巡り64人解雇",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598063?source=rss",
      "publishedAt": "2026-10-08T15:06:53.000Z",
      "xQuery": "プルデンシャル 不正巡り64人解雇"
    },
    {
      "time": "22:00",
      "title": "ローソン 約215万件の情報漏えい",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598056?source=rss",
      "publishedAt": "2026-10-08T13:00:36.000Z",
      "xQuery": "ローソン 約215万件の情報漏えい"
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
