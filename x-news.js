window.LUS_X_NEWS = {
  "updatedAt": "2026-10-11T07:45:13.864Z",
  "items": [
    {
      "time": "14:34",
      "title": "消費減税方針は全くぶれず 片山氏",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598370?source=rss",
      "publishedAt": "2026-10-11T05:34:00.000Z",
      "xQuery": "消費減税方針は全くぶれず 片山氏"
    },
    {
      "time": "15:50",
      "title": "「18歳の壁」で就職に不安 ケア児",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598379?source=rss",
      "publishedAt": "2026-10-11T06:50:48.000Z",
      "xQuery": "「18歳の壁」で就職に不安 ケア児"
    },
    {
      "time": "16:32",
      "title": "玄関先にクマ 襲われ頭などに重傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598386?source=rss",
      "publishedAt": "2026-10-11T07:32:28.000Z",
      "xQuery": "玄関先にクマ 襲われ頭などに重傷"
    },
    {
      "time": "13:27",
      "title": "看護師が撮った動画がSNSに 解雇",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598363?source=rss",
      "publishedAt": "2026-10-11T04:27:18.000Z",
      "xQuery": "看護師が撮った動画がSNSに 解雇"
    },
    {
      "time": "15:34",
      "title": "学校隣にデータセンター計画 反発",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598378?source=rss",
      "publishedAt": "2026-10-11T06:34:23.000Z",
      "xQuery": "学校隣にデータセンター計画 反発"
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
