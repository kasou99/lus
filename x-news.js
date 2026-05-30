window.LUS_X_NEWS = {
  "updatedAt": "2026-05-30T07:56:47.311Z",
  "items": [
    {
      "time": "14:43",
      "title": "台風6号沖縄直撃へ 西日本に接近",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582298?source=rss",
      "publishedAt": "2026-05-30T05:43:17.000Z",
      "xQuery": "台風6号沖縄直撃へ 西日本に接近"
    },
    {
      "time": "14:38",
      "title": "米長官 同盟国に防衛費増額を要求",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582297?source=rss",
      "publishedAt": "2026-05-30T05:38:10.000Z",
      "xQuery": "米長官 同盟国に防衛費増額を要求"
    },
    {
      "time": "15:24",
      "title": "栃木強殺 新たに18歳高校生を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582302?source=rss",
      "publishedAt": "2026-05-30T06:24:38.000Z",
      "xQuery": "栃木強殺 新たに18歳高校生を逮捕"
    },
    {
      "time": "14:21",
      "title": "車にはねられ2歳死亡 82歳を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582295?source=rss",
      "publishedAt": "2026-05-30T05:21:30.000Z",
      "xQuery": "車にはねられ2歳死亡 82歳を逮捕"
    },
    {
      "time": "16:36",
      "title": "大学の「100円朝食」学生が行列",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582309?source=rss",
      "publishedAt": "2026-05-30T07:36:43.000Z",
      "xQuery": "大学の「100円朝食」学生が行列"
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
