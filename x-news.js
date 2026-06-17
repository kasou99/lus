window.LUS_X_NEWS = {
  "updatedAt": "2026-06-17T10:09:01.528Z",
  "items": [
    {
      "time": "18:52",
      "title": "首相 G7で中国を名指し「懸念」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584622?source=rss",
      "publishedAt": "2026-06-17T09:52:45.000Z",
      "xQuery": "首相 G7で中国を名指し「懸念」"
    },
    {
      "time": "17:11",
      "title": "日本郵船 ペルシャ湾に約10隻残る",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584606?source=rss",
      "publishedAt": "2026-06-17T08:11:17.000Z",
      "xQuery": "日本郵船 ペルシャ湾に約10隻残る"
    },
    {
      "time": "16:58",
      "title": "自白迫られ摂食障害 娘死亡で提訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584601?source=rss",
      "publishedAt": "2026-06-17T07:58:58.000Z",
      "xQuery": "自白迫られ摂食障害 娘死亡で提訴"
    },
    {
      "time": "18:32",
      "title": "10円玉の原料価値 約10.5円に上昇",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584615?source=rss",
      "publishedAt": "2026-06-17T09:32:59.000Z",
      "xQuery": "10円玉の原料価値 約10.5円に上昇"
    },
    {
      "time": "18:17",
      "title": "「崖の上のヤギ」死ぬ 衰弱のため",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584617?source=rss",
      "publishedAt": "2026-06-17T09:17:28.000Z",
      "xQuery": "「崖の上のヤギ」死ぬ 衰弱のため"
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
