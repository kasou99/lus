window.LUS_X_NEWS = {
  "updatedAt": "2026-06-17T23:02:28.964Z",
  "items": [
    {
      "time": "07:42",
      "title": "米高官 イランとの覚書の内容公開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584664?source=rss",
      "publishedAt": "2026-06-17T22:42:54.000Z",
      "xQuery": "米高官 イランとの覚書の内容公開"
    },
    {
      "time": "06:09",
      "title": "米FRB 政策金利の据え置きを決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584654?source=rss",
      "publishedAt": "2026-06-17T21:09:46.000Z",
      "xQuery": "米FRB 政策金利の据え置きを決定"
    },
    {
      "time": "23:43",
      "title": "桂田被告が即日控訴 乗客家族憤り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584650?source=rss",
      "publishedAt": "2026-06-17T14:43:18.000Z",
      "xQuery": "桂田被告が即日控訴 乗客家族憤り"
    },
    {
      "time": "07:19",
      "title": "ミキサー車にひかれ男性死亡 逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584659?source=rss",
      "publishedAt": "2026-06-17T22:19:18.000Z",
      "xQuery": "ミキサー車にひかれ男性死亡 逮捕"
    },
    {
      "time": "07:20",
      "title": "4700人名義 ギフト券詐取疑い逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584661?source=rss",
      "publishedAt": "2026-06-17T22:20:41.000Z",
      "xQuery": "4700人名義 ギフト券詐取疑い逮捕"
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
