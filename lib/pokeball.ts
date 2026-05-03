export interface Pokeball {
  id: string
  nameZh: string
  nameEn: string
  emoji: string
  description: string
  bgColor: string
  accentColor: string
}

export const POKEBALL_LIST: Pokeball[] = [
  { id: 'poke', nameZh: '精灵球', nameEn: 'Poké Ball', emoji: '🔴', description: '最经典的精灵球', bgColor: '#FFF0F0', accentColor: '#FF3333' },
  { id: 'great', nameZh: '超级球', nameEn: 'Great Ball', emoji: '🔵', description: '成功率更高', bgColor: '#F0F0FF', accentColor: '#3B4CCA' },
  { id: 'ultra', nameZh: '高级球', nameEn: 'Ultra Ball', emoji: '🟡', description: '性能优越', bgColor: '#FFFBF0', accentColor: '#B8A038' },
  { id: 'master', nameZh: '大师球', nameEn: 'Master Ball', emoji: '🟣', description: '绝不会失败', bgColor: '#F8F0FF', accentColor: '#7B0099' },
  { id: 'safari', nameZh: '狩猎球', nameEn: 'Safari Ball', emoji: '🟢', description: '狩猎区专用', bgColor: '#F0FFF4', accentColor: '#417A1A' },
  { id: 'fast', nameZh: '快速球', nameEn: 'Fast Ball', emoji: '⚡', description: '对快速精灵有效', bgColor: '#FFFFF0', accentColor: '#C8A000' },
  { id: 'heal', nameZh: '治愈球', nameEn: 'Heal Ball', emoji: '💗', description: '治愈被捕精灵', bgColor: '#FFF0F8', accentColor: '#E8609A' },
  { id: 'dusk', nameZh: '暗夜球', nameEn: 'Dusk Ball', emoji: '🖤', description: '夜晚效果极佳', bgColor: '#F0F0F0', accentColor: '#2D2D2D' },
]
