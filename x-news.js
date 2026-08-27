window.LUS_X_NEWS = {
  "updatedAt": "2026-08-27T09:42:21.433Z",
  "items": [
    {
      "time": "18:01",
      "title": "秋田で線状降水帯発生の恐れ 注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593304?source=rss",
      "publishedAt": "2026-08-27T09:01:01.000Z",
      "xQuery": "秋田で線状降水帯発生の恐れ 注意"
    },
    {
      "time": "16:36",
      "title": "政府が九州応援割実施へ 熊本地震",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593288?source=rss",
      "publishedAt": "2026-08-27T07:36:03.000Z",
      "xQuery": "政府が九州応援割実施へ 熊本地震"
    },
    {
      "time": "18:01",
      "title": "草間さん死去 海外で大々的に報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593305?source=rss",
      "publishedAt": "2026-08-27T09:01:24.000Z",
      "xQuery": "草間さん死去 海外で大々的に報道"
    },
    {
      "time": "17:22",
      "title": "転落に巻き込まれ女性死亡 男逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593297?source=rss",
      "publishedAt": "2026-08-27T08:22:53.000Z",
      "xQuery": "転落に巻き込まれ女性死亡 男逮捕"
    },
    {
      "time": "17:01",
      "title": "北大 実験中に薬品浴びて学生死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6593292?source=rss",
      "publishedAt": "2026-08-27T08:01:32.000Z",
      "xQuery": "北大 実験中に薬品浴びて学生死亡"
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
