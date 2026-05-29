window.LUS_X_NEWS = {
  "updatedAt": "2026-05-29T23:37:34.443Z",
  "items": [
    {
      "time": "07:38",
      "title": "台風 1～2日にかけ沖縄奄美に接近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582244?source=rss",
      "publishedAt": "2026-05-29T22:38:37.000Z",
      "xQuery": "台風 1～2日にかけ沖縄奄美に接近"
    },
    {
      "time": "08:05",
      "title": "戦闘終結の覚書判断持ち越しか 米",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582250?source=rss",
      "publishedAt": "2026-05-29T23:05:49.000Z",
      "xQuery": "戦闘終結の覚書判断持ち越しか 米"
    },
    {
      "time": "07:30",
      "title": "強殺 逃亡の男が報酬4千万円示唆",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582241?source=rss",
      "publishedAt": "2026-05-29T22:30:26.000Z",
      "xQuery": "強殺 逃亡の男が報酬4千万円示唆"
    },
    {
      "time": "07:51",
      "title": "「少林寺」元住職 懲役24年の判決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582246?source=rss",
      "publishedAt": "2026-05-29T22:51:44.000Z",
      "xQuery": "「少林寺」元住職 懲役24年の判決"
    },
    {
      "time": "08:00",
      "title": "エステ・脱毛サロン 倒産止まらず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582248?source=rss",
      "publishedAt": "2026-05-29T23:00:29.000Z",
      "xQuery": "エステ・脱毛サロン 倒産止まらず"
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
