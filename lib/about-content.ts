export type TeamPerson = {
  name: string
  role: string
  initials: string
  photo?: string
  location?: string
}

export const CORE_TEAM: TeamPerson[] = [
  { name: 'Shannon Chiang', role: 'Founder', initials: 'SC', photo: '/files/IMG_2669.jpeg' },
  { name: 'Mia Lin', role: 'Social Media Lead', initials: 'ML', photo: '/files/36EBBEECDBBEB4B9E18FFAEA8D29935D5B59DF34+(1).jpeg' },
  { name: 'Ian Chu', role: 'Communications Coordinator', initials: 'IC', photo: '/files/3DA6F9B829F505DC8018A9DF6DB99138256E3464.jpeg' },
  { name: 'Sz-Chia Hsu', role: 'Development Lead', initials: 'SH' },
  { name: 'Ernestine Byer-Tyre', role: 'Advisor', initials: 'EB', photo: '/files/IMG_1336.jpeg' },
  { name: 'Tina Chang', role: 'Advisor', initials: 'TC', photo: '/files/S__3670023.jpeg' },
  { name: 'Amy Chen', role: 'Advisor', initials: 'AC', photo: '/files/IMG_5424.jpeg' },
  { name: 'Danielle Lewis', role: 'Advisor', initials: 'DL', photo: '/files/IMG_1335.jpeg' },
  { name: 'Jung-Chao Chiou', role: 'Advisor', initials: 'JC' },
]

export const US_CHAPTERS: TeamPerson[] = [
  { name: 'Peter Chiu', role: 'Chapter Lead — San Jose, CA', initials: 'PC', photo: '/files/B2A64FB307CB524891D90F64C1F531671D6D56D8.jpeg' },
  { name: 'Lily Chung-Yi Huang', role: 'Chapter Lead — Washington, D.C.', initials: 'LC', photo: '/files/DD78C5058D72746AEE9457BF9E24F29614FF083E.jpeg' },
  { name: 'George Tetteh', role: 'Chapter Lead — New York, NY', initials: 'GT', photo: '/files/IMG_1550+-+George+Tetteh.jpeg' },
  { name: 'Zya Johnson', role: 'Ambassador — New York, NY', initials: 'ZJ', photo: '/files/Screenshot+2026-01-12+7.28.01+PM+-+greenspider_grr.jpeg' },
  { name: 'Lida Hanson', role: 'Member — New York, NY', initials: 'LH', photo: '/files/IMG_1532+-+Lida+Hanson.jpeg' },
  { name: 'Anastasia Fernandez', role: 'Member — New York, NY', initials: 'AF', photo: '/files/IMG_1855+-+Anastasia+Fernandez.jpeg' },
  { name: 'Andrea Dominguez', role: 'Member — New York, NY', initials: 'AD', photo: '/files/IMG_6486.jpeg' },
  { name: 'Nimai Shrivastava', role: 'Chapter Lead — Basking Ridge, NJ', initials: 'NS', photo: '/files/Nimai+-+Nimai+Shrivastava.jpeg' },
]

export const INTL_CHAPTERS: TeamPerson[] = [
  { name: 'Li-Chuan Chiu', role: 'Chapter Lead', initials: 'LC', photo: '/files/7D93003EBD872EC1885EDCBCE53B1376AAED8465.jpeg', location: 'Taipei, Taiwan' },
  { name: 'Chia-Hsuan Chang', role: 'Member', initials: 'CC', photo: '/files/8436B6F6377B258DEE9411BAFB60A1BCE0607D16.jpeg', location: 'Taipei, Taiwan' },
  { name: 'Hsuan Yu', role: 'Chapter Lead', initials: 'HY', photo: '/files/AC3D6F7E-00FC-4BC1-B9B3-7ACACC46A858+-+Akai+Taljevan.jpeg', location: 'Pingtung, Taiwan' },
  { name: 'Regina Liu', role: 'Chapter Lead', initials: 'RL', photo: '/files/561606564641767460.jpeg', location: 'Taoyuan, Taiwan' },
  { name: 'Carlos Daniel Ramirez Perez', role: 'Chapter Lead', initials: 'CD', photo: '/files/06722CC0F626FEE47E73548BCF7E33A73C789329.jpeg', location: 'Bogotá, Colombia' },
  { name: 'Maitreyi Sharma', role: 'Chapter Lead', initials: 'MS', photo: '/files/IMG_1948.jpeg', location: 'Karnataka, India' },
]
