window.LUS_X_NEWS = {
  "updatedAt": "2026-06-12T03:49:30.521Z",
  "items": [
    {
      "time": "11:18",
      "title": "尹氏に懲役30年 平壌への作戦指示",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583935?source=rss",
      "publishedAt": "2026-06-12T02:18:43.000Z",
      "xQuery": "尹氏に懲役30年 平壌への作戦指示"
    },
    {
      "time": "12:15",
      "title": "外国人の運転事故増 交通安全白書",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583946?source=rss",
      "publishedAt": "2026-06-12T03:15:59.000Z",
      "xQuery": "外国人の運転事故増 交通安全白書"
    },
    {
      "time": "11:44",
      "title": "兵庫知事 名誉毀損容疑で記者告訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583942?source=rss",
      "publishedAt": "2026-06-12T02:44:10.000Z",
      "xQuery": "兵庫知事 名誉毀損容疑で記者告訴"
    },
    {
      "time": "12:31",
      "title": "6歳死亡 職員は男児見失っていた",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583947?source=rss",
      "publishedAt": "2026-06-12T03:31:20.000Z",
      "xQuery": "6歳死亡 職員は男児見失っていた"
    },
    {
      "time": "11:43",
      "title": "3年以上入院のタイ王女死去 47歳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583940?source=rss",
      "publishedAt": "2026-06-12T02:43:43.000Z",
      "xQuery": "3年以上入院のタイ王女死去 47歳"
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
