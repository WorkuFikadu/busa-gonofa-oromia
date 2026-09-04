import React, { createContext, useContext, useState, useCallback } from 'react';
import { IncidentReport, MonetaryDonation, InKindDonationManifest, AuditLogEntry, RBACUser, RBACRole } from '../types';

const CURRENT_USER: RBACUser = {
  id: 'sa-001',
  username: 'superadmin',
  fullName: 'Caaltuu Gammachiis (Super-Admin)',
  role: 'super_admin',
  badgeId: 'BG-SA-2026-001',
};

interface AppStateContextType {
  // Incidents
  incidents: IncidentReport[];
  addIncident: (incident: IncidentReport) => void;
  updateIncidentStatus: (id: string, status: IncidentReport['status'], notes: string) => void;

  // Monetary donations
  monetaryDonations: MonetaryDonation[];
  addMonetaryDonation: (donation: MonetaryDonation) => void;

  // In-kind manifests
  inKindManifests: InKindDonationManifest[];
  addInKindManifest: (manifest: InKindDonationManifest) => void;
  updateManifestStatus: (manifestId: string, status: InKindDonationManifest['status'], actor: string) => void;

  volunteers: import('../types').Volunteer[];
  addVolunteer: (volunteer: import('../types').Volunteer) => void;
  updateVolunteerStatus: (volunteerId: string, status: import('../types').Volunteer['status']) => void;

  // Audit log
  auditLog: AuditLogEntry[];
  logAction: (action: string, targetModule: string, details: string, status?: AuditLogEntry['status']) => void;

  // Emergency ticker
  tickerActive: boolean;
  tickerMessage: string;
  setTickerActive: (active: boolean) => void;
  setTickerMessage: (msg: string) => void;

