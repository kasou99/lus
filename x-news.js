window.LUS_X_NEWS = {
  "updatedAt": "2026-08-14T23:07:33.895Z",
  "items": [
    {
      "time": "07:34",
      "title": "15日 九州-東北で急な雷雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591764?source=rss",
      "publishedAt": "2026-08-14T22:34:43.000Z",
      "xQuery": "15日 九州-東北で急な雷雨の恐れ"
    },
    {
      "time": "07:40",
      "title": "7道府県が副首都申請を検討 共同",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591762?source=rss",
      "publishedAt": "2026-08-14T22:40:04.000Z",
      "xQuery": "7道府県が副首都申請を検討 共同"
    },
    {
      "time": "07:50",
      "title": "自民幹部 靖国に集団参拝で調整",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591765?source=rss",
      "publishedAt": "2026-08-14T22:50:47.000Z",
      "xQuery": "自民幹部 靖国に集団参拝で調整"
    },
    {
      "time": "00:00",
      "title": "千葉豪雨 住民も加わり懸命な救助",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591756?source=rss",
      "publishedAt": "2026-08-14T15:00:20.000Z",
      "xQuery": "千葉豪雨 住民も加わり懸命な救助"
    },
    {
      "time": "07:43",
      "title": "映像 防犯カメラに断層出現の瞬間",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591766?source=rss",
      "publishedAt": "2026-08-14T22:43:42.000Z",
      "xQuery": "映像 防犯カメラに断層出現の瞬間"
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
