window.LUS_X_NEWS = {
  "updatedAt": "2026-11-23T13:13:08.115Z",
  "items": [
    {
      "time": "21:54",
      "title": "露が核衛星を年内打ち上げか 報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603720?source=rss",
      "publishedAt": "2026-11-23T12:54:35.000Z",
      "xQuery": "露が核衛星を年内打ち上げか 報道"
    },
    {
      "time": "20:55",
      "title": "核のごみ巡る住民説明会 疑問の声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603713?source=rss",
      "publishedAt": "2026-11-23T11:55:40.000Z",
      "xQuery": "核のごみ巡る住民説明会 疑問の声"
    },
    {
      "time": "20:37",
      "title": "交番で警官死亡 拳銃使われた形跡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603711?source=rss",
      "publishedAt": "2026-11-23T11:37:40.000Z",
      "xQuery": "交番で警官死亡 拳銃使われた形跡"
    },
    {
      "time": "21:48",
      "title": "地銀など定期預金金利を大幅上げ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603719?source=rss",
      "publishedAt": "2026-11-23T12:48:48.000Z",
      "xQuery": "地銀など定期預金金利を大幅上げ"
    },
    {
      "time": "20:19",
      "title": "視神経細胞をシート化 東北大開発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603710?source=rss",
      "publishedAt": "2026-11-23T11:19:43.000Z",
      "xQuery": "視神経細胞をシート化 東北大開発"
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
