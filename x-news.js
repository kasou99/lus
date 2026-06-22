window.LUS_X_NEWS = {
  "updatedAt": "2026-06-22T02:25:16.402Z",
  "items": [
    {
      "time": "10:00",
      "title": "日経平均 一時初の7万2000円台",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585165?source=rss",
      "publishedAt": "2026-06-22T01:00:45.000Z",
      "xQuery": "日経平均 一時初の7万2000円台"
    },
    {
      "time": "08:25",
      "title": "米との協議 イラン代表団が退席",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585155?source=rss",
      "publishedAt": "2026-06-21T23:25:01.000Z",
      "xQuery": "米との協議 イラン代表団が退席"
    },
    {
      "time": "08:31",
      "title": "温泉入浴中5歳不明 川中心に捜索",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585156?source=rss",
      "publishedAt": "2026-06-21T23:31:34.000Z",
      "xQuery": "温泉入浴中5歳不明 川中心に捜索"
    },
    {
      "time": "11:09",
      "title": "金を人形に隠し密輸疑い 6人逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585167?source=rss",
      "publishedAt": "2026-06-22T02:09:57.000Z",
      "xQuery": "金を人形に隠し密輸疑い 6人逮捕"
    },
    {
      "time": "09:30",
      "title": "心が折れた 百選の棚田で耕作断念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585162?source=rss",
      "publishedAt": "2026-06-22T00:30:43.000Z",
      "xQuery": "心が折れた 百選の棚田で耕作断念"
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
