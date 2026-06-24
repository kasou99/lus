window.LUS_X_NEWS = {
  "updatedAt": "2026-06-24T09:47:25.541Z",
  "items": [
    {
      "time": "18:06",
      "title": "自民・維新 副首都法案を国会提出",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585501?source=rss",
      "publishedAt": "2026-06-24T09:06:52.000Z",
      "xQuery": "自民・維新 副首都法案を国会提出"
    },
    {
      "time": "16:31",
      "title": "ストーカー対策アプリ 韓国で開始",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585490?source=rss",
      "publishedAt": "2026-06-24T07:31:43.000Z",
      "xQuery": "ストーカー対策アプリ 韓国で開始"
    },
    {
      "time": "17:16",
      "title": "ペルー大統領選 ケイコ氏勝利確実",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585495?source=rss",
      "publishedAt": "2026-06-24T08:16:27.000Z",
      "xQuery": "ペルー大統領選 ケイコ氏勝利確実"
    },
    {
      "time": "17:36",
      "title": "内田梨瑚被告 控訴しない方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585498?source=rss",
      "publishedAt": "2026-06-24T08:36:03.000Z",
      "xQuery": "内田梨瑚被告 控訴しない方針"
    },
    {
      "time": "18:02",
      "title": "小学校火災 洗濯物乾かしたと教師",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585500?source=rss",
      "publishedAt": "2026-06-24T09:02:21.000Z",
      "xQuery": "小学校火災 洗濯物乾かしたと教師"
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
