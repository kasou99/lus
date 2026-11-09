window.LUS_X_NEWS = {
  "updatedAt": "2026-11-09T02:35:37.902Z",
  "items": [
    {
      "time": "09:51",
      "title": "7/30に過去最大円買い介入7.9兆円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601877?source=rss",
      "publishedAt": "2026-11-09T00:51:51.000Z",
      "xQuery": "7/30に過去最大円買い介入7.9兆円"
    },
    {
      "time": "09:00",
      "title": "中国を「脅威」見送りへ 政府方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601872?source=rss",
      "publishedAt": "2026-11-09T00:00:12.000Z",
      "xQuery": "中国を「脅威」見送りへ 政府方針"
    },
    {
      "time": "11:08",
      "title": "米大統領 報道官にUFC代表は冗談",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601883?source=rss",
      "publishedAt": "2026-11-09T02:08:29.000Z",
      "xQuery": "米大統領 報道官にUFC代表は冗談"
    },
    {
      "time": "08:52",
      "title": "北朝鮮ハッカーのチャットか 入手",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601870?source=rss",
      "publishedAt": "2026-11-08T23:52:15.000Z",
      "xQuery": "北朝鮮ハッカーのチャットか 入手"
    },
    {
      "time": "11:13",
      "title": "赤ちゃんの名前 男の子1位「朔」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601885?source=rss",
      "publishedAt": "2026-11-09T02:13:39.000Z",
      "xQuery": "赤ちゃんの名前 男の子1位「朔」"
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
