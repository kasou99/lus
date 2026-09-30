window.LUS_X_NEWS = {
  "updatedAt": "2026-09-30T11:40:27.141Z",
  "items": [
    {
      "time": "19:49",
      "title": "台風 30日夜から伊豆諸島に接近へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597104?source=rss",
      "publishedAt": "2026-09-30T10:49:32.000Z",
      "xQuery": "台風 30日夜から伊豆諸島に接近へ"
    },
    {
      "time": "18:48",
      "title": "25年度の介護費用 高齢化で最大に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597098?source=rss",
      "publishedAt": "2026-09-30T09:48:54.000Z",
      "xQuery": "25年度の介護費用 高齢化で最大に"
    },
    {
      "time": "20:14",
      "title": "麻生氏 土地3カ所の資産報告せず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597105?source=rss",
      "publishedAt": "2026-09-30T11:14:59.000Z",
      "xQuery": "麻生氏 土地3カ所の資産報告せず"
    },
    {
      "time": "17:35",
      "title": "妻の遺体切断し遺棄疑い 医師逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597086?source=rss",
      "publishedAt": "2026-09-30T08:35:41.000Z",
      "xQuery": "妻の遺体切断し遺棄疑い 医師逮捕"
    },
    {
      "time": "18:00",
      "title": "匿流の窃盗G指示役か 元力士逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597088?source=rss",
      "publishedAt": "2026-09-30T09:00:53.000Z",
      "xQuery": "匿流の窃盗G指示役か 元力士逮捕"
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
