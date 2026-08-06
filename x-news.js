window.LUS_X_NEWS = {
  "updatedAt": "2026-08-06T04:36:07.151Z",
  "items": [
    {
      "time": "12:45",
      "title": "台風13号 あす沖縄本島に最接近へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590724?source=rss",
      "publishedAt": "2026-08-06T03:45:43.000Z",
      "xQuery": "台風13号 あす沖縄本島に最接近へ"
    },
    {
      "time": "11:52",
      "title": "皮ズルズルに剥けた人も 原爆光景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590712?source=rss",
      "publishedAt": "2026-08-06T02:52:21.000Z",
      "xQuery": "皮ズルズルに剥けた人も 原爆光景"
    },
    {
      "time": "12:34",
      "title": "中国 なぜ領有権争いを続けるのか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590721?source=rss",
      "publishedAt": "2026-08-06T03:34:29.000Z",
      "xQuery": "中国 なぜ領有権争いを続けるのか"
    },
    {
      "time": "12:15",
      "title": "睡眠障害自覚し事故 危険運転疑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590714?source=rss",
      "publishedAt": "2026-08-06T03:15:11.000Z",
      "xQuery": "睡眠障害自覚し事故 危険運転疑い"
    },
    {
      "time": "12:40",
      "title": "集英社通販サイトで妨害疑い 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590725?source=rss",
      "publishedAt": "2026-08-06T03:40:45.000Z",
      "xQuery": "集英社通販サイトで妨害疑い 逮捕"
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
