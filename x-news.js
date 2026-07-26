window.LUS_X_NEWS = {
  "updatedAt": "2026-07-26T00:52:27.588Z",
  "items": [
    {
      "time": "07:54",
      "title": "相模原殺傷 道半ばの障害者理解",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589333?source=rss",
      "publishedAt": "2026-07-25T22:54:04.000Z",
      "xQuery": "相模原殺傷 道半ばの障害者理解"
    },
    {
      "time": "08:13",
      "title": "独LGBTQ祭典 車突っ込み1人死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589336?source=rss",
      "publishedAt": "2026-07-25T23:13:42.000Z",
      "xQuery": "独LGBTQ祭典 車突っ込み1人死亡"
    },
    {
      "time": "08:34",
      "title": "カザフ大統領 露に侵攻凍結を進言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589337?source=rss",
      "publishedAt": "2026-07-25T23:34:07.000Z",
      "xQuery": "カザフ大統領 露に侵攻凍結を進言"
    },
    {
      "time": "09:04",
      "title": "車が逆走か オートバイの男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589343?source=rss",
      "publishedAt": "2026-07-26T00:04:11.000Z",
      "xQuery": "車が逆走か オートバイの男性死亡"
    },
    {
      "time": "07:11",
      "title": "花火が爆発 打ち上げ船の2人搬送",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589325?source=rss",
      "publishedAt": "2026-07-25T22:11:34.000Z",
      "xQuery": "花火が爆発 打ち上げ船の2人搬送"
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
