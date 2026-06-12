window.LUS_X_NEWS = {
  "updatedAt": "2026-06-12T02:25:06.717Z",
  "items": [
    {
      "time": "09:34",
      "title": "首都直下地震対策 死者半数以下へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583918?source=rss",
      "publishedAt": "2026-06-12T00:34:33.000Z",
      "xQuery": "首都直下地震対策 死者半数以下へ"
    },
    {
      "time": "11:18",
      "title": "尹氏に懲役30年 平壌への作戦指示",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583935?source=rss",
      "publishedAt": "2026-06-12T02:18:43.000Z",
      "xQuery": "尹氏に懲役30年 平壌への作戦指示"
    },
    {
      "time": "10:34",
      "title": "相模原遺体 スマホGPSもとに発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583931?source=rss",
      "publishedAt": "2026-06-12T01:34:35.000Z",
      "xQuery": "相模原遺体 スマホGPSもとに発見"
    },
    {
      "time": "10:19",
      "title": "H3ロケット6号機 打ち上げに成功",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583929?source=rss",
      "publishedAt": "2026-06-12T01:19:31.000Z",
      "xQuery": "H3ロケット6号機 打ち上げに成功"
    },
    {
      "time": "08:40",
      "title": "車立ち往生で男性保護 数分後列車",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583914?source=rss",
      "publishedAt": "2026-06-11T23:40:55.000Z",
      "xQuery": "車立ち往生で男性保護 数分後列車"
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
