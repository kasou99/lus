window.LUS_X_NEWS = {
  "updatedAt": "2026-05-23T11:35:09.315Z",
  "items": [
    {
      "time": "20:17",
      "title": "沖縄本島で線状降水帯発生情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581410?source=rss",
      "publishedAt": "2026-05-23T11:17:58.000Z",
      "xQuery": "沖縄本島で線状降水帯発生情報"
    },
    {
      "time": "18:37",
      "title": "首相 6月のG7前に外交ラッシュ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581396?source=rss",
      "publishedAt": "2026-05-23T09:37:26.000Z",
      "xQuery": "首相 6月のG7前に外交ラッシュ"
    },
    {
      "time": "19:32",
      "title": "民家飼いネコ クマに食べられたか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581404?source=rss",
      "publishedAt": "2026-05-23T10:32:04.000Z",
      "xQuery": "民家飼いネコ クマに食べられたか"
    },
    {
      "time": "19:48",
      "title": "逆走した車と正面衝突 双方が全焼",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581406?source=rss",
      "publishedAt": "2026-05-23T10:48:12.000Z",
      "xQuery": "逆走した車と正面衝突 双方が全焼"
    },
    {
      "time": "20:28",
      "title": "4mの木の枝落下 子ども3人搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581411?source=rss",
      "publishedAt": "2026-05-23T11:28:11.000Z",
      "xQuery": "4mの木の枝落下 子ども3人搬送"
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
