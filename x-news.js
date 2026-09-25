window.LUS_X_NEWS = {
  "updatedAt": "2026-09-25T08:46:10.821Z",
  "items": [
    {
      "time": "16:31",
      "title": "18歳未満選挙運動 一律禁止は違憲",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596498?source=rss",
      "publishedAt": "2026-09-25T07:31:05.000Z",
      "xQuery": "18歳未満選挙運動 一律禁止は違憲"
    },
    {
      "time": "15:28",
      "title": "台風25号 激甚災害に指定の見通し",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596487?source=rss",
      "publishedAt": "2026-09-25T06:28:00.000Z",
      "xQuery": "台風25号 激甚災害に指定の見通し"
    },
    {
      "time": "17:09",
      "title": "元力士が不明の高齢者を保護 担ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596503?source=rss",
      "publishedAt": "2026-09-25T08:09:22.000Z",
      "xQuery": "元力士が不明の高齢者を保護 担ぐ"
    },
    {
      "time": "17:05",
      "title": "ahamo「大盛りオプション」終了へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596506?source=rss",
      "publishedAt": "2026-09-25T08:05:50.000Z",
      "xQuery": "ahamo「大盛りオプション」終了へ"
    },
    {
      "time": "17:18",
      "title": "チーバくん県外活動休止 広報回答",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596510?source=rss",
      "publishedAt": "2026-09-25T08:18:10.000Z",
      "xQuery": "チーバくん県外活動休止 広報回答"
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
