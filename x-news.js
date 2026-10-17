window.LUS_X_NEWS = {
  "updatedAt": "2026-10-17T18:40:22.791Z",
  "items": [
    {
      "time": "21:13",
      "title": "墜落の無人機胴体一部か 空自回収",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599163?source=rss",
      "publishedAt": "2026-10-17T12:13:39.000Z",
      "xQuery": "墜落の無人機胴体一部か 空自回収"
    },
    {
      "time": "22:58",
      "title": "高まる反移民感情 在留外国人最多",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599175?source=rss",
      "publishedAt": "2026-10-17T13:58:09.000Z",
      "xQuery": "高まる反移民感情 在留外国人最多"
    },
    {
      "time": "22:50",
      "title": "ITシステムの弱点 世界で発見急増",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599176?source=rss",
      "publishedAt": "2026-10-17T13:50:29.000Z",
      "xQuery": "ITシステムの弱点 世界で発見急増"
    },
    {
      "time": "23:31",
      "title": "関東で今季初の冬日 栃木県日光市",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599179?source=rss",
      "publishedAt": "2026-10-17T14:31:41.000Z",
      "xQuery": "関東で今季初の冬日 栃木県日光市"
    },
    {
      "time": "23:59",
      "title": "祭りで太鼓台の下敷き 副市長死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599181?source=rss",
      "publishedAt": "2026-10-17T14:59:55.000Z",
      "xQuery": "祭りで太鼓台の下敷き 副市長死亡"
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
