window.LUS_X_NEWS = {
  "updatedAt": "2026-05-28T21:16:55.652Z",
  "items": [
    {
      "time": "22:22",
      "title": "日中関係悪化 中国が根源直視求む",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582089?source=rss",
      "publishedAt": "2026-05-28T13:22:59.000Z",
      "xQuery": "日中関係悪化 中国が根源直視求む"
    },
    {
      "time": "23:15",
      "title": "栃木強殺 40代の男を公開手配へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582095?source=rss",
      "publishedAt": "2026-05-28T14:15:02.000Z",
      "xQuery": "栃木強殺 40代の男を公開手配へ"
    },
    {
      "time": "22:45",
      "title": "福島第一2号機 6月燃料取り出しへ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582091?source=rss",
      "publishedAt": "2026-05-28T13:45:06.000Z",
      "xQuery": "福島第一2号機 6月燃料取り出しへ"
    },
    {
      "time": "06:10",
      "title": "トヨタ 次世代EVの開発を中止へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582098?source=rss",
      "publishedAt": "2026-05-28T21:10:31.000Z",
      "xQuery": "トヨタ 次世代EVの開発を中止へ"
    },
    {
      "time": "22:08",
      "title": "エアコンやりがち行為で爆発 注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582087?source=rss",
      "publishedAt": "2026-05-28T13:08:59.000Z",
      "xQuery": "エアコンやりがち行為で爆発 注意"
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
