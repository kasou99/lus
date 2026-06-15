window.LUS_X_NEWS = {
  "updatedAt": "2026-06-15T03:51:01.979Z",
  "items": [
    {
      "time": "12:20",
      "title": "米イラン和平合意 19日に覚書署名",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584310?source=rss",
      "publishedAt": "2026-06-15T03:20:00.000Z",
      "xQuery": "米イラン和平合意 19日に覚書署名"
    },
    {
      "time": "12:41",
      "title": "G7開幕へ 米と欧の溝は埋まるか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584313?source=rss",
      "publishedAt": "2026-06-15T03:41:21.000Z",
      "xQuery": "G7開幕へ 米と欧の溝は埋まるか"
    },
    {
      "time": "11:33",
      "title": "集合住宅で男性死亡 男を逮捕へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584300?source=rss",
      "publishedAt": "2026-06-15T02:33:49.000Z",
      "xQuery": "集合住宅で男性死亡 男を逮捕へ"
    },
    {
      "time": "11:57",
      "title": "2歳死亡事故 医師1人の無罪確定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584306?source=rss",
      "publishedAt": "2026-06-15T02:57:06.000Z",
      "xQuery": "2歳死亡事故 医師1人の無罪確定"
    },
    {
      "time": "11:46",
      "title": "自民議員の事務所に車衝突 男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584301?source=rss",
      "publishedAt": "2026-06-15T02:46:51.000Z",
      "xQuery": "自民議員の事務所に車衝突 男逮捕"
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
