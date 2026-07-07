window.LUS_X_NEWS = {
  "updatedAt": "2026-07-07T13:19:34.572Z",
  "items": [
    {
      "time": "20:41",
      "title": "自維 定数削減法案成立見送り確認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587097?source=rss",
      "publishedAt": "2026-07-07T11:41:33.000Z",
      "xQuery": "自維 定数削減法案成立見送り確認"
    },
    {
      "time": "20:10",
      "title": "8日 九州で35℃以上の猛暑日も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587092?source=rss",
      "publishedAt": "2026-07-07T11:10:50.000Z",
      "xQuery": "8日 九州で35℃以上の猛暑日も"
    },
    {
      "time": "21:27",
      "title": "手足口病流行 15都県で警報レベル",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587101?source=rss",
      "publishedAt": "2026-07-07T12:27:20.000Z",
      "xQuery": "手足口病流行 15都県で警報レベル"
    },
    {
      "time": "19:25",
      "title": "激しく光る物体 沖縄で目撃20分",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587086?source=rss",
      "publishedAt": "2026-07-07T10:25:25.000Z",
      "xQuery": "激しく光る物体 沖縄で目撃20分"
    },
    {
      "time": "20:48",
      "title": "ぐんまパスポート申請殺到 抽選に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587098?source=rss",
      "publishedAt": "2026-07-07T11:48:31.000Z",
      "xQuery": "ぐんまパスポート申請殺到 抽選に"
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
