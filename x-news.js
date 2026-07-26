window.LUS_X_NEWS = {
  "updatedAt": "2026-07-26T14:35:33.726Z",
  "items": [
    {
      "time": "22:20",
      "title": "イラン報復休止 米軍攻撃停止受け",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589421?source=rss",
      "publishedAt": "2026-07-26T13:20:03.000Z",
      "xQuery": "イラン報復休止 米軍攻撃停止受け"
    },
    {
      "time": "20:49",
      "title": "強気貫く首相国会運営 身内も異論",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589414?source=rss",
      "publishedAt": "2026-07-26T11:49:12.000Z",
      "xQuery": "強気貫く首相国会運営 身内も異論"
    },
    {
      "time": "23:25",
      "title": "消費減税の可否 自民で意見集約案",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589429?source=rss",
      "publishedAt": "2026-07-26T14:25:07.000Z",
      "xQuery": "消費減税の可否 自民で意見集約案"
    },
    {
      "time": "16:43",
      "title": "ゴルフ場でカートから転落 死亡",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589389?source=rss",
      "publishedAt": "2026-07-26T07:43:42.000Z",
      "xQuery": "ゴルフ場でカートから転落 死亡"
    },
    {
      "time": "22:15",
      "title": "半年で70kg減量 体はボロボロに",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589425?source=rss",
      "publishedAt": "2026-07-26T13:15:47.000Z",
      "xQuery": "半年で70kg減量 体はボロボロに"
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
