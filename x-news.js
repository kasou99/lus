window.LUS_X_NEWS = {
  "updatedAt": "2026-08-08T10:12:42.718Z",
  "items": [
    {
      "time": "15:13",
      "title": "前回地震の教訓 生きた熊本赤十字",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590983?source=rss",
      "publishedAt": "2026-08-08T06:13:32.000Z",
      "xQuery": "前回地震の教訓 生きた熊本赤十字"
    },
    {
      "time": "18:03",
      "title": "子を産む不安 「家族留学」で変化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591007?source=rss",
      "publishedAt": "2026-08-08T09:03:54.000Z",
      "xQuery": "子を産む不安 「家族留学」で変化"
    },
    {
      "time": "18:14",
      "title": "2歳がん診断 希望の薬は5500万円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591002?source=rss",
      "publishedAt": "2026-08-08T09:14:55.000Z",
      "xQuery": "2歳がん診断 希望の薬は5500万円"
    },
    {
      "time": "18:53",
      "title": "サーフィン中に溺れ 46歳男性死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6591010?source=rss",
      "publishedAt": "2026-08-08T09:53:53.000Z",
      "xQuery": "サーフィン中に溺れ 46歳男性死亡"
    },
    {
      "time": "17:04",
      "title": "工事中転落か 建築会社社長が死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590998?source=rss",
      "publishedAt": "2026-08-08T08:04:45.000Z",
      "xQuery": "工事中転落か 建築会社社長が死亡"
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
