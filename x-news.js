window.LUS_X_NEWS = {
  "updatedAt": "2026-07-10T23:50:28.813Z",
  "items": [
    {
      "time": "07:20",
      "title": "台風9号が先島諸島に最接近 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587489?source=rss",
      "publishedAt": "2026-07-10T22:20:58.000Z",
      "xQuery": "台風9号が先島諸島に最接近 警戒"
    },
    {
      "time": "08:26",
      "title": "Apple 営業秘密流用でOpenAI提訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587501?source=rss",
      "publishedAt": "2026-07-10T23:26:40.000Z",
      "xQuery": "Apple 営業秘密流用でOpenAI提訴"
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
      "time": "07:31",
      "title": "ビル1室で3千社起業 経営実態は?",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587492?source=rss",
      "publishedAt": "2026-07-10T22:31:14.000Z",
      "xQuery": "ビル1室で3千社起業 経営実態は?"
    },
    {
      "time": "08:29",
      "title": "2Eギフテッド 抱える生きづらさ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587504?source=rss",
      "publishedAt": "2026-07-10T23:29:50.000Z",
      "xQuery": "2Eギフテッド 抱える生きづらさ"
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
