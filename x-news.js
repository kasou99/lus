window.LUS_X_NEWS = {
  "updatedAt": "2026-11-18T11:10:17.843Z",
  "items": [
    {
      "time": "20:08",
      "title": "ボイジャー1号「1光日」に到達",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603070?source=rss",
      "publishedAt": "2026-11-18T11:08:03.000Z",
      "xQuery": "ボイジャー1号「1光日」に到達"
    },
    {
      "time": "17:51",
      "title": "DHC 顧客氏名など1911万件漏えい",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603058?source=rss",
      "publishedAt": "2026-11-18T08:51:06.000Z",
      "xQuery": "DHC 顧客氏名など1911万件漏えい"
    },
    {
      "time": "13:22",
      "title": "佐賀関火災1年 揺らぐ再建の思い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603021?source=rss",
      "publishedAt": "2026-11-18T04:22:31.000Z",
      "xQuery": "佐賀関火災1年 揺らぐ再建の思い"
    },
    {
      "time": "17:42",
      "title": "高市氏が中国到着 歓迎に各国と差",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603057?source=rss",
      "publishedAt": "2026-11-18T08:42:41.000Z",
      "xQuery": "高市氏が中国到着 歓迎に各国と差"
    },
    {
      "time": "18:19",
      "title": "兵庫3歳死亡 双子妹も生後に死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603061?source=rss",
      "publishedAt": "2026-11-18T09:19:32.000Z",
      "xQuery": "兵庫3歳死亡 双子妹も生後に死亡"
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
