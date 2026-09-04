export type Language = 'om' | 'en' | 'am';

export type AlertSeverity = 'normal' | 'watch' | 'severe' | 'critical';

export type DisasterCategory = 
  | 'drought'
  | 'flood'
  | 'landslide'
  | 'fire'
  | 'displacement'
  | 'crop_pest'
  | 'livestock_disease'
  | 'other';

export interface ZoneData {
  id: string;
  name: {
    om: string;
    en: string;
    am: string;
  };
  region: 'East' | 'West' | 'Central' | 'South' | 'Southeast' | 'North';
  capital: string;
  riskLevel: AlertSeverity;
  primaryRisk: DisasterCategory;
  populationAtRisk: number;
  activeDispatches: number;
  reliefStockPercent: number;
  lastUpdated: string;
  summary: {
    om: string;
    en: string;
    am: string;
  };
  coordinates: {
    x: number; // percentage (0-100)
    y: number; // percentage (0-100)
  };
  woredasAtRisk: string[];
}

export type AssetCategory = 'water_pipeline' | 'storage_grain' | 'livestock_clinic' | 'idp_shelter' | 'food_complex';

export interface InfrastructureProject {
  id: string;
  name: {
    om: string;
    en: string;
    am: string;
  };
  zoneId: string;
  zoneName: string;
  category: AssetCategory;
  budgetETB: number;
  completionPercentage: number;
  beneficiariesCount: number;
  contractor: string;
  status: 'planning' | 'under_construction' | 'commissioned' | 'operational';
  coordinates: { x: number; y: number };
  imageUrl: string;
  lastInspectionDate: string;
  description: {
    om: string;
    en: string;
    am: string;
  };
}

export type PropertyType = 'livestock' | 'grain' | 'building_equipment' | 'medical_nutrition' | 'water_storage';

export interface InKindDonationManifest {
  id: string;
  trackingCode: string;
  donorName: string;
  donorPhone: string;
  originZone: string;
  originWoreda: string;
  propertyType: PropertyType;
  itemDescription: string;
  quantityUnits: string;
  estimatedWeightKg: number;
  expiryMetric?: string;
  allocatedWarehouseId: string;
  allocatedWarehouseName: string;
  status: 'pledged' | 'in_transit' | 'verified_ingested' | 'distributed';
  pledgeDate: string;
  ingestionDate?: string;
  verifiedByOfficer?: string;
  qrPayload: string;
}

export interface MonetaryDonation {
  id: string;
  transactionHash: string;
  donorName: string;
  donorContact: string;
  amountETB: number;
  amountUSD?: number;
  paymentGateway: 'telebirr' | 'cbe_birr' | 'cooppay' | 'awash_birr' | 'sinqee' | 'chapa' | 'card_visa' | 'card_mastercard';
  campaignId: string;
  campaignTitle: string;
  isAnonymous: boolean;
  status: 'settled' | 'pending' | 'failed';
  timestamp: string;
  cryptographicQRHash: string;
}

export interface WarehouseHub {
  id: string;
  name: {
    om: string;
    en: string;
    am: string;
  };
  location: string;
  zoneId: string;
  capacityTons: number;
  currentStockTons: number;
  grainStockQtl: number;
  livestockHoldingHead: number;
  medicalKitsCount: number;
  shelterKitsCount: number;
  chiefCoordinator: string;
  contactPhone: string;
  coordinates: { x: number; y: number };
}

export interface Vacancy {
  id: string;
  title: {
    om: string;
    en: string;
    am: string;
  };
  department: string;
  zone: string;
  dutyStation: string;
  employmentType: 'Full-Time' | 'Contract' | 'Emergency Rapid Response';
  positionsOpen: number;
  deadline: string;
  requirements: string[];
  description: {
    om: string;
    en: string;
    am: string;
  };
}

export interface ClearinghouseDocument {
  id: string;
  title: {
    om: string;
    en: string;
    am: string;
  };
  documentNumber: string;
  category: 'proclamation' | 'regulation' | 'sitrep' | 'risk_assessment' | 'press_release';
  publishDate: string;
  author: string;
  fileSize: string;
  summary: {
    om: string;
    en: string;
    am: string;
  };
  downloadUrl: string;
  isOfficialGazette?: boolean;
}

export type RBACRole = 'super_admin' | 'zonal_manager' | 'woreda_operator';

export interface RBACUser {
  id: string;
  username: string;
  fullName: string;
  role: RBACRole;
  assignedZoneId?: string;
  assignedWoreda?: string;
  badgeId: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: RBACRole;
  action: string;
  targetModule: string;
  details: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'CRITICAL';
}

export type IncidentStatus = 'pending' | 'verified' | 'dispatched' | 'resolved';

export interface IncidentReport {
  id: string;
  ticketNumber: string;
  category: DisasterCategory;
  severity: 'low' | 'medium' | 'high' | 'critical';
  zoneId: string;
  woreda: string;
  kebele: string;
  specificLocation: string;
  affectedPeopleEstimated: number;
  description: string;
  reporterName: string;
  reporterPhone: string;
  reporterRole: 'citizen' | 'local_leader' | 'volunteer' | 'ngo_partner';
  status: IncidentStatus;
  statusNotes?: string;
  createdAt: string;
  updatedAt: string;
  photoUrl?: string;
  urgentNeeds: string[];
}

export interface Volunteer {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  zoneId: string;
  skills: string[];
  availability: 'full_time' | 'part_time' | 'emergency_only';
  status: 'pending' | 'approved' | 'deployed';
  registrationDate: string;
}
