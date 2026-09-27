window.LUS_X_NEWS = {
  "updatedAt": "2026-09-27T04:43:47.743Z",
  "items": [
    {
      "time": "13:18",
      "title": "台風 28日にかけ沖縄・奄美に接近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596704?source=rss",
      "publishedAt": "2026-09-27T04:18:02.000Z",
      "xQuery": "台風 28日にかけ沖縄・奄美に接近"
    },
    {
      "time": "09:50",
      "title": "米大統領機 CNN記者らの搭乗禁止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596685?source=rss",
      "publishedAt": "2026-09-27T00:50:55.000Z",
      "xQuery": "米大統領機 CNN記者らの搭乗禁止"
    },
    {
      "time": "13:02",
      "title": "家計影響も 10月から変わる暮らし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596703?source=rss",
      "publishedAt": "2026-09-27T04:02:05.000Z",
      "xQuery": "家計影響も 10月から変わる暮らし"
    },
    {
      "time": "10:54",
      "title": "混雑率177%も増発できず 3つの壁",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596691?source=rss",
      "publishedAt": "2026-09-27T01:54:05.000Z",
      "xQuery": "混雑率177%も増発できず 3つの壁"
    },
    {
      "time": "12:05",
      "title": "エアコンで肌トラブル 温度差注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596697?source=rss",
      "publishedAt": "2026-09-27T03:05:50.000Z",
      "xQuery": "エアコンで肌トラブル 温度差注意"
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
