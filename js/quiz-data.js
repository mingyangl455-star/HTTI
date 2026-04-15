/**
 * 类 MBTI 形象关系测试 — 维度与题目权重
 * 「不一定」在计分中为 0（见 docs/DESIGN.md）
 */
window.__QUIZ__ = {
  dimensions: [
    {
      id: "social",
      label: "社交能量",
      description: "独处与社交之间的恢复方式与主动性。",
    },
    {
      id: "structure",
      label: "计划条理",
      description: "对计划、规则与可预期性的偏好。",
    },
    {
      id: "conflict_direct",
      label: "冲突直面",
      description: "面对分歧时更倾向当场厘清或回避缓冲。",
    },
    {
      id: "emotion_expr",
      label: "情感外露",
      description: "情绪外显、倾诉与幽默表达的倾向。",
    },
    {
      id: "risk",
      label: "风险接受",
      description: "对不确定性与冒险机会的接受度。",
    },
    {
      id: "authority",
      label: "权威依从",
      description: "对经验、层级与指导的开放与配合度。",
    },
  ],

  questions: [
    {
      id: "q1",
      text: "朋友当天临时约你出门，你的第一反应更接近「正好想透透气」而不是「被打乱节奏很烦」。",
      weights: {
        social: { yes: 1, no: -1, uncertain: 0 },
        structure: { yes: -0.4, no: 0.5, uncertain: 0 },
      },
    },
    {
      id: "q2",
      text: "面对接下来一周的学习或工作任务，你习惯先拆分步骤、排好优先级再动手。",
      weights: {
        structure: { yes: 1, no: -0.8, uncertain: 0 },
      },
    },
    {
      id: "q3",
      text: "和别人意见不合时，你更愿意当场把话说明白，而不是先忍着、改天再聊。",
      weights: {
        conflict_direct: { yes: 1, no: -1, uncertain: 0 },
        emotion_expr: { yes: 0.3, no: -0.2, uncertain: 0 },
      },
    },
    {
      id: "q4",
      text: "心里很难受时，你通常会主动找人聊出来，而不是尽量自己消化到平复。",
      weights: {
        emotion_expr: { yes: 1, no: -1, uncertain: 0 },
        social: { yes: 0.35, no: -0.2, uncertain: 0 },
      },
    },
    {
      id: "q5",
      text: "在「回报更高但更不确定」和「稳妥但慢一些」之间，你更常偏向前者。",
      weights: {
        risk: { yes: 1, no: -0.9, uncertain: 0 },
        structure: { yes: -0.35, no: 0.35, uncertain: 0 },
      },
    },
    {
      id: "q6",
      text: "长辈或老师、上级以「我过来人」的身份给建议时，你通常会认真听并愿意先试试照做。",
      weights: {
        authority: { yes: 1, no: -0.85, uncertain: 0 },
      },
    },
    {
      id: "q7",
      text: "在陌生人群里（例如聚会、活动），你更容易主动开口认识人，而不是只当旁观者。",
      weights: {
        social: { yes: 1, no: -1, uncertain: 0 },
      },
    },
    {
      id: "q8",
      text: "截止日期临近时计划被打乱，你仍能较快重新排优先级，而不是长时间陷在焦虑里动不了。",
      weights: {
        structure: { yes: 0.85, no: -0.6, uncertain: 0 },
        emotion_expr: { yes: -0.4, no: 0.55, uncertain: 0 },
      },
    },
    {
      id: "q9",
      text: "看到插队、爽约还不解释这类「不守规矩」的行为，你更可能当场指出或表态，而不是完全当没看见。",
      weights: {
        conflict_direct: { yes: 0.75, no: -0.75, uncertain: 0 },
        authority: { yes: -0.25, no: 0.25, uncertain: 0 },
      },
    },
    {
      id: "q10",
      text: "你会经常用玩笑、自嘲或夸张语气把情绪说出来，而不是一直板着脸。",
      weights: {
        emotion_expr: { yes: 0.9, no: -0.75, uncertain: 0 },
        social: { yes: 0.35, no: -0.2, uncertain: 0 },
      },
    },
    {
      id: "q11",
      text: "独自去陌生城市旅行或办事，整体对你来说是兴奋多于担忧。",
      weights: {
        risk: { yes: 0.85, no: -0.85, uncertain: 0 },
        social: { yes: 0.25, no: -0.15, uncertain: 0 },
      },
    },
    {
      id: "q12",
      text: "小组作业或项目里，你更愿意主动承担「定流程、盯节点」的角色，而不是只做灵活配合的那一方。",
      weights: {
        structure: { yes: 0.9, no: -0.65, uncertain: 0 },
        authority: { yes: 0.35, no: -0.2, uncertain: 0 },
      },
    },
  ],

  optionKeys: ["yes", "no", "uncertain"],
  optionLabels: {
    yes: "是",
    no: "否",
    uncertain: "不一定",
  },

  relationshipCatalog: [
    {
      id: "soulmate",
      title: "Soulmate",
      blurb: "大事小事容易想到一块，取舍也接近——属于「懒得吵」：吵了，也吵不到点子上。",
    },
    {
      id: "sworn_bros",
      title: "异父异母的亲兄弟",
      blurb: "能互怼，也能互捞；吵完还能接着处——损你是情趣，兜你是正经，长篇小作文免了。",
    },
    {
      id: "ally",
      title: "战友",
      blurb: "能一起扛事，把目标对齐往前推——不一定黏，但出事真上，比只会说「加油」强。",
    },
    {
      id: "fellow_suffering",
      title: "同病相怜",
      blurb: "痛点有点像，吐槽也容易说到一块——谁先叹气，另一个秒接，像自带弹幕同步。",
    },
    {
      id: "fake_bros",
      title: "表面兄弟",
      blurb: "场面热络；一谈钱，或真心话，就容易冷一下——熟得快，深得不急，别排错柜台。",
    },
    {
      id: "like_only",
      title: "点赞之交",
      blurb: "交集浅，但体面；知道有这个人就行——私域密码不必换，大家都省事。",
    },
    {
      id: "plastic_work",
      title: "塑料同事",
      blurb: "工作能对齐，私下聊天少，流程能跑完——同事位买了年卡，谈心，按次计费。",
    },
    {
      id: "party_mate",
      title: "酒肉搭子",
      blurb: "约玩容易；长期计划，往往谈不拢，或拖着——今晚快乐先结账，明年再说明年。",
    },
    {
      id: "shitu",
      title: "师徒",
      blurb: "一方更会总结步骤，一方更敢先试错——一个怕踩坑，一个偏想踩；学费，有人分摊。",
    },
    {
      id: "nemesis",
      title: "仇人",
      blurb: "关键取舍常反着来，硬凑双方都累——距离产生美，也产生和平；遥控器，少抢两次。",
    },
  ],

  /**
   * 匹配度 s∈[0,1] 从高到低命中第一条；具体修饰见 app.js pickRelation。
   */
  relationshipBands: [
    { minSim: 0.82, relationId: "soulmate" },
    { minSim: 0.68, relationId: "sworn_bros" },
    { minSim: 0.58, relationId: "ally" },
    { minSim: 0.48, relationId: "fellow_suffering" },
    { minSim: 0.38, relationId: "fake_bros" },
    { minSim: 0.28, relationId: "like_only" },
    { minSim: -1, relationId: "like_only" },
  ],

  modifierNotes: [
    "shitu: 形象在 structure/authority 上明显更像带路一方。",
    "ally: 用户在 structure/risk 上更靠前，像先探头扛线的那位。",
    "plastic_work: 任务维度近、情绪表达差大。",
    "party_mate: social 近而 structure 远。",
    "fake_bros: 中等匹配 + 冲突处理取向强对立。",
    "nemesis: 余弦很低或匹配度极低。",
  ],

  disclaimer:
    "本测试为轻量互动，不构成任何心理或职业测评结论。若「不一定」选得过多，结果区分度会下降；建议尽量选更接近真实倾向的一档。",
};
