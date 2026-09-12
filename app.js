const loadouts = {
  m7: [
    { id:'ridgeline', name:'RIDGELINE', zh:'中距巡逻', mode:'FIELD READY', image:'assets/m7-ridgeline.png', meta:'FIELD READY', description:'以稳定视野与沉着轮廓为核心，让橄榄绿与深灰材质融入开阔地形。', tags:['低倍率瞄具','前握把','消音器'] },
    { id:'blackout', name:'BLACKOUT', zh:'近距突入', mode:'CLOSE QUARTERS', image:'assets/m7-blackout.png', meta:'CLOSE QUARTERS', description:'紧凑的深灰造型压低视觉重心，呈现果断直接的近距风格。', tags:['全息瞄具','紧凑枪口','垂直握把'] },
    { id:'vigil', name:'VIGIL', zh:'观察哨', mode:'OVERWATCH', image:'assets/m7-vigil.png', meta:'OVERWATCH', description:'沙色长线条与放大的观察视野，塑造耐心、冷静的远端姿态。', tags:['中倍率瞄具','长护木','稳固枪托'] }
  ],
  k416: [
    { id:'circuit', name:'CIRCUIT', zh:'城市潜行', mode:'URBAN FLOW', image:'assets/k416-circuit.png', meta:'URBAN FLOW', description:'蓝灰与黑色构成冷静的城市表情，短小的轮廓让视觉重心更加集中。', tags:['反射式瞄具','短护木','消音器'] },
    { id:'raider', name:'RAIDER', zh:'机动突破', mode:'RAPID ENTRY', image:'assets/k416-raider.png', meta:'RAPID ENTRY', description:'沙色与深灰形成鲜明对比，轻快的整体比例带出快速响应的气质。', tags:['全息瞄具','轻量护木','前握把'] },
    { id:'ghost', name:'GHOST', zh:'低可见度', mode:'LOW PROFILE', image:'assets/k416-ghost.png', meta:'LOW PROFILE', description:'冷白与石墨灰的双材质表面，令隐蔽风格显得更克制、更精确。', tags:['低轮廓瞄具','消音器','轻量枪托'] }
  ]
};

const swapTimers = { m7:null, k416:null };

function createCard(weapon, item, index) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'variant-card' + (index === 0 ? ' selected' : '');
  button.dataset.build = item.id;
  button.setAttribute('aria-pressed', String(index === 0));
  button.setAttribute('aria-label', weapon.toUpperCase() + ' ' + item.name + '，' + item.zh + '，点击切换展示');

  const meta = document.createElement('span');
  meta.className = 'card-meta';
  meta.textContent = String(index + 1).padStart(2, '0') + ' / ' + item.meta;
  const indicator = document.createElement('i');
  indicator.setAttribute('aria-hidden', 'true');
  meta.appendChild(indicator);

  const picture = document.createElement('span');
  picture.className = 'card-image';
  const image = document.createElement('img');
  image.src = item.image;
  image.alt = weapon.toUpperCase() + ' ' + item.name + ' 改装概念图';
  image.loading = 'lazy';
  picture.appendChild(image);

  const foot = document.createElement('span');
  foot.className = 'card-foot';
  const title = document.createElement('span');
  const english = document.createElement('strong');
  english.textContent = item.name;
  const chinese = document.createElement('small');
  chinese.textContent = item.zh;
  title.append(english, chinese);
  const arrow = document.createElement('span');
  arrow.className = 'card-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↗';
  foot.append(title, arrow);
  button.append(meta, picture, foot);
  button.addEventListener('click', () => selectLoadout(weapon, item, index));
  return button;
}

function selectLoadout(weapon, item, index) {
  const section = document.getElementById(weapon);
  const featureImage = document.getElementById(weapon + '-feature-image');
  section.querySelectorAll('.variant-card').forEach((card) => {
    const isSelected = card.dataset.build === item.id;
    card.classList.toggle('selected', isSelected);
    card.setAttribute('aria-pressed', String(isSelected));
  });

  clearTimeout(swapTimers[weapon]);
  featureImage.classList.add('is-changing');
  swapTimers[weapon] = setTimeout(() => {
    featureImage.src = item.image;
    featureImage.alt = weapon.toUpperCase() + ' ' + item.name + ' 改装概念图';
    document.getElementById(weapon + '-feature-label').textContent = 'SELECTED LOADOUT / ' + String(index + 1).padStart(2, '0');
    document.getElementById(weapon + '-feature-name').textContent = item.name;
    document.getElementById(weapon + '-feature-type').textContent = item.zh + ' / ' + item.mode;
    document.getElementById(weapon + '-feature-description').textContent = item.description;
    const tags = document.getElementById(weapon + '-feature-tags');
    tags.replaceChildren(...item.tags.map((tag) => {
      const span = document.createElement('span');
      span.textContent = tag;
      return span;
    }));
    featureImage.classList.remove('is-changing');
  }, 160);
}

for (const weapon of ['m7', 'k416']) {
  const grid = document.getElementById(weapon + '-variants');
  loadouts[weapon].forEach((item, index) => grid.appendChild(createCard(weapon, item, index)));
}

const motionToggle = document.getElementById('motion-toggle');
motionToggle.addEventListener('click', () => {
  const isPaused = document.body.classList.toggle('motion-paused');
  motionToggle.setAttribute('aria-pressed', String(isPaused));
  motionToggle.querySelector('.toggle-icon').textContent = isPaused ? '▶' : 'Ⅱ';
  motionToggle.querySelector('.toggle-text').textContent = isPaused ? '播放动态' : '暂停动态';
});
