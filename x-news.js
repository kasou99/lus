window.LUS_X_NEWS = {
  "updatedAt": "2026-08-22T13:15:17.322Z",
  "items": [
    {
      "time": "21:28",
      "title": "事件で浮き彫りに 介護のカスハラ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592704?source=rss",
      "publishedAt": "2026-08-22T12:28:18.000Z",
      "xQuery": "事件で浮き彫りに 介護のカスハラ"
    },
    {
      "time": "20:24",
      "title": "爆発で休業のイオン 従業員は不安",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592697?source=rss",
      "publishedAt": "2026-08-22T11:24:59.000Z",
      "xQuery": "爆発で休業のイオン 従業員は不安"
    },
    {
      "time": "21:52",
      "title": "衆院比例に「サンラグ式」案浮上",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592706?source=rss",
      "publishedAt": "2026-08-22T12:52:44.000Z",
      "xQuery": "衆院比例に「サンラグ式」案浮上"
    },
    {
      "time": "21:03",
      "title": "化学メーカー工場で2人心肺停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592702?source=rss",
      "publishedAt": "2026-08-22T12:03:35.000Z",
      "xQuery": "化学メーカー工場で2人心肺停止"
    },
    {
      "time": "19:54",
      "title": "東京大雨 水吹き上がるマンホール",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592692?source=rss",
      "publishedAt": "2026-08-22T10:54:26.000Z",
      "xQuery": "東京大雨 水吹き上がるマンホール"
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