  // Current RBAC user
  currentUser: RBACUser | null;
  login: (username: string, role?: RBACRole) => void;
  logout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

const generateId = () => Math.random().toString(36).slice(2, 11).toUpperCase();
const generateHash = () => `0x${Math.random().toString(16).slice(2, 18).toUpperCase()}`;

const SEED_INCIDENTS: IncidentReport[] = [
  {
    id: 'inc-001',
    ticketNumber: 'BG-2026-4421',
    category: 'drought',
    severity: 'critical',
    zoneId: 'borena',
    woreda: 'Dillo',
    kebele: 'Toma Gayo',
    specificLocation: '12 km West of Dillo Market along Moyale Road',
    affectedPeopleEstimated: 4800,
    description: 'Complete water source dryout affecting both human and livestock populations. Children showing acute malnutrition signs.',
    reporterName: 'Abdi Guyo',
    reporterPhone: '0911234567',
    reporterRole: 'local_leader',
    status: 'dispatched',
    statusNotes: 'Two water tankers dispatched from Yabelo Hub. ETA 6 hours.',
    createdAt: '2026-08-20T08:30:00Z',
    updatedAt: '2026-08-20T14:00:00Z',
    urgentNeeds: ['Water Trucking', 'ORS Oral Rehydration Salts', 'Emergency Fodder'],
  },
  {
    id: 'inc-002',
    ticketNumber: 'BG-2026-7734',
    category: 'flood',
    severity: 'high',
    zoneId: 'east_shewa',
    woreda: 'Bora',
    kebele: 'Araya Metta',
    specificLocation: 'Awash River left bank, 3 km from Bora Town',
    affectedPeopleEstimated: 2200,
    description: 'Flash flood submerged 180 households. Families stranded on elevated ground. Livestock lost.',
    reporterName: 'Milkessa Taddesse',
    reporterPhone: '0922345678',
    reporterRole: 'volunteer',
    status: 'verified',
    statusNotes: 'Zonal desk confirmed via satellite imagery. Rescue team on standby.',
    createdAt: '2026-08-21T06:15:00Z',
    updatedAt: '2026-08-21T09:45:00Z',
    urgentNeeds: ['Rescue Boats', 'Emergency Food', 'Shelter Tent Kits'],
  },
  {
    id: 'inc-003',
    ticketNumber: 'BG-2026-5568',
    category: 'displacement',
    severity: 'high',
    zoneId: 'east_wollega',
    woreda: 'Sibu Sire',
    kebele: 'Holomo Guda',
    specificLocation: 'Sibu Sire IDP camp, Eastern entrance',
    affectedPeopleEstimated: 6700,
    description: 'Newly displaced 1,340 households registered. Urgent need for food rations, tarpaulins, and latrines.',
    reporterName: 'Firaol Legesse',
    reporterPhone: '0933456789',
    reporterRole: 'ngo_partner',
    status: 'pending',
    createdAt: '2026-08-22T03:00:00Z',
    updatedAt: '2026-08-22T03:00:00Z',
    urgentNeeds: ['Emergency Food Rations', 'Shelter Kits', 'WASH Latrines', 'NFI Household Kits'],
  },
];

const SEED_DONATIONS: MonetaryDonation[] = [
  {
    id: 'md-001',
    transactionHash: generateHash(),
    donorName: 'Diaspora Association of Oromia — USA Chapter',
    donorContact: 'diaspora@oromousa.org',
    amountETB: 850000,
    amountUSD: 15000,
    paymentGateway: 'card_visa',
    campaignId: 'camp-borena-drought',
    campaignTitle: 'Borena Drought Emergency',
    isAnonymous: false,
    status: 'settled',
    timestamp: '2026-08-19T11:22:00Z',
    cryptographicQRHash: generateHash(),
  },
  {
    id: 'md-002',
    transactionHash: generateHash(),
    donorName: 'Nagaye Dambi',
    donorContact: '0912345678',
    amountETB: 50000,
    paymentGateway: 'telebirr',
    campaignId: 'camp-flood-awash',
    campaignTitle: 'Awash Flood Response',
    isAnonymous: false,
    status: 'settled',
    timestamp: '2026-08-21T16:40:00Z',
    cryptographicQRHash: generateHash(),
  },
];

const SEED_AUDIT: AuditLogEntry[] = [
  {
    id: 'al-001',
    timestamp: '2026-08-22T07:00:00Z',
    actor: 'superadmin (Caaltuu Gammachiis)',
    role: 'super_admin',
    action: 'TICKER_UPDATED',
    targetModule: 'Emergency Ticker',
    details: 'Alert text updated for Awash Basin flood advisory',
    ipAddress: '10.0.0.1',
    status: 'SUCCESS',
  },
  {
    id: 'al-002',
    timestamp: '2026-08-22T08:45:00Z',
    actor: 'zonal.borena (Boru Guyo)',
    role: 'zonal_manager',
    action: 'INCIDENT_STATUS_CHANGED',
    targetModule: 'Incident Management',
    details: 'Ticket BG-2026-4421 updated from "verified" → "dispatched"',
    ipAddress: '10.2.4.8',
    status: 'SUCCESS',
  },
  {
    id: 'al-003',
    timestamp: '2026-08-22T10:10:00Z',
    actor: 'woreda.sibu_sire (Firaol N.)',
    role: 'woreda_operator',
    action: 'INCIDENT_SUBMITTED',
    targetModule: 'Incident Reports',
    details: 'New incident BG-2026-5568 filed for Sibu Sire IDP site',
    ipAddress: '10.5.1.22',
    status: 'SUCCESS',
  },
];

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [incidents, setIncidents] = useState<IncidentReport[]>(SEED_INCIDENTS);
  const [monetaryDonations, setMonetaryDonations] = useState<MonetaryDonation[]>(SEED_DONATIONS);
  const [inKindManifests, setInKindManifests] = useState<InKindDonationManifest[]>([]);
  const [volunteers, setVolunteers] = useState<import('../types').Volunteer[]>([]);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>(SEED_AUDIT);
  const [tickerActive, setTickerActive] = useState(true);
  const [tickerMessage, setTickerMessage] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  const logAction = useCallback((action: string, targetModule: string, details: string, status: AuditLogEntry['status'] = 'SUCCESS') => {
    const entry: AuditLogEntry = {
      id: `al-${generateId()}`,
      timestamp: new Date().toISOString(),
      actor: `${CURRENT_USER.username} (${CURRENT_USER.fullName})`,
      role: CURRENT_USER.role,
      action,
      targetModule,
      details,
      ipAddress: '10.0.0.1',
      status,
    };
    setAuditLog(prev => [entry, ...prev]);
  }, []);

