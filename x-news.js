window.LUS_X_NEWS = {
  "updatedAt": "2026-09-29T07:46:54.683Z",
  "items": [
    {
      "time": "14:04",
      "title": "海峡再開巡るイラン案 米拒否なぜ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596945?source=rss",
      "publishedAt": "2026-09-29T05:04:42.000Z",
      "xQuery": "海峡再開巡るイラン案 米拒否なぜ"
    },
    {
      "time": "15:41",
      "title": "母子死傷 現場近くで別の包丁発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596957?source=rss",
      "publishedAt": "2026-09-29T06:41:12.000Z",
      "xQuery": "母子死傷 現場近くで別の包丁発見"
    },
    {
      "time": "14:03",
      "title": "大雨相次ぐ千葉 高まるバス需要",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596952?source=rss",
      "publishedAt": "2026-09-29T05:03:52.000Z",
      "xQuery": "大雨相次ぐ千葉 高まるバス需要"
    },
    {
      "time": "15:01",
      "title": "遺体なき傷害致死 懲役12年を求刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596955?source=rss",
      "publishedAt": "2026-09-29T06:01:42.000Z",
      "xQuery": "遺体なき傷害致死 懲役12年を求刑"
    },
    {
      "time": "16:23",
      "title": "総務省 富山市職員を県警に告発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596959?source=rss",
      "publishedAt": "2026-09-29T07:23:00.000Z",
      "xQuery": "総務省 富山市職員を県警に告発"
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
