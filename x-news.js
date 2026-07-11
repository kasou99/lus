window.LUS_X_NEWS = {
  "updatedAt": "2026-07-11T03:10:50.788Z",
  "items": [
    {
      "time": "12:01",
      "title": "台風9号7人ケガ 2万2000戸が停電",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587531?source=rss",
      "publishedAt": "2026-07-11T03:01:41.000Z",
      "xQuery": "台風9号7人ケガ 2万2000戸が停電"
    },
    {
      "time": "10:41",
      "title": "ベネズエラ地震 死者数4100人超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587520?source=rss",
      "publishedAt": "2026-07-11T01:41:23.000Z",
      "xQuery": "ベネズエラ地震 死者数4100人超"
    },
    {
      "time": "09:28",
      "title": "欧州機 上空で客の体一部が機外に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587512?source=rss",
      "publishedAt": "2026-07-11T00:28:34.000Z",
      "xQuery": "欧州機 上空で客の体一部が機外に"
    },
    {
      "time": "09:19",
      "title": "積み荷崩れ運転席潰れる 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587508?source=rss",
      "publishedAt": "2026-07-11T00:19:09.000Z",
      "xQuery": "積み荷崩れ運転席潰れる 男性死亡"
    },
    {
      "time": "11:01",
      "title": "歯の治療 保険適用外選ぶ患者増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587525?source=rss",
      "publishedAt": "2026-07-11T02:01:20.000Z",
      "xQuery": "歯の治療 保険適用外選ぶ患者増"
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
