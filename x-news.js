window.LUS_X_NEWS = {
  "updatedAt": "2026-09-15T12:26:33.368Z",
  "items": [
    {
      "time": "20:01",
      "title": "16日にかけ雨強まる 冠水など注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595403?source=rss",
      "publishedAt": "2026-09-15T11:01:13.000Z",
      "xQuery": "16日にかけ雨強まる 冠水など注意"
    },
    {
      "time": "19:10",
      "title": "新党名は民主改革の会 小川氏方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595399?source=rss",
      "publishedAt": "2026-09-15T10:10:11.000Z",
      "xQuery": "新党名は民主改革の会 小川氏方針"
    },
    {
      "time": "20:22",
      "title": "マンションで5歳死亡 転落経緯は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595407?source=rss",
      "publishedAt": "2026-09-15T11:22:52.000Z",
      "xQuery": "マンションで5歳死亡 転落経緯は"
    },
    {
      "time": "20:14",
      "title": "ECMOつなぎ替え忘れの患者 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595405?source=rss",
      "publishedAt": "2026-09-15T11:14:21.000Z",
      "xQuery": "ECMOつなぎ替え忘れの患者 死亡"
    },
    {
      "time": "18:27",
      "title": "交渉し自宅療養実現 ALS患う58歳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595390?source=rss",
      "publishedAt": "2026-09-15T09:27:15.000Z",
      "xQuery": "交渉し自宅療養実現 ALS患う58歳"
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
