window.LUS_X_NEWS = {
  "updatedAt": "2026-08-03T04:43:37.103Z",
  "items": [
    {
      "time": "13:00",
      "title": "台風 4日に小笠原諸島へ最接近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590368?source=rss",
      "publishedAt": "2026-08-03T04:00:08.000Z",
      "xQuery": "台風 4日に小笠原諸島へ最接近"
    },
    {
      "time": "11:53",
      "title": "熊本地震 ふるさと納税7.3億円超",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590359?source=rss",
      "publishedAt": "2026-08-03T02:53:46.000Z",
      "xQuery": "熊本地震 ふるさと納税7.3億円超"
    },
    {
      "time": "12:39",
      "title": "地震で頸椎損傷 高1の女性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590364?source=rss",
      "publishedAt": "2026-08-03T03:39:09.000Z",
      "xQuery": "地震で頸椎損傷 高1の女性死亡"
    },
    {
      "time": "11:46",
      "title": "イオン爆発前 戻る指示の法的責任",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590353?source=rss",
      "publishedAt": "2026-08-03T02:46:02.000Z",
      "xQuery": "イオン爆発前 戻る指示の法的責任"
    },
    {
      "time": "11:41",
      "title": "8歳男児2人はねられ 1人意識不明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590360?source=rss",
      "publishedAt": "2026-08-03T02:41:12.000Z",
      "xQuery": "8歳男児2人はねられ 1人意識不明"
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
