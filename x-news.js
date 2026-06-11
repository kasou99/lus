window.LUS_X_NEWS = {
  "updatedAt": "2026-06-11T03:18:47.296Z",
  "items": [
    {
      "time": "11:11",
      "title": "米軍 イランへの新たな攻撃を終了",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583784?source=rss",
      "publishedAt": "2026-06-11T02:11:13.000Z",
      "xQuery": "米軍 イランへの新たな攻撃を終了"
    },
    {
      "time": "09:43",
      "title": "米 北米貿易協定の延長見送り示唆",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583775?source=rss",
      "publishedAt": "2026-06-11T00:43:06.000Z",
      "xQuery": "米 北米貿易協定の延長見送り示唆"
    },
    {
      "time": "12:03",
      "title": "河川敷に遺体 不明の女子高校生か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583792?source=rss",
      "publishedAt": "2026-06-11T03:03:21.000Z",
      "xQuery": "河川敷に遺体 不明の女子高校生か"
    },
    {
      "time": "11:38",
      "title": "2人死亡 バス運転手を鑑定留置へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583788?source=rss",
      "publishedAt": "2026-06-11T02:38:03.000Z",
      "xQuery": "2人死亡 バス運転手を鑑定留置へ"
    },
    {
      "time": "11:39",
      "title": "ジャングリア 半額以下チケを販売",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583790?source=rss",
      "publishedAt": "2026-06-11T02:39:55.000Z",
      "xQuery": "ジャングリア 半額以下チケを販売"
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
