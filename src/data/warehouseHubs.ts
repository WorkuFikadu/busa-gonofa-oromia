import { WarehouseHub } from '../types';

export const warehouseHubs: WarehouseHub[] = [
  {
    id: 'hub-adama',
    name: {
      om: 'Giddugala Kuusaa Muummee Adaamaa',
      en: 'Adama Central Strategic Logistics Hub',
      am: 'የአዳማ ማዕከላዊ ስልታዊ ሎጂስቲክስ መጋዘን'
    },
    location: 'Adama Industrial Logistics Corridor, East Shewa',
    zoneId: 'east_shewa',
    capacityTons: 60000,
    currentStockTons: 48200,
    grainStockQtl: 420000,
    livestockHoldingHead: 3500,
    medicalKitsCount: 12400,
    shelterKitsCount: 18500,
    chiefCoordinator: 'Dr. Girma Bekele (Logistics Chief)',
    contactPhone: '+251-22-111-8181',
    coordinates: { x: 55, y: 48 }
  },
  {
    id: 'hub-yabelo',
    name: {
      om: 'Giddugala Kuusaa Kibbaa Yaabeellloo',
      en: 'Yabelo Southern Pastoralist Emergency Hub',
      am: 'የያቤሎ ደቡብ አርብቶ አደር ድንገተኛ አደጋ መጋዘን'
    },
    location: 'Yabelo Outskirts, Borena Zone',
    zoneId: 'borena',
    capacityTons: 25000,
    currentStockTons: 17400,
    grainStockQtl: 140000,
    livestockHoldingHead: 8200,
    medicalKitsCount: 6800,
    shelterKitsCount: 9200,
    chiefCoordinator: 'Obbo Boru Guyo (Zonal Emergency Director)',
    contactPhone: '+251-46-444-8181',
    coordinates: { x: 50, y: 88 }
  },
  {
    id: 'hub-nekemte',
    name: {
      om: 'Giddugala Kuusaa Dhihaa Naqamtee',
      en: 'Nekemte Western Regional Depot',
      am: 'የነቀምቴ ምዕራብ ክልላዊ መጋዘን'
    },
    location: 'Nekemte Industrial Park Road, East Wollega',
    zoneId: 'east_wollega',
    capacityTons: 35000,
    currentStockTons: 26500,
    grainStockQtl: 210000,
    livestockHoldingHead: 2100,
    medicalKitsCount: 8500,
    shelterKitsCount: 14000,
    chiefCoordinator: 'Adde Aster Tolasa (Western Operations Head)',
    contactPhone: '+251-57-666-8181',
    coordinates: { x: 32, y: 40 }
  },
  {
    id: 'hub-chiro',
    name: {
      om: 'Giddugala Kuusaa Bahaa Ciroo',
      en: 'Chiro Eastern Zonal Logistics Hub',
      am: 'የጭሮ ምስራቅ ዞን ሎጂስቲክስ ማዕከል'
    },
    location: 'Chiro Logistics Bypass, West Hararghe',
    zoneId: 'west_hararghe',
    capacityTons: 30000,
    currentStockTons: 21000,
    grainStockQtl: 175000,
    livestockHoldingHead: 4100,
    medicalKitsCount: 7200,
    shelterKitsCount: 11500,
    chiefCoordinator: 'Obbo Mohammed Kedir (Eastern Coordinator)',
    contactPhone: '+251-25-555-8181',
    coordinates: { x: 74, y: 42 }
  },
  {
    id: 'hub-robe',
    name: {
      om: 'Giddugala Kuusaa Kibba-Bahaa Roobee',
      en: 'Robe Southeastern Bale Logistics Depot',
      am: 'የሮቤ ደቡብ ምስራቅ ባሌ ሎጂስቲክስ መጋዘን'
    },
    location: 'Robe Airport Ring Road, Bale Zone',
    zoneId: 'bale',
    capacityTons: 28000,
    currentStockTons: 19800,
    grainStockQtl: 160000,
    livestockHoldingHead: 5400,
    medicalKitsCount: 5900,
    shelterKitsCount: 8800,
    chiefCoordinator: 'Dr. Jemal Hussein (Bale Operations Lead)',
    contactPhone: '+251-22-665-8181',
    coordinates: { x: 67, y: 65 }
  }
];
