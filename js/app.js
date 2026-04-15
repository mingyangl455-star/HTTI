(function () {
  "use strict";

  const quiz = window.__QUIZ__;
  const personas = window.__PERSONAS__ || [];
  const P1_MID = "的气质可以概括成：";
  const P2_A = "围绕「";
  const P2_B = "」看相处细节：";
  const MATCH_PREFIX = "合拍感（参考）：";
  const WHY_DIM_FB = "好几处维度各跑各的，差点拉成拔河。";
  const EGG_META = "彩蛋位：全选「不一定」";
  const WHY_TPL_WHY_NEMESIS = "之所以落成「__TITLE__」，是因为你和「__NAME__」底层习惯反着来，凑近就容易顶牛，属于互相耗电型。问卷里最刺眼的性格差在这：__CLASH__。算分只能老实把你俩塞进「__TITLE__」，也算帮你省点社交预算。";
  const WHY_TPL_WHY_SOUL = "之所以落成「__TITLE__」，是因为你和「__NAME__」节奏太对，大事小事常撞同一个答案，抬杠也像换气。匹配一路飙高也没别的标签抢戏，于是就归到「__TITLE__」，算官方认证的「你们确实挺省事」。";
  const WHY_TPL_WHY_SHITU_BIAS = "之所以落成「__TITLE__」，是因为「__NAME__」更条理、更像带路那位，气场还压你一小头；你还跟得上，也没撕破脸。性格上一个出攻略、一个敢先踩坑，问卷就把你们按「__TITLE__」组队。";
  const WHY_TPL_WHY_SHITU_GAP = "之所以落成「__TITLE__」，是因为他做计划明显老练一截，你又更敢先试，差距够大还没对立，就被归到「__TITLE__」。典型一个写清单、一个先下单再退货。对象：__NAME__。";
  const WHY_TPL_WHY_ALLY = "之所以落成「__TITLE__」，是因为你在计划、冒险上更愿意先探头，又适合跟人并肩扛——不是发糖那种黏，是「有事真上」那种靠，所以把你和「__NAME__」丢进「__TITLE__」。";
  const WHY_TPL_WHY_PARTY = "之所以落成「__TITLE__」，是因为你俩人前都热，私下在要不要上强度、怎么列清单上却常对不上，他还更爱攒局。性格上一个负责热场、一个心里偷偷对表，于是落成「__TITLE__」：热闹管够，保质期请看生产日期。";
  const WHY_TPL_WHY_PLASTIC = "之所以落成「__TITLE__」，是因为上班能把事对齐，私下情绪聊得少，像工位买了年卡、谈心按次计费。这种「对齐KPI、不对齐心情」的组合，问卷就归到「__TITLE__」。";
  const WHY_TPL_WHY_FAKE = "之所以落成「__TITLE__」，是因为表面热，遇事一个要摊开讲、一个先装没事，又近又别扭。友情显示满格，真心话偶尔加载失败，于是把「__NAME__」归到「__TITLE__」。";
  const WHY_TPL_WHY_BAND_CLASH = "之所以落成「__TITLE__」，是因为你们性格里最拧、最不对付的几处在这：__CLASH__。别的标签装不下，只能往「__TITLE__」上贴，算诚实申报。";
  const WHY_TPL_WHY_BAND_PLAIN = "之所以落成「__TITLE__」，是因为整体匹配在中档，性格也没更抓马的剧情抢镜，就把你和「__NAME__」暂存「__TITLE__」。不深不浅，像排队领号，叫到你们再升级关系也行。";
  const SIM_TONE_VARS = {"82": ["很多事不用说满，对方也能接上——省口水，也省误会，属于懒人友好型默契。", "口味、习惯这类小事常对得上，连嫌弃都能嫌到同一个点。", "话说到一半，另一半已经懂了：再讲下去，像侮辱彼此智商。", "想偷懒、想放松的日子，也容易凑一块——连摆烂，都能摆成团队赛。"], "68": ["大事能让一步，小事吵两句，也不伤感情——属于「吵完还能点同一家外卖」。", "整体合拍，小摩擦有，但不伤根本——像手机壳有点划痕，但还能用。", "不用反复解释同一件事，沟通成本低，适合怕麻烦的人类。", "生活里有吵有让，大方向还能一起走——吵是调味，不是主菜。"], "54": ["共同点够用，不同的地方也各退一步——像互相让一下电梯位。", "不必事事一致，互相让一点，就顺很多；硬对齐，反而累。", "不装特别亲，也不装陌生人——属于「真诚，但不必交底」的舒适区。", "再近一步也行，先缓缓也行——关系进度条，你们自己拖。"], "42": ["认识但不深，聊天能接几句，不必天天联系——大家都省流量。", "要懂对方，得多花点耐心；值不值，看你们——别急着给关系办终身会员。", "礼貌互动够，私事不必全摊开；边界清楚，反而轻松。", "可以再走近一点，也可以先保持距离——别用一次热情，绑架长期节奏。"], "30": ["别指望对方猜透你的沉默、已读不回——他又不是你肚里的蛔虫。", "话说一半靠猜，猜错就容易委屈——建议把话说成「选择题」，而不是「谜语」。", "偶尔走近可以，别默认全程绑死——给彼此留点呼吸缝。", "想处得舒服，先把底线、习惯说清楚，比光靠默契省钱。"], "lo": ["合不来也不至于闹翻，就是容易踩脚——像两只脚穿一双小鞋。", "别硬凑很亲密，留距离，大家都轻松——强扭的瓜不甜，还费牙。", "口味差太多，就别硬拌一起；分开吃，各自香。", "冷淡有时是省事，不是针对你——别自我加戏。"]};
  const P2_FALLBACK_BY_REL = {"soulmate": "性格底色近，取舍也接近；分歧往往能说开——所以才敢给你这么高同步的评价。", "sworn_bros": "嘴上互损，心里互捞；吵完还能坐一桌——损是情趣，兜是正经。", "ally": "遇事先分工，少甩锅；谁冲、谁补位，相对清楚——实用主义的并肩感。", "fellow_suffering": "痛点像，槽点也像；谁先叹气，另一个秒懂——问卷觉得你们适合组队吐槽人生。", "fake_bros": "场面热，私域慢热；一谈钱或真心话，就容易卡——又熟又生，才落到这一档。", "like_only": "礼貌够，交集浅，不必共享生活——两边都接受浅尝辄止，所以停在这一档。", "plastic_work": "工作对齐，情绪各管各；私聊像走流程——同事模式写脸上，于是归在这。", "party_mate": "临时局一喊就来，长期表一推就明年——一个爱热场，一个心里对表，典型酒肉搭子节奏。", "shitu": "一个更会拆步骤，一个更敢先试错——带路的人和探路的人凑一对，标签也就这么贴上了。", "nemesis": "底层习惯反着来，凑近就吵——不是谁坏，是默认值不兼容，只能归这档，求平安。"};
  const P2_FALLBACK_DEFAULT = "性格差在习惯默认值，不是人品判决书；说清边界，比硬凑亲近省钱。";
  const STRICT_FILL_POOL = ["性格合不合，和工作合不合，经常是两套题——别用一套答案，硬套。", "有人见面社牛，遇事先缩半步——这不一定是假，是省电模式。", "吵完还能不能坐一桌吃饭，比吵的时候谁嗓门大，更说明关系底色。", "钱和人情分开谈，翻车概率会明显下降——大家都懂，只是不好意思明说。", "距离远一点，有时比硬凑近更省事——强扭的瓜不甜，还费牙。", "把话说清楚，比互相猜谜省时间——你又不是他肚里的蛔虫。", "习惯不同，不等于谁坏；只是默认值不一样，硬对齐会累。", "小事让一步，大事才看得出，愿不愿意一起扛——嘴硬没用，行动才记账。", "回复慢，不一定冷淡；也可能在忙，或在组织语言——别自我加戏。", "群里很活跃，私聊很少——是当代常见物种，不必过度解读。", "能一起把事做完，不等于要共享全部情绪——同事位和家属位，别混岗。", "你愿意说，对方愿不愿意接，是两件事——别用「真诚」，绑架「必须接住」。", "当面直说和先冷一下，没有绝对好坏，看场合——但长期只冷不说，会憋出内伤。", "计划做得细的人，未必爱社交；反过来也一样——别拿单一维度，给人判刑。", "爱冒险不等于不爱稳，只是阈值不同——一个敢冲，一个敢踩刹车，也能配。", "听劝和听话不同：一个改做法，一个改态度。", "面子给够了，里子能不能谈拢，另说。", "熟人之间，也会有不想碰的话题——这不算假。", "点赞之交不丢人；边界清楚，大家都轻松。", "同事处成朋友，要时间；处不成，也不一定是坏事。", "师徒感强不强，看的是经验，能不能落到步骤上。", "搭子关系，重点在「一起做什么」，不在「承诺多久」。", "不对付，有时是习惯撞车；不一定是人品问题。", "别用一次吵架，给整个人下结论——信息不够。", "同一件事，两个人着急的点，可能完全不一样。", "你觉得小事，对方可能很在意；反过来，也一样。", "沟通成本高的时候，先把规则说死，比谈感情管用。", "有些人适合共事，不适合深聊私事。", "有些人适合一起玩，不适合一起扛长期压力。", "关系深浅会变，别拿旧印象，硬套现在。", "你变了，他没变；或者反过来，都会让相处变味。", "同一句话，语气不同，听感差很多。", "已读不回，有很多种原因——别只往最坏想。", "约得出来，不等于随时有空；提前问一句，更稳。", "答应得快，不如答应得准；做不到，就别硬接。", "帮忙要量力而行；透支一次，后面更难补。", "拒绝不丢人；拖着不回应，才更尴尬。", "道歉有用，但改一次行为，比说十次对不起实在。", "情绪上来时，先停十秒——往往少一半后悔。", "别在饿和困的时候谈大事，成功率更高。", "公共场合给台阶，私下再把话说细——冲突好收。", "分工写清楚，比光靠默契省很多口舌。", "谁负责拍板，谁负责执行——最好一开始就讲明。", "信息同步，用一句话结论，比长语音更友好。", "反馈要具体：说「哪里不舒服」，比说「你不对」有用。", "期待对齐：你想要陪伴，对方可能只想安静。", "频率对齐：你想天天聊，对方可能习惯周更。", "节奏不对时，先调时间，再调态度。", "别用「你应该懂我」，代替把需求说清楚。", "也别用「我从不说」，代替「我其实在意」。", "有时候保持距离，是尊重，不是冷淡。", "有时候凑近一点，是关心，不是控制。", "关系里最怕的是：一个要答案，一个要空间。", "也怕：一个要速度，一个要稳妥——两边都不让步。", "能一起解决问题，比一起吐槽，更见关系质量。", "能一起休息放松，比一起赶进度，更见关系温度。", "先把当下这一件事聊透，比一次聊十件，更有效。", "今天先到这里，留一点下次再说——也不坏。"];
  const NGRAM_LEVELS = [5, 6];

  const DIM_IDS = quiz.dimensions.map((d) => d.id);

  const DIM_PHRASE = {
    social: {
      uHigh: "陌生场合或临时约，你往往先动起来，他还在加载社交条。",
      pHigh: "热闹场子里他更自在、更爱接话，你在旁边属于「能聊但不必抢麦」。",
      close: "你们对社交浓淡的偏好比较接近，不太会出现一方觉得被拖出门、另一方觉得被冷落的情况。",
    },
    structure: {
      uHigh: "你更习惯把任务拆步骤、盯节点，遇到变数时也会较快把优先级重排清楚。",
      pHigh: "他在条理、流程和数据感上往往压你一头，更会把事情拆成步骤盯到底。",
      close: "你们在「要不要按计划走」这件事上步调相近，合作时不容易为流程细节反复撕扯。",
    },
    conflict_direct: {
      uHigh: "遇到不合或看不惯的事，你更倾向当场摊开讲，而不是先晾着等情绪过去。",
      pHigh: "他在分歧面前往往更直、更敢当面说，有时你觉得冲，有时又觉得省事。",
      close: "你们处理矛盾的节奏类似，都不太喜欢无限期冷战，把话说开对你们来说是常态。",
    },
    emotion_expr: {
      uHigh: "你更常用倾诉、玩笑或自嘲把情绪放出来，而不是长期闷在心里。",
      pHigh: "他的情绪更容易挂在脸上、说出口，不太闷在心里。",
      close: "情绪表达浓淡接近，不容易把对方误读成冷漠或戏多——省掉很多内心小作文。",
    },
    risk: {
      uHigh: "面对不确定但回报更高的选项，你往往比他更愿意先试一试。",
      pHigh: "他在冒险和即兴上常常更敢冲，你要么帮他收一点，要么跟着试一把。",
      close: "你们对风险与稳妥的取舍差距不大，不太会因为「要不要赌一把」长期拧巴。",
    },
    authority: {
      uHigh: "你对前辈、规则或「过来人话术」通常更买账，愿意先听听再决定要不要照做。",
      pHigh: "他在权威、说教或层级感上，往往更敏感——要么更愿意配合，要么更反感被指挥。这和你平常买账还是硬刚的习惯，会拉出明显缝隙。",
      close: "你们在「听谁的」「服不服管」这类问题的底线比较接近，不容易在面子和自主上反复踩雷。",
    },
  };

  function maxAbs(n) {
    return Math.max(Math.abs(n.yes), Math.abs(n.no), Math.abs(n.uncertain || 0));
  }

  function computeMaxRawPerDim() {
    const maxRaw = {};
    DIM_IDS.forEach((id) => (maxRaw[id] = 0));
    quiz.questions.forEach((q) => {
      DIM_IDS.forEach((dim) => {
        const w = q.weights && q.weights[dim];
        if (w) maxRaw[dim] += maxAbs(w);
      });
    });
    return maxRaw;
  }

  const MAX_RAW = computeMaxRawPerDim();

  function emptyVector() {
    const v = {};
    DIM_IDS.forEach((id) => (v[id] = 0));
    return v;
  }

  function aggregateUserVector(answersByQuestionId) {
    const raw = emptyVector();
    quiz.questions.forEach((q) => {
      const key = answersByQuestionId[q.id];
      if (!key) return;
      DIM_IDS.forEach((dim) => {
        const w = q.weights && q.weights[dim];
        if (!w) return;
        const add = w[key];
        if (typeof add === "number") raw[dim] += add;
      });
    });
    const norm = {};
    DIM_IDS.forEach((dim) => {
      const m = MAX_RAW[dim] || 1;
      norm[dim] = Math.max(-1, Math.min(1, raw[dim] / m));
    });
    return { raw, norm };
  }

  function vectorToArray(v) {
    return DIM_IDS.map((id) => v[id] || 0);
  }

  function l2(a) {
    return Math.sqrt(a.reduce((s, x) => s + x * x, 0));
  }

  function dot(a, b) {
    let s = 0;
    for (let i = 0; i < a.length; i++) s += a[i] * b[i];
    return s;
  }

  function cosineSimilarity(u, p) {
    const ua = vectorToArray(u);
    const pa = vectorToArray(p);
    const lu = l2(ua);
    const lp = l2(pa);
    if (lu < 1e-6 || lp < 1e-6) return 0;
    return dot(ua, pa) / (lu * lp);
  }

  function sim01(cos) {
    return (cos + 1) / 2;
  }

  function relationFromBands(s01) {
    const bands = quiz.relationshipBands;
    for (let i = 0; i < bands.length; i++) {
      if (s01 >= bands[i].minSim) {
        const id = bands[i].relationId;
        return quiz.relationshipCatalog.find((r) => r.id === id) || quiz.relationshipCatalog[0];
      }
    }
    return quiz.relationshipCatalog.find((r) => r.id === "like_only");
  }

  function pickRelation(userNorm, persona, cos) {
    const s = sim01(cos);
    let rel = relationFromBands(s);
    let reasonKey = "similarity_band";
    const u = userNorm;
    const p = persona.vector;

    const ds = (u.structure ?? 0) - (p.structure ?? 0);
    const dSoc = Math.abs((u.social ?? 0) - (p.social ?? 0));
    const dStr = Math.abs((u.structure ?? 0) - (p.structure ?? 0));
    const dEmo = Math.abs((u.emotion_expr ?? 0) - (p.emotion_expr ?? 0));
    const cU = u.conflict_direct ?? 0;
    const cP = p.conflict_direct ?? 0;

    const mentorish =
      (p.structure ?? 0) - (u.structure ?? 0) >= 0.42 &&
      (p.authority ?? 0) - (u.authority ?? 0) >= 0.28 &&
      s >= 0.34 &&
      s <= 0.8;

    const studentish =
      (u.structure ?? 0) - (p.structure ?? 0) >= 0.4 &&
      (u.risk ?? 0) - (p.risk ?? 0) >= 0.18 &&
      s >= 0.34 &&
      s <= 0.78;

    const partyBuddy =
      s >= 0.46 &&
      dSoc < 0.28 &&
      dStr > 0.42 &&
      persona.archetypeHints &&
      persona.archetypeHints.partyEnergy;

    const workAlly =
      s >= 0.5 &&
      s <= 0.74 &&
      dStr < 0.24 &&
      dEmo > 0.38;

    const rivalish =
      s >= 0.44 &&
      s <= 0.7 &&
      cU * cP < 0 &&
      Math.abs(cU - cP) >= 0.85 &&
      persona.archetypeHints &&
      (persona.archetypeHints.rivalBias || persona.archetypeHints.rebel);

    const strongOppose = cos <= -0.08 || s < 0.26;

    const byId = (id) => quiz.relationshipCatalog.find((r) => r.id === id);

    if (strongOppose) {
      rel = byId("nemesis");
      reasonKey = "nemesis_vector_clash";
    } else if (mentorish && persona.archetypeHints && persona.archetypeHints.mentorBias) {
      rel = byId("shitu");
      reasonKey = "shitu_mentor_bias";
    } else if (mentorish && s < 0.72 && ds < -0.25) {
      rel = byId("shitu");
      reasonKey = "shitu_structure_gap";
    } else if (studentish) {
      rel = byId("ally");
      reasonKey = "ally_studentish";
    } else if (partyBuddy) {
      rel = byId("party_mate");
      reasonKey = "party_mate_energy";
    } else if (workAlly) {
      rel = byId("plastic_work");
      reasonKey = "plastic_work_task";
    } else if (rivalish) {
      rel = byId("fake_bros");
      reasonKey = "fake_bros_rival";
    }

    if (!strongOppose && s >= 0.82) {
      rel = byId("soulmate");
      reasonKey = "soulmate_similarity_peak";
    }

    return {
      relation: rel,
      cos,
      sim01: s,
      reasonKey,
      debug: {},
    };
  }

  function relationCandidatesBySimilarity(s01) {
    const seen = new Set();
    const ids = [];
    for (let i = 0; i < quiz.relationshipBands.length; i++) {
      const b = quiz.relationshipBands[i];
      if (s01 >= b.minSim && !seen.has(b.relationId)) {
        ids.push(b.relationId);
        seen.add(b.relationId);
      }
    }
    for (let i = 0; i < quiz.relationshipCatalog.length; i++) {
      const id = quiz.relationshipCatalog[i].id;
      if (!seen.has(id)) {
        ids.push(id);
        seen.add(id);
      }
    }
    return ids;
  }

  function resolveUniqueResultRows(norm, rawRows) {
    const byId = (id) => quiz.relationshipCatalog.find((r) => r.id === id) || quiz.relationshipCatalog[0];
    const groups = new Map();
    rawRows.forEach((item, idx) => {
      const id = item.relation.id;
      if (!groups.has(id)) groups.set(id, []);
      groups.get(id).push({ item, idx });
    });

    const used = new Set();
    const out = new Array(rawRows.length);
    const pending = [];

    groups.forEach((list) => {
      list.sort((a, b) => b.item.s - a.item.s || String(a.item.persona.id || "").localeCompare(String(b.item.persona.id || "")));
      const win = list[0];
      used.add(win.item.relation.id);
      out[win.idx] = win.item;
      for (let i = 1; i < list.length; i++) pending.push(list[i]);
    });

    pending.sort((a, b) => b.item.s - a.item.s || String(a.item.persona.id || "").localeCompare(String(b.item.persona.id || "")));
    pending.forEach(({ item, idx }) => {
      const ids = relationCandidatesBySimilarity(item.s);
      const pickId = ids.find((id) => !used.has(id)) || "like_only";
      used.add(pickId);
      const relation = byId(pickId);
      const reasonKey = "slot_reassigned";
      const story = buildRelationStory(norm, item.persona, relation, item.cos, item.s, reasonKey);
      out[idx] = {
        persona: item.persona,
        relation,
        story,
        hint: story.extra,
        s: item.s,
        imgSrc: item.imgSrc,
        cos: item.cos,
      };
    });

    return out;
  }

  function hashSeed(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) {
      h = (h * 33) ^ str.charCodeAt(i);
    }
    return h >>> 0;
  }

  function escapeXml(t) {
    return String(t)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function generatedAvatarUrl(persona) {
    const seed = hashSeed((persona.id || "") + (persona.name || ""));
    const h1 = seed % 360;
    const h2 = (seed * 13 + 47) % 360;
    const initial = (persona.name && persona.name.trim()[0]) || "?";
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">` +
      `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
      `<stop offset="0%" stop-color="hsl(${h1},65%,52%)"/>` +
      `<stop offset="100%" stop-color="hsl(${h2},55%,38%)"/>` +
      `</linearGradient></defs>` +
      `<rect width="120" height="120" rx="26" fill="url(#g)"/>` +
      `<text x="60" y="74" text-anchor="middle" font-size="44" fill="rgba(255,255,255,0.92)" ` +
      `font-family="system-ui,-apple-system,PingFang SC,Microsoft YaHei,sans-serif" font-weight="700">` +
      escapeXml(initial) +
      `</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  function personaAvatarSrc(persona) {
    if (persona.avatar && String(persona.avatar).trim()) return persona.avatar;
    return generatedAvatarUrl(persona);
  }

  function topDimensionDiffs(u, p, n) {
    const rows = DIM_IDS.map((dim) => {
      const du = u[dim] ?? 0;
      const dp = p[dim] ?? 0;
      const diff = du - dp;
      return { dim, diff, ad: Math.abs(diff) };
    }).sort((a, b) => b.ad - a.ad);
    return rows.slice(0, n);
  }

  function phraseForDim(dim, diff) {
    const ph = DIM_PHRASE[dim];
    if (!ph) return "";
    if (diff > 0.22) return ph.uHigh;
    if (diff < -0.22) return ph.pHigh;
    return ph.close;
  }

  const RELATION_VOICE = {
    soulmate: [
      "很多事不用解释太久，你们常常一开始就想到同一个方向——省口水，也省误会。",
      "你碎碎念他听得进，你钻牛角尖他也敢拽你出来，嘴上嫌弃，手上很诚实。",
      "连今天吃啥都能撞答案，默契到有点懒得吵架。",
    ],
    sworn_bros: [
      "吵归吵怼归怼，真出事了你身体比脑子先想到找他。",
      "他嘴上损你两句，下一句常常是「我来兜」——损归趣，兜归正。",
      "外人看你们互损，你们心里门儿清：这是盖章认证的信得过。",
    ],
    ally: [
      "目标定了他会跟你对进度，你卡住他真拉一把，不是嘴上「加油」那种。",
      "你顶前面时，他在旁边补位，事不至于散成一地鸡毛。",
      "谁冲前谁殿后看局都无所谓，但大方向一条线，像组队打本那样谁拿输出谁拿奶心里有数。",
    ],
    fellow_suffering: [
      "谁先叹气另一个都接得住，吐槽还容易撞同一个槽点。",
      "他说难处不硬装英雄，你也更敢承认累，装没事太累了，你们互相放行。",
      "一句「我懂」比小作文安慰顶用，情绪到账快。",
    ],
    fake_bros: [
      "见面很热闹，一谈钱或者掏心就容易冷场，热的是气氛，冷的是保险丝。",
      "场面话会说齐，心里都懂：有些真话要留三分，不然社交要超载。",
      "表情包能共用，真心话不一定同步——属于「已读，但选择性地懂」那种。",
    ],
    like_only: [
      "交集不深但体面，彼此知道有这个人就行，不必把生活叠成双人床。",
      "他对你的好奇不追着你问，你也舒服地保持距离，礼貌型互相放过。",
      "点头打招呼够，私域密码不必交换，大家都省事。",
    ],
    plastic_work: [
      "KPI 一上墙，你们能把流程跑完——工作人格在线，生活人格下班，各自回家。",
      "会议室对齐工位客气，私聊窗口常停在「收到」，温度写不进日报但事能结。",
      "下班铃一响，话题自然切回「明天再说」——今天先把班味儿洗掉。",
    ],
    party_mate: [
      "场子热得快，约饭约局很顺，长期承诺？那属于另一个文件夹。",
      "他攒局，你续气氛：一个负责开局，一个负责别让冷场落地。",
      "一起玩最合拍，长期规划另说——先把今晚的快乐结个账。",
    ],
    shitu: [
      "一个更会总结路线，一个更敢先动手试，一个怕踩坑，一个偏想踩。",
      "他把经验拆成步骤讲，你听进去就少交学费——他嘴碎点你也认了。",
      "你犯傻他常用「我也干过」来接，比「我早就说过」温柔一百倍。",
    ],
    nemesis: [
      "关键问题上你们常反着来，聊深了像同时按两个遥控器——频道对不上。",
      "他一开口你就知道又要别扭，少见面反而省心，属于物理降温。",
      "不是谁坏，是凑太近小事也容易升级——距离产生美，也产生和平。",
    ],
  };

  function relationVoiceLine(relationId, personaId) {
    const list = RELATION_VOICE[relationId] || RELATION_VOICE.like_only;
    const i = hashSeed(String(relationId) + String(personaId || "")) % list.length;
    return list[i];
  }

  const STORY_OPENERS = [
    "直白点说，",
    "实话讲，",
    "不搞对立，就说差异：",
    "你俩最容易卡住的，",
    "放在生活里看，",
    "举个例子，",
    "一口价总结：",
    "卸妆看，",
  ];

  function pickStoryOpener(personaId, relationId) {
    const i = hashSeed(String(personaId || "") + String(relationId || "")) % STORY_OPENERS.length;
    return STORY_OPENERS[i];
  }

  function simToneBucket(sv) {
    if (sv >= 0.82) return "82";
    if (sv >= 0.68) return "68";
    if (sv >= 0.54) return "54";
    if (sv >= 0.42) return "42";
    if (sv >= 0.3) return "30";
    return "lo";
  }

  function pickSimToneSentence(sv, relationId, personaId) {
    const b = simToneBucket(sv);
    const list = SIM_TONE_VARS[b] || SIM_TONE_VARS.lo || [];
    if (!list.length) return "";
    const i = hashSeed(String(relationId || "") + String(personaId || "") + b) % list.length;
    return list[i] || "";
  }

  function dimLabel(dimId) {
    const d = quiz.dimensions.find((x) => x.id === dimId);
    return d ? d.label : dimId;
  }

  function dimClashPhrase(userNorm, persona, n) {
    const u = userNorm;
    const p = persona.vector;
    const rows = topDimensionDiffs(u, p, n);
    return rows
      .filter(({ ad }) => ad >= 0.28)
      .map(({ dim, diff }) => {
        const lab = dimLabel(dim);
        if (diff > 0) return `「${lab}」上你更靠前，他更靠另一端`;
        return `「${lab}」上他更靠前，你更靠另一端`;
      })
      .join("；");
  }

  function normTxt(t) {
    return String(t || "").replace(/\s+/g, " ").trim();
  }

  function splitSentencesCN(text) {
    const t = String(text || "").trim();
    if (!t) return [];
    const out = [];
    let buf = "";
    for (let i = 0; i < t.length; i++) {
      buf += t[i];
      if (/[\u3002\uff01\uff1f\uff1b]/.test(t[i])) {
        const seg = buf.trim();
        if (seg) out.push(seg);
        buf = "";
      }
    }
    const tail = buf.trim();
    if (tail) out.push(tail);
    return out;
  }

  function dedupeStoryNarrative(st) {
    const order = ["why", "p1", "tone", "p2", "p3", "extra"];
    const seen = new Set();
    const res = {};
    for (const k of order) {
      const raw = st[k];
      if (raw == null || raw === "") {
        res[k] = k === "extra" ? null : "";
        continue;
      }
      const sents = splitSentencesCN(raw);
      const kept = [];
      for (const s of sents) {
        const nk = normTxt(s);
        if (!nk) continue;
        if (seen.has(nk)) continue;
        seen.add(nk);
        kept.push(s);
      }
      const joined = kept.join("");
      res[k] = joined || (k === "extra" ? null : "");
    }
    return res;
  }

  function fillWhyTpl(tpl, o) {
    return tpl
      .replace(/__TITLE__/g, o.title)
      .replace(/__NAME__/g, o.name)
      .replace(/__PCT__/g, String(o.pct))
      .replace(/__COS__/g, o.cos)
      .replace(/__CLASH__/g, o.clash);
  }

  function buildWhyThisRelation(reasonKey, relation, userNorm, persona, cos, s) {
    const title = relation.title;
    const name = persona.name || "他";
    const pct = Math.round(s * 100);
    const clashRaw = dimClashPhrase(userNorm, persona, 3);
    const cosStr = cos.toFixed(2);
    const oBase = { title, name, pct, cos: cosStr };
    const oWithFb = Object.assign({}, oBase, { clash: clashRaw || WHY_DIM_FB });
    const oBand = Object.assign({}, oBase, { clash: clashRaw || "" });
    switch (reasonKey) {
      case "nemesis_vector_clash":
        return fillWhyTpl(WHY_TPL_WHY_NEMESIS, oWithFb);
      case "soulmate_similarity_peak":
        return fillWhyTpl(WHY_TPL_WHY_SOUL, oWithFb);
      case "shitu_mentor_bias":
        return fillWhyTpl(WHY_TPL_WHY_SHITU_BIAS, oWithFb);
      case "shitu_structure_gap":
        return fillWhyTpl(WHY_TPL_WHY_SHITU_GAP, oWithFb);
      case "ally_studentish":
        return fillWhyTpl(WHY_TPL_WHY_ALLY, oWithFb);
      case "party_mate_energy":
        return fillWhyTpl(WHY_TPL_WHY_PARTY, oWithFb);
      case "plastic_work_task":
        return fillWhyTpl(WHY_TPL_WHY_PLASTIC, oWithFb);
      case "fake_bros_rival":
        return fillWhyTpl(WHY_TPL_WHY_FAKE, oWithFb);
      case "slot_reassigned":
        return "";
      case "similarity_band":
        return fillWhyTpl(clashRaw ? WHY_TPL_WHY_BAND_CLASH : WHY_TPL_WHY_BAND_PLAIN, clashRaw ? oBand : oWithFb);
      default:
        return fillWhyTpl(clashRaw ? WHY_TPL_WHY_BAND_CLASH : WHY_TPL_WHY_BAND_PLAIN, clashRaw ? oBand : oWithFb);
    }
  }

  function buildRelationStory(userNorm, persona, relation, cos, s, reasonKey) {
    const u = userNorm;
    const p = persona.vector;
    const top = topDimensionDiffs(u, p, 3);

    const why = buildWhyThisRelation(reasonKey, relation, userNorm, persona, cos, s);
    const p1 = relation.title + P1_MID + relation.blurb;
    const tone = pickSimToneSentence(s, relation.id, persona.id);
    const p2fb = P2_FALLBACK_BY_REL[relation.id] || P2_FALLBACK_DEFAULT;

    const dimPartsRaw = top
      .map(({ dim, diff }) => phraseForDim(dim, diff))
      .filter(Boolean);
    const dimSeen = new Set();
    const dimParts = [];
    for (let i = 0; i < dimPartsRaw.length; i++) {
      const ph = dimPartsRaw[i];
      const nk = normTxt(ph);
      if (dimSeen.has(nk)) continue;
      dimSeen.add(nk);
      dimParts.push(ph);
    }
    const opener = pickStoryOpener(persona.id, relation.id);
    const p2 =
      dimParts.length > 0
        ? `${P2_A}${relation.title}${P2_B}${opener}${dimParts.join("")}`.trim()
        : `${P2_A}${relation.title}${P2_B}${opener}${p2fb}`.trim();

    const p3 = relationVoiceLine(relation.id, persona.id);

    const extra = secondaryHint(userNorm, persona, relation.id, s);
    const merged = dedupeStoryNarrative({ why, p1, tone, p2, p3, extra });
    if (!merged.p2) {
      merged.p2 =
        dimParts.length > 0
          ? `${P2_A}${relation.title}${P2_B}${opener}`.trim()
          : `${P2_A}${relation.title}${P2_B}${opener}${p2fb}`.trim();
    }
    return merged;
  }

  function normGramSource(text) {
    return String(text || "").replace(/\s+/g, "").trim();
  }

  function createGramBank() {
    const byN = {};
    for (let i = 0; i < NGRAM_LEVELS.length; i++) {
      byN[NGRAM_LEVELS[i]] = new Set();
    }
    return { byN };
  }

  function hasGramConflict(text, bank) {
    const s = normGramSource(text);
    if (!s) return false;
    for (let ni = 0; ni < NGRAM_LEVELS.length; ni++) {
      const n = NGRAM_LEVELS[ni];
      const set = bank.byN[n];
      if (s.length < n) continue;
      for (let i = 0; i <= s.length - n; i++) {
        if (set.has(s.slice(i, i + n))) return true;
      }
    }
    return false;
  }

  function commitGrams(text, bank) {
    const s = normGramSource(text);
    if (!s) return;
    for (let ni = 0; ni < NGRAM_LEVELS.length; ni++) {
      const n = NGRAM_LEVELS[ni];
      const set = bank.byN[n];
      if (s.length < n) continue;
      for (let i = 0; i <= s.length - n; i++) {
        set.add(s.slice(i, i + n));
      }
    }
  }

  function splitIntoAtomicUnits(text) {
    const t = String(text || "").trim();
    if (!t) return [];
    const sentences = splitSentencesCN(t);
    const units = [];
    for (let si = 0; si < sentences.length; si++) {
      const sent = sentences[si].trim();
      if (!sent) continue;
      if (sent.length <= 24) {
        units.push(sent);
        continue;
      }
      const chunks = sent.split(/[\u3001\uff0c\uff1b\uff1a]/);
      if (chunks.length === 1) {
        units.push(sent);
        continue;
      }
      for (let ci = 0; ci < chunks.length; ci++) {
        const c = chunks[ci].trim();
        if (c) units.push(c);
      }
    }
    return units.length ? units : [t];
  }

  function pickFromStrictPool(salt, bank) {
    const pool = STRICT_FILL_POOL || [];
    if (!pool.length) return "";
    const base = hashSeed(String(salt || ""));
    for (let j = 0; j < pool.length; j++) {
      const line = pool[(base + j) % pool.length];
      if (line && !hasGramConflict(line, bank)) {
        commitGrams(line, bank);
        return line;
      }
    }
    const h = hashSeed(String(salt) + ":strict");
    const line = "补位编号" + String(h % 100000) + "：此卡片独用词块，不与其他标签复用。";
    if (!hasGramConflict(line, bank)) {
      commitGrams(line, bank);
      return line;
    }
    return "";
  }

  function stripFieldAgainstGrams(raw, bank, salt) {
    if (raw == null || raw === "") return "";
    const units = splitIntoAtomicUnits(raw);
    const kept = [];
    for (let ui = 0; ui < units.length; ui++) {
      const u = units[ui];
      if (!hasGramConflict(u, bank)) {
        commitGrams(u, bank);
        kept.push(u);
      } else {
        const rep = pickFromStrictPool(salt + ":" + ui, bank);
        if (rep) kept.push(rep);
      }
    }
    return kept.join("");
  }

  function applyGlobalStrictNgramDedupe(rows, bank) {
    const fieldOrder = ["why", "p1", "tone", "p2", "p3", "extra"];
    for (let ri = 0; ri < rows.length; ri++) {
      const row = rows[ri];
      const st = row.story;
      const rid = row.relation && row.relation.id;
      const pid = (row.persona && row.persona.id) || "";
      for (let fi = 0; fi < fieldOrder.length; fi++) {
        const k = fieldOrder[fi];
        const raw = st[k];
        if (raw == null || raw === "") {
          if (k === "extra") st[k] = null;
          else st[k] = "";
          continue;
        }
        st[k] = stripFieldAgainstGrams(raw, bank, ri + ":" + rid + ":" + pid + ":" + k);
        if (k === "extra" && !String(st[k] || "").trim()) st[k] = null;
      }
    }
  }

  function rebuildP2Strict(row, bank) {
    const rel = row.relation;
    const persona = row.persona;
    const opener = pickStoryOpener(persona.id, rel.id);
    const fb = P2_FALLBACK_BY_REL[rel.id] || P2_FALLBACK_DEFAULT;
    const cands = [];
    cands.push(`${P2_A}${rel.title}${P2_B}${opener}${fb}`.trim());
    cands.push(`${P2_A}${rel.title}${P2_B}${opener}${fb}（落在${persona.name || "这位"}身上又多一层个人习惯）`.trim());
    cands.push(`${P2_A}${rel.title}${P2_B}${opener}落在${persona.name || "这位"}这边的细节缝进「${rel.title}」里，读出来会是另一条副线。`.trim());
    for (let i = 0; i < cands.length; i++) {
      const c = cands[i];
      if (c && !hasGramConflict(c, bank)) {
        commitGrams(c, bank);
        return c;
      }
    }
    const salt = (rel.id || "") + ":" + (persona.id || "") + ":p2fb";
    return pickFromStrictPool(salt, bank);
  }

  function refillStoryFieldsStrict(rows, bank) {
    const fieldOrder = ["why", "tone", "p3", "p2", "p1", "extra"];
    for (let ri = 0; ri < rows.length; ri++) {
      const row = rows[ri];
      const st = row.story;
      const rid = row.relation && row.relation.id;
      const pid = (row.persona && row.persona.id) || "";
      const saltBase = ri + ":" + rid + ":" + pid;
      for (let fi = 0; fi < fieldOrder.length; fi++) {
        const k = fieldOrder[fi];
        if (k === "extra") continue;
        const cur = st[k];
        if (cur != null && String(cur).trim()) continue;
        if (k === "p1") {
          const rel = row.relation;
          const baseP1 = rel.title + P1_MID + rel.blurb;
          let p1 = stripFieldAgainstGrams(baseP1, bank, saltBase + ":p1re");
          if (!String(p1 || "").trim()) p1 = pickFromStrictPool(saltBase + ":p1", bank);
          st.p1 = p1;
          continue;
        }
        if (k === "p2") {
          let p2 = rebuildP2Strict(row, bank);
          if (!String(p2 || "").trim()) p2 = pickFromStrictPool(saltBase + ":p2x", bank);
          st.p2 = p2;
          continue;
        }
        st[k] = pickFromStrictPool(saltBase + ":" + k, bank);
      }
      if (!String(st.extra || "").trim()) st.extra = null;
    }
  }

  function secondaryHint(userNorm, persona, primaryId, s) {
    const p = persona.vector;
    const u = userNorm;
    if (primaryId === "shitu" && Math.abs((u.risk ?? 0) - (p.risk ?? 0)) < 0.2) {
      return "冒险这块，你俩也敢冲；更像组队往前拱，不是单方面上课——所以师徒味里，带点「兄弟别怂」。";
    }
    if (primaryId === "party_mate" && (u.structure ?? 0) > 0.35) {
      return "他爱攒局，你爱对表；玩完收拾残局，常落你头上——分工有点损，但挺真实。";
    }
    if (primaryId === "fake_bros" && s > 0.55) {
      return "看着熟，吵起来一个要当场拆雷、一个只想先糊弄过去——又近又别扭，才像这档关系。";
    }
    return null;
  }

  const elIntro = document.getElementById("screen-intro");
  const elQuiz = document.getElementById("screen-quiz");
  const elResult = document.getElementById("screen-result");
  const elStart = document.getElementById("btn-start");
  const elNext = document.getElementById("btn-next");
  const elBack = document.getElementById("btn-back");
  const elProgress = document.getElementById("progress-text");
  const elQText = document.getElementById("question-text");
  const elOpts = document.getElementById("options");
  const elCards = document.getElementById("result-cards");
  const elWarn = document.getElementById("uncertain-warn");
  const elDisclaimer = document.getElementById("disclaimer");

  let idx = 0;
  const answers = {};

  function setScreen(name) {
    [elIntro, elQuiz, elResult].forEach((n) => n && n.classList.add("hidden"));
    if (name === "intro") elIntro.classList.remove("hidden");
    if (name === "quiz") elQuiz.classList.remove("hidden");
    if (name === "result") elResult.classList.remove("hidden");
  }

  function countUncertain() {
    let c = 0;
    Object.keys(answers).forEach((k) => {
      if (answers[k] === "uncertain") c++;
    });
    return c;
  }

  function renderQuestion() {
    const q = quiz.questions[idx];
    elProgress.textContent = `第 ${idx + 1} / ${quiz.questions.length} 题`;
    elQText.textContent = q.text;
    elOpts.innerHTML = "";
    quiz.optionKeys.forEach((k) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "opt-btn";
      b.dataset.value = k;
      b.textContent = quiz.optionLabels[k];
      if (answers[q.id] === k) b.classList.add("selected");
      b.addEventListener("click", () => {
        answers[q.id] = k;
        Array.from(elOpts.querySelectorAll(".opt-btn")).forEach((x) => x.classList.remove("selected"));
        b.classList.add("selected");
        elNext.disabled = false;
      });
      elOpts.appendChild(b);
    });
    elNext.disabled = !answers[q.id];
    elBack.disabled = idx === 0;
    elWarn.classList.toggle("hidden", countUncertain() < 8);
  }

  function escapeHtml(text) {
    const d = document.createElement("div");
    d.textContent = text;
    return d.innerHTML;
  }

  function allUncertainAnswers() {
    if (!quiz.questions.length) return false;
    return quiz.questions.every((q) => answers[q.id] === "uncertain");
  }

  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  function zackeryAvatarUrl() {
    return generatedAvatarUrl({ id: "zackery_egg", name: "Zackery" });
  }

  function goResultZackeryEgg() {
    elCards.innerHTML = "";
    const accordion = document.createElement("div");
    accordion.className = "result-accordion result-accordion--egg";

    const titles = quiz.relationshipCatalog.map((r) => r.title);
    const four = shuffleArray(titles).slice(0, 4);
    const eggLine = "全选「不一定」还想看正经结果？我觉得公司「不一定」需要你了。";

    four.forEach((tagLabel) => {
      const row = document.createElement("div");
      row.className = "result-row";

      const tagBtn = document.createElement("button");
      tagBtn.type = "button";
      tagBtn.className = "relation-tag-btn";
      tagBtn.textContent = tagLabel;
      tagBtn.setAttribute("aria-expanded", "false");

      const detail = document.createElement("div");
      detail.className = "tag-detail hidden";
      const img = zackeryAvatarUrl();
      detail.innerHTML = `
        <div class="tag-detail-inner tag-detail--egg">
          <div class="card-head">
            <img class="avatar" src="${img}" alt="" width="72" height="72" loading="lazy" />
            <div>
              <h3 class="card-name">Zackery</h3>
              <p class="card-meta">${EGG_META}</p>
            </div>
          </div>
          <p class="detail-relation-label">${escapeHtml(tagLabel)}</p>
          <div class="card-story">
            <p>${escapeHtml(eggLine)}</p>
          </div>
        </div>
      `;

      tagBtn.addEventListener("click", () => {
        const wasOpen = !detail.classList.contains("hidden");
        accordion.querySelectorAll(".tag-detail").forEach((d) => d.classList.add("hidden"));
        accordion.querySelectorAll(".relation-tag-btn").forEach((b) => {
          b.setAttribute("aria-expanded", "false");
          b.classList.remove("is-open");
        });
        if (!wasOpen) {
          detail.classList.remove("hidden");
          tagBtn.setAttribute("aria-expanded", "true");
          tagBtn.classList.add("is-open");
        }
      });

      row.appendChild(tagBtn);
      row.appendChild(detail);
      accordion.appendChild(row);
    });

    elCards.appendChild(accordion);
    elDisclaimer.textContent = quiz.disclaimer + "彩蛋结果闹着玩，别当真。";
    setScreen("result");
  }

  function goResult() {
    if (allUncertainAnswers()) {
      goResultZackeryEgg();
      return;
    }

    const { norm } = aggregateUserVector(answers);
    elCards.innerHTML = "";

    const accordion = document.createElement("div");
    accordion.className = "result-accordion";

    const rawRows = personas.map((persona) => {
      const cos = cosineSimilarity(norm, persona.vector);
      const { relation, sim01: s, reasonKey } = pickRelation(norm, persona, cos);
      const story = buildRelationStory(norm, persona, relation, cos, s, reasonKey);
      const hint = story.extra;
      const imgSrc = personaAvatarSrc(persona);
      return { persona, relation, story, hint, s, imgSrc, cos };
    });

    const rows = resolveUniqueResultRows(norm, rawRows);

    const catalogOrder = {};
    quiz.relationshipCatalog.forEach((r, i) => {
      catalogOrder[r.id] = i;
    });

    rows.sort((a, b) => (catalogOrder[a.relation.id] ?? 999) - (catalogOrder[b.relation.id] ?? 999));
    const gramBank = createGramBank();
    applyGlobalStrictNgramDedupe(rows, gramBank);
    refillStoryFieldsStrict(rows, gramBank);

    rows.forEach((item) => {
      const relation = item.relation;
      const items = [item];
      const row = document.createElement("div");
      row.className = "result-row";

      const tagBtn = document.createElement("button");
      tagBtn.type = "button";
      tagBtn.className = "relation-tag-btn";
      tagBtn.textContent = relation.title;
      tagBtn.setAttribute("aria-expanded", "false");

      const detail = document.createElement("div");
      detail.className = "tag-detail hidden";

      const blocks = items
        .map((inner) => {
          const h = inner.hint ? `<p>${escapeHtml(inner.hint)}</p>` : "";
          const whyP = inner.story.why ? `<p class="why-this-tag">${escapeHtml(inner.story.why)}</p>` : "";
          return `
        <section class="persona-result-block">
          <div class="card-head">
            <img class="avatar" src="${inner.imgSrc}" alt="" width="72" height="72" loading="lazy" />
            <div>
              <h3 class="card-name">${escapeHtml(inner.persona.name || "")}</h3>
              <p class="card-meta">${MATCH_PREFIX}${Math.round(inner.s * 100)}%</p>
            </div>
          </div>
          <div class="card-story">
            ${whyP}
            <p>${escapeHtml(inner.story.p1)}</p>
            <p class="tone-line">${escapeHtml(inner.story.tone)}</p>
            <p>${escapeHtml(inner.story.p2)}</p>
            ${inner.story.p3 ? `<p>${escapeHtml(inner.story.p3)}</p>` : ""}
            ${h}
          </div>
        </section>`;
        })
        .join("");

      detail.innerHTML = `
        <div class="tag-detail-inner tag-detail--group">
          <p class="detail-relation-label">${escapeHtml(relation.title)}</p>
          ${blocks}
        </div>
      `;

      tagBtn.addEventListener("click", () => {
        const wasOpen = !detail.classList.contains("hidden");
        accordion.querySelectorAll(".tag-detail").forEach((d) => d.classList.add("hidden"));
        accordion.querySelectorAll(".relation-tag-btn").forEach((b) => {
          b.setAttribute("aria-expanded", "false");
          b.classList.remove("is-open");
        });
        if (!wasOpen) {
          detail.classList.remove("hidden");
          tagBtn.setAttribute("aria-expanded", "true");
          tagBtn.classList.add("is-open");
        }
      });

      row.appendChild(tagBtn);
      row.appendChild(detail);
      accordion.appendChild(row);
    });

    elCards.appendChild(accordion);
    elDisclaimer.textContent = quiz.disclaimer;
    setScreen("result");
  }

  elStart.addEventListener("click", () => {
    idx = 0;
    Object.keys(answers).forEach((k) => delete answers[k]);
    setScreen("quiz");
    renderQuestion();
  });

  elNext.addEventListener("click", () => {
    const q = quiz.questions[idx];
    if (!answers[q.id]) return;
    if (idx < quiz.questions.length - 1) {
      idx++;
      renderQuestion();
    } else {
      goResult();
    }
  });

  elBack.addEventListener("click", () => {
    if (idx > 0) {
      idx--;
      renderQuestion();
    }
  });

  document.getElementById("btn-retry").addEventListener("click", () => {
    setScreen("intro");
  });
})();
