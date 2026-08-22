window.LUS_X_NEWS = {
  "updatedAt": "2026-08-22T15:39:14.541Z",
  "items": [
    {
      "time": "22:14",
      "title": "東武事故 200m手前で警笛の記録",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592709?source=rss",
      "publishedAt": "2026-08-22T13:14:31.000Z",
      "xQuery": "東武事故 200m手前で警笛の記録"
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
      "time": "22:54",
      "title": "関東南部で雨 東京駅近くで道に穴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592714?source=rss",
      "publishedAt": "2026-08-22T13:54:11.000Z",
      "xQuery": "関東南部で雨 東京駅近くで道に穴"
    },
    {
      "time": "21:28",
      "title": "事件で浮き彫りに 介護のカスハラ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592704?source=rss",
      "publishedAt": "2026-08-22T12:28:18.000Z",
      "xQuery": "事件で浮き彫りに 介護のカスハラ"
    },
    {
      "time": "22:32",
      "title": "父の性的虐待で妊娠 今も母知らず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592710?source=rss",
      "publishedAt": "2026-08-22T13:32:17.000Z",
      "xQuery": "父の性的虐待で妊娠 今も母知らず"
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
