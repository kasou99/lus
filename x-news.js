window.LUS_X_NEWS = {
  "updatedAt": "2026-07-19T11:30:42.196Z",
  "items": [
    {
      "time": "20:15",
      "title": "内閣支持率が41%に大幅下落 毎日",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588550?source=rss",
      "publishedAt": "2026-07-19T11:15:04.000Z",
      "xQuery": "内閣支持率が41%に大幅下落 毎日"
    },
    {
      "time": "20:11",
      "title": "倒木で7人搬送「バーンと倒れた」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588548?source=rss",
      "publishedAt": "2026-07-19T11:11:22.000Z",
      "xQuery": "倒木で7人搬送「バーンと倒れた」"
    },
    {
      "time": "18:24",
      "title": "海水浴場で沈んでいる男性 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588538?source=rss",
      "publishedAt": "2026-07-19T09:24:40.000Z",
      "xQuery": "海水浴場で沈んでいる男性 死亡"
    },
    {
      "time": "17:11",
      "title": "SUP中に海転落の大学生死亡 横浜",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588524?source=rss",
      "publishedAt": "2026-07-19T08:11:16.000Z",
      "xQuery": "SUP中に海転落の大学生死亡 横浜"
    },
    {
      "time": "19:31",
      "title": "韓国「犬肉禁止」施行へ 現場葛藤",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588543?source=rss",
      "publishedAt": "2026-07-19T10:31:29.000Z",
      "xQuery": "韓国「犬肉禁止」施行へ 現場葛藤"
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
