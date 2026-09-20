window.LUS_X_NEWS = {
  "updatedAt": "2026-09-20T14:36:37.384Z",
  "items": [
    {
      "time": "22:44",
      "title": "台風 地域ごとの雨風強まる時間は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595966?source=rss",
      "publishedAt": "2026-09-20T13:44:31.000Z",
      "xQuery": "台風 地域ごとの雨風強まる時間は"
    },
    {
      "time": "22:32",
      "title": "北の体育相に日本側接触 返答なし",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595963?source=rss",
      "publishedAt": "2026-09-20T13:32:41.000Z",
      "xQuery": "北の体育相に日本側接触 返答なし"
    },
    {
      "time": "22:09",
      "title": "インドネシアの島 奴隷制の実態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595960?source=rss",
      "publishedAt": "2026-09-20T13:09:01.000Z",
      "xQuery": "インドネシアの島 奴隷制の実態"
    },
    {
      "time": "22:14",
      "title": "男児重体の事故 酒の影響と容疑者",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595959?source=rss",
      "publishedAt": "2026-09-20T13:14:09.000Z",
      "xQuery": "男児重体の事故 酒の影響と容疑者"
    },
    {
      "time": "23:02",
      "title": "眼鏡を拾おうと川に入る 16歳死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6595969?source=rss",
      "publishedAt": "2026-09-20T14:02:06.000Z",
      "xQuery": "眼鏡を拾おうと川に入る 16歳死亡"
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
