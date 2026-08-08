window.LUS_X_NEWS = {
  "updatedAt": "2026-08-08T07:48:49.641Z",
  "items": [
    {
      "time": "14:39",
      "title": "台風13号 沖縄で転倒など5人けが",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590977?source=rss",
      "publishedAt": "2026-08-08T05:39:06.000Z",
      "xQuery": "台風13号 沖縄で転倒など5人けが"
    },
    {
      "time": "15:48",
      "title": "新潟県中越 線状降水帯発生の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590987?source=rss",
      "publishedAt": "2026-08-08T06:48:49.000Z",
      "xQuery": "新潟県中越 線状降水帯発生の恐れ"
    },
    {
      "time": "15:01",
      "title": "自民党「萩生田幹事長」案が浮上",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590982?source=rss",
      "publishedAt": "2026-08-08T06:01:53.000Z",
      "xQuery": "自民党「萩生田幹事長」案が浮上"
    },
    {
      "time": "14:08",
      "title": "琵琶湖「花火大会」3市が関与否定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590975?source=rss",
      "publishedAt": "2026-08-08T05:08:12.000Z",
      "xQuery": "琵琶湖「花火大会」3市が関与否定"
    },
    {
      "time": "16:27",
      "title": "テーマパーク値上げ 30施設超に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590991?source=rss",
      "publishedAt": "2026-08-08T07:27:43.000Z",
      "xQuery": "テーマパーク値上げ 30施設超に"
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
