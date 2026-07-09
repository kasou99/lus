window.LUS_X_NEWS = {
  "updatedAt": "2026-07-09T22:02:49.864Z",
  "items": [
    {
      "time": "06:59",
      "title": "台風9号あす沖縄最接近恐れ 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587364?source=rss",
      "publishedAt": "2026-07-09T21:59:27.000Z",
      "xQuery": "台風9号あす沖縄最接近恐れ 警戒"
    },
    {
      "time": "06:35",
      "title": "米イラン 攻撃応酬で高まる緊張",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587362?source=rss",
      "publishedAt": "2026-07-09T21:35:31.000Z",
      "xQuery": "米イラン 攻撃応酬で高まる緊張"
    },
    {
      "time": "20:38",
      "title": "山本太郎氏 政界引退を表明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587340?source=rss",
      "publishedAt": "2026-07-09T11:38:41.000Z",
      "xQuery": "山本太郎氏 政界引退を表明"
    },
    {
      "time": "23:14",
      "title": "杉並区長 23日間の長期休暇取得へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587354?source=rss",
      "publishedAt": "2026-07-09T14:14:11.000Z",
      "xQuery": "杉並区長 23日間の長期休暇取得へ"
    },
    {
      "time": "06:08",
      "title": "川底で発見された高校生2人 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587359?source=rss",
      "publishedAt": "2026-07-09T21:08:06.000Z",
      "xQuery": "川底で発見された高校生2人 死亡"
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
