export type PokemonType = 'grass' | 'fire' | 'water' | 'random'

export interface Pokemon {
  id: number
  nameZh: string
  nameEn: string
  type: PokemonType
  generation?: number
}

export const POKEMON_LIST: Pokemon[] = [
  // Grass starters
  { id: 1, nameZh: '妙蛙种子', nameEn: 'Bulbasaur', type: 'grass', generation: 1 },
  { id: 152, nameZh: '菊草叶', nameEn: 'Chikorita', type: 'grass', generation: 2 },
  { id: 252, nameZh: '木守宫', nameEn: 'Treecko', type: 'grass', generation: 3 },
  { id: 387, nameZh: '草苗龟', nameEn: 'Turtwig', type: 'grass', generation: 4 },
  { id: 495, nameZh: '藤藤蛇', nameEn: 'Snivy', type: 'grass', generation: 5 },
  { id: 722, nameZh: '木木枭', nameEn: 'Rowlet', type: 'grass', generation: 7 },
  { id: 906, nameZh: '花猫草', nameEn: 'Sprigatito', type: 'grass', generation: 9 },
  // Fire starters
  { id: 4, nameZh: '小火龙', nameEn: 'Charmander', type: 'fire', generation: 1 },
  { id: 155, nameZh: '火球鼠', nameEn: 'Cyndaquil', type: 'fire', generation: 2 },
  { id: 255, nameZh: '火稚鸡', nameEn: 'Torchic', type: 'fire', generation: 3 },
  { id: 390, nameZh: '小猴怪', nameEn: 'Chimchar', type: 'fire', generation: 4 },
  { id: 653, nameZh: '火狐狸', nameEn: 'Fennekin', type: 'fire', generation: 6 },
  { id: 725, nameZh: '火斑喵', nameEn: 'Litten', type: 'fire', generation: 7 },
  { id: 909, nameZh: '火鳄鱼宝', nameEn: 'Fuecoco', type: 'fire', generation: 9 },
  // Water starters
  { id: 7, nameZh: '杰尼龟', nameEn: 'Squirtle', type: 'water', generation: 1 },
  { id: 158, nameZh: '小锯鳄', nameEn: 'Totodile', type: 'water', generation: 2 },
  { id: 258, nameZh: '泥泥鱼', nameEn: 'Mudkip', type: 'water', generation: 3 },
  { id: 393, nameZh: '波加曼', nameEn: 'Piplup', type: 'water', generation: 4 },
  { id: 656, nameZh: '呱呱泡蛙', nameEn: 'Froakie', type: 'water', generation: 6 },
  { id: 816, nameZh: '泪眼蜥', nameEn: 'Sobble', type: 'water', generation: 8 },
  { id: 912, nameZh: '小鸭洗澡', nameEn: 'Quaxly', type: 'water', generation: 9 },
  // Popular / random type
  { id: 25, nameZh: '皮卡丘', nameEn: 'Pikachu', type: 'random' },
  { id: 133, nameZh: '伊布', nameEn: 'Eevee', type: 'random' },
  { id: 94, nameZh: '耿鬼', nameEn: 'Gengar', type: 'random' },
  { id: 150, nameZh: '超梦', nameEn: 'Mewtwo', type: 'random' },
  { id: 448, nameZh: '路卡利欧', nameEn: 'Lucario', type: 'random' },
  { id: 445, nameZh: '烈咬陆鲨', nameEn: 'Garchomp', type: 'random' },
  { id: 700, nameZh: '仙子伊布', nameEn: 'Sylveon', type: 'random' },
  { id: 197, nameZh: '月精灵', nameEn: 'Umbreon', type: 'random' },
  { id: 778, nameZh: '谜拟Q', nameEn: 'Mimikyu', type: 'random' },
]

export function getPokemonImageUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function getPokemonByType(type: PokemonType): Pokemon[] {
  return POKEMON_LIST.filter((p) => p.type === type)
}
