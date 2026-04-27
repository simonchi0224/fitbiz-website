// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.navbar-nav');
if (hamburger) {
  hamburger.addEventListener('click', () => nav.classList.toggle('open'));
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ===== 延伸閱讀自動產生 =====
const ARTICLES = [
  // 產業洞察
  { path: 'industry-insights/article-1.html', title: '台灣健身房「戰國時代」全解析：2025年市場現況與生存法則', tag: '市場分析', section: 'industry-insights', icon: '📊' },
  { path: 'industry-insights/article-2.html', title: '後疫情健身消費行為大調查：台灣會員在意什麼？', tag: '消費趨勢', section: 'industry-insights', icon: '📈' },
  { path: 'industry-insights/article-3.html', title: '連鎖 vs 獨立健身房：中小業者的差異化生存策略', tag: '競爭策略', section: 'industry-insights', icon: '🥊' },
  { path: 'industry-insights/article-4.html', title: '健身工作室崛起：一人創業的機會、風險與完整評估', tag: '創業趨勢', section: 'industry-insights', icon: '🏢' },
  { path: 'industry-insights/article-5.html', title: '台灣健身科技趨勢：App、穿戴裝置與數位整合的機會', tag: '科技趨勢', section: 'industry-insights', icon: '📱' },
  { path: 'industry-insights/article-6.html', title: '企業健康商機：B2B健身服務的市場規模與切入策略', tag: 'B2B市場', section: 'industry-insights', icon: '🏛️' },
  { path: 'industry-insights/article-7.html', title: '銀髮族健身的三道牆：心態、價格與法規，以及我們能為社會做的事', tag: '銀髮經濟', section: 'industry-insights', icon: '👴' },
  // 經營管理
  { path: 'operations/article-1.html', title: '坪效思維：健身房空間配置的財務邏輯', tag: '空間管理', section: 'operations', icon: '📐' },
  { path: 'operations/article-2.html', title: '教練薪資結構設計：留住人才又不傷現金流', tag: '人事管理', section: 'operations', icon: '👨‍🏫' },
  { path: 'operations/article-3.html', title: '健身房現金流管理：預收會費的風險與應對策略', tag: '財務管理', section: 'operations', icon: '💰' },
  { path: 'operations/article-4.html', title: 'CRM系統選型指南：健身房客戶關係管理的核心需求', tag: '系統工具', section: 'operations', icon: '💻' },
  { path: 'operations/article-5.html', title: '會員留存率提升指南：從數據看流失原因與解方', tag: '會員管理', section: 'operations', icon: '📋' },
  { path: 'operations/article-6.html', title: '健身房開業成本完整試算：從裝潢到首月營運', tag: '創業財務', section: 'operations', icon: '🏗️' },
  { path: 'operations/article-7.html', title: '多店管理的挑戰：從一間到三間分店的關鍵決策', tag: '擴張策略', section: 'operations', icon: '🗺️' },
  { path: 'operations/article-8.html', title: '健身房定價策略：月費、單堂、包套的設計邏輯', tag: '定價策略', section: 'operations', icon: '🏷️' },
  // 法規合規
  { path: 'legal/article-1.html', title: '健身教練「承攬」還是「僱傭」？一篇搞懂，不再踩地雷', tag: '勞動法', section: 'legal', icon: '⚖️' },
  { path: 'legal/article-2.html', title: '健身中心定型化契約逐條白話文解析', tag: '消費者保護', section: 'legal', icon: '📋' },
  { path: 'legal/article-3.html', title: '消防安檢完整指南：開業前你必須通過的五道關卡', tag: '消防安全', section: 'legal', icon: '🔥' },
  { path: 'legal/article-4.html', title: '勞基法排班實務：健身房老闆最常踩的5個雷', tag: '勞動法', section: 'legal', icon: '📅' },
  { path: 'legal/article-5.html', title: '健身房退費糾紛處理SOP：消費爭議不再讓你頭痛', tag: '消費者保護', section: 'legal', icon: '💬' },
  { path: 'legal/article-6.html', title: '競業禁止條款怎麼寫才有效？保護場館客戶資源的法律指南', tag: '合約保護', section: 'legal', icon: '🛡️' },
  { path: 'legal/article-7.html', title: '健身房稅務完整指南：營業稅、營所稅申報要點', tag: '稅務', section: 'legal', icon: '🧾' },
  { path: 'legal/article-8.html', title: '營業登記攻略：從選地點到拿到執照的完整流程', tag: '開業登記', section: 'legal', icon: '📝' },
  { path: 'legal/article-9.html', title: '台灣健身選址困局：國際法理比對與六大修法路徑', tag: '政策倡議', section: 'legal', icon: '🏛️' },
  { path: 'legal/article-10.html', title: '健保快撐不住了，為什麼還在把健身房擋在社區門外？', tag: '健保財政', section: 'legal', icon: '💊' },
  // 行銷獲客
  { path: 'marketing/article-1.html', title: 'Google在地SEO完整攻略：讓附近的人搜到你', tag: '搜尋行銷', section: 'marketing', icon: '🔍' },
  { path: 'marketing/article-2.html', title: 'Instagram健身內容策略：從0到10,000追蹤者的拍攝方法', tag: '社群媒體', section: 'marketing', icon: '📸' },
  { path: 'marketing/article-3.html', title: 'LINE官方帳號行銷指南：自動化留客的完整設定', tag: 'LINE行銷', section: 'marketing', icon: '💬' },
  { path: 'marketing/article-4.html', title: '健身房廣告投放實戰：Meta廣告從設定到優化', tag: '付費廣告', section: 'marketing', icon: '📣' },
  { path: 'marketing/article-5.html', title: '口碑行銷與轉介紹：讓現有會員幫你帶新客', tag: '口碑行銷', section: 'marketing', icon: '🗣️' },
  { path: 'marketing/article-6.html', title: '健身房品牌定位：在戰國時代找到你的獨特性', tag: '品牌策略', section: 'marketing', icon: '🎯' },
  { path: 'marketing/article-7.html', title: '活動企劃完整指南：體驗課、體能挑戰賽吸引新客', tag: '活動行銷', section: 'marketing', icon: '🎉' },
  // 專業培訓
  { path: 'training/article-1.html', title: '台灣健身證照完整比較：NSCA、ACSM、ACE怎麼選？', tag: '證照指南', section: 'training', icon: '🎓' },
  { path: 'training/article-2.html', title: '銀髮族功能性訓練：教練必備的長者評估與課程設計', tag: '銀髮訓練', section: 'training', icon: '👴' },
  { path: 'training/article-3.html', title: '產後恢復訓練：女性健身市場的專業切入點', tag: '特殊族群', section: 'training', icon: '👩' },
  { path: 'training/article-4.html', title: '從教練到老闆：創業前你必須具備的五個思維轉變', tag: '職涯發展', section: 'training', icon: '🚀' },
  { path: 'training/article-5.html', title: '運動傷害預防與處理：教練的法律責任與專業義務', tag: '安全責任', section: 'training', icon: '🏥' },
  { path: 'training/article-6.html', title: '線上教練業務的機會與陷阱：台灣市場的現實評估', tag: '線上服務', section: 'training', icon: '💻' },
  // 產業社群
  { path: 'community/article-1.html', title: '台灣健身器材商完整評比：2025年採購指南', tag: '供應商評測', section: 'community', icon: '🏋️' },
  { path: 'community/article-2.html', title: '健身房管理系統大評比：功能、費用、評價全比較', tag: '系統選型', section: 'community', icon: '💻' },
  { path: 'community/article-3.html', title: '業者成功案例：從15坪工作室到三家分店的真實心法', tag: '成功案例', section: 'community', icon: '📈' },
  { path: 'community/article-4.html', title: '台灣健身產業需要什麼樣的政府支持？FitBiz政策倡議白皮書', tag: '政策倡議', section: 'community', icon: '🏛️' },
  { path: 'community/article-5.html', title: 'FitBiz 2025 台灣健身產業年度報告', tag: '年度報告', section: 'community', icon: '📊' },
  { path: 'community/article-6.html', title: '合作比競爭強：台灣中小健身房的集體生存法則', tag: '產業合作', section: 'community', icon: '🤝' },
  // 經營管理（新）
  { path: 'operations/article-9.html', title: '健身房危機管理手冊：會員受傷、器材故障、負評爆發的完整應對流程', tag: '危機管理', section: 'operations', icon: '🚨' },
  // 行銷獲客（新）
  { path: 'marketing/article-8.html', title: '台灣女性健身客群深度解析：她們才是市場主力，你的行銷還在針對男性嗎？', tag: '女性市場', section: 'marketing', icon: '👩' },
];

// 交叉推薦的配對（不同分區之間互相推薦）
const CROSS_SECTION = {
  'industry-insights': 'legal',
  'legal': 'industry-insights',
  'operations': 'marketing',
  'marketing': 'operations',
  'training': 'community',
  'community': 'training',
};

function buildRelatedArticles() {
  const ctaBand = document.querySelector('.cta-band');
  if (!ctaBand) return;

  // 取得目前頁面路徑
  const currentPath = window.location.pathname.replace(/^\//, '').replace('index.html', '');
  const currentArticle = ARTICLES.find(a => currentPath.endsWith(a.path) || currentPath.includes(a.path.replace('.html', '')));
  if (!currentArticle) return;

  // 同分區的其他文章（排除自己）
  const sameSection = ARTICLES.filter(a => a.section === currentArticle.section && a.path !== currentArticle.path);
  // 交叉分區的文章
  const crossSectionName = CROSS_SECTION[currentArticle.section];
  const crossSection = ARTICLES.filter(a => a.section === crossSectionName);

  // 各取 2 篇同分區 + 1 篇跨分區
  const picks = [
    ...sameSection.sort(() => 0.5 - Math.random()).slice(0, 2),
    ...crossSection.sort(() => 0.5 - Math.random()).slice(0, 1),
  ];

  if (picks.length === 0) return;

  // 計算相對路徑前綴
  const depth = currentArticle.path.split('/').length - 1;
  const prefix = depth > 0 ? '../' : '';

  const sectionLabels = {
    'industry-insights': '產業洞察',
    'operations': '經營管理',
    'legal': '法規合規',
    'marketing': '行銷獲客',
    'training': '專業培訓',
    'community': '產業社群',
  };

  const html = `
  <section style="padding:48px 5%;background:#f8fafc;border-top:1px solid #e2e8f0;">
    <div style="max-width:800px;margin:0 auto;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
        <div style="width:4px;height:24px;background:var(--orange);border-radius:2px;"></div>
        <h3 style="font-size:1rem;font-weight:700;color:var(--navy);letter-spacing:0.5px;text-transform:uppercase;">延伸閱讀</h3>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;">
        ${picks.map(a => `
        <a href="${prefix}${a.path}" style="display:flex;gap:12px;padding:16px;background:white;border-radius:10px;border:1px solid #e2e8f0;text-decoration:none;transition:border-color 0.2s,box-shadow 0.2s;" onmouseover="this.style.borderColor='var(--orange)';this.style.boxShadow='0 2px 12px rgba(249,115,22,0.12)'" onmouseout="this.style.borderColor='#e2e8f0';this.style.boxShadow='none'">
          <span style="font-size:1.4rem;flex-shrink:0;margin-top:2px;">${a.icon}</span>
          <div>
            <div style="font-size:0.72rem;font-weight:700;color:var(--orange);margin-bottom:4px;text-transform:uppercase;letter-spacing:0.5px;">${sectionLabels[a.section]}</div>
            <div style="font-size:0.88rem;font-weight:600;color:var(--navy);line-height:1.4;">${a.title}</div>
          </div>
        </a>`).join('')}
      </div>
    </div>
  </section>`;

  ctaBand.insertAdjacentHTML('beforebegin', html);
}

document.addEventListener('DOMContentLoaded', buildRelatedArticles);

// ===== 社群分享列 =====
function buildShareBar() {
  const header = document.querySelector('.article-header');
  if (!header) return;

  const url  = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title.replace('｜FitBiz', '').trim());

  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${url}`;
  const fbUrl   = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const liUrl   = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

  const canNativeShare = navigator.share !== undefined;

  const bar = document.createElement('div');
  bar.className = 'share-bar';

  if (canNativeShare) {
    bar.innerHTML = `
      <span class="share-label">分享文章</span>
      <button class="share-btn native" id="native-share-btn">↑ 分享</button>
      <a class="share-btn line"  href="${lineUrl}" target="_blank" rel="noopener">LINE</a>
      <a class="share-btn fb"   href="${fbUrl}"   target="_blank" rel="noopener">Facebook</a>
      <button class="share-btn" id="copy-link-btn">🔗 複製連結</button>`;
  } else {
    bar.innerHTML = `
      <span class="share-label">分享文章</span>
      <a class="share-btn line"  href="${lineUrl}" target="_blank" rel="noopener">LINE</a>
      <a class="share-btn fb"   href="${fbUrl}"   target="_blank" rel="noopener">Facebook</a>
      <a class="share-btn"      href="${liUrl}"   target="_blank" rel="noopener">LinkedIn</a>
      <button class="share-btn" id="copy-link-btn">🔗 複製連結</button>`;
  }

  header.appendChild(bar);

  // 原生分享
  const nativeBtn = document.getElementById('native-share-btn');
  if (nativeBtn) {
    nativeBtn.addEventListener('click', () => {
      navigator.share({ title: document.title, url: window.location.href }).catch(() => {});
    });
  }

  // 複製連結
  const copyBtn = document.getElementById('copy-link-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        copyBtn.textContent = '✓ 已複製';
        copyBtn.classList.add('copied');
        setTimeout(() => { copyBtn.textContent = '🔗 複製連結'; copyBtn.classList.remove('copied'); }, 2000);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', buildShareBar);
