/**
 * 形象配置：增减形象只需编辑本数组。
 * vector 各维取值范围建议 [-1, 1]，与归一化后的用户向量同尺度比对。
 * 头像若省略或留空，由 app.js 按 id 生成占位图（随机感但同角色稳定）。
 * tagline 仅作内部备注，结果页不外显。
 */
window.__PERSONAS__ = [
  {
    id: "persona_a",
    name: "林凡",
    avatar: "",
    tagline: "毒舌型 + 雷厉风行。",
    traits: ["毒舌", "讨厌谁就直接开麦喷", "藐视一切", "不太友善", "工作能力强", "逻辑思维能力强", "不关注为人处事"],
    vector: {
      social: 0.12,
      structure: 0.78,
      conflict_direct: 0.9,
      emotion_expr: 0.42,
      risk: 0.28,
      authority: -0.72,
    },
    archetypeHints: { volatile: true, rivalBias: true },
  },
  {
    id: "persona_b",
    name: "Simon",
    avatar: "",
    tagline: "悠闲风 + 温柔长辈。",
    traits: ["情绪稳定", "愿意给建议和想法", "从不生气", "与人为善", "工作能力适中", "爱照顾人"],
    vector: {
      social: 0.48,
      structure: 0.58,
      conflict_direct: -0.38,
      emotion_expr: -0.12,
      risk: -0.22,
      authority: 0.52,
    },
    archetypeHints: { mentorBias: true, lowEmotionSurface: true, balanced: true },
  },
  {
    id: "persona_c",
    name: "Kris",
    avatar: "",
    tagline: "爱自由+天马行空型。",
    traits: ["心态年轻", "思维活跃", "性格非常有趣", "喜欢社交和聊天", "爱玩", "爱生活和享受生活"],
    vector: {
      social: 0.88,
      structure: -0.12,
      conflict_direct: 0.32,
      emotion_expr: 0.78,
      risk: 0.52,
      authority: 0.18,
    },
    archetypeHints: { partyEnergy: true, balanced: false },
  },
  {
    id: "persona_d",
    name: "Joffy",
    avatar: "",
    tagline: "情绪稳定+循循善诱",
    traits: ["循循善诱", "喜欢说教", "喜欢走心", "对数据很敏感", "情绪稳定", "会为人处事", "喜欢安静独处"],
    vector: {
      social: -0.42,
      structure: 0.8,
      conflict_direct: 0.08,
      emotion_expr: 0.32,
      risk: -0.28,
      authority: 0.48,
    },
    archetypeHints: { mentorBias: true, lowEmotionSurface: true },
  },
];
