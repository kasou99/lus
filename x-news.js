window.LUS_X_NEWS = {
  "updatedAt": "2026-08-06T10:25:23.290Z",
  "items": [
    {
      "time": "17:43",
      "title": "被爆した姉の遺体 1人で焼いた弟",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590760?source=rss",
      "publishedAt": "2026-08-06T08:43:02.000Z",
      "xQuery": "被爆した姉の遺体 1人で焼いた弟"
    },
    {
      "time": "18:28",
      "title": "熊本県 地震犠牲者5人の名前公表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590773?source=rss",
      "publishedAt": "2026-08-06T09:28:22.000Z",
      "xQuery": "熊本県 地震犠牲者5人の名前公表"
    },
    {
      "time": "18:43",
      "title": "れいわが党名変更「いのちの党」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590775?source=rss",
      "publishedAt": "2026-08-06T09:43:20.000Z",
      "xQuery": "れいわが党名変更「いのちの党」"
    },
    {
      "time": "18:53",
      "title": "エース級の財務官僚人事が波紋",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590778?source=rss",
      "publishedAt": "2026-08-06T09:53:40.000Z",
      "xQuery": "エース級の財務官僚人事が波紋"
    },
    {
      "time": "17:32",
      "title": "加工アプリ「SNOW」に措置命令",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590755?source=rss",
      "publishedAt": "2026-08-06T08:32:35.000Z",
      "xQuery": "加工アプリ「SNOW」に措置命令"
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
