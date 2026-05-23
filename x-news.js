window.LUS_X_NEWS = {
  "updatedAt": "2026-05-23T08:19:28.864Z",
  "items": [
    {
      "time": "16:05",
      "title": "ナフサ巡るデマ論争 首相きっかけ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581370?source=rss",
      "publishedAt": "2026-05-23T07:05:20.000Z",
      "xQuery": "ナフサ巡るデマ論争 首相きっかけ"
    },
    {
      "time": "16:05",
      "title": "CPTPP非加盟の中国 行事無断開催",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581374?source=rss",
      "publishedAt": "2026-05-23T07:05:13.000Z",
      "xQuery": "CPTPP非加盟の中国 行事無断開催"
    },
    {
      "time": "16:35",
      "title": "トランプ氏 長男の結婚式を欠席へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581379?source=rss",
      "publishedAt": "2026-05-23T07:35:06.000Z",
      "xQuery": "トランプ氏 長男の結婚式を欠席へ"
    },
    {
      "time": "16:49",
      "title": "畜産用の浄化槽に転落 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581382?source=rss",
      "publishedAt": "2026-05-23T07:49:26.000Z",
      "xQuery": "畜産用の浄化槽に転落 男性死亡"
    },
    {
      "time": "17:06",
      "title": "日本コスメ 世界で勝つ打開策",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581383?source=rss",
      "publishedAt": "2026-05-23T08:06:11.000Z",
      "xQuery": "日本コスメ 世界で勝つ打開策"
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
