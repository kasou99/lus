window.LUS_X_NEWS = {
  "updatedAt": "2026-08-03T13:28:51.078Z",
  "items": [
    {
      "time": "21:50",
      "title": "経産省 イオンモール熊本本格調査",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590422?source=rss",
      "publishedAt": "2026-08-03T12:50:20.000Z",
      "xQuery": "経産省 イオンモール熊本本格調査"
    },
    {
      "time": "21:20",
      "title": "30-31日の為替介入 計11兆円超か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590420?source=rss",
      "publishedAt": "2026-08-03T12:20:08.000Z",
      "xQuery": "30-31日の為替介入 計11兆円超か"
    },
    {
      "time": "21:59",
      "title": "刑務官を起訴 受刑者に便宜約束か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590423?source=rss",
      "publishedAt": "2026-08-03T12:59:32.000Z",
      "xQuery": "刑務官を起訴 受刑者に便宜約束か"
    },
    {
      "time": "20:39",
      "title": "園のライオン3頭死ぬ 他3頭も治療",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590415?source=rss",
      "publishedAt": "2026-08-03T11:39:13.000Z",
      "xQuery": "園のライオン3頭死ぬ 他3頭も治療"
    },
    {
      "time": "19:58",
      "title": "本州最北の造り酒屋 自己破産へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590411?source=rss",
      "publishedAt": "2026-08-03T10:58:53.000Z",
      "xQuery": "本州最北の造り酒屋 自己破産へ"
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
