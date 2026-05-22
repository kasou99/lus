window.LUS_X_NEWS = {
  "updatedAt": "2026-05-22T07:28:03.941Z",
  "items": [
    {
      "time": "16:00",
      "title": "東京株終値6万3339円 最高値更新",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581232?source=rss",
      "publishedAt": "2026-05-22T07:00:34.000Z",
      "xQuery": "東京株終値6万3339円 最高値更新"
    },
    {
      "time": "14:31",
      "title": "軽井沢バス事故 2審も社長ら実刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581221?source=rss",
      "publishedAt": "2026-05-22T05:31:07.000Z",
      "xQuery": "軽井沢バス事故 2審も社長ら実刑"
    },
    {
      "time": "14:48",
      "title": "辺野古死亡の船長 国が刑事告発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581224?source=rss",
      "publishedAt": "2026-05-22T05:48:48.000Z",
      "xQuery": "辺野古死亡の船長 国が刑事告発"
    },
    {
      "time": "15:33",
      "title": "同志社国際高の私学助成 減額検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581228?source=rss",
      "publishedAt": "2026-05-22T06:33:18.000Z",
      "xQuery": "同志社国際高の私学助成 減額検討"
    },
    {
      "time": "13:26",
      "title": "栃木強殺 遺族がコメント公表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581214?source=rss",
      "publishedAt": "2026-05-22T04:26:50.000Z",
      "xQuery": "栃木強殺 遺族がコメント公表"
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
