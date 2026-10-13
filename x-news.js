window.LUS_X_NEWS = {
  "updatedAt": "2026-10-13T10:45:51.013Z",
  "items": [
    {
      "time": "19:37",
      "title": "14日広く天気急変の恐れ 雷雨注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598644?source=rss",
      "publishedAt": "2026-10-13T10:37:34.000Z",
      "xQuery": "14日広く天気急変の恐れ 雷雨注意"
    },
    {
      "time": "18:51",
      "title": "都営地下鉄談合 5社に排除命令へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598641?source=rss",
      "publishedAt": "2026-10-13T09:51:01.000Z",
      "xQuery": "都営地下鉄談合 5社に排除命令へ"
    },
    {
      "time": "18:38",
      "title": "ゼリー詰まらせ死亡 一口サイズか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598640?source=rss",
      "publishedAt": "2026-10-13T09:38:43.000Z",
      "xQuery": "ゼリー詰まらせ死亡 一口サイズか"
    },
    {
      "time": "18:11",
      "title": "銀のさら運営 650万件情報漏洩か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598636?source=rss",
      "publishedAt": "2026-10-13T09:11:02.000Z",
      "xQuery": "銀のさら運営 650万件情報漏洩か"
    },
    {
      "time": "18:14",
      "title": "駅周辺にデータセンター計画 波紋",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598633?source=rss",
      "publishedAt": "2026-10-13T09:14:16.000Z",
      "xQuery": "駅周辺にデータセンター計画 波紋"
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