  const addIncident = useCallback((incident: IncidentReport) => {
    setIncidents(prev => [incident, ...prev]);
    logAction('INCIDENT_SUBMITTED', 'Incident Reports', `Ticket ${incident.ticketNumber} filed for ${incident.woreda}, ${incident.zoneId}`);
  }, [logAction]);

  const updateIncidentStatus = useCallback((id: string, status: IncidentReport['status'], notes: string) => {
    setIncidents(prev => prev.map(inc =>
      inc.id === id ? { ...inc, status, statusNotes: notes, updatedAt: new Date().toISOString() } : inc
    ));
    const inc = incidents.find(i => i.id === id);
    logAction('INCIDENT_STATUS_CHANGED', 'Incident Management', `Ticket ${inc?.ticketNumber} → "${status}"`);
  }, [incidents, logAction]);

  const addMonetaryDonation = useCallback((donation: MonetaryDonation) => {
    setMonetaryDonations(prev => [donation, ...prev]);
    logAction('DONATION_RECEIVED', 'Monetary Ledger', `ETB ${donation.amountETB.toLocaleString()} via ${donation.paymentGateway} for "${donation.campaignTitle}"`);
  }, [logAction]);

  const addInKindManifest = useCallback((manifest: InKindDonationManifest) => {
    setInKindManifests(prev => [manifest, ...prev]);
    logAction('INKIND_PLEDGED', 'In-Kind Ledger', `${manifest.propertyType} — ${manifest.quantityUnits} from ${manifest.originWoreda} → ${manifest.allocatedWarehouseName}`);
  }, [logAction]);

  const updateManifestStatus = (id: string, status: InKindDonationManifest['status'], officerName: string = 'System') => {
    setInKindManifests(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    logAction('MANIFEST_UPDATE', 'In-Kind Pipeline', `Manifest ${id} status changed to ${status} by ${officerName}`);
  };

  const addVolunteer = (volunteer: import('../types').Volunteer) => {
    setVolunteers(prev => [volunteer, ...prev]);
    logAction('VOLUNTEER_REGISTERED', 'Volunteer Network', `New volunteer registered: ${volunteer.fullName}`);
  };

  const updateVolunteerStatus = (volunteerId: string, status: import('../types').Volunteer['status']) => {
    setVolunteers(prev => prev.map(v => v.id === volunteerId ? { ...v, status } : v));
    logAction('VOLUNTEER_UPDATE', 'Volunteer Network', `Volunteer ${volunteerId} status changed to ${status}`);
  };

  const [currentUser, setCurrentUser] = useState<import('../types').RBACUser | null>(null);

  const login = (username: string, role: import('../types').RBACRole = 'super_admin') => {
    const user: import('../types').RBACUser = {
      id: `usr-${Date.now()}`,
      username,
      fullName: 'System Admin',
      role,
      badgeId: 'BG-HQ-001'
    };
    setCurrentUser(user);
    logAction('USER_LOGIN', 'Authentication', `User ${username} logged in as ${role}`);
  };

  const logout = () => {
    if (currentUser) {
      logAction('USER_LOGOUT', 'Authentication', `User ${currentUser.username} logged out`);
    }
    setCurrentUser(null);
  };

  return (
    <AppStateContext.Provider value={{
      activeTab, setActiveTab,
      currentUser, login, logout,
      incidents, addIncident, updateIncidentStatus,
      monetaryDonations, addMonetaryDonation,
      inKindManifests, addInKindManifest, updateManifestStatus,
      volunteers, addVolunteer, updateVolunteerStatus,
      auditLog, logAction,
      tickerActive, tickerMessage, setTickerActive, setTickerMessage
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
};
