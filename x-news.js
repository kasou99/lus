window.LUS_X_NEWS = {
  "updatedAt": "2026-07-11T00:46:23.485Z",
  "items": [
    {
      "time": "08:51",
      "title": "九州で38℃予想も 各地で気温上昇",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587506?source=rss",
      "publishedAt": "2026-07-10T23:51:12.000Z",
      "xQuery": "九州で38℃予想も 各地で気温上昇"
    },
    {
      "time": "09:14",
      "title": "中国 ヘリウム輸出を一時禁止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587509?source=rss",
      "publishedAt": "2026-07-11T00:14:34.000Z",
      "xQuery": "中国 ヘリウム輸出を一時禁止"
    },
    {
      "time": "08:29",
      "title": "老舗うなぎ店で火事 千葉・成田山",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587500?source=rss",
      "publishedAt": "2026-07-10T23:29:24.000Z",
      "xQuery": "老舗うなぎ店で火事 千葉・成田山"
    },
    {
      "time": "09:28",
      "title": "欧州機 上空で客の体一部が機外に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587512?source=rss",
      "publishedAt": "2026-07-11T00:28:34.000Z",
      "xQuery": "欧州機 上空で客の体一部が機外に"
    },
    {
      "time": "09:19",
      "title": "積み荷崩れ運転席潰れる 男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587508?source=rss",
      "publishedAt": "2026-07-11T00:19:09.000Z",
      "xQuery": "積み荷崩れ運転席潰れる 男性死亡"
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
